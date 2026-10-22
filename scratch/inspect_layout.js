const { execSync } = require('child_process');
const fs = require('fs');

// We will use chrome to inspect the page DOM properties
const script = `
const cw = document.querySelector('.cake-wrapper');
const svg = document.querySelector('.cake-svg');
const stage = document.querySelector('.stage-container');
const body = document.body;
const html = document.documentElement;
const data = {
  windowInnerWidth: window.innerWidth,
  bodyScrollWidth: body.scrollWidth,
  bodyClientWidth: body.clientWidth,
  htmlScrollWidth: html.scrollWidth,
  stageRect: stage.getBoundingClientRect(),
  cwRect: cw.getBoundingClientRect(),
  svgRect: svg.getBoundingClientRect()
};
console.log('LAYOUT_METRICS:' + JSON.stringify(data));
`;

let html = fs.readFileSync('project/birthday-cake.html', 'utf8');
html = html.replace('createBokehLights();', script + '\ncreateBokehLights();');
fs.writeFileSync('project/temp_debug.html', html);

try {
  const res = execSync('"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless --disable-gpu --enable-logging=stderr --window-size=390,844 file:///d:/Documents/GitHub/ngocdungvn.github.io/project/temp_debug.html', { encoding: 'utf8' });
  console.log(res);
} catch (e) {
  const err = (e.stderr || '') + (e.stdout || '');
  const match = err.match(/LAYOUT_METRICS:\{.*?\}/);
  if (match) {
    console.log(match[0]);
  } else {
    console.log('STDERR:', err.slice(-1000));
  }
} finally {
  if (fs.existsSync('project/temp_debug.html')) fs.unlinkSync('project/temp_debug.html');
}
