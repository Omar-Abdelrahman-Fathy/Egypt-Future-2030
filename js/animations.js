// ================================================
// تأثيرات GSAP - معدلة للعمل مع الملفات المحلية
// ================================================

// GSAP متاح عالمياً بعد تحميل المكتبة محلياً
// gsap متاح كمتغير عام

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function initEntranceAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-content', {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.main-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero-stat', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1,
        ease: 'back.out(1.2)'
    });

    gsap.from('.hero-buttons button', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1.5,
        ease: 'back.out(1.7)'
    });
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.utils.toArray('.vision-card, .vision-highlight-card, .ai-category').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.2)'
        });
    });

    gsap.utils.toArray('.stat-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.2)'
        });
    });

    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.roadmap-steps .step', {
        scrollTrigger: {
            trigger: '.roadmap-preview',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)'
    });
}

function initHoverAnimations() {
    if (typeof gsap === 'undefined') return;
    
    document.querySelectorAll('.vision-card, .project-card, .ai-category, .stat-card, .vision-highlight-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit, .social-link').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.2,
                ease: 'back.out(2)'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

function initParallax() {
    if (typeof gsap === 'undefined') return;
    
    gsap.to('body', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        backgroundColor: '#1a1f2c',
        ease: 'none'
    });

    gsap.utils.toArray(['.vision', '.projects', '.ai', '.stats', '.contact']).forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPosition: '50% 100px',
            ease: 'none'
        });
    });
}

function initChartAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.utils.toArray('.chart-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.2)'
        });
    });

    gsap.utils.toArray('.mini-stat').forEach((stat, i) => {
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}

function initTypingEffect() {
    if (typeof gsap === 'undefined') return;
    
    const texts = [
        'تقنيات المستقبل لخدمة المواطن المصري',
        'نحو جمهورية جديدة',
        'رؤية مصر 2030',
        'التحول الرقمي والتنمية المستدامة'
    ];
    
    let index = 0;
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        setInterval(() => {
            gsap.to(heroSubtitle, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    heroSubtitle.textContent = texts[index];
                    gsap.to(heroSubtitle, {
                        opacity: 1,
                        duration: 0.5
                    });
                    index = (index + 1) % texts.length;
                }
            });
        }, 3000);
    }
}

function initAdvancedEffects() {
    if (typeof gsap === 'undefined') return;
    
    gsap.utils.toArray('.card-icon, .category-icon, .highlight-icon').forEach(icon => {
        gsap.to(icon, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: 'none'
        });
    });

    gsap.to('.btn-primary', {
        boxShadow: '0 0 30px #00eaff',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut'
    });

    gsap.to('.chatbot-toggle', {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sine.inOut'
    });
}

function initProgressTriggers() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    ScrollTrigger.create({
        trigger: '.ai',
        start: 'top 70%',
        onEnter: () => {
            gsap.utils.toArray('.progress-fill[data-progress]').forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                gsap.to(bar, {
                    width: progress + '%',
                    duration: 1.5,
                    ease: 'power3.out'
                });
            });
        }
    });
}

// تهيئة جميع التأثيرات بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initEntranceAnimations();
        initScrollAnimations();
        initHoverAnimations();
        initParallax();
        initChartAnimations();
        initAdvancedEffects();
        initProgressTriggers();
        initTypingEffect();
        
        // تأثيرات إضافية للفوتر
        if (typeof gsap !== 'undefined') {
            gsap.from('.footer-section', {
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    }, 4000);
});