// ================================================
// أداة كشف المشاكل - تشغل عند F12
// ================================================
if (window.location.hash === '#debug') {
    setTimeout(() => {
        console.group('🔍 تحليل المشاكل');
        
        // الكشف عن overflow
        const allElements = document.querySelectorAll('*');
        let overflowElements = [];
        
        allElements.forEach((el, index) => {
            const styles = window.getComputedStyle(el);
            if (el.scrollWidth > el.clientWidth + 2 || 
                el.scrollHeight > el.clientHeight + 2) {
                overflowElements.push({
                    element: el.tagName,
                    id: el.id || 'بدون id',
                    class: el.className.slice(0, 30),
                    diffWidth: (el.scrollWidth - el.clientWidth).toFixed(0),
                    diffHeight: (el.scrollHeight - el.clientHeight).toFixed(0),
                    position: styles.position,
                    width: styles.width,
                    maxWidth: styles.maxWidth
                });
            }
        });
        
        if (overflowElements.length > 0) {
            console.warn('⚠️ عناصر بها overflow:', overflowElements.length);
            console.table(overflowElements.slice(0, 20));
        } else {
            console.log('✅ لا يوجد overflow');
        }
        
        // الكشف عن transform scale
        let scaledElements = [];
        allElements.forEach(el => {
            const transform = window.getComputedStyle(el).transform;
            if (transform !== 'none' && transform.includes('matrix')) {
                scaledElements.push({
                    element: el.tagName,
                    class: el.className.slice(0, 30),
                    transform: transform
                });
            }
        });
        
        if (scaledElements.length > 0) {
            console.warn('⚠️ عناصر بها transform:', scaledElements.length);
            console.table(scaledElements.slice(0, 10));
        } else {
            console.log('✅ لا يوجد transform scale');
        }
        
        // الكشف عن العناصر الثابتة
        console.log('📐 Viewport:', window.innerWidth + 'x' + window.innerHeight);
        console.log('🔤 Font size base:', getComputedStyle(document.documentElement).fontSize);
        
        // الكشف عن مشاكل Three.js canvas
        const canvas = document.getElementById('three-canvas');
        if (canvas) {
            const canvasRect = canvas.getBoundingClientRect();
            console.log('🎨 Three.js canvas:', {
                width: canvasRect.width,
                height: canvasRect.height,
                position: getComputedStyle(canvas).position
            });
        }
        
        console.groupEnd();
        
        // رسم حدود حمراء للعناصر المشبوهة
        if (confirm('عرض حدود العناصر بالأحمر؟')) {
            allElements.forEach(el => {
                if (el.scrollWidth > el.clientWidth + 2) {
                    el.style.outline = '2px solid red';
                } else if (el.scrollHeight > el.clientHeight + 2) {
                    el.style.outline = '2px solid blue';
                }
            });
        }
    }, 3000);
}


// ================================================
// الملف الرئيسي - يجمع كل وظائف الموقع
// ================================================

import { initThreeScene } from './three-scene.js';

// ================================================
// شاشة التحميل الجديدة - بدون إحصائيات
// ================================================

class NewLoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('loading-progress-bar');
        this.percentageElement = document.getElementById('loading-percentage-neon');
        this.messageElement = document.getElementById('loading-message-neon');
        this.currentProgress = 0;
        this.loadingMessages = [
            'جاري تجهيز رؤية مصر 2030',
            'تحميل المشروعات القومية',
            'تشغيل أنظمة الذكاء الاصطناعي',
            'تجهيز الإحصائيات التفاعلية',
            'مصر 2030 تنتظرك'
        ];
        this.init();
    }

    init() {
        this.start();
    }

    updateProgress(progress) {
        this.currentProgress = Math.min(progress, 100);
        if (this.progressBar) {
            this.progressBar.style.width = this.currentProgress + '%';
        }
        if (this.percentageElement) {
            this.percentageElement.textContent = this.currentProgress + '%';
        }
    }

    updateMessage(message) {
        if (this.messageElement) {
            this.messageElement.textContent = message;
        }
    }

    simulateLoading() {
        const stages = [
            { progress: 15, message: this.loadingMessages[0], delay: 300 },
            { progress: 34, message: this.loadingMessages[0], delay: 800 },
            { progress: 45, message: this.loadingMessages[1], delay: 1200 },
            { progress: 60, message: this.loadingMessages[2], delay: 1800 },
            { progress: 78, message: this.loadingMessages[3], delay: 2400 },
            { progress: 90, message: this.loadingMessages[4], delay: 3000 },
            { progress: 100, message: this.loadingMessages[4], delay: 3500 }
        ];

        stages.forEach(stage => {
            setTimeout(() => {
                this.updateProgress(stage.progress);
                this.updateMessage(stage.message);
            }, stage.delay);
        });

        setTimeout(() => {
            this.hide();
        }, 4000);
    }

    hide() {
        if (this.loadingScreen) {
            this.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.runEntranceEffects();
            }, 800);
        }
    }

    show() {
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
            this.loadingScreen.style.opacity = '1';
            document.body.style.overflow = 'hidden';
            this.currentProgress = 0;
            this.updateProgress(0);
            this.updateMessage(this.loadingMessages[0]);
        }
    }

    runEntranceEffects() {
        this.startCounters();
    }

    startCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    start() {
        this.show();
        this.simulateLoading();
    }
}

// ================================================
// إدارة العدادات والإحصائيات
// ================================================

class StatsManager {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-target]');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    }
}

// ================================================
// تهيئة الرسوم البيانية والجرافات (بدون حركة)
// ================================================
function initCharts() {
    // الرسم البياني الدائري (Pie Chart)
    const pieCtx = document.getElementById('pieChart')?.getContext('2d');
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['مدن ذكية', 'مشروعات بنية تحتية', 'مشروعات طاقة', 'مشروعات رقمية', 'مشروعات نقل'],
                datasets: [{
                    data: [15, 12, 8, 5, 2],
                    backgroundColor: [
                        '#00eaff',
                        '#6a5cff',
                        '#ff6b6b',
                        '#ffd93d',
                        '#6bffb8'
                    ],
                    borderColor: '#0a0f1c',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false, // تعطيل الحركة
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: '#fff',
                            font: {
                                family: 'Cairo',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 15, 28, 0.9)',
                        titleColor: '#00eaff',
                        bodyColor: '#fff',
                        borderColor: '#00eaff',
                        borderWidth: 1
                    }
                }
            }
        });
        
        const pieLegend = document.getElementById('pieLegend');
        if (pieLegend) {
            const labels = ['مدن ذكية (15)', 'مشروعات بنية تحتية (12)', 'مشروعات طاقة (8)', 'مشروعات رقمية (5)', 'مشروعات نقل (2)'];
            const colors = ['#00eaff', '#6a5cff', '#ff6b6b', '#ffd93d', '#6bffb8'];
            
            labels.forEach((label, index) => {
                const item = document.createElement('div');
                item.className = 'legend-item';
                item.innerHTML = `
                    <span class="legend-color" style="background: ${colors[index]};"></span>
                    <span>${label}</span>
                `;
                pieLegend.appendChild(item);
            });
        }
    }

    // الرسم البياني الخطي (Line Chart)
    const lineCtx = document.getElementById('lineChart')?.getContext('2d');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2030'],
                datasets: [{
                    label: 'الخدمات الرقمية',
                    data: [10, 25, 45, 70, 100, 150, 250],
                    borderColor: '#00eaff',
                    backgroundColor: 'rgba(0, 234, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#6a5cff',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                            font: {
                                family: 'Cairo'
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // الرسم البياني الشريطي (Bar Chart)
    const barCtx = document.getElementById('barChart')?.getContext('2d');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['التعليم', 'الصحة', 'النقل', 'الأمن'],
                datasets: [{
                    label: 'نسبة التقدم',
                    data: [90, 85, 95, 88],
                    backgroundColor: [
                        'rgba(0, 234, 255, 0.8)',
                        'rgba(106, 92, 255, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(255, 217, 61, 0.8)'
                    ],
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#fff'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff',
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        max: 100
                    }
                }
            }
        });
    }

    // الرسم البياني الدائري المتعدد (Doughnut Chart)
    const doughnutCtx = document.getElementById('doughnutChart')?.getContext('2d');
    if (doughnutCtx) {
        new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['القاهرة', 'الإسكندرية', 'أسوان', 'الأقصر', 'العلمين'],
                datasets: [{
                    data: [5, 3, 2, 3, 2],
                    backgroundColor: [
                        '#00eaff',
                        '#6a5cff',
                        '#ff6b6b',
                        '#ffd93d',
                        '#6bffb8'
                    ],
                    borderColor: '#0a0f1c',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#fff',
                            font: {
                                family: 'Cairo',
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + ' مدينة';
                            }
                        }
                    }
                }
            }
        });
    }

    // الجرافات الصغيرة (Mini Charts) - بدون حركة
    createMiniChart('miniChart1', 85);
    createMiniChart('miniChart2', 92);
    createMiniChart('miniChart3', 78);
    createMiniChart('miniChart4', 88);
}

function createMiniChart(elementId, percentage) {
    const ctx = document.getElementById(elementId)?.getContext('2d');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, 100 - percentage],
                backgroundColor: ['#00eaff', 'rgba(255, 255, 255, 0.1)'],
                borderWidth: 0,
                circumference: 360,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

// منع أي حركة للرسوم البيانية عند التمرير
function freezeChartsOnScroll() {
    const charts = document.querySelectorAll('.chart-wrapper canvas, .mini-chart canvas');
    charts.forEach(chart => {
        chart.style.animation = 'none';
        chart.style.transition = 'none';
    });
}

// ================================================
// تهيئة المكتبات عند تحميل الصفحة
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    // استخدام شاشة التحميل الجديدة
    const loader = new NewLoadingScreen();
    window.pageLoader = loader;

    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out',
        mirror: false
    });

    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    setTimeout(() => {
        initThreeScene();
    }, 500);

    initNavbar();
    initSmoothScroll();
    initNavbarScroll();
    initProgressBars();
    new StatsManager();

    setTimeout(() => {
        loader.updateProgress(45);
        loader.updateMessage(loader.loadingMessages[1]);
    }, 500);
    
    setTimeout(() => {
        loader.updateProgress(78);
        loader.updateMessage(loader.loadingMessages[3]);
    }, 1500);

    setTimeout(() => {
        initCharts();
        freezeChartsOnScroll();
    }, 4000);

    initLottieAnimations();
    
    window.addEventListener('scroll', freezeChartsOnScroll);
    window.addEventListener('resize', freezeChartsOnScroll);
});

function initNavbar() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.getElementById('discover-btn')?.addEventListener('click', () => {
        document.getElementById('vision').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    document.getElementById('video-btn')?.addEventListener('click', () => {
        alert('سيتم تشغيل الفيديو التعريفي قريباً');
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill[data-progress]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                
                const parent = entry.target.closest('.ai-category');
                if (parent) {
                    const valueElement = parent.querySelector('.progress-value');
                    if (valueElement) {
                        valueElement.textContent = progress + '%';
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

function initLottieAnimations() {
    // يمكن إضافة تأثيرات Lottie هنا
}

document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Form submitted:', data);
    
    showNotification('تم إرسال رسالتك بنجاح!', 'success');
    
    e.target.reset();
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #00eaff, #6a5cff);
        color: #0a0f1c;
        padding: 1rem 2rem;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});