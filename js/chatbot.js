// ================================================
// الشات بوت الذكي - واجهة المحادثة المطورة
// ================================================

class SmartChatbot {
    constructor() {
        this.chatContainer = document.getElementById('chatbot');
        this.toggleBtn = document.querySelector('.chatbot-toggle');
        this.closeBtn = document.querySelector('.close-chat');
        this.sendBtn = document.getElementById('sendMessage');
        this.userInput = document.getElementById('userInput');
        this.messagesContainer = document.getElementById('chatMessages');
        
        this.knowledgeBase = [
            // التحيات
            {
                keywords: ['مرحب', 'اهلا', 'السلام', 'hi', 'hello', 'مساء', 'صباح', 'نورت', 'حياك'],
                response: 'أهلاً وسهلاً بك في مصر 2030! نورتنا، كيف أقدر أخدمك اليوم؟'
            },
            {
                keywords: ['ازيك', 'عامل', 'اخبارك', 'how are you', 'اخبار', 'كيفك'],
                response: 'الحمدلله تمام، وأنت؟ دائمًا معاك ومستعد أساعدك في أي استفسار عن رؤية مصر 2030 والمشاريع القومية والخدمات الرقمية'
            },

            // الرؤية المصرية 2030
            {
                keywords: ['رؤية', 'vision', 'الرؤية', 'اهداف', 'الاهداف', 'استراتيجية'],
                response: '🇪🇬 رؤية مصر 2030 هي أجندة وطنية متكاملة لتحقيق التنمية المستدامة. تستهدف:\n✅ نمو اقتصادي 7-8% سنوياً\n✅ خفض البطالة لـ 5%\n✅ الطاقة المتجددة 42%\n✅ رقمنة شاملة للخدمات الحكومية\n✅ رفع تنافسية الاقتصاد المصري عالمياً'
            },
            {
                keywords: ['ابعاد', 'ابعاد الرؤية', 'اقتصادي', 'اجتماعي', 'بيئي', 'حضري'],
                response: 'رؤية مصر 2030 تشمل 4 أبعاد رئيسية:\n📊 البعد الاقتصادي: تنمية متنوعة ومستدامة\n👥 البعد الاجتماعي: عدالة وتكافؤ فرص\n🌱 البعد البيئي: تنمية خضراء\n🏙️ البعد الحضري: مدن ذكية متكاملة'
            },

            // المشاريع القومية - تفصيلي
            {
                keywords: ['مشروع', 'projects', 'المشاريع', 'مشاريع', 'مشروعات', 'المشروعات', 'قومي', 'قومية'],
                response: '💪 مصر بتنفذ 42 مشروع قومي عملاق! أبرزهم:\n🏛️ العاصمة الإدارية الجديدة\n⚡ محطة بنبان للطاقة الشمسية\n🚄 القطار الكهربائي السريع\n🏙️ العلمين الجديدة\n🌾 حياة كريمة\n\nعاوز تفاصيل عن مشروع معين؟'
            },
            {
                keywords: ['العاصمة الادارية', 'العاصمة الجديدة', 'new capital', 'عاصمة', 'ادارية'],
                response: '🏛️ العاصمة الإدارية الجديدة:\n• مدينة ذكية متكاملة من الجيل الرابع\n• أضخم حكومة ديجيتال في الشرق الأوسط\n• أطول برج في إفريقيا (البرج الأيقوني)\n• مساحة 700 كم²\n• نسبة الإنجاز: 85%+\n• الحي الحكومي متاح بالكامل'
            },
            {
                keywords: ['بنبان', 'اسوان', 'الطاقة الشمسية', 'شمسية', 'طاقة'],
                response: '⚡ محطة بنبان للطاقة الشمسية (أسوان):\n• أكبر محطة طاقة شمسية في العالم!\n• قدرة 2000 ميجاوات\n• توفر كهرباء لـ 1+ مليون منزل\n• استثمارات 2 مليار دولار\n• تخدم 4 ملايين مواطن'
            },
            {
                keywords: ['حياة كريمة', 'ريف', 'قرى', 'فقر', 'تنمية'],
                response: '🌾 مشروع "حياة كريمة":\n• أكبر مشروع تنموي في تاريخ مصر\n• يستهدف 4500 قرية\n• استفادة 58+ مليون مواطن\n• تكلفة 700 مليار جنيه\n• تطوير بنية تحتية وخدمات أساسية'
            },
            {
                keywords: ['قطار', 'مونوريل', 'نقل', 'مواصلات', 'كهربائي'],
                response: '🚄 مشروعات النقل:\n• القطار الكهربائي السريع (أطول شبكة في الشرق الأوسط)\n• مونوريل العاصمة الإدارية\n• مونوريل القاهرة (6 أكتوبر - المقطم)\n• مترو أنفاق القاهرة الجديد\n• طول الشبكة: 3000+ كم'
            },

            // المدن الذكية
            {
                keywords: ['مدينة', 'city', 'cities', 'المدن', 'مدن ذكية', 'جيل رابع'],
                response: '🏙️ مصر بتنشئ 31 مدينة ذكية من الجيل الرابع:\n• العاصمة الإدارية\n• العلمين الجديدة\n• المنصورة الجديدة\n• ناصر الجديدة (غرب أسيوط)\n• رفح الجديدة\n• سيوة الجديدة\n• كلها خدمات رقمية متكاملة'
            },
            {
                keywords: ['العلمين', 'el alamein', 'ساحل', 'شمال'],
                response: '🌊 العلمين الجديدة:\n• مدينة متكاملة على البحر المتوسط\n• أبراج سكنية ومنتجعات عالمية\n• أكبر مارينا في المتوسط\n• مطار دولي\n• جامعات عالمية\n• الناس بتسكن فيها دلوقتي!'
            },
            {
                keywords: ['منصورة', 'المنصورة', 'دلتا', 'جامعة'],
                response: '🎓 المنصورة الجديدة:\n• مدينة متكاملة في الدلتا\n• جامعة المنصورة الدولية\n• منطقة صناعات تكنولوجية\n• مستشفيات متخصصة\n• مساحات خضراء واسعة'
            },

            // الذكاء الاصطناعي
            {
                keywords: ['ذكاء', 'ai', 'الذكاء', 'artificial', 'اصطناعي', 'تكنولوجيا'],
                response: '🤖 الذكاء الاصطناعي في مصر 2030:\n• استخدام في التعليم (90%)\n• الخدمات الصحية (85%)\n• النقل والمواصلات (95%)\n• الأمن السيبراني (88%)\n• استراتيجية وطنية أُطلقت 2021'
            },
            {
                keywords: ['تعليم', 'education', 'المدارس', 'الجامعات', 'دراسة', 'طالب'],
                response: '📚 الذكاء الاصطناعي في التعليم:\n• منصات تعليمية ذكية\n• تحليل أداء الطلاب\n• محتوى مخصص لكل طالب\n• واقع افتراضي VR\n• تصحيح النطق بالتعرف على الصوت\n• 90% من المدارس متصلة بالإنترنت'
            },
            {
                keywords: ['صحة', 'health', 'المستشفيات', 'طب', 'علاج', 'تشخيص'],
                response: '🏥 الذكاء الاصطناعي في الصحة:\n• تشخيص مبكر للأمراض\n• 85% من الخدمات الصحية رقمية\n• استشارات طبية عن بعد\n• تطبيق "صحة مصر" للحجز الإلكتروني\n• نظام معلومات صحية موحد'
            },
            {
                keywords: ['مركز ذكاء', 'ai center', 'المركز المصري', 'مدينة المعرفة'],
                response: '🧠 المركز المصري للذكاء الاصطناعي:\n• في مدينة المعرفة بالعاصمة الإدارية\n• معامل بحثية متطورة\n• مركز تدريب متخصص\n• حاضنة أعمال للشركات الناشئة\n• شراكات دولية'
            },

            // الخدمات الرقمية
            {
                keywords: ['خدمات', 'services', 'خدمة', 'مصر الرقمية', 'بوابة', 'رقمية'],
                response: '💻 منصة مصر الرقمية:\n• 170+ خدمة حكومية أونلاين\n• تجديد بطاقة - رخصة - قيد عائلي\n• دفع الضرائب والرسوم\n• تموين\n• توثيق\n• متاحة أندرويد و iOS\n• www.digital.gov.eg'
            },
            {
                keywords: ['بطاقة', 'رقم قومي', 'الاحوال المدنية', 'قيد عائلي', 'بطاقة شخصية'],
                response: '🪪 الخدمات المدنية:\n• تجديد البطاقة الشخصية أونلاين\n• استخراج قيد عائلي إلكتروني\n• توثيق بالبريد\n• يستغرق دقايق فقط\n• يصلك البريد السريع\n• أو استلام من مكتب السجل المدني'
            },
            {
                keywords: ['مرور', 'رخصة', 'عربية', 'سيارة', 'مخالفات', 'فحص'],
                response: '🚗 خدمات المرور الإلكترونية:\n• تجديد رخصة السيارة\n• الاستعلام عن المخالفات\n• سداد الرسوم\n• حجز موعد فحص\n• استبدال رخصة قيادة تالفة\n• الاستعلام عن الحالة المرورية'
            },

            // الإحصائيات والأرقام
            {
                keywords: ['احصاء', 'stat', 'احصائيات', 'نسبة', 'percentage', 'رقم', 'ارقام', 'عدد'],
                response: '📊 إحصائيات مصر 2030:\n• التحول الرقمي: 85%\n• التغطية الرقمية: 92%\n• رضاء المواطنين: 78%\n• الأمن السيبراني: 88%\n• المشاريع القومية: 42\n• المدن الذكية: 31\n• الخدمات الرقمية: 170+'
            },
            {
                keywords: ['نمو', 'اقتصاد', 'ناتج', 'gdp', 'استثمار', 'فلوس', 'مليار'],
                response: '💰 المؤشرات الاقتصادية:\n• نمو اقتصادي مستهدف: 7-8% سنوياً\n• الاستثمارات في العاصمة: 5+ مليار دولار\n• استثمارات بنبان: 2 مليار دولار\n• تكلفة حياة كريمة: 700 مليار جنيه\n• مساهمة الطاقة المتجددة: 42%'
            },
            {
                keywords: ['سكان', 'مواطنين', 'ناس', 'مليون', 'عدد السكان'],
                response: '👥 استفادة المشاريع:\n• حياة كريمة: 58+ مليون مواطن\n• بنبان: 4 مليون مواطن\n• العاصمة الإدارية: 6.5 مليون نسمة\n• مصر 2030: كل المصريين!'
            },

            // التحول الرقمي
            {
                keywords: ['تحول رقمي', 'digital', 'تكنولوجيا', 'تقنية', 'رقم', 'التحول'],
                response: '🌐 التحول الرقمي في مصر:\n• نسبة الإنجاز: 85%\n• 170+ خدمة رقمية\n• الشمول المالي: 35%\n• التجارة الإلكترونية: $5 مليار\n• مراكز إبداع مصر الرقمية: 12\n• خدمات البريد الرقمي: 25+'
            },
            {
                keywords: ['بريد', 'مكاتب بريد', 'فوري', 'محفظة', 'دفع', 'فلوس', 'فيزا'],
                response: '💳 طرق الدفع:\n• بطاقات ائتمان (فيزا، ماستركارد)\n• كروت ميزة\n• محافظ إلكترونية (فوري، أمان، بي)\n• الدفع عبر الهاتف المحمول\n• فوري كاش في 200+ ألف منفذ'
            },

            // الطاقة
            {
                keywords: ['طاقة', 'كهربا', 'كهرباء', 'متجددة', 'شمسية', 'رياح', 'نووي'],
                response: '⚡ مشروعات الطاقة:\n• محطة بنبان: 1465 ميجاوات (أكبر في العالم)\n• طاقة الرياح: 1000+ ميجاوات\n• الضبعة: أول محطة نووية سلمية\n• تحويل المخلفات لطاقة\n• هدف 2030: 42% طاقة متجددة'
            },

            // الأسئلة الشائعة
            {
                keywords: ['سؤال', 'اسئلة', 'faq', 'شائع', 'استفسار', 'سؤال شائع'],
                response: '❓ عندك سؤال محدد؟\n\n📚 صفحة الأسئلة الشائعة فيها +50 سؤال وجواب عن:\n• الرؤية والأهداف\n• المشروعات القومية\n• التحول الرقمي\n• الذكاء الاصطناعي\n• الخدمات الحكومية\n\n🔍 <a href="QA.html" target="_blank" style="color: #00eaff;">اضغط هنا لصفحة الأسئلة الشائعة</a>'
            },
            {
                keywords: ['ازاي', 'كيف', 'how', 'طريقة', 'عمل', 'خطوات'],
                response: '❓ عاوز تعرف خطوات أو طريقة عمل حاجة؟\n\n📚 صفحة الأسئلة الشائعة فيها إجابات تفصيلية لكل الاستفسارات:\n• كيفية استخدام الخدمات\n• خطوات التسجيل\n• طرق الدفع\n• مواقع المشروعات\n\n🔍 <a href="QA.html" target="_blank" style="color: #00eaff;">اضغط هنا لصفحة الأسئلة الشائعة</a>'
            },
            {
                keywords: ['مش فاهم', 'عايز مساعدة', 'ساعدني', 'help', 'assist', 'مش عارف'],
                response: '🤔 مش عارف تلاقي إجابة سؤالك؟\n\n📚 في صفحة الأسئلة الشائعة فيها إجابات لأكتر من 50 سؤال عن:\n• رؤية مصر 2030\n• المشروعات القومية\n• الخدمات الرقمية\n• الذكاء الاصطناعي\n\n🔍 <a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>'
            },

            // الأماكن والمواقع
            {
                keywords: ['اين', 'where', 'موقع', 'فين', 'مكان', 'عنوان'],
                response: '📍 مواقع المشاريع الرئيسية:\n• القاهرة: العاصمة الإدارية، مدينة المعرفة\n• أسوان: محطة بنبان\n• الساحل: العلمين الجديدة\n• الدلتا: المنصورة الجديدة\n• الصعيد: ناصر الجديدة، أسيوط الجديدة\n• سيناء: رفح الجديدة'
            },
            {
                keywords: ['القاهرة', 'cairo', 'المعرفة'],
                response: '🏙️ القاهرة والعاصمة:\n• العاصمة الإدارية الجديدة\n• مدينة المعرفة (IT & AI)\n• نظام نقل ذكي جديد\n• مترو أنفاق جديد\n• جامعات دولية'
            },

            // الجدول الزمني
            {
                keywords: ['متى', 'when', 'تاريخ', 'امتى', 'وقت', 'سنة', '2025', '2027'],
                response: '📅 الجدول الزمني:\n• 2023: اكتمال البنية التحتية\n• 2025: التحول الرقمي الشامل\n• 2027: تشغيل المدن الذكية بالكامل\n• 2030: تحقيق الريادة الرقمية إن شاء الله'
            },
            {
                keywords: ['مستقبل', 'future', '2030', 'رؤية', 'حلم'],
                response: '🔮 المستقبل:\n• مدن ذكية متكاملة\n• خدمات حكومية بالذكاء الاصطناعي\n• مصر مركز إقليمي للتحول الرقمي\n• اقتصاد رقمي متقدم\n• جودة حياة عالمية لكل المصريين'
            },

            // التواصل
            {
                keywords: ['تواصل', 'contact', 'اتصال', 'شكوى', 'اقتراح', 'فكرة'],
                response: '📞 للتواصل:\n• 📧 info@egypt2030.gov.eg\n• 📱 صفحة اتصل بنا في الموقع\n• 📝 قسم الاقتراحات والشكاوى\n• 💬 أنا هنا أساعدك 24/7'
            },

            // الشكر والوداع
            {
                keywords: ['شكر', 'thanks', 'thank', 'تسلم', 'ممتاز', 'جيد', 'تمام'],
                response: '😊 العفو، ده واجبي!\n\nلو عندك سؤال تاني أو استفسار، أنا هنا أساعدك. أو ممكن تشوف صفحة الأسئلة الشائعة:\n\n🔍 <a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>'
            },
            {
                keywords: ['مع السلامة', 'bye', 'وداعا', 'باي'],
                response: '👋 مع السلامة! تشرفت بمعرفتك\n\nلو احتجت مساعدة في أي وقت، أنا موجود 24/7. أو ممكن تزور صفحة الأسئلة الشائعة:\n\n🔍 <a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>'
            }
        ];

        this.defaultResponses = [
            'هو أنت تقصد إيه بالضبط؟ ممكن توضح أكتر عشان أفهمك صح',
            'حلو السؤال ده! في ناس كتير بتسأل عليه. أنا معاك، إيه اللي عاوز تعرفه بالظبط؟',
            'فكرة جميلة! أنا بفهم في المشاريع والمدن الذكية والأرقام. إيه اللي يهمك فيهم؟',
            'تمام، خليني أفهمك أكتر. إنت عاوز معلومات عن إيه: المشاريع ولا المدن ولا الخدمات؟',
            'حاجة تانية تقدر تفيدك بيها؟ أنا تحت أمرك',
            'عندي معلومة حلوة: مصر بتطور أسرع بنية تحتية رقمية في المنطقة! عاوز تفاصيل؟'
        ];

        this.init();
    }

    init() {
        // مسح المحادثات القديمة عند تحديث الصفحة
        localStorage.removeItem('chatHistory');
        
        this.toggleBtn.addEventListener('click', () => {
            this.chatContainer.classList.toggle('active');
            if (this.chatContainer.classList.contains('active')) {
                this.userInput.focus();
            }
        });

        this.closeBtn.addEventListener('click', () => {
            this.chatContainer.classList.remove('active');
        });

        this.sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // إظهار رسالة ترحيب جديدة (بدون تحميل سجل)
        this.messagesContainer.innerHTML = '';
        this.addMessage('أهلاً! أنا المستشار الذكي لرؤية مصر 2030. أسألني عن أي مشروع أو مدينة أو خدمة حكومية 😊', 'bot');
    }

    sendMessage() {
        const message = this.userInput.value.trim();
        if (message === '') return;

        this.addMessage(message, 'user');
        this.saveToHistory('user', message);
        this.userInput.value = '';

        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
            this.saveToHistory('bot', response);
        }, 800 + Math.random() * 700);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">${hours}:${minutes}</span>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('message', 'bot', 'typing-indicator');
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    getResponse(input) {
        input = input.toLowerCase().trim();
        
        // تجاهل الكلمات القصيرة جداً
        if (input.length < 2) {
            return 'أهلاً! إزاي أقدر أساعدك؟';
        }

        // البحث في قاعدة المعرفة
        for (let item of this.knowledgeBase) {
            for (let keyword of item.keywords) {
                if (input.includes(keyword.toLowerCase())) {
                    return item.response;
                }
            }
        }

        // ردود ذكية للأسئلة المفتوحة مع اقتراح صفحة الأسئلة الشائعة
        if (input.includes('إيه') || input.includes('what') || input.includes('هو')) {
            return 'تقصد إيه بظبط؟ ممكن توضح أكتر عشان أفهمك صح.\n\n صفحة الأسئلة الشائعة فيها +50 سؤال وجواب عن المشاريع والخدمات:\n<a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>';
        }
        
        if (input.includes('كام') || input.includes('كم') || input.includes('عدد')) {
            return 'عندنا 42 مشروع قومي و 31 مدينة ذكية و 170+ خدمة رقمية.\n\n صفحة الأسئلة الشائعة فيها إجابات تفصيلية:\n<a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>';
        }
        
        if (input.includes('ازاي') || input.includes('how')) {
            return 'الخدمات متاحة أونلاين على مصر الرقمية.\n\n صفحة الأسئلة الشائعة فيها إجابات تفصيلية:\n<a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>';
        }
        
        if (input.includes('هو') || input.includes('هل') || input.includes('is there')) {
            return 'أكيد في! مصر 2030 مليانة مشاريع عملاقة.\n\n صفحة الأسئلة الشائعة فيها إجابات تفصيلية:\n<a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>';
        }

        // رد افتراضي مع اقتراح صفحة الأسئلة الشائعة
        return 'هو أنت تقصد إيه بالضبط؟ ممكن توضح أكتر عشان أفهمك صح وأفيدك.\n\n صفحة الأسئلة الشائعة فيها +50 سؤال وجواب:\n<a href="QA.html" target="_blank" style="color: #00eaff;">صفحة الأسئلة الشائعة</a>';
    }

    saveToHistory(sender, message) {
        let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        history.push({
            sender: sender,
            message: message,
            time: new Date().toISOString()
        });
        if (history.length > 50) {
            history = history.slice(-50);
        }
        localStorage.setItem('chatHistory', JSON.stringify(history));
    }

    loadChatHistory() {
        const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        if (history.length === 0) {
            this.addMessage('أهلاً! أنا المستشار الذكي لرؤية مصر 2030. أسألني عن أي مشروع أو مدينة أو خدمة حكومية 😊', 'bot');
        } else {
            history.forEach(item => {
                this.addMessage(item.message, item.sender);
            });
        }
    }

    clearHistory() {
        localStorage.removeItem('chatHistory');
        this.messagesContainer.innerHTML = '';
        this.addMessage('أهلاً! أنا المستشار الذكي لرؤية مصر 2030. أسألني عن أي مشروع أو مدينة أو خدمة حكومية 😊', 'bot');
    }
}

const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 5px;
        padding: 5px 0;
        direction: ltr;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: #00eaff;
        border-radius: 50%;
        animation: typingBounce 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) {
        animation-delay: -0.32s;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: -0.16s;
    }
    
    @keyframes typingBounce {
        0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .notification {
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
        box-shadow: 0 0 20px rgba(0, 234, 255, 0.3);
        font-family: 'Cairo', sans-serif;
    }
    
    .message.bot .message-content {
        background: linear-gradient(135deg, rgba(0, 234, 255, 0.1), rgba(106, 92, 255, 0.1));
        border: 1px solid rgba(0, 234, 255, 0.3);
    }
    
    .message.user .message-content {
        background: linear-gradient(135deg, #00eaff, #6a5cff);
    }
`;

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new SmartChatbot();
});