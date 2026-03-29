/* ================================================
   مصر 2030 - الملف الرئيسي للجافاسكريبت
   الإصدار: 2.0
   ================================================ */

// ================================================
// 1. فئة شاشة التحميل
// ================================================

class LoadingScreen {
    constructor() {
        this.screen = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('loading-progress-bar');
        this.percentageEl = document.getElementById('loading-percentage-neon');
        this.messageEl = document.getElementById('loading-message-neon');
        this.progress = 0;
        this.messages = [
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

    updateProgress(value) {
        this.progress = Math.min(value, 100);
        if (this.progressBar) {
            this.progressBar.style.width = `${this.progress}%`;
        }
        if (this.percentageEl) {
            this.percentageEl.textContent = `${this.progress}%`;
        }
    }

    updateMessage(text) {
        if (this.messageEl) {
            this.messageEl.textContent = text;
        }
    }

    async start() {
        const stages = [
            { progress: 15, message: this.messages[0], delay: 300 },
            { progress: 34, message: this.messages[0], delay: 800 },
            { progress: 45, message: this.messages[1], delay: 1200 },
            { progress: 60, message: this.messages[2], delay: 1800 },
            { progress: 78, message: this.messages[3], delay: 2400 },
            { progress: 90, message: this.messages[4], delay: 3000 },
            { progress: 100, message: this.messages[4], delay: 3500 }
        ];

        for (const stage of stages) {
            await this.delay(stage.delay);
            this.updateProgress(stage.progress);
            this.updateMessage(stage.message);
        }

        await this.delay(500);
        this.hide();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    hide() {
        if (!this.screen) return;
        
        this.screen.style.opacity = '0';
        setTimeout(() => {
            this.screen.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.startCounters();
            this.dispatchLoadedEvent();
        }, 800);
    }

    startCounters() {
        const counters = document.querySelectorAll('.hero-stat .number, .stat-number[data-target]');
        
        counters.forEach(counter => {
            const targetText = counter.textContent;
            let target = parseInt(targetText.replace(/[^0-9]/g, ''));
            
            if (isNaN(target)) return;
            
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOut);
                
                if (targetText.includes('+')) {
                    counter.textContent = `${current}+`;
                } else {
                    counter.textContent = current;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = targetText;
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    dispatchLoadedEvent() {
        window.dispatchEvent(new CustomEvent('app:loaded'));
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// ================================================
// 2. فئة الكاروسيل
// ================================================

class ProjectsCarousel {
    constructor() {
        this.wrapper = document.getElementById('projectsWrapper');
        this.slides = document.querySelectorAll('.project-slide');
        this.prevBtn = document.querySelector('.carousel-nav.prev');
        this.nextBtn = document.querySelector('.carousel-nav.next');
        this.dotsContainer = document.getElementById('carouselDots');
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.slidesPerView = this.getSlidesPerView();
        this.autoPlayInterval = null;
        this.isAnimating = false;
        
        if (this.totalSlides === 0) return;
        
        this.init();
    }

    getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    init() {
        this.createDots();
        this.updateCarousel();
        this.addEventListeners();
        this.startAutoPlay();
        this.handleResize();
        this.addGSAPEffects();
    }

    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        this.updateDots();
    }

    updateCarousel() {
        if (this.isAnimating) return;
        
        const slideWidth = this.slides[0]?.offsetWidth || 280;
        const gap = 24;
        const scrollPosition = this.currentIndex * (slideWidth + gap);
        
        if (this.wrapper) {
            this.wrapper.style.transform = `translateX(-${scrollPosition}px)`;
        }
        
        this.updateDots();
        this.updateButtons();
        this.updateSlideVisibility();
    }

    updateDots() {
        const dots = document.querySelectorAll('.carousel-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateButtons() {
        const maxIndex = this.totalSlides - this.slidesPerView;
        
        if (this.prevBtn) {
            const isDisabled = this.currentIndex === 0;
            this.prevBtn.style.opacity = isDisabled ? '0.5' : '1';
            this.prevBtn.style.pointerEvents = isDisabled ? 'none' : 'auto';
        }
        
        if (this.nextBtn) {
            const isDisabled = this.currentIndex >= maxIndex;
            this.nextBtn.style.opacity = isDisabled ? '0.5' : '1';
            this.nextBtn.style.pointerEvents = isDisabled ? 'none' : 'auto';
        }
    }

    updateSlideVisibility() {
        this.slides.forEach((slide, index) => {
            const isVisible = index >= this.currentIndex && 
                            index < this.currentIndex + this.slidesPerView;
            slide.style.display = isVisible ? 'block' : 'none';
            slide.classList.toggle('active', isVisible);
        });
    }

    nextSlide() {
        if (this.isAnimating) return;
        
        const maxIndex = this.totalSlides - this.slidesPerView;
        if (this.currentIndex < maxIndex) {
            this.isAnimating = true;
            this.currentIndex++;
            this.updateCarousel();
            setTimeout(() => { this.isAnimating = false; }, 500);
        }
    }

    prevSlide() {
        if (this.isAnimating) return;
        
        if (this.currentIndex > 0) {
            this.isAnimating = true;
            this.currentIndex--;
            this.updateCarousel();
            setTimeout(() => { this.isAnimating = false; }, 500);
        }
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        
        const maxIndex = this.totalSlides - this.slidesPerView;
        const targetIndex = Math.min(Math.max(index, 0), maxIndex);
        
        if (targetIndex !== this.currentIndex) {
            this.isAnimating = true;
            this.currentIndex = targetIndex;
            this.updateCarousel();
            setTimeout(() => { this.isAnimating = false; }, 500);
        }
    }

    startAutoPlay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        
        this.autoPlayInterval = setInterval(() => {
            const maxIndex = this.totalSlides - this.slidesPerView;
            if (this.currentIndex >= maxIndex) {
                this.goToSlide(0);
            } else {
                this.nextSlide();
            }
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                setTimeout(() => this.startAutoPlay(), 10000);
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                setTimeout(() => this.startAutoPlay(), 10000);
            });
        }
        
        if (this.wrapper) {
            this.wrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.wrapper.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        document.addEventListener('keydown', (e) => {
            if (document.activeElement?.closest('#projects')) {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.stopAutoPlay();
                    this.prevSlide();
                    setTimeout(() => this.startAutoPlay(), 10000);
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.stopAutoPlay();
                    this.nextSlide();
                    setTimeout(() => this.startAutoPlay(), 10000);
                }
            }
        });
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newSlidesPerView = this.getSlidesPerView();
                if (newSlidesPerView !== this.slidesPerView) {
                    this.slidesPerView = newSlidesPerView;
                    this.updateCarousel();
                }
            }, 250);
        });
    }

    addGSAPEffects() {
        if (typeof gsap === 'undefined') return;
        
        document.querySelectorAll('.project-card-horizontal').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
                gsap.to(card.querySelector('.progress-fill'), { scaleY: 1.2, duration: 0.3 });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
                gsap.to(card.querySelector('.progress-fill'), { scaleY: 1, duration: 0.3 });
            });
        });
        
        gsap.fromTo('.project-card-horizontal', 
            { opacity: 0, y: 50, scale: 0.95 },
            { 
                opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1,
                scrollTrigger: { trigger: '#projects', start: 'top 80%' }
            }
        );
    }
}

// ================================================
// 3. قاعدة بيانات المشروعات
// ================================================

const PROJECTS_DATABASE = [
    {
        id: 0,
        title: 'العاصمة الإدارية الجديدة',
        image: 'images/Projects/administrative-capital.jpg',
        description: 'أول مدينة ذكية ومستدامة من الجيل الرابع في مصر، تمثل المركز الإداري والاقتصادي الجديد. تضم حي مال وأعمال عالمي، والبرج الأيقوني، ومركز قيادة وسيطرة ذكي يدير كافة مرافق المدينة بتقنيات الذكاء الاصطناعي.',
        progress: '98%',
        startDate: '2016',
        cost: '800 مليار جنيه',
        completionDate: '2024',
        features: [
            'أطول برج في إفريقيا بارتفاع 393.8 متر',
            'أكبر مركز بيانات وحوسبة سحابية في المنطقة',
            'يضم أكبر تجمع للمساحات الخضراء والبحيرات الصناعية',
            'ترابط كامل عبر المونوريل والقطار الكهربائي الخفيف',
            'تعتمد بالكامل على تكنولوجيا إنترنت الأشياء'
        ]
    },
    {
        id: 1,
        title: 'محطة بنبان للطاقة الشمسية',
        image: 'images/Projects/benban-solar.jpg',
        description: 'يُعد أحد أكبر مجمعات الطاقة الشمسية في العالم، ويمتد على مساحة 37 كم². يضم 32 محطة بقدرة إجمالية تصل إلى 1465 ميجاوات. يمثل المشروع ركيزة أساسية لتحويل مصر إلى مركز إقليمي للطاقة الخضراء.',
        progress: '100%',
        startDate: '2017',
        cost: '2.2 مليار دولار',
        completionDate: '2019',
        features: [
            'رابع أكبر مجمع شمسي في العالم',
            'يقلل الانبعاثات الكربونية بمقدار 2 مليون طن سنوياً',
            'وفر أكثر من 10 آلاف فرصة عمل',
            'حائز على جائزة التميز من البنك الدولي',
            'يغطي مساحة 37 كم²'
        ]
    },
    {
        id: 2,
        title: 'شبكة القطار الكهربائي',
        image: 'images/Projects/electric-train.jpg',
        description: 'منظومة نقل ذكية ومتكاملة تُعد قناة سويس جديدة على قضبان، تربط البحر الأحمر بالبحر المتوسط وكافة أنحاء الجمهورية. تتكون من 4 خطوط رئيسية بطول يتجاوز 2250 كم.',
        progress: '85%',
        startDate: '2020',
        cost: '360 مليار جنيه',
        completionDate: '2026',
        features: [
            'سرعة تصل إلى 250 كم/ساعة',
            'ربط موانئ البحر الأحمر بموانئ البحر المتوسط',
            'نقل أكثر من 2.5 مليون راكب يومياً',
            'خفض انبعاثات الكربون بنسبة تصل إلى 70%',
            'نظام تحكم آلي أوروبي ETCS Level 2'
        ]
    },
    {
        id: 3,
        title: 'مشروع التحول الرقمي',
        image: 'images/Projects/digital-transformation.jpg',
        description: 'يهدف إلى ميكنة جميع الخدمات الحكومية وتقديمها عبر منصة "مصر الرقمية". يشمل ذلك خدمات الأحوال المدنية، المرور، الضرائب، الشهر العقاري، والتوثيق.',
        progress: '95%',
        startDate: '2018',
        cost: '50 مليار جنيه',
        completionDate: '2025',
        features: [
            'أكثر من 200+ خدمة حكومية متاحة أونلاين',
            'منظومة الدفع الموحد',
            'تطبيق موحد للهواتف الذكية',
            'ربط 100% من الجهات الحكومية',
            'الهوية الرقمية والتوقيع الإلكتروني'
        ]
    },
    {
        id: 4,
        title: 'مدينة العلمين الجديدة',
        image: 'images/Projects/new-alamein.jpg',
        description: 'مدينة ساحلية ذكية من الجيل الرابع، تضم أبراجاً شاهقة، فنادق عالمية، ومنطقة ترفيهية متكاملة. تعتبر وجهة سياحية واستثمارية عالمية على البحر المتوسط.',
        progress: '90%',
        startDate: '2018',
        cost: '500 مليار جنيه',
        completionDate: '2025',
        features: [
            'أطول الأبراج السكنية على الساحل الشمالي',
            'منطقة ترفيهية متكاملة',
            'مارينا عالمية لليخوت',
            'مدينة رياضية بمواصفات أولمبية',
            'منطقة حرة استثمارية'
        ]
    }
];

// ================================================
// 4. فئة الـ Pop-up
// ================================================

class ProjectPopup {
    constructor() {
        this.popup = document.getElementById('project-popup');
        if (!this.popup) return;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.bindProjectCards();
    }

    bindEvents() {
        const closeBtn = document.querySelector('.close-popup');
        const closeBtnAlt = document.getElementById('popup-close-btn');
        
        closeBtn?.addEventListener('click', () => this.close());
        closeBtnAlt?.addEventListener('click', () => this.close());
        
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) this.close();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('show')) {
                this.close();
            }
        });
    }

    bindProjectCards() {
        const cards = document.querySelectorAll('.project-card-horizontal');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const slide = card.closest('.project-slide');
                const projectId = slide?.getAttribute('data-project-id');
                
                if (projectId !== null) {
                    const project = PROJECTS_DATABASE[parseInt(projectId)];
                    if (project) this.open(project);
                }
            });
        });
    }

    open(project) {
        this.setContent(project);
        this.popup.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(this.popup.querySelector('.popup-content'),
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' }
            );
        }
    }

    setContent(project) {
        document.getElementById('popup-title').textContent = project.title;
        
        const img = document.getElementById('popup-image');
        img.src = project.image;
        img.alt = project.title;
        
        document.getElementById('popup-description').textContent = project.description;
        document.getElementById('popup-progress').textContent = project.progress;
        document.getElementById('popup-start-date').textContent = project.startDate;
        document.getElementById('popup-cost').textContent = project.cost;
        
        const featuresList = document.getElementById('popup-features-list');
        if (featuresList) {
            featuresList.innerHTML = project.features
                .map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`)
                .join('');
        }
        
        this.addCompletionDate(project.completionDate);
    }

    addCompletionDate(completionDate) {
        if (!completionDate) return;
        
        const statsContainer = document.querySelector('.popup-stats');
        let completionStat = document.querySelector('.popup-completion-stat');
        
        if (!completionStat) {
            completionStat = document.createElement('div');
            completionStat.className = 'popup-stat-item popup-completion-stat';
            statsContainer?.appendChild(completionStat);
        }
        
        completionStat.innerHTML = `
            <span class="popup-stat-label">تاريخ الانتهاء</span>
            <span class="popup-stat-value">${completionDate}</span>
        `;
    }

    close() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.popup.querySelector('.popup-content'), {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    this.popup.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        } else {
            this.popup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
}

// ================================================
// 5. فئة الشات بوت
// ================================================

class ChatBot {
    constructor() {
        this.container = document.getElementById('chatbot');
        this.toggleBtn = document.querySelector('.chatbot-toggle');
        this.closeBtn = document.querySelector('.close-chat');
        this.sendBtn = document.getElementById('sendMessage');
        this.userInput = document.getElementById('userInput');
        this.messagesContainer = document.getElementById('chatMessages');
        
        this.init();
    }

    init() {
        if (this.toggleBtn) {
            this.toggleBtn.onclick = () => this.toggle();
        }
        if (this.closeBtn) {
            this.closeBtn.onclick = () => this.close();
        }
        if (this.sendBtn) {
            this.sendBtn.onclick = () => this.sendMessage();
        }
        if (this.userInput) {
            this.userInput.onkeypress = (e) => {
                if (e.key === 'Enter') this.sendMessage();
            };
        }
    }

    toggle() {
        this.container?.classList.toggle('active');
    }

    close() {
        this.container?.classList.remove('active');
    }

    sendMessage() {
        const message = this.userInput?.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.userInput.value = '';
        
        setTimeout(() => {
            this.getBotResponse(message);
        }, 500);
    }

    addMessage(text, type) {
        if (!this.messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(text)}</p>
            </div>
            <span class="message-time">الآن</span>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        let response = '';
        
        if (lowerMsg.includes('مرحب') || lowerMsg.includes('السلام')) {
            response = 'مرحباً بك! أنا المستشار الذكي لمستقبل مصر 2030. كيف يمكنني مساعدتك؟';
        } else if (lowerMsg.includes('مصر') && lowerMsg.includes('2030')) {
            response = 'رؤية مصر 2030 هي أجندة وطنية طموحة لتحقيق التنمية المستدامة في مصر، تشمل التحول الرقمي، المشروعات القومية، والذكاء الاصطناعي.';
        } else if (lowerMsg.includes('مشروع') || lowerMsg.includes('العاصمة')) {
            response = 'لدينا العديد من المشروعات القومية مثل العاصمة الإدارية الجديدة، محطة بنبان للطاقة الشمسية، وشبكة القطار الكهربائي. يمكنك تصفح قسم المشاريع للمزيد من التفاصيل!';
        } else if (lowerMsg.includes('ذكاء') || lowerMsg.includes('ai')) {
            response = 'مصر أطلقت الاستراتيجية الوطنية للذكاء الاصطناعي في 2021 بهدف توظيف تقنيات الذكاء الاصطناعي في خدمة المواطن وتحقيق أهداف رؤية مصر 2030.';
        } else if (lowerMsg.includes('شكر')) {
            response = 'العفو! سعيد بمساعدتك. هل تريد معرفة المزيد عن مشروعات مصر 2030؟';
        } else {
            response = 'شكراً لسؤالك! يمكنك تصفح أقسام الموقع المختلفة للتعرف على رؤية مصر 2030، المشروعات القومية، وتقنيات الذكاء الاصطناعي. هل تريد مساعدة في شيء محدد؟';
        }
        
        this.addMessage(response, 'bot');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ================================================
// 6. فئة التنقل
// ================================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMenuToggle();
        this.handleActiveLinks();
        this.handleSmoothScroll();
        
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (!this.navbar) return;
        
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        this.updateActiveLink();
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    handleMenuToggle() {
        if (!this.menuToggle || !this.navMenu) return;
        
        this.menuToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.menuToggle.classList.toggle('active');
            
            const spans = this.menuToggle.querySelectorAll('span');
            if (this.menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.menuToggle.classList.remove('active');
                
                const spans = this.menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    handleActiveLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80;
                    target.scrollIntoView({ behavior: 'smooth' });
                    window.scrollBy(0, -offset);
                }
            });
        });
        
        const discoverBtn = document.getElementById('discover-btn');
        discoverBtn?.addEventListener('click', () => {
            document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    handleSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ================================================
// 7. فئة العدادات
// ================================================

class StatsManager {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-target]');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.init();
    }

    init() {
        this.counters.forEach(counter => this.observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(target * easeOut);
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ================================================
// 8. فئة الرسوم البيانية
// ================================================

class ChartsManager {
    constructor() {
        this.charts = [];
        this.init();
    }

    init() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }
        
        this.createPieChart();
        this.createLineChart();
        this.createBarChart();
        this.createDoughnutChart();
        this.createMiniCharts();
    }

    createPieChart() {
        const ctx = document.getElementById('pieChart')?.getContext('2d');
        if (!ctx) return;
        
        this.charts.push(new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['مدن ذكية', 'بنية تحتية', 'طاقة خضراء', 'مشروعات رقمية', 'مشروعات نقل'],
                datasets: [{
                    data: [15, 12, 8, 5, 2],
                    backgroundColor: ['#00eaff', '#6a5cff', '#ff6b6b', '#ffd93d', '#6bffb8'],
                    borderColor: '#0a0f1c',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: 'rgba(10, 15, 28, 0.9)' }
                }
            }
        }));
    }

    createLineChart() {
        const ctx = document.getElementById('lineChart')?.getContext('2d');
        if (!ctx) return;
        
        this.charts.push(new Chart(ctx, {
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
                    pointBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#fff' } },
                    y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#fff' } }
                }
            }
        }));
    }

    createBarChart() {
        const ctx = document.getElementById('barChart')?.getContext('2d');
        if (!ctx) return;
        
        this.charts.push(new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['التعليم', 'الصحة', 'النقل', 'الأمن'],
                datasets: [{
                    label: 'نسبة التقدم',
                    data: [90, 85, 92, 88],
                    backgroundColor: ['rgba(0, 234, 255, 0.8)', 'rgba(106, 92, 255, 0.8)', 'rgba(255, 107, 107, 0.8)', 'rgba(255, 217, 61, 0.8)'],
                    borderRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { max: 100, ticks: { callback: v => v + '%' } } }
            }
        }));
    }

    createDoughnutChart() {
        const ctx = document.getElementById('doughnutChart')?.getContext('2d');
        if (!ctx) return;
        
        this.charts.push(new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['القاهرة', 'الإسكندرية', 'أسوان', 'الأقصر', 'الجيزة'],
                datasets: [{
                    data: [3, 3, 1, 1, 4],
                    backgroundColor: ['#00eaff', '#6a5cff', '#ff6b6b', '#ffd93d', '#6bffb8'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } }
            }
        }));
    }

    createMiniCharts() {
        const percentages = [85, 92, 78, 88];
        percentages.forEach((percent, i) => {
            const ctx = document.getElementById(`miniChart${i + 1}`)?.getContext('2d');
            if (!ctx) return;
            
            this.charts.push(new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [percent, 100 - percent],
                        backgroundColor: ['#00eaff', 'rgba(255, 255, 255, 0.1)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '70%',
                    plugins: { legend: { display: false }, tooltip: { enabled: false } }
                }
            }));
        });
    }
}

// ================================================
// 9. فئة نوعwriter
// ================================================

class TypeWriter {
    constructor(element, texts, options = {}) {
        this.el = element;
        this.texts = texts;
        this.typeSpeed = options.typeSpeed || 75;
        this.deleteSpeed = options.deleteSpeed || 40;
        this.pauseTime = options.pauseTime || 2200;
        this.currentText = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.timer = null;
        
        this.start();
    }

    start() {
        this.el.textContent = '';
        this.tick();
    }

    tick() {
        const fullText = this.texts[this.currentText];
        
        if (this.isDeleting) {
            this.currentChar--;
            this.el.textContent = fullText.substring(0, this.currentChar);
            
            if (this.currentChar === 0) {
                this.isDeleting = false;
                this.currentText = (this.currentText + 1) % this.texts.length;
                this.timer = setTimeout(() => this.tick(), 350);
            } else {
                this.timer = setTimeout(() => this.tick(), this.deleteSpeed);
            }
        } else {
            this.currentChar++;
            this.el.textContent = fullText.substring(0, this.currentChar);
            
            if (this.currentChar === fullText.length) {
                this.isDeleting = true;
                this.timer = setTimeout(() => this.tick(), this.pauseTime);
            } else {
                this.timer = setTimeout(() => this.tick(), this.typeSpeed);
            }
        }
    }

    destroy() {
        clearTimeout(this.timer);
    }
}

// ================================================
// 10. الإشعارات
// ================================================

class NotificationManager {
    static show(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            background: 'linear-gradient(135deg, #00eaff, #6a5cff)',
            color: '#0a0f1c',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ================================================
// 11. فئة نموذج الاقتراحات
// ================================================

class SuggestionForm {
    constructor() {
        this.form = document.getElementById('suggestionForm');
        if (!this.form) return;
        
        this.init();
    }

    init() {
        this.validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        this.validatePhone = (phone) => !phone || /^(01)[0-9]{9}$/.test(phone);
        
        this.setupFileUpload();
        this.setupSubmit();
    }

    setupFileUpload() {
        const fileInput = document.getElementById('suggestionAttachment');
        const fileCustom = document.querySelector('.file-custom');
        
        fileInput?.addEventListener('change', () => {
            if (fileCustom) {
                fileCustom.textContent = fileInput.files?.[0]?.name || 'اختر ملفاً...';
            }
        });
    }

    setupSubmit() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!this.validateForm()) return;
            
            const submitBtn = document.getElementById('submitSuggestion');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('.fa-paper-plane');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            submitBtn.disabled = true;
            if (btnText) btnText.style.opacity = '0.7';
            if (btnIcon) btnIcon.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            
            await this.delay(1500);
            
            NotificationManager.show('✅ تم تقديم اقتراحك بنجاح! شكراً لمشاركتك.', 'success');
            
            submitBtn.disabled = false;
            if (btnText) btnText.style.opacity = '1';
            if (btnIcon) btnIcon.style.display = 'inline-block';
            if (btnLoader) btnLoader.style.display = 'none';
            
            this.form.reset();
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('input, select, textarea').forEach(el => el.style.borderColor = '');
        });
    }

    validateForm() {
        let isValid = true;
        
        const name = document.getElementById('suggestionName')?.value.trim();
        if (!name || name.length < 3) {
            this.showError('suggestionName', 'الاسم يجب أن يكون 3 أحرف على الأقل');
            isValid = false;
        }
        
        const email = document.getElementById('suggestionEmail')?.value.trim();
        if (!this.validateEmail(email)) {
            this.showError('suggestionEmail', 'البريد الإلكتروني غير صحيح');
            isValid = false;
        }
        
        const phone = document.getElementById('suggestionPhone')?.value.trim();
        if (phone && !this.validatePhone(phone)) {
            this.showError('suggestionPhone', 'رقم الهاتف غير صحيح');
            isValid = false;
        }
        
        const message = document.getElementById('suggestionMessage')?.value.trim();
        if (!message || message.length < 10) {
            this.showError('suggestionMessage', 'الرجاء كتابة اقتراح أكثر تفصيلاً');
            isValid = false;
        }
        
        const agree = document.getElementById('agreeTerms')?.checked;
        if (!agree) {
            NotificationManager.show('الرجاء الموافقة على شروط الاستخدام', 'info');
            isValid = false;
        }
        
        return isValid;
    }

    showError(inputId, message) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        const formGroup = input.closest('.form-group');
        let error = formGroup.querySelector('.error-message');
        
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            error.style.cssText = 'color: #ff6b6b; font-size: 0.8rem; margin-top: 0.3rem;';
            formGroup.appendChild(error);
        }
        
        error.textContent = message;
        input.style.borderColor = '#ff6b6b';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ================================================
// 12. تهيئة الموقع
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    // تهيئة شاشة التحميل
    const loader = new LoadingScreen();
    window.loader = loader;
    
    // تهيئة AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }
    
    // تهيئة المكونات
    setTimeout(() => {
        new Navigation();
        new StatsManager();
        new ChartsManager();
        new ProjectsCarousel();
        new ProjectPopup();
        new ChatBot();
        new SuggestionForm();
        new StoryStackedTimeline();
        
        // TypeWriter
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            setTimeout(() => {
                new TypeWriter(heroSubtitle, [
                    'التحول الرقمي والتنمية المستدامة',
                    '31 مدينة ذكية قيد الإنشاء',
                    '210+ خدمة رقمية للمواطن',
                    'الذكاء الاصطناعي في خدمة مصر',
                    '42% طاقة متجددة بحلول 2030'
                ], { typeSpeed: 70, deleteSpeed: 38, pauseTime: 2500 });
            }, 500);
        }
    }, 100);
});

// ================================================
// الرحلة الزمنية المكدّسة (#story-timeline)
// يُظهر البطاقات، يملأ الخط المركزي، ويحدّث المؤشر والنقاط — بما يتوافق مع HTML/CSS الحالي
// ================================================

class StoryStackedTimeline {
    constructor() {
        this.section = document.getElementById('story-timeline');
        if (!this.section) return;

        this.wrapper = document.getElementById('stackedTimelineRoot');
        this.cards = [...this.section.querySelectorAll('.stacked-card')];
        this.progressFill = document.getElementById('timelineProgressFill');
        this.dots = [...this.section.querySelectorAll('.stack-dot')];
        this.focusReadout = document.getElementById('timelineFocusReadout');

        if (this.cards.length === 0) return;

        this.YEAR_MIN = 2014;
        this.YEAR_MAX = 2030;
        this.rafPending = false;
        this.lastActiveIndex = -1;
        this.init();
    }

    init() {
        this.wrapper?.classList.add('timeline-focus-mode');

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.06, rootMargin: '0px 0px -8% 0px' }
        );
        this.cards.forEach((card) => revealObserver.observe(card));

        window.addEventListener(
            'scroll',
            () => {
                if (this.rafPending) return;
                this.rafPending = true;
                requestAnimationFrame(() => {
                    this.rafPending = false;
                    if (this.isSectionNearViewport()) {
                        this.syncActiveCard();
                    }
                });
            },
            { passive: true }
        );

        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.scrollToCard(i));
        });

        window.addEventListener(
            'resize',
            () => {
                if (this.isSectionNearViewport()) {
                    this.syncActiveCard();
                }
            },
            { passive: true }
        );

        setTimeout(() => this.syncActiveCard(), 150);
    }

    isSectionNearViewport() {
        const r = this.section.getBoundingClientRect();
        return r.bottom > -80 && r.top < window.innerHeight + 80;
    }

    yearToProgressHeight(year) {
        const y = parseInt(year, 10);
        if (Number.isNaN(y)) return 0;
        const t = (y - this.YEAR_MIN) / (this.YEAR_MAX - this.YEAR_MIN);
        return Math.min(100, Math.max(0, t * 100));
    }

    flashYearBadge() {
        if (!this.centralIndicator || this.reducedMotion) return;
        this.centralIndicator.classList.remove('year-swap');
        void this.centralIndicator.offsetWidth;
        this.centralIndicator.classList.add('year-swap');
        clearTimeout(this._yearSwapTimer);
        this._yearSwapTimer = setTimeout(() => {
            this.centralIndicator.classList.remove('year-swap');
        }, 500);
    }

    syncActiveCard() {
        const focusY = window.innerHeight * 0.42;
        let bestIdx = 0;
        let bestDist = Infinity;

        this.cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            const mid = r.top + r.height / 2;
            const dist = Math.abs(mid - focusY);
            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = i;
            }
        });

        const active = this.cards[bestIdx];
        const year = active?.dataset.year || '2024';

        this.cards.forEach((card, i) => {
            card.classList.toggle('active', i === bestIdx);
        });

        this.dots.forEach((dot, i) => {
            const on = i === bestIdx;
            dot.classList.toggle('active', on);
            dot.setAttribute('aria-selected', on ? 'true' : 'false');
        });

        if (this.progressFill) {
            this.progressFill.style.height = `${this.yearToProgressHeight(year)}%`;
        }

        const indexChanged = bestIdx !== this.lastActiveIndex;
        if (indexChanged) {
            this.lastActiveIndex = bestIdx;
            if (this.focusReadout) {
                const shortTitle = active?.querySelector('.card-title')?.textContent?.trim() || '';
                this.focusReadout.textContent = shortTitle
                    ? `المحطة المعروضة: ${year} — ${shortTitle}`
                    : `المحطة المعروضة: ${year}`;
            }
        }
    }

    scrollToCard(index) {
        const card = this.cards[index];
        if (!card) return;
        const headerOffset = 100;
        const top = card.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
}