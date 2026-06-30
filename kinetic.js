document.addEventListener('DOMContentLoaded', () => {
  // Use Motion (Framer Motion vanilla) from global scope
  const { animate, scroll, inView, stagger } = window.Motion;

  // 1. Navbar transition on scroll (Safe wrapper)
  const header = document.querySelector('.header');
  if (header) {
    scroll((info) => {
      if (!info || !info.y) return;
      if (info.y.current > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. HERO SECTION ANIMATIONS (Pop-Up + Continuous Floating)
  // Text content
  animate(".hero-title-new", { opacity: [0, 1], y: [40, 0] }, { duration: 0.8, easing: "ease-out" });
  animate(".hero-desc-new", { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, delay: 0.1, easing: "ease-out" });
  animate(".btn-coming-soon-pill", { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.2, easing: "ease-out" });
  animate(".built-by-badge", { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.8, delay: 0.3, type: "spring", stiffness: 100, damping: 20 });

  // Floating phones entrance with pop-up transition
  const phoneLeft = document.querySelector(".phone-left-new");
  if (phoneLeft) {
    phoneLeft.style.opacity = "0";
    animate(phoneLeft,
      { opacity: [0, 1], y: [150, 0], scale: [0.8, 1] },
      { duration: 1.2, delay: 0.4, type: "spring", stiffness: 100, damping: 20 }
    );
    // Continuous floating animation using setTimeout to prevent potential Promise chain crashes
    setTimeout(() => {
      animate(phoneLeft,
        { y: [0, -12, 0] },
        { duration: 6, repeat: Infinity, direction: "alternate", ease: "easeInOut" }
      );
    }, 1600);
  }

  const phoneRight = document.querySelector(".phone-right-new");
  if (phoneRight) {
    phoneRight.style.opacity = "0";
    animate(phoneRight,
      { opacity: [0, 1], y: [200, 40], scale: [0.8, 1] },
      { duration: 1.2, delay: 0.55, type: "spring", stiffness: 100, damping: 20 }
    );
    setTimeout(() => {
      animate(phoneRight,
        { y: [40, 28, 40] },
        { duration: 6, repeat: Infinity, direction: "alternate", ease: "easeInOut" }
      );
    }, 1800);
  }

  // Float the sticky phone mockup as well to make it look alive
  const stickyPhone = document.querySelector(".phone-mockup-super");
  if (stickyPhone) {
    animate(stickyPhone,
      { y: [0, -10, 0] },
      { duration: 5, repeat: Infinity, direction: "alternate", ease: "easeInOut" }
    );
  }

  // Hero Parallax on Scroll down (Safe Callback Wrapper)
  const heroSplit = document.querySelector(".hero-split");
  const heroKinetic = document.querySelector(".hero-kinetic");
  if (heroSplit && heroKinetic) {
    scroll(
      (info) => {
        if (!info || !info.y) return;
        const progress = info.y.progress;
        const yVal = progress * -100;
        const opacityVal = 1 - progress;
        heroSplit.style.transform = `translateY(${yVal}px)`;
        heroSplit.style.opacity = `${opacityVal}`;
      },
      { target: heroKinetic, offset: ["start start", "end start"] }
    );
  }

  // 3. VERTICAL SCROLLYTELLING — Bidirectional screen + theme swap via window scroll
  const screenTracking = document.getElementById("screen-tracking");
  const screenHealth   = document.getElementById("screen-health");
  const screenAi       = document.getElementById("screen-ai");

  const trackingBlock  = document.getElementById("tracking-text");
  const healthBlock    = document.getElementById("health-text");
  const aiBlock        = document.getElementById("ai-text");

  const scrollyBg          = document.getElementById("scrollytelling-bg");
  const scrollTextContainer = document.querySelector(".scroll-text-container");

  function centerScore(el) {
    if (!el) return -Infinity;
    const r = el.getBoundingClientRect();
    const elCenter = r.top + r.height / 2;
    const vpCenter = window.innerHeight / 2;
    return -Math.abs(elCenter - vpCenter); // higher = closer to center
  }

  function setScreen(id) {
    if (screenTracking) screenTracking.style.opacity = id === "tracking" ? "1" : "0";
    if (screenHealth)   screenHealth.style.opacity   = id === "health"   ? "1" : "0";
    if (screenAi)       screenAi.style.opacity       = id === "ai"       ? "1" : "0";
  }

  function setDark() {
    if (!scrollyBg) return;
    scrollyBg.style.opacity = "1";
    if (scrollTextContainer) scrollTextContainer.classList.add("dark-mode-text");
  }
  function setLight() {
    if (!scrollyBg) return;
    scrollyBg.style.opacity = "0";
    if (scrollTextContainer) scrollTextContainer.classList.remove("dark-mode-text");
  }

  let lastActive = null;

  function updateScrollytelling() {
    const scores = {
      tracking: centerScore(trackingBlock),
      health:   centerScore(healthBlock),
      ai:       centerScore(aiBlock),
    };
    const active = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

    if (active !== lastActive) {
      lastActive = active;
      setScreen(active);
      if (active === "tracking") setLight();
      else setDark();
    }
  }

  window.addEventListener("scroll", updateScrollytelling, { passive: true });
  updateScrollytelling(); // run once on load

  // Also revert to light when trust section enters viewport
  const trustSection = document.querySelector(".trust-section");
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) setLight(); });
  }, { threshold: 0.2 });
  if (trustSection) trustObserver.observe(trustSection);

  // Orb animation loop
  animate("#ai-orb-scrolly",
    { scale: [0.9, 1.1, 1], opacity: [0.5, 0.9, 0.7] },
    { duration: 3, repeat: Infinity, direction: "alternate" }
  );


  // 4. "HOW IT WORKS" SCROLLYTELLING (Sticky card images via window scroll)
  const hwSection = document.querySelector(".hw-scrollytelling-section");
  if (hwSection) {
    const hwScreen1 = document.getElementById("hw-screen-1");
    const hwScreen2 = document.getElementById("hw-screen-2");
    const hwScreen3 = document.getElementById("hw-screen-3");

    function updateHwCards() {
      const rect = hwSection.getBoundingClientRect();
      const sectionHeight = hwSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      // scrolled distance within section
      const scrolled = -rect.top;
      const total = sectionHeight - viewportHeight;
      if (total <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      if (progress < 0.33) {
        if (hwScreen1) hwScreen1.className = "hw-full-img active";
        if (hwScreen2) hwScreen2.className = "hw-full-img";
        if (hwScreen3) hwScreen3.className = "hw-full-img";
      } else if (progress < 0.66) {
        if (hwScreen1) hwScreen1.className = "hw-full-img previous";
        if (hwScreen2) hwScreen2.className = "hw-full-img active";
        if (hwScreen3) hwScreen3.className = "hw-full-img";
      } else {
        if (hwScreen1) hwScreen1.className = "hw-full-img previous";
        if (hwScreen2) hwScreen2.className = "hw-full-img previous";
        if (hwScreen3) hwScreen3.className = "hw-full-img active";
      }
    }

    window.addEventListener("scroll", updateHwCards, { passive: true });
    updateHwCards(); // run once on load
  }

  // 5. TRUST TILES ENTRANCE
  inView(".trust-grid-new", () => {
    animate(".trust-col", { opacity: [0, 1], y: [50, 0] }, { delay: stagger(0.15), type: "spring", stiffness: 100, damping: 20 });
  });

  // Canvas Particle Animation for CTA (already setup in html ideally, just init)
  initCtaCanvas();
});

function initCtaCanvas() {
  const canvas = document.getElementById('ctaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(205, 247, 139, 0.5)';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
