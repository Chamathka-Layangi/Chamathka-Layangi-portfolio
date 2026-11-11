# ⚡ Chamathka Layangi — Developer & IoT Portfolio

A futuristic, high-performance developer portfolio website designed for **Chamathka Layangi** (First-Year Computing Undergraduate at SLIIT). Built with a Dark Navy & Electric Blue Cyber Glassmorphism design system, responsive layout across Desktop, Tablet, and Mobile screens, and smooth interactive features.

---

## 🌟 Live Demo & Quick Launch

You do **NOT** need any complex build tools to view or use this portfolio. 

- **Option A (Instant Preview):** Double-click [`index.html`](./index.html) to open it right away in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
- **Option B (VS Code Live Server):** Right-click [`index.html`](./index.html) in VS Code and select **"Open with Live Server"**.
- **Option C (Netlify Deployment):** Drag and drop this project folder directly onto [Netlify Drop](https://app.netlify.com/drop) or link your GitHub repo. Pre-configured with [`netlify.toml`](./netlify.toml) and [`_redirects`](./_redirects) for caching headers, SPA routing, and native Netlify Form submissions!
- **Option D (GitHub Pages):** Push this repository to GitHub, go to **Settings > Pages > Branch: `main` / root > Save**, and your portfolio is live worldwide!

---

## 🎨 Design System & Specifications

- **Primary Theme:** Dark Navy (`#0B0F19` / `#0D1322`) background with Off-White (`#F8FAFC`) typography.
- **Accent Color:** Electric Blue / Cyan (`#00F0FF` / `#0066FF`) for glowing highlights, borders, and CTA buttons.
- **Secondary Elements:** Frosted Glass (Glassmorphism 2.0 with CSS `backdrop-filter: blur(16px)`), rounded corners (`16px` to `24px`), and thin light borders (`1px solid rgba(255, 255, 255, 0.08)`).
- **Typography:** `Plus Jakarta Sans` / `Inter` & `JetBrains Mono` for developer accents.

---

## 🚀 Key Interactive Features

1. **Command Palette (`Ctrl + K` / `Cmd + K`):**
   - Modal search bar to jump instantly to sections (Home, About, Skills, Projects, Education, Contact).
   - Fast project category filtering (`IoT`, `Web`, `Java`, `All`).
   - Quick theme toggle, email copy, and social links with full arrow-key and enter-key navigation.

2. **Soft Ambient Background Cursor Glow:**
   - Standard browser mouse pointer remains clean and fully visible.
   - A subtle, translucent electric blue radial gradient light smoothly follows behind mouse movements across the dark background.
   - Automatically disabled on touch screens for seamless mobile UX.

3. **Dark / Light Mode Toggle:**
   - Smooth theme switcher located in both the floating Navbar dock and the Command Palette.
   - Saves your theme preference in browser `localStorage`.

4. **Typing Animation in Hero:**
   - Smooth auto-typing job titles: *"First-Year Computing Undergraduate at SLIIT"*, *"IoT Enthusiast & Hardware Prototyper"*, *"Java OOP Developer & Systems Explorer"*.

5. **Smooth Section Card Lift & Neon Glow:**
   - When hovering over any section card, it smoothly elevates (`translateY(-6px)`) with a subtle glowing neon border and expanded drop shadow.
   - Interactive radial spotlight reflection follows the cursor across card surfaces.

6. **Interactive Project Playgrounds:**
   - **TerraPulse Smart Weather Station (IoT Showcase):** Live simulated sensor telemetry widget (Temperature, Humidity, MQ-135 Air Quality, Barometric Pressure) with real-time waveform canvas chart and pause/resume stream toggle.
   - **Academic Task Manager (Web Showcase):** Interactive student task checklist where users can add tasks and toggle completion.
   - **Java OOP Library System (Java Showcase):** Interactive developer terminal simulator where users can run commands like `help`, `list`, `borrow 101`, `return 101`, and `stats`.

7. **Lightbox Image Zoom:**
   - Clickable preview modal for the Top 3 Winner Certificate and workshop showcase photos.

8. **Contact Section (Exact Match to Reference Design):**
   - Left side: Section tag `GET IN TOUCH`, title `Let's Work Together`, email with one-click copy button, location (SLIIT / Colombo), and social links.
   - Right side: Frosted glass card with name, email, subject, message, and electric blue "Send Message" button with interactive feedback and toast notifications.

---

## 📁 File Structure

```
project new/
├── index.html                   # Main single-page portfolio application
├── README.md                    # Documentation & customization guide
├── package.json                 # Optional React / Vite dependencies
├── css/
│   ├── style.css                # Typography, layout, hero, responsive breakpoints
│   ├── glassmorphism.css        # Glassmorphism 2.0, 3D tilt, neon pulses
│   └── components.css           # Command palette, cursor, telemetry, terminal, toast
├── js/
│   ├── main.js                  # Typing effect, mobile drawer, contact form, lightbox
│   ├── cursor.js                # Custom glowing cursor physics & hover triggers
│   ├── command-palette.js       # Ctrl+K modal with full keyboard navigation
│   ├── theme.js                 # Dark/Light mode manager & localStorage sync
│   ├── projects.js              # Bento filter, 3D tilt, live telemetry, terminal
│   └── animations.js            # Scroll-triggered fade-in animations
├── assets/
│   └── images/
│       ├── avatar-placeholder.svg      # High-tech cyber avatar fallback
│       ├── certificate-terrapulse.svg  # Top 3 Winner certificate preview
│       ├── event-photo-1.svg           # Hardware breadboard setup
│       ├── event-photo-2.svg           # SLIIT project symposium
│       ├── event-photo-3.svg           # Real-time telemetry web UI
│       ├── project-terrapulse.svg      # TerraPulse weather showcase banner
│       ├── project-taskmanager.svg     # Academic task manager banner
│       └── project-javalibrary.svg     # Java OOP terminal banner
└── src/
    ├── PortfolioApp.jsx         # Modular React component version
    └── PortfolioApp.css         # React component stylesheet
```

---

## 🛠️ How to Customize Your Details

### 1. Replace Profile Photo
Place your photo named `profile.jpg` directly in the project folder, or update the `src` attribute in [`index.html`](./index.html):
```html
<img
  src="profile.jpg"
  onerror="this.onerror=null; this.src='assets/images/profile-placeholder.svg';"
  alt="Chamathka Layangi"
  class="profile-avatar-img"
/>
```
If `profile.jpg` is not present, a clean minimalist user silhouette will display automatically inside the glowing circular frame.

### 2. Replace Certificate Image
In [`index.html`](./index.html), search for `YOUR_CERTIFICATE_IMAGE_URL` (around line 527):
```html
<img
  src="YOUR_CERTIFICATE_IMAGE_URL"
  onerror="this.onerror=null; this.src='assets/images/certificate-terrapulse.svg';"
  alt="TerraPulse Top 3 Winner Certificate"
/>
```
Replace with your actual certificate image.

### 3. Replace Workshop & Event Photos
In [`index.html`](./index.html), search for `YOUR_EVENT_PHOTO_1`, `YOUR_EVENT_PHOTO_2`, and `YOUR_EVENT_PHOTO_3` (around lines 553, 569, and 585):
```html
<img src="YOUR_EVENT_PHOTO_1" onerror="this.onerror=null; this.src='assets/images/event-photo-1.svg';" ... />
```

### 4. Update Social & Contact Links
In [`index.html`](./index.html) and [`js/command-palette.js`](./js/command-palette.js):
- Email is configured as `chamathkalayangi@gmail.com`.
- Change `https://github.com/YOUR_PROFILE` to your GitHub username.
- Change `https://linkedin.com/in/YOUR_PROFILE` to your LinkedIn URL.

---

## 📱 Mobile, Tablet & Desktop Responsive
- Tested and styled for:
  - Mobile Phones (360px – 768px): Collapsible mobile navigation drawer, fluid typography, touch-optimized cards.
  - Tablets (768px – 1024px): 2-column bento grids and balanced padding.
  - Large Monitors (1024px+): High-fidelity 12-column Bento Grid, 3D tilt effects, and floating docks.
