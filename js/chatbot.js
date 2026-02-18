// ================================================
// الشات بوت الذكي - واجهة المحادثة
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
            {
                keywords: ['مرحب', 'اهلا', 'السلام', 'hi', 'hello'],
                response: 'مرحباً بك في مصر 2030! أنا المستشار الذكي، كيف يمكنني مساعدتك؟'
            },
            {
                keywords: ['مشروع', 'projects', 'المشاريع'],
                response: 'لدينا 42 مشروع قومي عملاق في مجالات: العاصمة الإدارية الجديدة، محطة بنبان للطاقة الشمسية، المدن الذكية، والتحول الرقمي.'
            },
            {
                keywords: ['مدينة', 'city', 'cities', 'المدن'],
                response: 'يضم المشروع 15 مدينة ذكية من الجيل الرابع، منها: العاصمة الإدارية، العلمين الجديدة، المنصورة الجديدة، ومدينة سلام.'
            },
            {
                keywords: ['ذكاء', 'ai', 'الذكاء'],
                response: 'يستخدم الذكاء الاصطناعي في 4 مجالات رئيسية: التعليم (90%)، الصحة (85%)، النقل (95%)، والأمن السيبراني (88%).'
            },
            {
                keywords: ['رؤية', 'vision', 'الرؤية'],
                response: 'رؤية مصر 2030 تهدف للتحول الرقمي الشامل والتنمية المستدامة من خلال 3 محاور رئيسية: الاقتصاد الرقمي، المجتمع الرقمي، والخدمات الرقمية.'
            },
            {
                keywords: ['تواصل', 'contact', 'اتصال'],
                response: 'يمكنك التواصل عبر البريد الإلكتروني: info@egypt2030.gov.eg أو من خلال نموذج التواصل في الموقع.'
            },
            {
                keywords: ['احصاء', 'stat', 'احصائيات', 'stats', 'رسم بياني', 'جراف', 'chart'],
                response: 'لدينا عدة رسوم بيانية تفاعلية: 📊\n• توزيع المشروعات (42 مشروع)\n• نمو الخدمات الرقمية (100+ خدمة)\n• مؤشرات الذكاء الاصطناعي (85-95%)\n• توزيع المدن الذكية (15 مدينة)'
            },
            {
                keywords: ['نسبة', 'percentage', 'مئوية'],
                response: 'نسب الإنجاز الحالية:\n• التحول الرقمي: 85%\n• التغطية الرقمية: 92%\n• رضاء المواطنين: 78%\n• الأمن السيبراني: 88%'
            },
            {
                keywords: ['مقارنة', 'compare', 'مقارنة'],
                response: 'مقارنة المشروعات:\n• مدن ذكية: 15 مدينة\n• بنية تحتية: 12 مشروع\n• طاقة: 8 مشروعات\n• رقمية: 5 مشروعات\n• نقل: 2 مشروع'
            },
            {
                keywords: ['عام', 'year', '2023', '2024', '2025'],
                response: 'خريطة الطريق: 2023 (البنية التحتية)، 2025 (التحول الرقمي)، 2027 (المدن الذكية)، 2030 (الريادة الرقمية).'
            },
            {
                keywords: ['شكر', 'thanks', 'thank'],
                response: 'العفو! دائمًا في خدمتك. هل هناك شيء آخر يمكنني مساعدتك به؟'
            },
            {
                keywords: ['الخدمات', 'services', 'خدمة'],
                response: 'توفر مصر الرقمية أكثر من 100 خدمة حكومية إلكترونية في مجالات: الأحوال المدنية، المرور، التوثيق، والضرائب.'
            }
        ];

        this.defaultResponses = [
            'شكراً لسؤالك! يمكنني مساعدتك في معلومات عن المشاريع والمدن الذكية والإحصائيات.',
            'للحصول على معلومات محددة، يمكنك سؤالي عن: المشاريع (42 مشروع)، المدن الذكية (15 مدينة)، أو نسب الذكاء الاصطناعي.',
            'هذا سؤال مهم! هل تريد معرفة المزيد عن مشاريع محددة أو التقنيات المستخدمة؟',
            'أنا هنا لمساعدتك! يمكنك سؤالي عن رؤية مصر 2030، المشاريع القومية، أو الإحصائيات.'
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
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const time = new Date();
        const timeString = time.getHours() + ':' + time.getMinutes().toString().padStart(2, '0');
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">${timeString}</span>
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
        input = input.toLowerCase();
        
        for (let item of this.knowledgeBase) {
            for (let keyword of item.keywords) {
                if (input.includes(keyword.toLowerCase())) {
                    return item.response;
                }
            }
        }

        if (input.includes('كم') || input.includes('عدد') || input.includes('how many')) {
            return 'يوجد حالياً 15 مدينة ذكية و 42 مشروع قومي. هل تريد تفاصيل أكثر عن أي منها؟';
        }
        
        if (input.includes('اين') || input.includes('where') || input.includes('موقع')) {
            return 'تنتشر المشاريع في جميع أنحاء مصر، أبرزها: العاصمة الإدارية (القاهرة)، بنبان (أسوان)، والعلمين (الساحل الشمالي).';
        }
        
        if (input.includes('متى') || input.includes('when') || input.includes('تاريخ')) {
            return 'من المقرر اكتمال معظم المشاريع بحلول عام 2030، مع مراحل تشغيل تدريجية بدأت من 2023.';
        }

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
        history.forEach(item => {
            this.addMessage(item.message, item.sender);
        });
    }

    clearHistory() {
        localStorage.removeItem('chatHistory');
        this.messagesContainer.innerHTML = `
            <div class="message bot">
                <div class="message-content">
                    <p>مرحباً! أنا المستشار الذكي لمستقبل مصر 2030. كيف يمكنني مساعدتك؟</p>
                </div>
                <span class="message-time">الآن</span>
            </div>
        `;
    }
}

const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 5px;
        padding: 5px 0;
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
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new SmartChatbot();
});