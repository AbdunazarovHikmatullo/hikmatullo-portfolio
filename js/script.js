const menuBtn = document.querySelector('.menu-btn');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const closeBtn = document.querySelector('.fullscreen-menu__close');
const header = document.querySelector('header');

// ── Close menu helper ──
function closeMenu() {
    fullscreenMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    document.body.style.overflow = '';
}

// ── Burger toggle ──
menuBtn.addEventListener('click', () => {
    const isOpen = fullscreenMenu.classList.toggle('open');
    menuBtn.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

closeBtn.addEventListener('click', closeMenu);

// ── Smooth scroll for all nav-links ──
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href.startsWith('#')) return;
        e.preventDefault();
        closeMenu();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ── Header scroll effect ──
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Projects carousel auto-scroll ──
document.querySelectorAll('.project-card').forEach((card, cardIndex) => {
    const track = card.querySelector('.carousel-track');
    const total = card.querySelectorAll('.carousel-slide').length;
    let current = 0;

    setInterval(() => {
        current = (current + 1) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
    }, 2800 + cardIndex * 300);
});

// ── Active nav link on scroll (IntersectionObserver) ──
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('a.nav-link');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
    });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
