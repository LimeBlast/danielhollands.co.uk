const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4568;
const BUILD_DIR = path.resolve(__dirname, 'build');
const OUTPUT_PATH = path.join(BUILD_DIR, 'daniel-hollands-cv.pdf');

const CONTENT_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function createServer() {
  return http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    const filePath = path.join(BUILD_DIR, urlPath === '/' ? 'index.html' : urlPath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
}

async function generatePDF() {
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Serving build/ at http://localhost:${PORT}`);

  const isCI = !!(process.env.CI || process.env.NETLIFY);
  const browser = await puppeteer.launch({
    args: isCI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
  });

  const page = await browser.newPage();
  await page.emulateMediaType('print');
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUTPUT_PATH,
    format: 'A4',
    printBackground: false,
    margin: { top: '1.5cm', right: '1.5cm', bottom: '1.5cm', left: '1.5cm' },
  });

  await browser.close();
  server.close();

  console.log(`PDF written to ${OUTPUT_PATH}`);
}

generatePDF().catch((err) => {
  console.error(err);
  process.exit(1);
});
