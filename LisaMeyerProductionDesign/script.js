document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('nav-menu');
  const logo = document.getElementById('logo');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message. We will get back to you shortly.');
      form.reset();
    });
  }

  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

async function loadHTML(id, url, isHead = false) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
    const text = await response.text();
    const container = document.getElementById(id);
    if (isHead) {
      // For head, inject HTML as actual DOM nodes
      container.innerHTML = text;
      // Optionally handle scripts or styles here if needed
    } else {
      container.innerHTML = text;
    }
  } catch (e) {
    console.error(e);
  }
}

loadHTML('head-placeholder', 'head.html', true);
loadHTML('header-placeholder', 'header.html');
loadHTML('footer-placeholder', 'footer.html');