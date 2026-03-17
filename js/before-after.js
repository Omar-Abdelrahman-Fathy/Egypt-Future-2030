// ================================================
// سلايدر قبل وبعد - نسخة مبسطة ومضمونة
// ================================================

// تنفيذ الكود بعد تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log('جاري تشغيل سلايدرات قبل وبعد...');
    
    // التأكد من وجود العناصر
    const sliders = document.querySelectorAll('.ba-slider');
    console.log('عدد السلايدرات:', sliders.length);
    
    if (sliders.length === 0) {
        console.log('لا توجد سلايدرات في الصفحة');
        return;
    }
    
    // تهيئة كل سلايدر
    sliders.forEach(function(slider, index) {
        initSlider(slider, index);
    });
});

function initSlider(slider, index) {
    const afterImg = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    
    if (!afterImg || !handle) {
        console.log('عناصر السلايدر غير مكتملة');
        return;
    }
    
    // تعيين القيم الابتدائية
    afterImg.style.width = '50%';
    handle.style.left = '50%';
    
    let isDragging = false;
    
    // دالة تحديث موضع السلايدر
    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        let pos = x - rect.left;
        
        // تحديد الحدود
        if (pos < 0) pos = 0;
        if (pos > rect.width) pos = rect.width;
        
        const percent = (pos / rect.width) * 100;
        
        afterImg.style.width = percent + '%';
        handle.style.left = percent + '%';
    }
    
    // أحداث الماوس
    handle.addEventListener('mousedown', function(e) {
        isDragging = true;
        slider.classList.add('dragging');
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        slider.classList.remove('dragging');
    });
    
    // أحداث اللمس
    handle.addEventListener('touchstart', function(e) {
        isDragging = true;
        slider.classList.add('dragging');
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX);
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
        slider.classList.remove('dragging');
    });
    
    // النقر على السلايدر
    slider.addEventListener('click', function(e) {
        if (e.target === handle) return;
        updateSlider(e.clientX);
    });
    
    console.log('تم تهيئة السلايدر رقم', index + 1);
}

// إضافة تأثيرات GSAP إذا كانت متاحة
if (typeof gsap !== 'undefined') {
    gsap.utils.toArray('.ba-card').forEach(function(card, i) {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}