/**
 * Yogesh Rana - Advocate & Legal Consultant
 * Interactive Scripts, Category Filtering & Consultation Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Header & Scroll Top Button ---
  const siteHeader = document.getElementById('siteHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  // --- Scroll To Top Action ---
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Mobile Navigation Drawer Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-menu-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --- Active Navigation Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // --- Practice Areas Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const practiceCards = document.querySelectorAll('.practice-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      practiceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- FAQ Accordion ---
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isActive = parentItem.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const body = item.querySelector('.faq-body');
        if (body) body.style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isActive) {
        parentItem.classList.add('active');
        const body = parentItem.querySelector('.faq-body');
        if (body) {
          body.style.maxHeight = body.scrollHeight + 35 + 'px';
        }
      }
    });
  });

  // Open the first FAQ item by default
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    firstFaq.classList.add('active');
    const firstBody = firstFaq.querySelector('.faq-body');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 35 + 'px';
  }

  // --- Practice Area Quick Select & Scroll to Contact ---
  const practiceInquireButtons = document.querySelectorAll('.practice-inquire-btn');
  const serviceDropdown = document.getElementById('consultService');

  practiceInquireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      
      if (serviceDropdown && serviceName) {
        serviceDropdown.value = serviceName;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Animated Stat Counter on Scroll ---
  const statsSection = document.querySelector('.stats-section');
  let statsCounted = false;

  function countUpNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = current + suffix;
        }
      }, 35);
    });
  }

  if ('IntersectionObserver' in window && statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsCounted) {
        statsCounted = true;
        countUpNumbers();
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  } else {
    countUpNumbers();
  }

  // --- Consultation Form Submission & WhatsApp Integration ---
  const consultForm = document.getElementById('legalConsultationForm');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');

  function closeModal() {
    successModal?.classList.remove('active');
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOkBtn?.addEventListener('click', closeModal);
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) closeModal();
  });

  consultForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value.trim();
    const phone = document.getElementById('clientPhone')?.value.trim();
    const email = document.getElementById('clientEmail')?.value.trim() || 'Not Provided';
    const service = document.getElementById('consultService')?.value || 'General Legal Consultation';
    const preferredMode = document.getElementById('consultMode')?.value || 'Phone / WhatsApp';
    const urgency = document.getElementById('consultUrgency')?.value || 'Standard';
    const matter = document.getElementById('clientMatter')?.value.trim();

    if (!name || !phone || !matter) {
      alert('Please fill in your Name, Phone Number, and Brief Matter description.');
      return;
    }

    // Build the WhatsApp message template
    const advocatePhone = '919687019503';
    const whatsappMessage = 
`⚖️ *NEW LEGAL CONSULTATION REQUEST*

👤 *Client Name:* ${name}
📞 *Phone Number:* ${phone}
📧 *Email:* ${email}
📋 *Practice Area:* ${service}
🗓️ *Preferred Mode:* ${preferredMode}
⚡ *Urgency Level:* ${urgency}

📝 *Matter Description:*
${matter}

---
_Sent via Yogesh Rana Advocate Official Website_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${advocatePhone}?text=${encodedMessage}`;

    // Open WhatsApp directly in a new tab or app
    window.open(whatsappUrl, '_blank');

    // Show professional confirmation modal
    successModal?.classList.add('active');

    // Reset form
    consultForm.reset();
  });
});
