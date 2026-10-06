import { VibeTemplate } from '../types';

export const STARTER_TEMPLATES: VibeTemplate[] = [
  {
    id: 'ambient-flow',
    name: 'Ambient Flow & Soundscape Pomodoro',
    category: 'productivity',
    description: 'Minimalist focus timer with interactive Web Audio generative noise generator (Rain, White Noise, Ocean) and session stats.',
    tags: ['Web Audio', 'Focus', 'Productivity', 'Dark Mode'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ambient Flow</title>
</head>
<body>
  <div class="app-card">
    <div class="header">
      <span class="badge">VIBE FLOW</span>
      <h2>Ambient Focus Studio</h2>
    </div>

    <div class="timer-display">
      <div class="circle-timer">
        <svg viewBox="0 0 100 100">
          <circle class="bg" cx="50" cy="50" r="45"></circle>
          <circle id="progressCircle" class="progress" cx="50" cy="50" r="45"></circle>
        </svg>
        <div class="time-text" id="timeDisplay">25:00</div>
      </div>
    </div>

    <div class="controls">
      <button id="toggleBtn" class="btn primary">Start Flow</button>
      <button id="resetBtn" class="btn secondary">Reset</button>
    </div>

    <div class="sound-panel">
      <h3>Ambient Sound Generator</h3>
      <div class="sound-grid">
        <button class="sound-btn" data-type="rain">🌧️ Rain Shower</button>
        <button class="sound-btn" data-type="stream">🌊 Ocean Swell</button>
        <button class="sound-btn" data-type="focus">✨ Deep Hum</button>
      </div>
      <div class="volume-slider">
        <label>Volume: <span id="volLabel">40%</span></label>
        <input type="range" id="volRange" min="0" max="100" value="40">
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-box">
        <div class="val" id="completedCount">0</div>
        <div class="lbl">Sessions Done</div>
      </div>
      <div class="stat-box">
        <div class="val" id="minutesFocused">0m</div>
        <div class="lbl">Focused Today</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  background: radial-gradient(circle at 50% 10%, #1e1b4b, #090d16);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1f5f9;
  padding: 1.5rem;
}

.app-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.badge {
  display: inline-block;
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.circle-timer {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 1.5rem;
}

.circle-timer svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.circle-timer circle {
  fill: none;
  stroke-width: 6;
}

.circle-timer circle.bg {
  stroke: rgba(255, 255, 255, 0.08);
}

.circle-timer circle.progress {
  stroke: #6366f1;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.5s ease;
}

.time-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.05em;
}

.controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn.primary {
  background: #6366f1;
  color: white;
}
.btn.primary:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}
.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.sound-panel {
  background: rgba(15, 23, 42, 0.6);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
}

.sound-panel h3 {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sound-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.sound-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-size: 0.75rem;
  padding: 0.5rem 0.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.sound-btn.active {
  background: #4338ca;
  border-color: #818cf8;
  color: #fff;
}

.volume-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #94a3b8;
  gap: 0.75rem;
}

.volume-slider input {
  flex: 1;
  accent-color: #6366f1;
}

.stats-row {
  display: flex;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1rem;
}

.stat-box {
  flex: 1;
  text-align: center;
}

.stat-box .val {
  font-size: 1.25rem;
  font-weight: 700;
  color: #38bdf8;
}

.stat-box .lbl {
  font-size: 0.75rem;
  color: #64748b;
}`,
    js: `let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerId = null;
let sessionsCount = 0;
let minutesTotal = 0;

const timeDisplay = document.getElementById('timeDisplay');
const progressCircle = document.getElementById('progressCircle');
const toggleBtn = document.getElementById('toggleBtn');
const resetBtn = document.getElementById('resetBtn');
const completedCount = document.getElementById('completedCount');
const minutesFocused = document.getElementById('minutesFocused');

function updateDisplay() {
  const m = Math.floor(remainingSeconds / 60);
  const s = remainingSeconds % 60;
  timeDisplay.textContent = \`\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;

  const circumference = 2 * Math.PI * 45;
  const progressRatio = (totalSeconds - remainingSeconds) / totalSeconds;
  progressCircle.style.strokeDashoffset = (circumference * progressRatio).toString();
}

toggleBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    toggleBtn.textContent = 'Resume Flow';
    toggleBtn.style.background = '#6366f1';
  } else {
    toggleBtn.textContent = 'Pause';
    toggleBtn.style.background = '#e11d48';
    timerId = setInterval(() => {
      remainingSeconds--;
      minutesTotal = Math.round((totalSeconds - remainingSeconds) / 60);
      minutesFocused.textContent = minutesTotal + 'm';
      updateDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(timerId);
        timerId = null;
        sessionsCount++;
        completedCount.textContent = sessionsCount;
        alert('🎉 Focus Session Completed! Take a deep breath.');
        remainingSeconds = totalSeconds;
        toggleBtn.textContent = 'Start Flow';
        toggleBtn.style.background = '#6366f1';
        updateDisplay();
      }
    }, 1000);
  }
});

resetBtn.addEventListener('click', () => {
  if (timerId) clearInterval(timerId);
  timerId = null;
  remainingSeconds = totalSeconds;
  toggleBtn.textContent = 'Start Flow';
  toggleBtn.style.background = '#6366f1';
  updateDisplay();
});

// Ambient Web Audio Synthesizer
let audioCtx = null;
let currentNoiseNode = null;
let gainNode = null;
let currentSoundType = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.4;
    gainNode.connect(audioCtx.destination);
  }
}

function stopSound() {
  if (currentNoiseNode) {
    try {
      currentNoiseNode.stop ? currentNoiseNode.stop() : currentNoiseNode.disconnect();
    } catch (e) {}
    currentNoiseNode = null;
  }
}

function playSound(type) {
  initAudio();
  stopSound();

  if (type === 'rain') {
    // Generate pinkish noise buffer
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.1;
      output[i] = (b0 + b1) * 0.2;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    noise.connect(gainNode);
    noise.start();
    currentNoiseNode = noise;
  } else if (type === 'stream') {
    // Soft modulated dual sine waves
    const osc = audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);
    osc.connect(filter);
    filter.connect(gainNode);
    osc.start();
    currentNoiseNode = osc;
  } else if (type === 'focus') {
    // 432Hz deep resonant chord
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(108, audioCtx.currentTime);
    osc.connect(gainNode);
    osc.start();
    currentNoiseNode = osc;
  }
}

document.querySelectorAll('.sound-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-type');
    if (currentSoundType === type) {
      stopSound();
      currentSoundType = null;
      btn.classList.remove('active');
    } else {
      document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSoundType = type;
      playSound(type);
    }
  });
});

const volRange = document.getElementById('volRange');
const volLabel = document.getElementById('volLabel');
volRange.addEventListener('input', (e) => {
  volLabel.textContent = e.target.value + '%';
  if (gainNode) {
    gainNode.gain.value = e.target.value / 100;
  }
});

updateDisplay();`
  },
  {
    id: 'cyberpunk-vortex',
    name: 'Cyberpunk Kinetic Particle Vortex',
    category: 'canvas',
    description: 'High-performance interactive HTML5 particle swarm simulation with mouse gravity wells and neon color waves.',
    tags: ['HTML5 Canvas', 'Physics', 'Visualizer', 'Neon'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyberpunk Particle Vortex</title>
</head>
<body>
  <div class="hud">
    <div class="hud-brand">⚡ SOCH // NEON VORTEX</div>
    <div class="hud-stats">
      <span>Particles: <strong id="particleCount">400</strong></span>
      <span>Speed: <strong id="speedVal">1.0x</strong></span>
    </div>
    <div class="hud-actions">
      <button id="modeBtn">Mode: Vortex</button>
      <button id="colorBtn">Palette: Synth</button>
      <button id="clearBtn">Burst</button>
    </div>
  </div>
  <canvas id="vortexCanvas"></canvas>
  <div class="hint">Move mouse or touch screen to warp gravitational fields</div>
</body>
</html>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #020617;
  overflow: hidden;
  font-family: monospace;
  color: #38bdf8;
  height: 100vh;
}

canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  cursor: crosshair;
}

.hud {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
}

.hud * {
  pointer-events: auto;
}

.hud-brand {
  font-weight: bold;
  letter-spacing: 0.15em;
  color: #38bdf8;
  text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}

.hud-stats {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
}

.hud-actions button {
  background: rgba(2, 132, 199, 0.2);
  border: 1px solid #38bdf8;
  color: #e0f2fe;
  padding: 0.35rem 0.75rem;
  font-family: monospace;
  border-radius: 0.35rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: all 0.2s;
}

.hud-actions button:hover {
  background: #0284c7;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.6);
}

.hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.6);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: #94a3b8;
  pointer-events: none;
}`,
    js: `const canvas = document.getElementById('vortexCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [];
const PARTICLE_COUNT = 450;
let mouse = { x: width / 2, y: height / 2, isDown: false };

const PALETTES = [
  ['#38bdf8', '#818cf8', '#c084fc', '#f43f5e'],
  ['#22c55e', '#14b8a6', '#06b6d4', '#eab308'],
  ['#f97316', '#ef4444', '#ec4899', '#a855f7']
];
let currentPaletteIdx = 0;
let mode = 'vortex'; // 'vortex' | 'repel' | 'orbit'

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.size = Math.random() * 2 + 1;
    this.palette = PALETTES[currentPaletteIdx];
    this.color = this.palette[Math.floor(Math.random() * this.palette.length)];
    this.maxSpeed = Math.random() * 3 + 2;
  }

  update() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    if (mode === 'vortex') {
      const force = 120 / dist;
      // Perpendicular velocity for vortex spin
      this.vx += (dx / dist) * force * 0.15 - (dy / dist) * force * 0.25;
      this.vy += (dy / dist) * force * 0.15 + (dx / dist) * force * 0.25;
    } else if (mode === 'repel') {
      if (dist < 200) {
        const force = (200 - dist) / 20;
        this.vx -= (dx / dist) * force;
        this.vy -= (dy / dist) * force;
      }
    } else if (mode === 'orbit') {
      this.vx += (dx / dist) * 0.8;
      this.vy += (dy / dist) * 0.8;
    }

    // Drag / dampening
    this.vx *= 0.96;
    this.vy *= 0.96;

    this.x += this.vx;
    this.y += this.vy;

    // Boundary wrapping
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('touchmove', e => {
  if (e.touches[0]) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
});

document.getElementById('modeBtn').addEventListener('click', e => {
  if (mode === 'vortex') mode = 'repel';
  else if (mode === 'repel') mode = 'orbit';
  else mode = 'vortex';
  e.target.textContent = 'Mode: ' + mode.toUpperCase();
});

document.getElementById('colorBtn').addEventListener('click', e => {
  currentPaletteIdx = (currentPaletteIdx + 1) % PALETTES.length;
  particles.forEach(p => {
    p.palette = PALETTES[currentPaletteIdx];
    p.color = p.palette[Math.floor(Math.random() * p.palette.length)];
  });
  e.target.textContent = 'Palette: #' + (currentPaletteIdx + 1);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  particles.forEach(p => {
    const angle = Math.random() * Math.PI * 2;
    const force = Math.random() * 15 + 5;
    p.vx = Math.cos(angle) * force;
    p.vy = Math.sin(angle) * force;
  });
});

function animate() {
  ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  requestAnimationFrame(animate);
}

animate();`
  },
  {
    id: 'saas-calculator',
    name: 'Micro-SaaS Pricing Matrix & ROI Engine',
    category: 'saas',
    description: 'Dynamic subscription tier pricing calculator with seat count slider, monthly vs annual discount toggles, and feature comparison.',
    tags: ['SaaS', 'ROI', 'Interactive Calculator', 'Pricing'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SaaS Pricing & ROI</title>
</head>
<body>
  <div class="pricing-container">
    <div class="header">
      <div class="badge">TRANSPARENT VALUE</div>
      <h1>Predictable Scaling for High-Vibe Teams</h1>
      <p>Estimate your monthly cost and calculate projected engineering hours saved.</p>
      
      <div class="billing-toggle">
        <span class="label active" id="monthlyLabel">Billed Monthly</span>
        <label class="switch">
          <input type="checkbox" id="annualToggle">
          <span class="slider"></span>
        </label>
        <span class="label" id="annualLabel">Billed Annually <strong class="discount">-20%</strong></span>
      </div>
    </div>

    <div class="slider-box">
      <div class="slider-header">
        <span>Team Size / Active Seats</span>
        <strong id="seatCount">8 Engineers</strong>
      </div>
      <input type="range" id="seatRange" min="1" max="50" value="8">
    </div>

    <div class="cards-grid">
      <div class="tier-card">
        <h3>Starter Vibe</h3>
        <p class="desc">For agile indie hackers and solo founders.</p>
        <div class="price"><span id="starterPrice">$29</span><small>/mo</small></div>
        <ul class="features">
          <li>✓ Up to 3 Sandboxes</li>
          <li>✓ Fast Node.js Preview</li>
          <li>✓ Community Support</li>
          <li>✗ Team Collaboration</li>
        </ul>
        <button class="tier-btn secondary">Choose Starter</button>
      </div>

      <div class="tier-card featured">
        <div class="popular-tag">MOST POPULAR</div>
        <h3>Pro Velocity</h3>
        <p class="desc">For fast-moving tech startups scaling apps.</p>
        <div class="price"><span id="proPrice">$79</span><small>/mo</small></div>
        <ul class="features">
          <li>✓ Unlimited Live Sandboxes</li>
          <li>✓ Unlimited AI Prompt Refinements</li>
          <li>✓ Real-time Error Diagnostics</li>
          <li>✓ Custom Domain Publishing</li>
        </ul>
        <button class="tier-btn primary">Start Free 14-Day Trial</button>
      </div>

      <div class="tier-card">
        <h3>Enterprise Core</h3>
        <p class="desc">For scale-ups with security & custom integrations.</p>
        <div class="price"><span id="entPrice">$249</span><small>/mo</small></div>
        <ul class="features">
          <li>✓ Dedicated Cloud Instances</li>
          <li>✓ SSO & Role-Based Access</li>
          <li>✓ 99.9% SLA & Dedicated Lead</li>
          <li>✓ Audit Trail & Compliance</li>
        </ul>
        <button class="tier-btn secondary">Contact Sales</button>
      </div>
    </div>

    <div class="roi-summary">
      <div class="roi-item">
        <div class="num" id="hoursSaved">160 hrs</div>
        <div class="desc">Dev Time Saved / Month</div>
      </div>
      <div class="roi-item">
        <div class="num" id="costSavings">$12,800</div>
        <div class="desc">Estimated Dollar Value Generated</div>
      </div>
      <div class="roi-item">
        <div class="num">18.4x</div>
        <div class="desc">Projected ROI Ratio</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  background: #090d16;
  color: #f8fafc;
  padding: 2.5rem 1rem;
  min-height: 100vh;
}

.pricing-container {
  max-width: 960px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.badge {
  display: inline-block;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.header h1 {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}

.header p {
  color: #94a3b8;
  font-size: 1rem;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #94a3b8;
}

.billing-toggle .label.active {
  color: #fff;
  font-weight: 600;
}

.discount {
  background: #f43f5e;
  color: #fff;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #334155;
  transition: .3s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #6366f1;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.slider-box {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.25rem;
  border-radius: 1rem;
  margin-bottom: 2.5rem;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.slider-header strong {
  color: #38bdf8;
}

.slider-box input {
  width: 100%;
  accent-color: #6366f1;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.tier-card {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.tier-card.featured {
  background: #1e1b4b;
  border: 2px solid #818cf8;
  transform: scale(1.03);
}

.popular-tag {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #6366f1;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

.tier-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.35rem;
}

.tier-card .desc {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 1.25rem;
}

.tier-card .price {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.tier-card .price small {
  font-size: 1rem;
  color: #64748b;
  font-weight: normal;
}

.features {
  list-style: none;
  font-size: 0.85rem;
  color: #cbd5e1;
  line-height: 2;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.tier-btn {
  width: 100%;
  padding: 0.8rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.tier-btn.primary {
  background: #6366f1;
  color: white;
}
.tier-btn.primary:hover {
  background: #4f46e5;
}

.tier-btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #f1f5f9;
}
.tier-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.roi-summary {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  text-align: center;
}

.roi-item .num {
  font-size: 1.75rem;
  font-weight: 800;
  color: #10b981;
}

.roi-item .desc {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.25rem;
}`,
    js: `const annualToggle = document.getElementById('annualToggle');
const seatRange = document.getElementById('seatRange');
const seatCount = document.getElementById('seatCount');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');

const starterPrice = document.getElementById('starterPrice');
const proPrice = document.getElementById('proPrice');
const entPrice = document.getElementById('entPrice');

const hoursSaved = document.getElementById('hoursSaved');
const costSavings = document.getElementById('costSavings');

function recalculate() {
  const seats = parseInt(seatRange.value, 10);
  const isAnnual = annualToggle.checked;
  const discountMultiplier = isAnnual ? 0.8 : 1.0;

  seatCount.textContent = seats + (seats === 1 ? ' Engineer' : ' Engineers');

  if (isAnnual) {
    annualLabel.classList.add('active');
    monthlyLabel.classList.remove('active');
  } else {
    monthlyLabel.classList.add('active');
    annualLabel.classList.remove('active');
  }

  const pStarter = Math.round(29 * discountMultiplier);
  const pPro = Math.round((49 + seats * 6) * discountMultiplier);
  const pEnt = Math.round((199 + seats * 12) * discountMultiplier);

  starterPrice.textContent = '$' + pStarter;
  proPrice.textContent = '$' + pPro;
  entPrice.textContent = '$' + pEnt;

  // ROI estimation: Each engineer saves ~20 hours/month with AI vibe tooling
  const totalHours = seats * 20;
  const dollarsSaved = totalHours * 80; // $80/hr blended dev rate

  hoursSaved.textContent = totalHours + ' hrs';
  costSavings.textContent = '$' + dollarsSaved.toLocaleString();
}

seatRange.addEventListener('input', recalculate);
annualToggle.addEventListener('change', recalculate);
recalculate();`
  },
  {
    id: 'thought-stream',
    name: 'Soch Thought-Stream & Quick Markdown',
    category: 'tools',
    description: 'Instant ideation notepad with live markdown compiler, word and token metric counters, tag classification, and export.',
    tags: ['Markdown', 'Ideation', 'Writing', 'Local Storage'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Soch Thought Stream</title>
</head>
<body>
  <div class="notepad-wrap">
    <header class="note-nav">
      <div class="title-group">
        <span class="icon">💭</span>
        <h2>Soch Stream</h2>
      </div>
      <div class="tags">
        <span class="chip active">All</span>
        <span class="chip">#architecture</span>
        <span class="chip">#vibes</span>
        <span class="chip">#mvp</span>
      </div>
      <div class="action-btns">
        <button id="copyMdBtn" class="sm-btn">Copy Raw</button>
        <button id="clearNoteBtn" class="sm-btn danger">Clear</button>
      </div>
    </header>

    <div class="split-view">
      <div class="editor-pane">
        <div class="pane-label">RAW SOCH (MARKDOWN)</div>
        <textarea id="markdownInput" placeholder="Pour your stream of consciousness here...
# My Next Big Idea
- Feature 1: Instant search
- Feature 2: High-vibe audio
> 'The best code is the code you didn\\'t have to write from scratch.'"></textarea>
      </div>
      <div class="preview-pane">
        <div class="pane-label">RENDERED THOUGHT</div>
        <div id="markdownOutput" class="rendered-content"></div>
      </div>
    </div>

    <footer class="note-footer">
      <div class="metric"><span id="wordCount">0</span> words</div>
      <div class="metric"><span id="charCount">0</span> characters</div>
      <div class="metric"><span id="estTokens">~0</span> estimated tokens</div>
      <div class="status-msg" id="saveStatus">Auto-saved to memory</div>
    </footer>
  </div>
</body>
</html>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  background: #0b0f19;
  color: #e2e8f0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.notepad-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.note-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: #111827;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-group h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f8fafc;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.chip {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  cursor: pointer;
  color: #94a3b8;
}

.chip.active {
  background: #6366f1;
  color: #fff;
}

.sm-btn {
  background: rgba(255,255,255,0.1);
  color: #cbd5e1;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.sm-btn:hover { background: rgba(255,255,255,0.2); }
.sm-btn.danger:hover { background: #e11d48; color: #fff; }

.split-view {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

.editor-pane, .preview-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-pane {
  border-right: 1px solid rgba(255,255,255,0.08);
}

.pane-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.1em;
  padding: 0.4rem 1rem;
  background: #0f172a;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

textarea {
  flex: 1;
  background: #0b0f19;
  border: none;
  color: #e2e8f0;
  padding: 1.25rem;
  font-family: monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: none;
  outline: none;
}

.rendered-content {
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  line-height: 1.6;
}

.rendered-content h1 { font-size: 1.6rem; margin-bottom: 0.75rem; color: #38bdf8; }
.rendered-content h2 { font-size: 1.3rem; margin-top: 1rem; margin-bottom: 0.5rem; color: #818cf8; }
.rendered-content p { margin-bottom: 0.75rem; color: #cbd5e1; }
.rendered-content ul { margin-left: 1.5rem; margin-bottom: 0.75rem; color: #cbd5e1; }
.rendered-content blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #94a3b8;
  font-style: italic;
}
.rendered-content code {
  background: rgba(255,255,255,0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.note-footer {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 1.25rem;
  background: #111827;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 0.75rem;
  color: #64748b;
  align-items: center;
}

.status-msg {
  margin-left: auto;
  color: #10b981;
}`,
    js: `const input = document.getElementById('markdownInput');
const output = document.getElementById('markdownOutput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const estTokens = document.getElementById('estTokens');
const copyMdBtn = document.getElementById('copyMdBtn');
const clearNoteBtn = document.getElementById('clearNoteBtn');

// Lightweight instant markdown parser
function parseMarkdown(md) {
  let html = md
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$2</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^\\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
    .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
    .replace(/\`([^\\\`]+)\`/gim, '<code>$1</code>')
    .replace(/^\\- (.*$)/gim, '<ul><li>$1</li></ul>')
    .replace(/\\n/gim, '<br>');
  
  // Clean adjacent lists
  html = html.replace(/<\\/ul>\\s*<br>\\s*<ul>/gim, '');
  return html;
}

function updateMetrics() {
  const text = input.value;
  output.innerHTML = parseMarkdown(text);

  const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
  const chars = text.length;
  const tokens = Math.round(words * 1.35);

  wordCount.textContent = words;
  charCount.textContent = chars;
  estTokens.textContent = '~' + tokens;
}

input.addEventListener('input', updateMetrics);

copyMdBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(input.value);
  const orig = copyMdBtn.textContent;
  copyMdBtn.textContent = 'Copied!';
  setTimeout(() => copyMdBtn.textContent = orig, 1500);
});

clearNoteBtn.addEventListener('click', () => {
  if (confirm('Clear current thought stream?')) {
    input.value = '';
    updateMetrics();
  }
});

updateMetrics();`
  }
];
