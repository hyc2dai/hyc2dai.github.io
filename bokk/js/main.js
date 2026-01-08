// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单交互
    setupNavigation();
    
    // 响应式导航菜单
    setupResponsiveNav();
    
    // 技能条动画
    animateSkillBars();
    
    // 平滑滚动
    setupSmoothScroll();
    
    // 文章卡片悬停效果
    setupPostCardEffects();
    
    // 图片懒加载
    setupLazyLoading();
    
    // 页面访问统计
    trackPageView();
    
    // 回到顶部按钮
    setupBackToTop();
});

// 设置导航菜单
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
        });
    });
}

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    
    // 动画效果
    function animateBars() {
        skillBars.forEach(bar => {
            if (isInViewport(bar)) {
                const width = bar.style.width;
                bar.style.width = '0%';
                // 使用setTimeout确保动画生效
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }
    
    // 初始检查
    animateBars();
    
    // 滚动时检查
    window.addEventListener('scroll', animateBars);
}

// 设置平滑滚动
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 设置文章卡片悬停效果
function setupPostCardEffects() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 添加响应式导航菜单功能
function setupResponsiveNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// 图片懒加载
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        images.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

// 页面访问统计
function trackPageView() {
    // 简单的页面访问统计
    const pageUrl = window.location.pathname;
    console.log('Page viewed:', pageUrl);
    
    // 这里可以添加更多的统计逻辑
}

// 设置回到顶部按钮
function setupBackToTop() {
    // 创建回到顶部按钮元素
    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 点击事件处理
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}