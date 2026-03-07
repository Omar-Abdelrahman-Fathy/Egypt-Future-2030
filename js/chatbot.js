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
                keywords: ['مرحب', 'اهلا', 'السلام', 'hi', 'hello', 'مساء', 'صباح'],
                response: 'أهلاً وسهلاً بك في مصر 2030! نورتنا، كيف أقدر أخدمك اليوم؟'
            },
            {
                keywords: ['ازيك', 'عامل', 'اخبارك', 'how are you'],
                response: 'الحمدلله تمام، وأنت؟ دائمًا معاك ومستعد أساعدك في أي استفسار عن رؤية مصر 2030'
            },

            // المشاريع
            {
                keywords: ['مشروع', 'projects', 'المشاريع', 'بتعملوا ايه'],
                response: 'عندنا 42 مشروع قومي عملاق! أبرزهم العاصمة الإدارية الجديدة، ومحطة بنبان للطاقة الشمسية في أسوان. إيه المشروع اللي يهمك تحديدًا؟'
            },
            {
                keywords: ['العاصمة الادارية', 'العاصمة الجديدة', 'new capital'],
                response: 'العاصمة الإدارية الجديدة مدينة ذكية متكاملة، فيها أضخم حكومة ديجيتال في الشرق الأوسط، وأطول برج في إفريقيا. نسبة الإنجاز فيها تعدت 85%'
            },
            {
                keywords: ['بنبان', 'اسوان', 'الطاقة الشمسية'],
                response: 'محطة بنبان في أسوان من أكبر محطات الطاقة الشمسية في العالم! بتولد 2000 ميجاوات، وتوفر كهربا نظيفة لأكتر من مليون منزل'
            },

            // المدن الذكية
            {
                keywords: ['مدينة', 'city', 'cities', 'المدن'],
                response: 'عندنا 15 مدينة ذكية من الجيل الرابع زي العلمين الجديدة، المنصورة الجديدة، ومدينة سلام. كلها بتوفر حياة متطورة وخدمات ديجيتال متكاملة'
            },
            {
                keywords: ['العلمين', 'el alamein'],
                response: 'العلمين الجديدة خلاص بقت مدينة متكاملة! فيها أبراج سكنية، منتجعات عالمية، وأكبر مارينا على البحر المتوسط. الناس بتسكن فيها دلوقتي'
            },

            // الذكاء الاصطناعي
            {
                keywords: ['ذكاء', 'ai', 'الذكاء'],
                response: 'الذكاء الاصطناعي داخل في كل حاجة حرفيًا! في التعليم بنسبة 90%، الصحة 85%، والنقل 95%. حتى في الأمن السيبراني بنستخدمه بنسبة 88%'
            },
            {
                keywords: ['تعليم', 'education', 'المدارس', 'الجامعات'],
                response: 'طورنا مناهج الذكاء الاصطناعي في المدارس والجامعات، وبنستخدم تقنيات الواقع الافتراضي في التعليم عشان الطالب يفهم بطريقة تفاعلية'
            },
            {
                keywords: ['صحة', 'health', 'المستشفيات'],
                response: 'المستشفيات دلوقتي بتستخدم الذكاء الاصطناعي في التشخيص المبكر للأمراض، وفي 85% من الخدمات الصحية اتمتت إلكترونيًا'
            },

            // الرؤية والأهداف
            {
                keywords: ['رؤية', 'vision', 'الرؤية'],
                response: 'رؤية مصر 2030 بتستهدف نكون من أوائل الدول في التحول الرقمي والتنمية المستدامة. خلاص قدمنا كتير: مثلاً 100+ خدمة حكومية متاحة أونلاين'
            },
            {
                keywords: ['2030', 'اهداف', 'الاهداف'],
                response: 'بنشتغل على 3 محاور: الاقتصاد الرقمي (زي المدفوعات الإلكترونية)، المجتمع الرقمي (التعليم والصحة)، والخدمات الرقمية (توفير وقت وجهد المواطنين)'
            },

            // الخدمات
            {
                keywords: ['خدمات', 'services', 'خدمة'],
                response: 'مصر الرقمية وفرة أكتر من 100 خدمة حكومية أونلاين! يعني تقدر تجدد بطاقتك، رخصتك، أو تدفع الضرايب من البيت'
            },
            {
                keywords: ['بطاقة', 'رقم قومي', 'الاحوال المدنية'],
                response: 'تجديد البطاقة الشخصية أو استخراج قيد عائلي دلوقتي أونلاين خلال دقايق من خلال منصة مصر الرقمية'
            },

            // الإحصائيات
            {
                keywords: ['احصاء', 'stat', 'احصائيات', 'نسبة', 'percentage'],
                response: 'الإنجازات دلوقتي:\n✅ التحول الرقمي: 85%\n✅ التغطية الرقمية: 92%\n✅ رضاء المواطنين: 78%\n✅ الأمن السيبراني: 88%'
            },
            {
                keywords: ['مقارنة', 'compare'],
                response: 'توزيع المشاريع:\n🏗️ مدن ذكية: 15\n🏭 بنية تحتية: 12\n⚡ طاقة: 8\n💻 رقمية: 5\n🚄 نقل: 2'
            },

            // الأماكن
            {
                keywords: ['اين', 'where', 'موقع', 'فين'],
                response: 'المشاريع منتشرة في كل حتة في مصر:\n📍 القاهرة: العاصمة الإدارية\n📍 أسوان: بنبان\n📍 الساحل: العلمين\n📍 الدلتا: المنصورة الجديدة'
            },
            {
                keywords: ['القاهرة', 'cairo'],
                response: 'في القاهرة بنطور العاصمة الإدارية، ومدينة المعرفة في العاصمة، وبنظام نقل ذكي جديد يربط كل المحافظات'
            },

            // التوقعات
            {
                keywords: ['متى', 'when', 'تاريخ', 'امتى'],
                response: 'الجدول الزمني:\n📅 2023: البنية التحتية\n📅 2025: التحول الرقمي\n📅 2027: تشغيل المدن الذكية\n📅 2030: الريادة الرقمية إن شاء الله'
            },
            {
                keywords: ['مستقبل', 'future'],
                response: 'المستقبل واعد إن شاء الله! هنشوف مدن ذكية متكاملة، وخدمات حكومية بالذكاء الاصطناعي، ومصر مركز إقليمي للتحول الرقمي'
            },

            // التواصل
            {
                keywords: ['تواصل', 'contact', 'اتصال', 'شكوى'],
                response: 'تقدر تتواصل معانا:\n📧 info@egypt2030.gov.eg\n📱 أو من خلال صفحة اتصل بنا في الموقع'
            },

            // الشكر والوداع
            {
                keywords: ['شكر', 'thanks', 'thank', 'تسلم'],
               response: 'العفو، ده واجبي! دائمًا تحت أمرك. لو احتجت حاجة تانية أنا هنا'
            },
            {
                keywords: ['مع السلامة', 'bye', 'وداعا'],
                response: 'مع السلامة، تشرفت بمعرفتك! في أي وقت تحتاج مساعدة أنا موجود'
            },

            // كم/عدد
            {
                keywords: ['كم', 'عدد', 'how many', 'كام'],
                response: 'حسب آخر إحصائية:\n🏙️ مدن ذكية: 15\n🏗️ مشاريع قومية: 42\n💡 خدمات رقمية: 100+\n📊 مشاريع تحت التنفيذ: 28'
            },

            // التأكيدات
            {
                keywords: ['تم', 'خلص', 'انتهى'],
                response: 'ممتاز! تمام كده. محتاج حاجة تانية ولا كفاية كده؟'
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

        this.loadChatHistory();

        // إضافة رسالة ترحيب متغيرة
        setTimeout(() => {
            if (this.messagesContainer.children.length === 0) {
                this.addMessage('مرحبًا! أنا المستشار الذكي لرؤية مصر 2030. أسألني عن أي مشروع أو مدينة أو خدمة حكومية، وهرد عليك فورًا 😊', 'bot');
            }
        }, 500);
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

        // ردود ذكية للأسئلة المفتوحة
        if (input.includes('إيه') || input.includes('what') || input.includes('هو')) {
            return 'تقصد إيه بظبط؟ ممكن توضح أكتر عشان أفهمك صح وأفيدك';
        }
        
        if (input.includes('كام') || input.includes('كم') || input.includes('عدد')) {
            return 'عندنا 42 مشروع و 15 مدينة ذكية. عاوز تفاصيل أكتر عن مشروع معين؟';
        }
        
        if (input.includes('ازاي') || input.includes('how')) {
            return 'الأمر بسيط! كل الخدمات متاحة أونلاين. ممكن تدخل على منصة مصر الرقمية وتختار الخدمة اللي عاوزها';
        }
        
        if (input.includes('هو') || input.includes('هل') || input.includes('is there')) {
            return 'أكيد في! في مشاريع عملاقة في كل مكان. عندك العاصمة الإدارية، العلمين، بنبان. إيه اللي يهمك؟';
        }

        // ردود عشوائية من القائمة الافتراضية
        return this.defaultResponses[Math.floor(Math.random() * this.defaultResponses.length)];
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