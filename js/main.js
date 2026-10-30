/**
 * MUHAMMAD SULEMAN - PORTFOLIO JAVASCRIPT
 * Premium Interactions, Accessible Navigation, CV Download & Recruiter Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Live Lahore Local Time Clock (PKT, UTC+5)
  function updateLahoreTime() {
    const timeEl = document.getElementById('lahore-time');
    if (!timeEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      timeEl.textContent = `${formatter.format(now)} PKT (UTC+5)`;
    } catch (e) {
      // Fallback
      timeEl.textContent = 'Lahore, Pakistan (UTC+5)';
    }
  }
  updateLahoreTime();
  setInterval(updateLahoreTime, 1000);

  // 3. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileToggle.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>';
      });
    });
  }

  // 5. Active Nav Highlight on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 6. Toast Notification System
  function showToast(message, icon = '✓') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // 7. Copy to Clipboard Utility
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  // 8. Hero Quick Connect Box
  const heroConnectForm = document.getElementById('hero-connect-form');
  if (heroConnectForm) {
    heroConnectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = heroConnectForm.querySelector('.connect-input');
      const val = input.value.trim();

      if (!val) {
        input.focus();
        showToast('Please enter your email or message', 'ℹ');
        return;
      }

      // Check if user entered an email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const subject = encodeURIComponent("Connecting via Portfolio - Muhammad Suleman");
      const body = encodeURIComponent(isEmail ? `Hi Muhammad,\n\nI visited your portfolio and would like to connect with you at ${val}.` : `Hi Muhammad,\n\n${val}`);

      window.location.href = `mailto:Sulemanmunir6752@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client...', '✉');
      input.value = '';
    });
  }

  // 9. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.', '⚠️');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', '⚠️');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';

      // Prepare mailto link as reliable primary delivery fallback
      const mailtoUrl = `mailto:Sulemanmunir6752@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your message has been prepared. If your mail app did not open automatically, <a href="${mailtoUrl}" style="text-decoration:underline; font-weight:bold; color:inherit;">click here to send directly</a>.`;
        }

        showToast('Message sent! Muhammad will reply shortly.', '✓');
        contactForm.reset();

        // Trigger email client
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // 10. CV Viewer Modal
  const openCvModalBtns = document.querySelectorAll('[data-open-cv-modal]');
  const cvModal = document.getElementById('cv-modal');
  const closeCvModalBtn = document.getElementById('close-cv-modal');

  if (cvModal) {
    openCvModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        cvModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeCvModalBtn) {
      closeCvModalBtn.addEventListener('click', () => {
        cvModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Keyboard ESC to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cvModal.classList.contains('open')) {
        cvModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 11. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 12. Direct Download CV Feedback
  const cvDownloadLinks = document.querySelectorAll('a[download]');
  cvDownloadLinks.forEach(link => {
    link.addEventListener('click', () => {
      showToast('Downloading Muhammad Suleman CV (PDF)...', '📄');
    });
  });
});
