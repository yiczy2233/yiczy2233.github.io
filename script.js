// 获取页面头部的 link 标签
const faviconTag = document.querySelector('link[rel="icon"]');

// 定义两张图片的路径
const activeIcon = "./assets/cat1.svg";   // 激活状态（你在看这个页面）
const inactiveIcon = "./assets/cat2.svg"; // 离开状态（你切到了别的标签页）

// 监听可见性变化事件
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 用户离开当前标签页
        faviconTag.setAttribute('href', inactiveIcon);
    } else {
        // 用户回到当前标签页
        faviconTag.setAttribute('href', activeIcon);
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        faviconTag.setAttribute('href', "./assets/cat2.svg");
        document.title = "Come back! (つ﹏⊂)";
    } else {
        faviconTag.setAttribute('href', "./assets/cat1.svg");
        document.title = "Zoey Cai"; // 恢复原名
    }
});


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

