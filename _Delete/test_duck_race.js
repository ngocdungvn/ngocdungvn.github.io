const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

let html = fs.readFileSync('project/duck-race.html', 'utf8');

// Inject test monitor
const probe = `
<script>
window.addEventListener('load', () => {
  // Chọn chế độ 15s để test nhanh
  STATE.raceDuration = 15;
  document.getElementById('namesInput').value = 'Vịt Vàng\\nVịt Xanh\\nVịt Đỏ\\nVịt Tím\\nVịt Cam';
  buildDucksFromInput();

  console.log('STARTING 15s TEST RACE...');
  GameEngine.startRace();

  let checkInterval = setInterval(() => {
    if (STATE.isFinished) {
      clearInterval(checkInterval);
      const digits = document.getElementById('stopwatchDigits').innerText;
      const winner = STATE.rankedResults[0];
      fetch('/report', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          isFinished: STATE.isFinished,
          gameTimeMs: STATE.gameTimeMs,
          digits: digits,
          winnerName: winner ? winner.name : null,
          winnerFinishTime: winner ? winner.finishTime : null,
          totalRanked: STATE.rankedResults.length
        })
      });
    }
  }, 100);
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
      console.log('RACE TEST RESULT:\n', body);
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

server.listen(4570, () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    'http://localhost:4570/'
  ]);
});
