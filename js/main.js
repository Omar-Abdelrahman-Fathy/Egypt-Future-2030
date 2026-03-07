// ================================================
// الملف الرئيسي - معدل للعمل مع الملفات المحلية
// ================================================

// استيراد مشهد Three.js
import { initThreeScene } from './three-scene.js';

// ================================================
// شاشة التحميل
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
// تهيئة الرسوم البيانية
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
                animation: false,
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
            const labels = ['مدن ذكية (30)', 'مشروعات بنية تحتية (22)', 'مشروعات طاقة الخضراء (36)', 'مشروعات رقمية (210)', 'مشروعات نقل (107)'];
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

    // الرسم البياني الخطي
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

    // الرسم البياني الشريطي
    const barCtx = document.getElementById('barChart')?.getContext('2d');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['التعليم', 'الصحة', 'النقل', 'الأمن'],
                datasets: [{
                    label: 'نسبة التقدم',
                    data: [90, 85, 92, 88],
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

    // الرسم البياني الدائري المتعدد
    const doughnutCtx = document.getElementById('doughnutChart')?.getContext('2d');
    if (doughnutCtx) {
        new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['القاهرة', 'الإسكندرية', 'أسوان', 'الأقصر', 'الجيزة'],
                datasets: [{
                    data: [3, 3, 1, 1, 4],
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

    // الجرافات الصغيرة
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

function freezeChartsOnScroll() {
    const charts = document.querySelectorAll('.chart-wrapper canvas, .mini-chart canvas');
    charts.forEach(chart => {
        chart.style.animation = 'none';
        chart.style.transition = 'none';
    });
}

// ================================================
// دوال مساعدة
// ================================================

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

// ================================================
// التهيئة الرئيسية
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    // شاشة التحميل
    const loader = new NewLoadingScreen();
    window.pageLoader = loader;

    // تهيئة AOS (مكتبة Animations On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            mirror: false
        });
    }

    // تهيئة Swiper
    if (typeof Swiper !== 'undefined') {
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
    }

    // تهيئة Three.js بعد تأخير بسيط
    setTimeout(() => {
        try {
            initThreeScene();
        } catch (error) {
            console.error('Three.js initialization error:', error);
        }
    }, 500);

    // تهيئة المكونات الأخرى
    initNavbar();
    initSmoothScroll();
    initNavbarScroll();
    initProgressBars();
    new StatsManager();

    // تحديث شاشة التحميل
    setTimeout(() => {
        loader.updateProgress(45);
        loader.updateMessage(loader.loadingMessages[1]);
    }, 500);
    
    setTimeout(() => {
        loader.updateProgress(78);
        loader.updateMessage(loader.loadingMessages[3]);
    }, 1500);

    // تهيئة الرسوم البيانية بعد انتهاء التحميل
    setTimeout(() => {
        initCharts();
        freezeChartsOnScroll();
    }, 4000);

    // معالجة حدث التمرير لتجميد الرسوم البيانية
    window.addEventListener('scroll', freezeChartsOnScroll);
    window.addEventListener('resize', freezeChartsOnScroll);
});

// معالجة نموذج الاتصال
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Form submitted:', data);
    
    showNotification('تم إرسال رسالتك بنجاح!', 'success');
    
    e.target.reset();
});

// ========== نظام Pop-up المتقدم للمشروعات ==========
(function initProjectPopup() {
    // الحصول على عناصر الـ Popup
    const popup = document.getElementById('project-popup');
    if (!popup) return; // التأكد من وجود العنصر
    
    const popupTitle = document.getElementById('popup-title');
    const popupImage = document.getElementById('popup-image');
    const popupDesc = document.getElementById('popup-description');
    const popupProgress = document.getElementById('popup-progress');
    const popupStartDate = document.getElementById('popup-start-date');
    const popupCost = document.getElementById('popup-cost');
    const popupFeaturesList = document.getElementById('popup-features-list');
    const closePopupBtn = document.querySelector('.close-popup');
    const closeBtnAlt = document.getElementById('popup-close-btn');

    // قاعدة بيانات المشروعات (مفصلة)
    const projectsDatabase = [
        {
            id: 0,
            title: 'العاصمة الإدارية الجديدة',
            image: 'images/Projects/Administratibe capital.jpg',
            description: 'أول مدينة ذكية ومستدامة من الجيل الرابع في مصر، تمثل المركز الإداري والاقتصادي الجديد. تضم حي مال وأعمال عالمي، والبرج الأيقوني، ومركز قيادة وسيطرة ذكي يدير كافة مرافق المدينة بتقنيات الذكاء الاصطناعي',
            progress: '98%',
            startDate: '2016',
            cost: '800 مليار جنيه',
            features: [
                'أطول برج في إفريقيا بارتفاع 393.8 متر ويعد علامة معمارية عالمية',
                'أكبر مركز بيانات وحوسبة سحابية في المنطقة لتأمين وإدارة بيانات الدولة',
                'يضم أكبر تجمع للمساحات الخضراء والبحيرات الصناعية، بمساحة تتجاوز 6000 فدان',
                'ترابط كامل عبر المونوريل والقطار الكهربائي الخفيف (LRT) الذي يربطها بالقاهرة الكبرى',
                'تعتمد بالكامل على تكنولوجيا Internet of Things (IoT) في إدارة المرور، النفايات، والطاقة'
            ]
        },
        {
            id: 1,
            title: 'محطة بنبان للطاقة الشمسية',
            image: 'images/Projects/Bnban.jpg',
            description: 'يُعد أحد أكبر مجمعات الطاقة الشمسية في العالم، ويمتد على مساحة 37 كم². يضم 32 محطة بقدرة إجمالية تصل إلى 1465 ميجاوات (كقدرة تشغيلية فعلية مستقرة)، مع خطط توسعية لرفع القدرات الإجمالية للمنطقة المحيطة. يمثل المشروع ركيزة أساسية لتحويل مصر إلى مركز إقليمي للطاقة الخضراء',
            progress: '100%',
            startDate: '2017',
            cost: '2.2 مليار دولار',
            features: [
                'رابع أكبر مجمع شمسي في العالم و الأكبر في أفريقيا والشرق الأوسط',
                'يقلل الانبعاثات الكربونية بمقدار 2 مليون طن سنوياً',
                'وفر أكثر من 10 آلاف فرصة عمل مباشرة وغير مباشرة',
                'حائز على جائزة التميز من البنك الدولي وجائزة التميز الحكومي العربي',
                'يغطي مساحة 37 كم²'
            ]
        },
        {
            id: 2,
            title: 'مشروع التحول الرقمي',
            image: 'images/Projects/Digital transformation.png',
            description: 'يهدف إلى ميكنة جميع الخدمات الحكومية وتقديمها عبر منصة "مصر الرقمية". يشمل ذلك خدمات الأحوال المدنية، المرور، الضرائب، الشهر العقاري، والتوثيق. تم تدريب آلاف الموظفين على النظام الجديد، وتم إنشاء مراكز بيانات عملاقة لتأمين المعلومات. الهدف هو توفير الوقت والجهد على المواطنين وتحسين كفاءة الأداء الحكومي.',
            progress: '95%',
            startDate: '2018',
            cost: '50 مليار جنيه',
            features: [
                'أكثر من 200+ خدمة حكومية متاحة أونلاين',
                'منظومة الدفع الموحد: ربط شامل بكافة الوسائل الإلكترونية (كروت ميزة، محافظ المحمول، والعملات الرقمية المقننة)',
                'تطبيق موحد للهواتف الذكية',
                'ربط 100% من الجهات: تم ربط جميع الوزارات والهيئات (أكثر من 50 جهة حكومية) بمنصة تبادل البيانات',
                'الهوية الرقمية: تفعيل التوقيع الإلكتروني والهوية الرقمية للمواطنين في كافة المعاملات الرسمية'
            ]
        },
        {
            id: 3,
            title: 'شبكة القطار الكهربائي',
            image: 'images/Projects/Fast tarin.jpg',
            description: 'منظومة نقل ذكية ومتكاملة تُعد قناة سويس جديدة على قضبان، تربط البحر الأحمر بالبحر المتوسط وكافة أنحاء الجمهورية. تتكون من 4 خطوط رئيسية (بعد إضافة الخط الرابع) بطول يتجاوز 2250 كم، لتوفر وسيلة نقل حضارية فائقة السرعة وصديقة للبيئة',
            progress: '85%',
            startDate: '2020',
            cost: '360 مليار جنيه',
            features: [
                'سرعة تصل إلى 250 كم/ساعة',
                'ربط موانئ البحر الأحمر بموانئ البحر المتوسط (السخنة - العلمين - مطروح)',
                'نقل أكثر من 2.5 مليون راكب يومياً عند اكتمال المنظومة',
                'خفض انبعاثات الكربون بنسبة تصل إلى 70% مقارنة بالنقل البري التقليدي',
                'الاعتماد على نظام التحكم الآلي الأوروبي (ETCS Level 2) لضمان أعلى معايير الأمان العالمية'
            ]
        }
    ];

    // إضافة حدث النقر لكل بطاقة مشروع
    document.querySelectorAll('.project-card').forEach((card) => {
        // إضافة مؤشر لليد لتوضيح إمكانية الضغط
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // منع انتشار الحدث إذا تم الضغط على رابط داخل البطاقة
            e.stopPropagation();
            
            // الحصول على ID المشروع من البيانات المخصصة
            const projectId = this.getAttribute('data-project-id');
            
            if (projectId !== null) {
                const project = projectsDatabase[parseInt(projectId)];
                if (project) {
                    openPopup(project);
                }
            }
        });

        // إضافة تأثيرات GSAP للبطاقة
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

    // دالة فتح الـ Popup
    function openPopup(project) {
        // تعبئة البيانات
        popupTitle.textContent = project.title;
        popupImage.src = project.image;
        popupImage.alt = project.title;
        popupDesc.textContent = project.description;
        popupProgress.textContent = project.progress;
        popupStartDate.textContent = project.startDate;
        popupCost.textContent = project.cost;
        
        // تعبئة قائمة المميزات
        popupFeaturesList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            popupFeaturesList.appendChild(li);
        });

        // إظهار الـ Popup
        popup.classList.add('show');
        
        // منع تمرير الصفحة خلف الـ Popup
        document.body.style.overflow = 'hidden';
        
        // تأثير إضافي عند الفتح
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(popup.querySelector('.popup-content'), 
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
            );
        }
    }

    // دالة إغلاق الـ Popup
    function closePopup() {
        popup.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // تأثير عند الإغلاق
        if (typeof gsap !== 'undefined') {
            gsap.to(popup.querySelector('.popup-content'), {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    }

    // إضافة أحداث الإغلاق
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }
    
    if (closeBtnAlt) {
        closeBtnAlt.addEventListener('click', closePopup);
    }

    // إغلاق عند الضغط خارج محتوى الـ Popup
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // إغلاق عند الضغط على زر ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });
})();