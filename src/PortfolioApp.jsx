import React, { useState, useEffect, useRef } from 'react';
import './PortfolioApp.css';

/**
 * Chamathka Layangi - Developer Portfolio (React Component)
 * First-Year Computing Undergraduate at SLIIT
 */
export default function PortfolioApp() {
  const [theme, setTheme] = useState('dark');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSkillTab, setActiveSkillTab] = useState('all');
  const [telemetryRunning, setTelemetryRunning] = useState(true);
  const [telemetryData, setTelemetryData] = useState({
    temp: 28.4,
    hum: 67.8,
    aqi: 42,
    press: 1013.2
  });

  // Typing Effect
  const phrases = [
    'First-Year Computing Undergraduate at SLIIT',
    'IoT Enthusiast & Hardware Prototyper',
    'Java OOP Developer & Systems Explorer',
    'Top 3 Award Winner — TerraPulse Project'
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timer;

    if (!isDeleting && displayedText === current) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    } else {
      const speed = isDeleting ? 40 : 90;
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIdx]);

  // Telemetry Simulation Loop
  useEffect(() => {
    if (!telemetryRunning) return;
    const interval = setInterval(() => {
      setTelemetryData((prev) => ({
        temp: (28.0 + (Math.random() - 0.5) * 1.5).toFixed(1),
        hum: (67.5 + (Math.random() - 0.5) * 2.0).toFixed(1),
        aqi: Math.round(41 + Math.random() * 4),
        press: (1013.2 + (Math.random() - 0.5) * 0.6).toFixed(1)
      }));
    }, 1800);
    return () => clearInterval(interval);
  }, [telemetryRunning]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <div className={`portfolio-app-root ${theme === 'light' ? 'light-mode' : ''}`}>
      {/* Ambient Lighting Orbs */}
      <div className="cyber-bg-glow">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      {/* Floating Navbar Dock */}
      <header className="navbar-dock">
        <nav className="navbar-inner glass-dock">
          <a href="#home" className="nav-brand">
            <div className="brand-badge">CL</div>
            <span className="brand-name">Chamathka Layangi</span>
          </a>

          <ul className="nav-links">
            <li><a href="#home" className="nav-link active">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#education" className="nav-link">Education</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          <div className="nav-utilities">
            <button className="cmd-palette-trigger" onClick={() => setCmdOpen(true)}>
              <span>Search</span>
              <span className="kbd-shortcut">Ctrl K</span>
            </button>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content-column">
              <div className="hero-status-badge">
                <span className="status-dot"></span>
                <span>SLIIT Undergraduate • Available for Collaborations</span>
              </div>
              <h1 className="hero-main-heading">
                Hi, I'm <span className="gradient-text">Chamathka Layangi</span>
              </h1>
              <div className="hero-typing-wrapper">
                <h2 className="hero-subheading">
                  <span className="typing-text">{displayedText}</span>
                  <span className="typing-cursor"></span>
                </h2>
              </div>
              <p className="hero-bio">
                Passionate about bridging software logic with real-world physical systems. I love turning creative ideas into functional web apps and smart IoT solutions.
              </p>
              <div className="hero-cta-group">
                <a href="#projects" className="btn btn-primary">View Projects →</a>
                <a href="#contact" className="btn btn-secondary">Let's Connect</a>
              </div>
            </div>

            <div className="hero-avatar-column">
              <div className="avatar-halo-wrapper">
                <div className="animated-gradient-ring"></div>
                <div className="avatar-inner-frame">
                  <img
                    src="YOUR_PROFILE_IMAGE_URL"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/avatar-placeholder.svg'; }}
                    alt="Chamathka Layangi Profile"
                    className="profile-avatar-img"
                  />
                </div>
                <div className="floating-chip chip-1">⚡ ESP32 Prototyping</div>
                <div className="floating-chip chip-2">☕ Java OOP</div>
                <div className="floating-chip chip-3">🏆 Top 3 TerraPulse</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TerraPulse Live Telemetry Preview in Projects */}
      <section className="projects-section" id="projects">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Portfolio Showcase</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>

          <div className="telemetry-widget-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="telemetry-header">
              <div className="telemetry-title">
                <span>📡</span>
                <span>TERRAPULSE LIVE ESP32 TELEMETRY PREVIEW</span>
              </div>
              <button className="telemetry-sim-btn" onClick={() => setTelemetryRunning(!telemetryRunning)}>
                {telemetryRunning ? 'Pause Stream' : 'Resume Stream'}
              </button>
            </div>
            <div className="telemetry-metrics-grid">
              <div className="telemetry-metric-tile">
                <span className="metric-label">TEMP</span>
                <span className="metric-value">{telemetryData.temp} °C</span>
              </div>
              <div className="telemetry-metric-tile">
                <span className="metric-label">HUMIDITY</span>
                <span className="metric-value">{telemetryData.hum} %</span>
              </div>
              <div className="telemetry-metric-tile">
                <span className="metric-label">AIR QUALITY</span>
                <span className="metric-value">{telemetryData.aqi} AQI</span>
              </div>
              <div className="telemetry-metric-tile">
                <span className="metric-label">PRESSURE</span>
                <span className="metric-value">{telemetryData.press} hPa</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
