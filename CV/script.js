// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Add collapsible functionality to sections
  const sections = document.querySelectorAll('main section');
  sections.forEach(section => {
    // Wrap existing content except h2 in a div for collapsible content
    const heading = section.querySelector('h2');
    if (!heading) return;

    // Create collapsible content container
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('collapsible-content');

    // Move all siblings after h2 into contentDiv
    let sibling = heading.nextElementSibling;
    while (sibling) {
      const next = sibling.nextElementSibling;
      contentDiv.appendChild(sibling);
      sibling = next;
    }
    section.appendChild(contentDiv);

    // Make section collapsible
    section.classList.add('collapsible');

    // Initially collapse all sections except the first
    if (section === sections[0]) {
      section.classList.add('active');
    }

    // Toggle on heading click
    heading.style.cursor = 'pointer';
    heading.addEventListener('click', () => {
      section.classList.toggle('active');
    });
  });

  // Fade-in animation on scroll
  const fadeInElements = document.querySelectorAll('main section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  fadeInElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add dynamic greeting message at the top with typing effect
  const header = document.querySelector('header');
  if (header) {
    const greeting = document.createElement('p');
    greeting.style.fontSize = '1.2rem';
    greeting.style.color = '#d35400';
    greeting.style.fontWeight = 'bold';
    greeting.style.marginTop = '10px';

    const hour = new Date().getHours();
    let greetText = 'Witaj!';
    if (hour < 12) {
      greetText = 'Dzień dobry!';
    } else if (hour < 18) {
      greetText = 'Miłego popołudnia!';
    } else {
      greetText = 'Dobry wieczór!';
    }
    header.appendChild(greeting);

    // Typing effect
    let index = 0;
    function type() {
      if (index < greetText.length) {
        greeting.textContent += greetText.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // Animate contact info icons on hover
  const contactSpans = document.querySelectorAll('.contact-info span');
  contactSpans.forEach(span => {
    span.style.transition = 'transform 0.3s ease';
    span.addEventListener('mouseenter', () => {
      span.style.transform = 'scale(1.2)';
    });
    span.addEventListener('mouseleave', () => {
      span.style.transform = 'scale(1)';
    });
  });

  // Add back to top button
  const backToTop = document.createElement('button');
  backToTop.textContent = '↑ Top';
  backToTop.id = 'backToTop';
  backToTop.style.position = 'fixed';
  backToTop.style.bottom = '30px';
  backToTop.style.right = '30px';
  backToTop.style.padding = '10px 15px';
  backToTop.style.fontSize = '1rem';
  backToTop.style.backgroundColor = '#ff6f61';
  backToTop.style.color = '#fff';
  backToTop.style.border = 'none';
  backToTop.style.borderRadius = '5px';
  backToTop.style.cursor = 'pointer';
  backToTop.style.boxShadow = '0 4px 8px rgba(226, 154, 147, 0.5)';
  backToTop.style.display = 'none';
  backToTop.style.zIndex = '1000';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Download CV button functionality
  const downloadCVBtn = document.getElementById('downloadCV');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'CV papierowe.pdf';
      link.download = 'CV papierowe.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
