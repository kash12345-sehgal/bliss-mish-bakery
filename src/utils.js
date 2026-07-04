export const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  const navbarEl = document.getElementById('navbar');
  const navHeight = navbarEl ? navbarEl.offsetHeight + 10 : 80;
  window.scrollTo({
    top: target.offsetTop - navHeight,
    behavior: 'smooth',
  });
};
