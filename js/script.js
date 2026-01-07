// 1. 移动端菜单控制
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // 简单的三横杠动画切换（可选）
    menuToggle.classList.toggle('is-active');
});

// 点击链接后自动收起菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. 滚动时改变导航栏透明度
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// 3. Favicon 切换 (Zoey 原本的趣味逻辑)
const faviconTag = document.querySelector('link[rel="icon"]');

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        faviconTag.setAttribute('href', "./assets/cat2.svg");
        document.title = "Come back! (つ﹏⊂)";
    } else {
        faviconTag.setAttribute('href', "./assets/cat1.svg");
        document.title = "Zoey Cai";
    }
});

console.log("Zoey's Portfolio v1.0 Loaded!");