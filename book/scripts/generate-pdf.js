#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const {spawn, spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, 'build');
const sidebarsFile = path.join(root, 'sidebars.ts');
const metadataDir = path.join(root, '.docusaurus', 'docusaurus-plugin-content-docs', 'default');
const staticPdfFile = path.join(root, 'static', 'downloads', 'cryptographic-atlas.pdf');
const buildPdfFile = path.join(buildDir, 'downloads', 'cryptographic-atlas.pdf');
const printHtmlFile = path.join(buildDir, 'pdf', 'cryptographic-atlas.html');
const baseUrl = '/cryptographic-atlas/';
const publicUrl = 'https://christophelebrun.github.io/cryptographic-atlas';

const placeholderPdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 110 >>
stream
BT
/F1 16 Tf
72 720 Td
(The Cryptographic Atlas) Tj
0 -28 Td
(Run npm run generate:pdf to refresh this file.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000241 00000 n
0000000311 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
471
%%EOF
`;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function slug(value) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

function findChrome() {
  const envPath = process.env.PDF_CHROME_PATH;
  const candidates = [
    envPath,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
    'msedge',
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (candidate.includes(path.sep) && fs.existsSync(candidate)) return candidate;
    if (!candidate.includes(path.sep)) {
      const result = spawnSync(candidate, ['--version'], {stdio: 'ignore'});
      if (result.status === 0) return candidate;
    }
  }

  throw new Error(
    'No Chrome or Chromium executable found. Set PDF_CHROME_PATH to a Chrome-compatible browser binary.',
  );
}

function ensurePlaceholderPdf() {
  if (fs.existsSync(staticPdfFile)) return;
  fs.mkdirSync(path.dirname(staticPdfFile), {recursive: true});
  fs.writeFileSync(staticPdfFile, placeholderPdf);
}

function runBuild() {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(npm, ['run', 'build'], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    throw new Error(`Docusaurus build failed with status ${result.status}`);
  }
}

function sidebarDocOrder() {
  const source = fs.readFileSync(sidebarsFile, 'utf8');
  const start = source.indexOf('atlasSidebar: [');
  const end = source.indexOf('],\n};', start);
  if (start === -1 || end === -1) {
    throw new Error('Could not locate atlasSidebar in sidebars.ts');
  }

  const sidebarSource = source.slice(start, end);
  const docs = [];
  let category = 'Introduction';
  const seen = new Set();

  for (const line of sidebarSource.split(/\n/)) {
    const label = line.match(/label:\s+'([^']+)'/);
    if (label) category = label[1];

    for (const match of line.matchAll(/'([^']+)'/g)) {
      const value = match[1];
      if (value === 'intro' || value.includes('/')) {
        if (!seen.has(value)) {
          docs.push({id: value, category});
          seen.add(value);
        }
      }
    }
  }

  return docs;
}

function docMetadata() {
  const out = new Map();
  for (const file of fs.readdirSync(metadataDir)) {
    if (!file.endsWith('.json') || file.startsWith('__')) continue;
    const fullPath = path.join(metadataDir, file);
    const metadata = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    if (metadata.id && metadata.permalink) out.set(metadata.id, metadata);
  }
  return out;
}

function htmlFileFor(metadata) {
  let relative = metadata.permalink;
  if (!relative.startsWith(baseUrl)) {
    throw new Error(`Unexpected permalink outside ${baseUrl}: ${metadata.permalink}`);
  }
  relative = relative.slice(baseUrl.length);
  relative = relative.replace(/^\/+/, '').replace(/\/+$/, '');
  const direct = path.join(buildDir, `${relative}.html`);
  if (fs.existsSync(direct)) return direct;
  const index = path.join(buildDir, relative, 'index.html');
  if (fs.existsSync(index)) return index;
  throw new Error(`Could not find built HTML for ${metadata.id}: ${metadata.permalink}`);
}

function extractMarkdownHtml(file) {
  const html = fs.readFileSync(file, 'utf8');
  const marker = '<div class="theme-doc-markdown markdown">';
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`Could not find rendered markdown in ${path.relative(root, file)}`);

  const contentStart = start + marker.length;
  let end = html.indexOf('</div><footer class="theme-doc-footer', contentStart);
  if (end === -1) end = html.indexOf('</div></article>', contentStart);
  if (end === -1) throw new Error(`Could not find rendered markdown end in ${path.relative(root, file)}`);

  return html.slice(contentStart, end);
}

function cleanDocHtml(html) {
  return html
    .replace(/<a href="#[^"]*" class="hash-link"[\s\S]*?<\/a>/g, '')
    .replace(new RegExp(`href="${escapeRegExp(baseUrl)}`, 'g'), `href="${publicUrl}/`)
    .replace(new RegExp(`src="${escapeRegExp(baseUrl)}`, 'g'), `src="${baseUrl}`)
    .replace(/\s+loading="lazy"/g, '')
    .replace(/\s+decoding="async"/g, '');
}

function builtStylesheetPath() {
  const cssDir = path.join(buildDir, 'assets', 'css');
  const files = fs.readdirSync(cssDir).filter((file) => file.endsWith('.css')).sort();
  if (files.length === 0) throw new Error('Could not find built Docusaurus stylesheet');
  return `${baseUrl}assets/css/${files[0]}`;
}

function renderPrintHtml(docs, tocPageNumbers = null) {
  const generatedAt = new Date().toISOString().slice(0, 10);
  let currentCategory = null;
  const tocItems = [];
  const sections = [];

  for (const doc of docs) {
    const id = `doc-${slug(doc.id)}`;
    if (doc.category !== currentCategory) {
      currentCategory = doc.category;
      tocItems.push(`<li class="toc-category">${escapeHtml(currentCategory)}</li>`);
      sections.push(`<h1 class="pdf-category">${escapeHtml(currentCategory)}</h1>`);
    }

    const tocPageNumber = tocPageNumbers?.get(doc.id) ?? '';
    tocItems.push(
      `<li><a href="#${id}">` +
        `<span class="toc-title">${escapeHtml(doc.title)}</span>` +
        `<span class="toc-page" data-page-target="${id}" aria-label="page">${escapeHtml(tocPageNumber)}</span>` +
        `</a></li>`,
    );
    sections.push(
      `<section id="${id}" class="pdf-doc-section" data-doc-id="${escapeHtml(doc.id)}">` +
        cleanDocHtml(doc.html) +
        '</section>',
    );
  }

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>The Cryptographic Atlas PDF</title>
  <link rel="stylesheet" href="${builtStylesheetPath()}">
  <style>
    @page {
      size: A4;
      margin: 17mm 15mm 19mm;
    }

    * {
      box-sizing: border-box;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    html,
    body {
      background: #ffffff;
      color: #152024;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 10.5pt;
      line-height: 1.48;
      margin: 0;
    }

    body {
      max-width: 780px;
      margin: 0 auto;
    }

    .pdf-cover {
      align-content: center;
      min-height: 245mm;
      page-break-after: always;
    }

    .pdf-cover h1 {
      font-size: 31pt;
      line-height: 1.08;
      margin: 0 0 16px;
    }

    .pdf-cover p {
      color: #526166;
      font-size: 13pt;
      max-width: 560px;
    }

    .pdf-meta {
      color: #526166;
      font-size: 9.5pt;
      margin-top: 36px;
    }

    .pdf-toc {
      page-break-after: always;
    }

    .pdf-toc h1,
    .pdf-category {
      font-size: 22pt;
      line-height: 1.15;
      margin: 0 0 18px;
    }

    .pdf-toc ol {
      margin: 0;
      padding-left: 0;
    }

    .pdf-toc li {
      list-style: none;
      margin: 5px 0;
    }

    .pdf-toc a {
      align-items: baseline;
      color: inherit;
      display: flex;
      gap: 8px;
      text-decoration: none;
    }

    .pdf-toc a::after {
      border-bottom: 1px dotted #9fb3b6;
      content: "";
      flex: 1 1 auto;
      order: 1;
      transform: translateY(-3px);
    }

    .pdf-toc .toc-title {
      order: 0;
    }

    .pdf-toc .toc-page {
      color: #526166;
      font-variant-numeric: tabular-nums;
      min-width: 3ch;
      order: 2;
      text-align: right;
    }

    .pdf-toc .toc-category {
      color: #526166;
      font-size: 10pt;
      font-weight: 700;
      margin-top: 16px;
      text-transform: uppercase;
    }

    .pdf-category {
      page-break-before: always;
    }

    main > .pdf-category:first-child {
      page-break-before: auto;
    }

    .pdf-doc-section {
      page-break-before: always;
    }

    .pdf-category + .pdf-doc-section {
      page-break-before: auto;
    }

    .markdown h1 {
      font-size: 21pt;
      line-height: 1.15;
      margin-top: 0;
    }

    .markdown h2 {
      font-size: 15pt;
      margin-top: 22px;
    }

    .markdown h3 {
      font-size: 12.5pt;
    }

    .markdown a {
      color: #0f5f8c;
      text-decoration: none;
    }

    .hash-link,
    .theme-doc-breadcrumbs,
    .theme-doc-footer,
    .tocCollapsible_ETCw {
      display: none !important;
    }

    .markdown img {
      display: block;
      height: auto;
      margin: 14px auto;
      max-height: 178mm;
      max-width: 100%;
      page-break-inside: avoid;
    }

    .markdown table {
      border-collapse: collapse;
      display: table;
      font-size: 8.5pt;
      margin: 13px 0;
      page-break-inside: auto;
      width: 100%;
    }

    .markdown tr {
      page-break-inside: avoid;
    }

    .markdown th,
    .markdown td {
      border: 1px solid #d7e0e3;
      padding: 5px 7px;
      vertical-align: top;
    }

    .markdown pre {
      font-size: 8.5pt;
      line-height: 1.35;
      overflow: visible;
      page-break-inside: avoid;
      white-space: pre-wrap;
    }

    .markdown code {
      overflow-wrap: anywhere;
    }

    .theme-code-block {
      page-break-inside: avoid;
    }

    blockquote {
      border-left: 3px solid #9fb3b6;
      color: #526166;
      margin-left: 0;
      padding-left: 12px;
    }
  </style>
</head>
<body>
  <section class="pdf-cover">
    <h1>The Cryptographic Atlas</h1>
    <p>A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.</p>
    <p>Content was generated and revised with AI agents. Treat this PDF as educational draft material and verify technical claims against cited sources before relying on them.</p>
    <p class="pdf-meta">Generated ${generatedAt}. Source: ${publicUrl}/</p>
  </section>
  <nav class="pdf-toc" aria-label="Table of contents">
    <h1>Table of Contents</h1>
    <ol>
      ${tocItems.join('\n      ')}
    </ol>
  </nav>
  <main class="markdown">
    ${sections.join('\n')}
  </main>
  ${
    tocPageNumbers
      ? ''
      : `<script>
    (function () {
      var PAGE_HEIGHT_MM = 297 - 17 - 19;
      var PX_PER_MM = 96 / 25.4;
      var pageHeight = PAGE_HEIGHT_MM * PX_PER_MM;

      function outerHeight(element) {
        if (!element) return 0;
        var rect = element.getBoundingClientRect();
        var style = window.getComputedStyle(element);
        return (
          rect.height +
          parseFloat(style.marginTop || '0') +
          parseFloat(style.marginBottom || '0')
        );
      }

      function pageCountForHeight(height) {
        return Math.max(1, Math.ceil(height / pageHeight));
      }

      function pageCountForElement(element) {
        return pageCountForHeight(outerHeight(element));
      }

      function setTocPage(docId, page) {
        var pageNode = document.querySelector('.toc-page[data-page-target="' + docId + '"]');
        if (!pageNode) return;
        pageNode.textContent = String(page);
      }

      function assignTocPageNumbers() {
        var cover = document.querySelector('.pdf-cover');
        var toc = document.querySelector('.pdf-toc');
        var main = document.querySelector('main.markdown');
        if (!cover || !toc || !main) return;

        var page = pageCountForElement(cover) + pageCountForElement(toc) + 1;
        var children = Array.prototype.slice.call(main.children);
        var firstCategory = true;

        for (var index = 0; index < children.length; index += 1) {
          var child = children[index];

          if (child.classList.contains('pdf-category')) {
            if (!firstCategory) page += 1;
            firstCategory = false;

            var groupedHeight = outerHeight(child);
            var next = children[index + 1];

            if (next && next.classList.contains('pdf-doc-section')) {
              setTocPage(next.id, page);
              groupedHeight += outerHeight(next);
              page += pageCountForHeight(groupedHeight) - 1;
              index += 1;
            } else {
              page += pageCountForHeight(groupedHeight) - 1;
            }

            continue;
          }

          if (child.classList.contains('pdf-doc-section')) {
            page += 1;
            setTocPage(child.id, page);
            page += pageCountForElement(child) - 1;
          }
        }
      }

      function assignUntilStable() {
        for (var i = 0; i < 3; i += 1) {
          assignTocPageNumbers();
        }
      }

      if (document.readyState === 'complete') {
        assignUntilStable();
      } else {
        window.addEventListener('load', assignUntilStable);
      }
    })();
  </script>
`
  }
</body>
</html>
`;
}

function contentType(file) {
  switch (path.extname(file)) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.pdf':
      return 'application/pdf';
    case '.woff2':
      return 'font/woff2';
    default:
      return 'application/octet-stream';
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stopChrome(child) {
  if (!child.pid) return;
  try {
    if (process.platform === 'win32') {
      child.kill('SIGTERM');
    } else {
      process.kill(-child.pid, 'SIGTERM');
    }
  } catch {
    // The process may already have exited.
  }
}

function waitForExit(child, timeoutMs) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((resolve) => {
    const timeout = setTimeout(resolve, timeoutMs);
    child.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const parsed = new URL(req.url || '/', 'http://127.0.0.1');
      let requestPath = decodeURIComponent(parsed.pathname);
      if (requestPath.startsWith(baseUrl)) requestPath = requestPath.slice(baseUrl.length);
      requestPath = requestPath.replace(/^\/+/, '');

      let file = path.join(buildDir, requestPath || 'index.html');
      if (!file.startsWith(buildDir + path.sep)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      res.writeHead(200, {'Content-Type': contentType(file)});
      if (req.method === 'HEAD') {
        res.end();
      } else {
        fs.createReadStream(file).pipe(res);
      }
    });

    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function chromePrint(url, outputFile) {
  const chrome = findChrome();
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cryptographic-atlas-pdf-'));
  const args = [
    '--headless=new',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-sync',
    '--hide-scrollbars',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    '--run-all-compositor-stages-before-draw',
    '--disable-features=MediaRouter,OptimizationHints,PaintHolding',
    `--user-data-dir=${profileDir}`,
    `--print-to-pdf=${outputFile}`,
    url,
  ];

  fs.mkdirSync(path.dirname(outputFile), {recursive: true});
  fs.rmSync(outputFile, {force: true});

  const child = spawn(chrome, args, {
    detached: process.platform !== 'win32',
    stdio: 'ignore',
  });

  let exitStatus = null;
  child.once('exit', (code, signal) => {
    exitStatus = {code, signal};
  });

  const deadline = Date.now() + 90000;
  try {
    while (Date.now() < deadline) {
      if (fs.existsSync(outputFile)) {
        const stats = fs.statSync(outputFile);
        if (stats.size > 1024) {
          stopChrome(child);
          await waitForExit(child, 3000);
          return;
        }
      }

      if (exitStatus) {
        throw new Error(
          `Chrome PDF export exited before writing a usable PDF ` +
            `(code ${exitStatus.code}, signal ${exitStatus.signal})`,
        );
      }

      await sleep(250);
    }

    throw new Error('Chrome PDF export timed out before writing a usable PDF');
  } finally {
    stopChrome(child);
    await waitForExit(child, 3000);
    fs.rmSync(profileDir, {recursive: true, force: true});
  }
}

function normalizePdfLine(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function titleStartsAt(lines, doc) {
  const title = normalizePdfLine(doc.title);
  const category = normalizePdfLine(doc.category);
  const firstLines = lines.slice(0, 5);
  if (firstLines.length === 0) return false;

  if (firstLines[0] === title) return true;
  if (firstLines[0] === category && normalizePdfLine(firstLines.slice(1, 5).join(' ')).startsWith(title)) {
    return true;
  }

  return normalizePdfLine(firstLines.slice(0, 3).join(' ')).startsWith(title);
}

function extractTocPageNumbers(pdfFile, docs) {
  const result = spawnSync('pdftotext', [pdfFile, '-'], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 16,
  });

  if (result.status !== 0 || !result.stdout) {
    console.warn('Could not extract PDF text with pdftotext; using estimated TOC page numbers.');
    return null;
  }

  const pages = result.stdout.split('\f');
  const pageNumbers = new Map();
  let docIndex = 0;
  let mainStarted = false;

  for (let pageIndex = 0; pageIndex < pages.length && docIndex < docs.length; pageIndex += 1) {
    const lines = pages[pageIndex]
      .split(/\n/)
      .map(normalizePdfLine)
      .filter(Boolean);

    if (!mainStarted) {
      mainStarted = titleStartsAt(lines, docs[0]);
      if (!mainStarted) continue;
    }

    const doc = docs[docIndex];
    if (titleStartsAt(lines, doc)) {
      pageNumbers.set(doc.id, pageIndex + 1);
      docIndex += 1;
    }
  }

  if (pageNumbers.size !== docs.length) {
    console.warn(
      `Could only extract ${pageNumbers.size} of ${docs.length} PDF TOC page numbers; ` +
        'using estimated TOC page numbers.',
    );
    return null;
  }

  return pageNumbers;
}

async function main() {
  ensurePlaceholderPdf();
  runBuild();

  const metadataById = docMetadata();
  const docs = sidebarDocOrder().map(({id, category}) => {
    const metadata = metadataById.get(id);
    if (!metadata) throw new Error(`Missing Docusaurus metadata for sidebar doc "${id}"`);
    const htmlFile = htmlFileFor(metadata);
    return {
      id,
      category,
      title: metadata.title,
      html: extractMarkdownHtml(htmlFile),
    };
  });

  fs.mkdirSync(path.dirname(printHtmlFile), {recursive: true});
  fs.writeFileSync(printHtmlFile, renderPrintHtml(docs));

  const server = await startServer();
  const port = server.address().port;
  const printUrl = `http://127.0.0.1:${port}${baseUrl}pdf/cryptographic-atlas.html`;
  const probePdfFile = path.join(os.tmpdir(), `cryptographic-atlas-probe-${Date.now()}.pdf`);

  try {
    await chromePrint(printUrl, probePdfFile);
    const tocPageNumbers = extractTocPageNumbers(probePdfFile, docs);

    if (tocPageNumbers) {
      fs.writeFileSync(printHtmlFile, renderPrintHtml(docs, tocPageNumbers));
      await chromePrint(printUrl, staticPdfFile);
    } else {
      fs.mkdirSync(path.dirname(staticPdfFile), {recursive: true});
      fs.copyFileSync(probePdfFile, staticPdfFile);
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(probePdfFile, {force: true});
  }

  fs.mkdirSync(path.dirname(buildPdfFile), {recursive: true});
  fs.copyFileSync(staticPdfFile, buildPdfFile);

  console.log(
    `Generated ${path.relative(root, staticPdfFile)} from ${docs.length} docs ` +
      `(${Math.round(fs.statSync(staticPdfFile).size / 1024)} KiB).`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
