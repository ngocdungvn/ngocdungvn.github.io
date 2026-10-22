const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

let html = fs.readFileSync('project/birthday-cake.html', 'utf8');

// Inject test simulation
const probe = `
<script>
window.addEventListener('load', () => {
  setTimeout(() => {
    const cake = document.getElementById('cake_click_area');
    console.log('CLICKING CAKE...');
    cake.click();

    setTimeout(() => {
      fetch('/report', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          areCandlesLit: areCandlesLit,
          particlesCount: confettiParticles.length,
          messageText: document.getElementById('message_text').textContent,
          flamesOpacity: Array.from(document.querySelectorAll('.flame-element')).map(f => f.style.opacity)
        })
      });
    }, 400);
  }, 300);
});
</script>
`;
html = html.replace('</body>', probe + '</body>');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
  } else if (req.url === '/report' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log('TEST RESULT:\n', body);
      res.writeHead(200);
      res.end('ok');
      server.close();
      process.exit(0);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(4568, () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    'http://localhost:4568/'
  ]);
});
