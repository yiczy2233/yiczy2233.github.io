// 简单的控制台欢迎语
console.log("Welcome to YICZY 2233's Portfolio!");

// 滚动时改变导航栏透明度
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.boxShadow = 'none';
    }
});