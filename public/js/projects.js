/**
 * PROJECTS: BENTO GRID FILTERING, 3D TILT & INTERACTIVE PLAYGROUND DEMOS
 * Chamathka Layangi - Portfolio
 */

(function () {
  // 1. PROJECT CATEGORY FILTERING
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.bento-card');

    window.filterProjectsByCategory = function (category) {
      filterBtns.forEach((btn) => {
        if (btn.getAttribute('data-filter') === category) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        window.filterProjectsByCategory(cat);
      });
    });
  }

  // 2. CARD SPOTLIGHT INTERACTION (CSS manages the smooth translateY(-6px) lift)
  function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Dynamic coordinate update for radial neon spotlight
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  }

  // 3. TERRAPULSE LIVE TELEMETRY SIMULATOR
  function initTerraPulseTelemetry() {
    const canvas = document.getElementById('telemetryCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const tempValEl = document.getElementById('telemetryTemp');
    const humValEl = document.getElementById('telemetryHum');
    const aqiValEl = document.getElementById('telemetryAqi');
    const pressValEl = document.getElementById('telemetryPress');
    const simToggleBtn = document.getElementById('simToggleBtn');
    const statusPill = document.getElementById('telemetryStatus');

    let isStreaming = true;
    let dataPoints = [26, 26.5, 27.2, 28.0, 27.8, 28.4, 29.1, 28.8, 28.4];
    let step = 0;

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height || 90;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawWave() {
      if (!ctx || !canvas.width) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let y = 15; y < h; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw gradient telemetry line
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, '#0066FF');
      gradient.addColorStop(0.5, '#00F0FF');
      gradient.addColorStop(1, '#10B981');

      ctx.beginPath();
      const pointSpacing = w / (dataPoints.length - 1);

      dataPoints.forEach((val, i) => {
        // Map 24 - 32 C to canvas height
        const normalizedY = h - ((val - 23) / 10) * h;
        if (i === 0) {
          ctx.moveTo(0, normalizedY);
        } else {
          const prevX = (i - 1) * pointSpacing;
          const prevY = h - ((dataPoints[i - 1] - 23) / 10) * h;
          const cpX = (prevX + i * pointSpacing) / 2;
          ctx.bezierCurveTo(cpX, prevY, cpX, normalizedY, i * pointSpacing, normalizedY);
        }
      });

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw pulsing node at latest point
      const lastX = w;
      const lastY = h - ((dataPoints[dataPoints.length - 1] - 23) / 10) * h;

      ctx.fillStyle = '#00F0FF';
      ctx.beginPath();
      ctx.arc(lastX - 4, lastY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    function updateTelemetry() {
      if (!isStreaming) return;

      step++;
      // Generate slight natural fluctuation
      const baseTemp = 28.0;
      const currentTemp = (baseTemp + Math.sin(step * 0.4) * 1.6 + (Math.random() - 0.5) * 0.4).toFixed(1);
      const currentHum = (67 + Math.cos(step * 0.3) * 3 + (Math.random() - 0.5) * 1.5).toFixed(1);
      const currentAqi = Math.round(40 + Math.sin(step * 0.2) * 5 + Math.random() * 3);
      const currentPress = (1013.2 + Math.sin(step * 0.1) * 0.8).toFixed(1);

      if (tempValEl) tempValEl.textContent = `${currentTemp} °C`;
      if (humValEl) humValEl.textContent = `${currentHum} %`;
      if (aqiValEl) aqiValEl.textContent = `${currentAqi} AQI`;
      if (pressValEl) pressValEl.textContent = `${currentPress} hPa`;

      dataPoints.shift();
      dataPoints.push(parseFloat(currentTemp));
      drawWave();
    }

    drawWave();
    const intervalId = setInterval(updateTelemetry, 1500);

    if (simToggleBtn) {
      simToggleBtn.addEventListener('click', () => {
        isStreaming = !isStreaming;
        if (isStreaming) {
          simToggleBtn.textContent = 'Pause Stream';
          if (statusPill) {
            statusPill.innerHTML = '<span class="status-dot"></span> LIVE';
            statusPill.style.color = '#10B981';
          }
          if (window.showToast) window.showToast('TerraPulse: Telemetry stream resumed');
        } else {
          simToggleBtn.textContent = 'Resume Stream';
          if (statusPill) {
            statusPill.innerHTML = '● PAUSED';
            statusPill.style.color = '#F59E0B';
          }
          if (window.showToast) window.showToast('TerraPulse: Telemetry stream paused');
        }
      });
    }
  }

  // 4. ACADEMIC TASK MANAGER MINI-DEMO
  function initTaskManagerDemo() {
    const listEl = document.getElementById('taskMiniList');
    const inputEl = document.getElementById('taskMiniInput');
    const addBtn = document.getElementById('taskAddBtn');

    if (!listEl) return;

    // Toggle complete
    listEl.addEventListener('click', (e) => {
      const item = e.target.closest('.task-mini-item');
      if (item) {
        item.classList.toggle('done');
        const isDone = item.classList.contains('done');
        const checkIcon = item.querySelector('.task-checkbox');
        if (checkIcon) {
          checkIcon.textContent = isDone ? '✓' : '';
        }
      }
    });

    // Add task
    function addTask() {
      if (!inputEl) return;
      const text = inputEl.value.trim();
      if (!text) return;

      const newItem = document.createElement('div');
      newItem.className = 'task-mini-item';
      newItem.innerHTML = `
        <div class="task-check-left">
          <div class="task-checkbox"></div>
          <span class="task-text">${escapeHtml(text)}</span>
        </div>
        <span class="task-badge-tag">NEW TASK</span>
      `;

      listEl.prepend(newItem);
      inputEl.value = '';

      if (window.rebindCursorTriggers) window.rebindCursorTriggers();
      if (window.showToast) window.showToast(`Task added: "${text}"`);
    }

    if (addBtn) addBtn.addEventListener('click', addTask);
    if (inputEl) {
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
      });
    }
  }

  // 5. JAVA TERMINAL SIMULATOR
  function initJavaTerminalSimulator() {
    const termBody = document.getElementById('terminalSimBody');
    const termInput = document.getElementById('termTextInput');
    const actionBtns = document.querySelectorAll('.term-btn');

    if (!termBody) return;

    function appendOutput(lines, type = 'output') {
      lines.forEach((line) => {
        const p = document.createElement('div');
        p.className = `term-line-output ${type ? 'term-line-' + type : ''}`;
        p.textContent = line;
        termBody.appendChild(p);
      });
      termBody.scrollTop = termBody.scrollHeight;
    }

    function processCommand(rawCmd) {
      const cmd = rawCmd.trim().toLowerCase();
      appendOutput([`chamathka@sliit:~$ ${rawCmd}`], 'prompt');

      if (!cmd) return;

      switch (cmd) {
        case 'help':
          appendOutput([
            'Available Console Commands:',
            '  list       - Display books & entities in library catalog',
            '  borrow 101 - Borrow "Effective Java 3rd Edition" (ID 101)',
            '  return 101 - Return entity and recalculate overdue fees',
            '  stats      - Show OOP system memory & active transactions',
            '  about      - Display Chamathka Layangi academic specs',
            '  clear      - Clear the console output'
          ], 'cyan');
          break;

        case 'list':
          appendOutput([
            '[CATALOG] 1,420 Items indexed in memory (Polymorphic Media):',
            '  ID: 101 | "Effective Java" - Joshua Bloch [AVAILABLE]',
            '  ID: 102 | "Computer Networking: Top-Down" - Kurose [BORROWED]',
            '  ID: 103 | "Clean Code: Agile Craftsmanship" - R. Martin [AVAILABLE]',
            '  ID: 104 | "ESP32 IoT Architecture Handbook" [AVAILABLE]'
          ], 'output');
          break;

        case 'borrow 101':
        case 'borrow':
          appendOutput([
            '>>> Executing LoanTransactionHandler.borrowItem(userId: 202611, itemId: 101)...',
            '>>> Checking membership quota ... OK (Active SLIIT student)',
            '>>> [SUCCESS] Book "Effective Java" borrowed. Due Date: +14 Days.',
            '>>> Audit log saved to /data/audit_logs/tx_99812.dat'
          ], 'success');
          break;

        case 'return 101':
        case 'return':
          appendOutput([
            '>>> Executing LoanTransactionHandler.returnItem(itemId: 101)...',
            '>>> Calculating overdue penalties: $0.00 (On-time return)',
            '>>> [SUCCESS] Inventory status updated to AVAILABLE. Shelf: CS-B04.'
          ], 'success');
          break;

        case 'stats':
          appendOutput([
            '[SYSTEM METRICS]',
            '  Java Runtime : OpenJDK 21 (LTS) HotSpot 64-Bit',
            '  OOP Pattern  : Singleton Factory + Polymorphic Interfaces',
            '  Active Txns  : 34 concurrent student loans',
            '  Memory Heap  : 42.8 MB / 512.0 MB allocated'
          ], 'cyan');
          break;

        case 'about':
          appendOutput([
            'Developer : Chamathka Layangi',
            'Role      : First-Year Computing Undergraduate @ SLIIT',
            'Expertise : Java OOP, Circuit Prototyping, IoT Systems (ESP32)',
            'Status    : Top 3 Award Winner (TerraPulse Weather Station)'
          ], 'success');
          break;

        case 'clear':
        case 'cls':
          termBody.innerHTML = '';
          appendOutput(['Terminal cleared. Type "help" for command list.'], 'cyan');
          break;

        default:
          appendOutput([
            `Command not recognized: "${rawCmd}". Type "help" to see valid commands.`
          ], 'warning');
          break;
      }
    }

    if (termInput) {
      termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = termInput.value;
          termInput.value = '';
          processCommand(val);
        }
      });
    }

    actionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) processCommand(cmd);
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    init3DTilt();
    initTerraPulseTelemetry();
    initTaskManagerDemo();
    initJavaTerminalSimulator();
  });
})();
