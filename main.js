import './style.css';

// ─────────────────────────────────────────────────────────────
// Interactive Scripts: Animations, Tilt, Copy & Navigation
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. 3D Card & Hero Image Tilt Effect
  const tiltElements = document.querySelectorAll('.tilt');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 3. Ambient Glow Mouse Follower
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');

  window.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 60;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 60;

    if (glow1) {
      glow1.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
    if (glow2) {
      glow2.style.transform = `translate(${-xPos * 0.8}px, ${-yPos * 0.8}px)`;
    }
  });

  // 4. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link, .btn-primary-sm').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 5. 1-Click Copy Email to Clipboard with Toast Notification
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('ahadaliwazir@gmail.com').then(() => {
        toast.classList.add('show');
        const icon = copyBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-check text-gold';
        
        setTimeout(() => {
          toast.classList.remove('show');
          if (icon) icon.className = 'fa-regular fa-copy';
        }, 3000);
      });
    });
  }

  // 6. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
