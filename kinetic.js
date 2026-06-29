document.addEventListener('DOMContentLoaded', () => {
  // Use Motion (Framer Motion vanilla) from global scope
  const { animate, scroll, inView, stagger, spring } = window.Motion;

  // 1. Navbar transition on scroll
  const header = document.querySelector('.header');
  scroll(({ y }) => {
    if (y.current > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Hero Section Animations
  animate(".hero-title", { opacity: [0, 1], y: [50, 0] }, { duration: 1, easing: "ease-out" });
  animate(".hero-subtitle", { opacity: [0, 1], y: [30, 0] }, { duration: 1, delay: 0.2, easing: "ease-out" });

  // Floating phones entrance and scroll parallax
  animate(".phone-left", { opacity: [0, 1], x: [-150, -80], y: [100, 0] }, { duration: 1.2, easing: "ease-out", delay: 0.3 });
  animate(".phone-right", { opacity: [0, 1], x: [150, 80], y: [150, 40] }, { duration: 1.2, easing: "ease-out", delay: 0.4 });

  scroll(
    animate(".hero-phones-container", { scale: [1, 0.8], y: [0, -100], opacity: [1, 0] }),
    { target: document.querySelector(".hero-kinetic"), offset: ["start start", "end start"] }
  );

  // 3. Live Tracking
  inView(".tracking-section", (info) => {
    animate(".route-line", { strokeDashoffset: [1000, 0] }, { duration: 2, easing: "ease-in-out" });
    animate(".pin", { opacity: [0, 1], scale: [0, 1] }, { delay: stagger(0.5, { startDelay: 1 }), easing: spring() });
  });

  // 4. Appliance Health Dashboard
  inView(".dashboard-wrapper", () => {
    animate(".dash-widget", { opacity: [0, 1], y: [30, 0] }, { delay: stagger(0.2), easing: spring() });
    
    // Animate number count up
    const scoreElement = document.querySelector('.health-score');
    if (scoreElement) {
      animate(0, 98, {
        duration: 2,
        onUpdate: (latest) => scoreElement.innerHTML = Math.round(latest) + "%"
      });
    }
  });

  // 5. AI Copilot Mode Shift
  scroll(
    animate(".ai-section", { backgroundColor: ["#FCFBF9", "#121214"] }),
    { target: document.querySelector(".ai-section"), offset: ["start end", "start center"] }
  );

  inView(".ai-section", () => {
    animate(".ai-orb", { scale: [0.8, 1.2, 0.9, 1.1], opacity: [0.4, 0.8, 0.5, 0.7] }, { duration: 4, repeat: Infinity, direction: "alternate" });
  });

  // 6. Horizontal Scroll for How it Works
  const horizontalScroll = document.querySelector(".horizontal-track");
  if (horizontalScroll) {
    scroll(
      animate(".horizontal-content", { x: ["0vw", "-200vw"] }),
      { target: document.querySelector(".horizontal-scroll-container") }
    );
  }

  // 7. Trust Tiles Entrance
  inView(".trust-grid", () => {
    animate(".trust-tile", { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.1), easing: spring() });
  });

  // Subtle Mouse Parallax on all phones
  const phones = document.querySelectorAll('.phone-mockup');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    phones.forEach(phone => {
      // Don't override completely the CSS transforms, just add slight translation
      const style = window.getComputedStyle(phone);
      const transform = style.getPropertyValue('transform');
      // For simplicity in vanilla JS without a math library, we just apply translate to the wrapper if we want pure parallax
      // We will set custom properties and use them in CSS
      phone.style.setProperty('--mouse-x', `${x}px`);
      phone.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
