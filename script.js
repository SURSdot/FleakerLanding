document.addEventListener('DOMContentLoaded', function() {
    const featuresLink = document.getElementById('featuresLink');
    const featuresList = document.getElementById('featuresList');
    let isFeaturesVisible = false;

    featuresLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (isFeaturesVisible) {
            // Скрываем список
            featuresList.classList.remove('active');
            featuresLink.textContent = 'Вау! А что оно умеет?';
            isFeaturesVisible = false;
        } else {
            // Показываем список
            featuresList.classList.add('active');
            featuresLink.textContent = 'А вот, что:';
            isFeaturesVisible = true;
        }
    });

    // Плавная прокрутка к функциям при первом открытии
    featuresLink.addEventListener('click', function() {
        if (!isFeaturesVisible) {
            setTimeout(() => {
                featuresList.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        }
    });

    // Добавляем интерактивность для кнопок скачивания
    const downloadButtons = document.querySelectorAll('.btn-download, .btn-download-windows');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Здесь можно добавить логику скачивания
            console.log('Скачивание приложения...');
            // Можно добавить всплывающее уведомление или перенаправление
        });
    });

    // Эффект наклона блоков функций при наведении мыши
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 100;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
            item.style.transition = 'transform 0.1s ease-out';
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            item.style.transition = 'transform 0.3s ease-out';
        });
    });

    // Добавляем анимацию при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.feature-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
