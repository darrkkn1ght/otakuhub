// OtakuHub Main JS (no auth modal logic)
//    // Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Page load animations
window.addEventListener('load', function() {
    // Hero animations
    gsap.from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.hero-content p', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    gsap.from('.cta-button', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power2.out'
    });

    // Logo animation
    gsap.from('.logo img', {
        duration: 1.1,
        opacity: 0,
        scale: 0.7,
        rotate: 12,
        ease: 'back.out(1.7)',
        delay: 0.2
    });
});

// Scroll animations
gsap.utils.toArray('.fade-up').forEach(element => {
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Vision cards hover animation
gsap.utils.toArray('.vision-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            scale: 1.05,
            y: -10,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            scale: 1,
            y: 0,
            ease: 'power2.out'
        });
    });
});

// Role cards stagger animation
gsap.fromTo('.role-card', 
    {
        opacity: 0,
        y: 30
    },
    {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.roles-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Form animations
gsap.from('.form-container', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.form-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission animation
document.getElementById('recruitmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Submitting... 🚀';
    submitBtn.disabled = true;
    gsap.to(submitBtn, {
        duration: 0.3,
        scale: 0.95,
        ease: 'power2.out'
    });
    // Gather form data
    const name = this.name.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const university = this.university.value;
    const role = this.role.options[this.role.selectedIndex].text;
    const why = this.why.value;
    // Send to Discord webhook
    fetch('https://discord.com/api/webhooks/1394979523367276665/5noLufQ6mSl3cBu1TMBFnM4y4w86CCetJe4TIBkt11h14adRyB2Mfs22QDTNYA6PW1go', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `New OtakuHub Application:\n**Name:** ${name}\n**Email:** ${email}\n**Phone:** ${phone}\n**University:** ${university}\n**Role:** ${role}\n**Why:** ${why}`
        })
    });
    // Show success message
    const msg = document.getElementById('form-success-message');
    msg.style.display = 'block';
    gsap.fromTo(msg, {opacity:0, y:30}, {opacity:1, y:0, duration:0.7, ease:'power2.out'});
    // Hide form
    this.style.display = 'none';
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'https://yourwebsite.com/thank-you.html';
    }, 2000);
});

// Parallax effect for hero background (skip .hero::before)
// If you want a parallax, add a .hero-bg div and animate that instead.

// Header background opacity on scroll
ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate: self => {
        const header = document.querySelector('header');
        const opacity = Math.min(self.progress, 1);
        header.style.backgroundColor = `rgba(0, 0, 0, ${0.9 * opacity})`;
    }
});

// Add floating animation to vision cards
gsap.utils.toArray('.vision-card').forEach((card, index) => {
    gsap.to(card, {
        y: Math.sin(index) * 10,
        duration: 2 + index * 0.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
});

// Role card click: scroll to form and pre-select role
const roleMap = {
    'designer': '🎨 Designer',
    'social-media': '📱 Social Media Manager',
    'content-creator': '📸 Content Creator',
    'writer': '✍️ Writer',
    'strategy': '🎯 Strategy Head',
    'event-planner': '🛠 Event Planner',
    'merch-creative': '👘 Merch Creative',
    'influencer-liaison': '🗣 Influencer Liaison'
};
document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', function() {
        const role = this.getAttribute('data-role');
        const select = document.getElementById('role');
        if (select && roleMap[role]) {
            select.value = role;
            select.dispatchEvent(new Event('change'));
        }
        document.getElementById('join').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card, {
        opacity: 0,
        y: 40
    }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.2 + i * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}
// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Back to Top button logic
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if(window.scrollY > 300) {
            backToTop.style.display = 'block';
            gsap.to(backToTop, {opacity:1, scale:1, duration:0.3, ease:'power2.out'});
        } else {
            gsap.to(backToTop, {opacity:0, scale:0.8, duration:0.2, ease:'power2.in', onComplete:()=>{backToTop.style.display='none';}});
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({top:0, behavior:'smooth'});
    });
}

// Intro/landing page logic
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('main-site').style.display = 'none';
    document.getElementById('introOverlay').style.display = 'flex';
    document.getElementById('enterSiteBtn').addEventListener('click', function() {
        gsap.to('#introOverlay', {opacity:0, duration:0.7, ease:'power2.in', onComplete:()=>{
            document.getElementById('introOverlay').style.display = 'none';
            document.getElementById('main-site').style.display = '';
        }});
    });
});

// Sticky, auto-hide navbar on scroll and section highlight
let lastScrollY = window.scrollY;
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    // Auto-hide
    if(window.scrollY > lastScrollY && window.scrollY > 80) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScrollY = window.scrollY;
    // Section highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if(window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinksList.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Dark/Light mode toggle
const modeToggle = document.getElementById('mode-toggle');
function setMode(mode) {
    document.body.classList.toggle('light-mode', mode === 'light');
    if (modeToggle) modeToggle.textContent = mode === 'light' ? '🌞' : '🌙';
    localStorage.setItem('theme', mode);
}
if (modeToggle) {
    modeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        setMode(isLight ? 'dark' : 'light');
    });
}
// On load, set mode from localStorage
const savedTheme = localStorage.getItem('theme');
if(savedTheme) setMode(savedTheme);

// Animate SVG background shapes
(function animateBgShapes() {
    const shapes = document.querySelectorAll('.bg-shape');
    let t = 0;
    function animate() {
        t += 0.01;
        shapes.forEach((shape, i) => {
            const baseCx = parseFloat(shape.getAttribute('cx'));
            const baseCy = parseFloat(shape.getAttribute('cy'));
            shape.setAttribute('cy', baseCy + Math.sin(t + i) * 18);
            shape.setAttribute('cx', baseCx + Math.cos(t + i * 1.5) * 12);
        });
        requestAnimationFrame(animate);
    }
    if (shapes.length) animate();
})();
// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(reg) { /* success */ })
            .catch(function(err) { /* error */ });
    });
}