document.addEventListener('DOMContentLoaded', () => {

    // Nav toggle (mobile)
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

    // Navbar scroll
    const nav = document.getElementById('navbar');
    const btt = document.getElementById('btt');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', scrollY > 50);
        btt.classList.toggle('show', scrollY > 400);
    });

    // Back to top
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Lightbox
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    document.querySelectorAll('.galeri-item, .foto-card').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lbImg.src = img.src;
                lb.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
    function closeLb() { lb.classList.remove('active'); document.body.style.overflow = ''; }

    // Simple scroll reveal
    const els = document.querySelectorAll('.section-title, .two-col, .pillar-grid, .foto-grid, .video-wrapper, .galeri-grid');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = 1;
                e.target.style.transform = 'translateY(0)';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    els.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        obs.observe(el);
    });

});
