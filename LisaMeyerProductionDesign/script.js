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
