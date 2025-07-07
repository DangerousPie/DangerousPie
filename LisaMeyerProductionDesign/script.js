document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('nav-menu');
  const logo = document.getElementById('logo');

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