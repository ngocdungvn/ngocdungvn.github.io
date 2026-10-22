const { execSync } = require('child_process');
const fs = require('fs');

const script = `
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const overflows = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > window.innerWidth + 1) {
          overflows.push({ tag: el.tagName, class: el.className, id: el.id, right: r.right, width: r.width });
        }
      });
      console.log('WINDOW_INNER_WIDTH:', window.innerWidth);
      console.log('OVERFLOWS:', JSON.stringify(overflows.slice(0, 10)));
    }, 500);
  });
`;

const html = fs.readFileSync('project/birthday-cake.html', 'utf8')
  .replace('</body>', '<script>' + script + '</script></body>');
fs.writeFileSync('temp_debug.html', html);

try {
  const out = execSync('"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --window-size=390,844 --virtual-time-budget=2000 "file:///' + process.cwd().replace(/\\/g, '/') + '/temp_debug.html"', { encoding: 'utf8', stdio: 'pipe' });
  console.log('CHROME OUT:\n', out);
} catch (e) {
  console.log('ERR:\n', e.stdout, e.stderr);
} finally {
  if (fs.existsSync('temp_debug.html')) fs.unlinkSync('temp_debug.html');
}
