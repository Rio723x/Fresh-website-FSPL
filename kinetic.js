document.addEventListener('DOMContentLoaded', () => {
  // Use Motion (Framer Motion vanilla) from global scope
  const { animate, scroll, inView, stagger, spring } = window.Motion;

  // 1. Navbar transition on scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Hero Section Animations
  animate(".hero-title-new", { opacity: [0, 1], y: [50, 0] }, { duration: 1, easing: "ease-out" });
  animate(".hero-desc-new", { opacity: [0, 1], y: [30, 0] }, { duration: 1, delay: 0.2, easing: "ease-out" });
  animate(".btn-coming-soon-pill", { opacity: [0, 1], y: [20, 0] }, { duration: 1, delay: 0.3, easing: "ease-out" });
  animate(".built-by-badge", { opacity: [0, 1], y: [20, 0] }, { duration: 1, delay: 0.4, easing: "ease-out" });

  // Floating phones entrance and scroll parallax
  animate(".phone-left-new", { opacity: [0, 1], x: [-200, -80], y: [100, -20] }, { duration: 1.2, easing: "ease-out", delay: 0.4 });
  animate(".phone-right-new", { opacity: [0, 1], x: [200, 100], y: [150, 30] }, { duration: 1.2, easing: "ease-out", delay: 0.5 });

  scroll(
    animate(".phone-mockup-wrapper", { scale: [1, 0.85], y: [0, -80], opacity: [1, 0.1] }),
    { target: document.querySelector(".hero-kinetic"), offset: ["start start", "end start"] }
  );

  // 3. Scrollytelling Features (Apple Home Style)
  const screens = {
    tracking: document.getElementById('screen-tracking'),
    health: document.getElementById('screen-health'),
    ai: document.getElementById('screen-ai')
  };
  
  const scrollyBg = document.getElementById('scrollytelling-bg');
  const aiOrb = document.getElementById('ai-orb-scrolly');
  const aiFeatureText = document.getElementById('ai-feature-text');

  function updateScrollytelling(activeSection) {
    if(!screens.tracking) return; // Guard clause
    
    // Reset all screens
    Object.values(screens).forEach(screen => {
      if(screen) screen.style.opacity = '0';
    });
    
    // Show active screen
    if (screens[activeSection]) {
      screens[activeSection].style.opacity = '1';
    }
    
    // Dark mode transition for AI Copilot
    if (activeSection === 'ai') {
      if(scrollyBg) scrollyBg.style.opacity = '1';
      if(aiOrb) {
        aiOrb.style.opacity = '0.6';
        animate("#ai-orb-scrolly", { scale: [0.8, 1.2, 0.9, 1.1], opacity: [0.4, 0.8, 0.5, 0.7] }, { duration: 4, repeat: Infinity, direction: "alternate" });
      }
      if(aiFeatureText) {
        const h2 = aiFeatureText.querySelector('h2');
        const p = aiFeatureText.querySelector('p');
        if(h2) h2.style.color = '#fff';
        if(p) p.style.color = '#aaa';
      }
    } else {
      if(scrollyBg) scrollyBg.style.opacity = '0';
      if(aiOrb) aiOrb.style.opacity = '0';
      if(aiFeatureText) {
        const h2 = aiFeatureText.querySelector('h2');
        const p = aiFeatureText.querySelector('p');
        if(h2) h2.style.color = '';
        if(p) p.style.color = '';
      }
    }
  }

  // Setup intersection observers for each text block
  // Uses rootMargin to trigger when the block hits the middle 30% of the viewport
  const scrollyObserverOptions = {
    root: null,
    rootMargin: '-35% 0px -35% 0px',
    threshold: 0
  };

  const scrollyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'tracking-text') updateScrollytelling('tracking');
        if (entry.target.id === 'health-text') updateScrollytelling('health');
        if (entry.target.id === 'ai-text') updateScrollytelling('ai');
      }
    });
  }, scrollyObserverOptions);

  document.querySelectorAll('.scroll-text-block').forEach(block => {
    scrollyObserver.observe(block);
  });

  // 6. How it Works (Full Card Crossfade Scrollytelling)
  const hwContainer = document.querySelector(".hw-scrollytelling-section");
  if (hwContainer) {
    const s1 = document.getElementById('hw-screen-1');
    const s2 = document.getElementById('hw-screen-2');
    const s3 = document.getElementById('hw-screen-3');

    const updateCrossfade = () => {
      const rect = hwContainer.getBoundingClientRect();
      const totalHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      // Progress starts (0) when container top hits viewport top (rect.top = 0)
      // Progress ends (1) when container bottom hits viewport bottom (rect.bottom = viewportHeight)
      const scrollDistance = -rect.top;
      const maxScrollDistance = totalHeight - viewportHeight;
      
      let p = 0;
      if (maxScrollDistance > 0) {
        p = Math.max(0, Math.min(1, scrollDistance / maxScrollDistance));
      }
      
      if (s1 && s2 && s3) {
        if (p < 0.33) {
          s1.style.opacity = '1';
          s2.style.opacity = '0';
          s3.style.opacity = '0';
        } else if (p < 0.66) {
          s1.style.opacity = '0';
          s2.style.opacity = '1';
          s3.style.opacity = '0';
        } else {
          s1.style.opacity = '0';
          s2.style.opacity = '0';
          s3.style.opacity = '1';
        }
      }
    };

    window.addEventListener('scroll', updateCrossfade);
    window.addEventListener('resize', updateCrossfade);
    
    // Set initial state
    updateCrossfade();
  }

  // 7. Trust Tiles Entrance
  inView(".trust-grid-new", () => {
    animate(".trust-col", { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.1), easing: spring() });
  });

  // Subtle Mouse Parallax on all phones
  const phones = document.querySelectorAll('.phone-mockup, .phone-mockup-new');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    phones.forEach(phone => {
      phone.style.setProperty('--mouse-x', `${x}px`);
      phone.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 8. CTA Canvas Particle Wave Animation
  const canvas = document.getElementById('ctaCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 65; // Balanced for elegance and performance
    
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.5 ? 'rgba(205, 247, 139, ' : 'rgba(114, 169, 18, ', // lime green or darker green
        opacity: Math.random() * 0.4 + 0.1,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        amplitude: Math.random() * 18 + 6,
        frequency: Math.random() * 0.004 + 0.001,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    let time = 0;
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.004;
      
      particles.forEach((p) => {
        // Move horizontally
        p.x += p.speedX;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        
        // Sine wave vertical motion
        const currentY = p.y + Math.sin(time + p.phase + p.x * p.frequency) * p.amplitude;
        
        ctx.beginPath();
        ctx.arc(p.x, currentY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();
      });
      
      // Draw subtle horizontal flowing background wave lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(205, 247, 139, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height * 0.5 + Math.sin(time + x * 0.003) * 30 + Math.cos(time * 0.5 + x * 0.001) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(114, 169, 18, 0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height * 0.6 + Math.sin(time + 100 + x * 0.002) * 20 + Math.cos(time * 0.7 + x * 0.0015) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    // Intersection Observer to stop running when out of view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateParticles();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.02 });
    
    observer.observe(canvas);
  }
});
