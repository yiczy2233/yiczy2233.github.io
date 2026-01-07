// ==================== 0. 基础交互逻辑 ====================
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');
// 获取我们新的滚动容器
const scrollContainer = document.querySelector('#scroll-container'); 

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 监听 scrollContainer 而不是 window
scrollContainer.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    // 使用 scrollContainer.scrollTop 来判断滚动距离
    if (scrollContainer.scrollTop > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// Favicon 切换逻辑
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

// ==================== 动画管理器 & 页面过渡 ====================
const animators = {}; 

function registerAnimation(id, startFn, stopFn) {
    animators[id] = { start: startFn, stop: stopFn, isRunning: false };
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        
        if (entry.isIntersecting) {
            // 1. 启动背景特效
            if (animators[id] && !animators[id].isRunning) {
                animators[id].start();
                animators[id].isRunning = true;
            }
            // 2. 触发 CSS 过渡动画 (添加 active 类)
            // 这会让 .reveal 里的内容浮现出来
            entry.target.classList.add('active');
        } else {
            // 1. 停止背景特效 (节省性能)
            if (animators[id] && animators[id].isRunning) {
                animators[id].stop();
                animators[id].isRunning = false;
            }
            // 2. 移除 active 类 (可选：如果你希望每次滚回来都重新动画，就保留这行；否则删掉)
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.3 }); // 阈值调高一点，避免误触

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


// ==================== 1. Home Section: 星空流转 ====================
(() => {
    const canvas = document.getElementById('canvas-home');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    let animationId;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random();
            this.fadeDir = Math.random() > 0.5 ? 0.01 : -0.01;
        }
        update() {
            this.y -= this.speed; 
            this.opacity += this.fadeDir;
            if (this.opacity >= 1 || this.opacity <= 0.2) this.fadeDir = -this.fadeDir;
            if (this.y < 0) { this.y = height; this.x = Math.random() * width; }
        }
        draw() {
            ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity})`; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function init() { stars = []; for (let i = 0; i < 150; i++) stars.push(new Star()); }
    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => { s.update(); s.draw(); });
        animationId = requestAnimationFrame(animate);
    }
    init();
    registerAnimation('home', () => { animate(); }, () => { cancelAnimationFrame(animationId); });
})();


// ==================== 2. Novel Section: 意向浮动 (调整后) ====================
(() => {
    const container = document.getElementById('bg-novel');
    const chars = ['日', '月', '星', 'Sun', 'Moon', 'Star', 'Story', 'Light', 'Dream', '光', '影'];
    let intervalId;

    function createChar() {
        const el = document.createElement('div');
        el.classList.add('floating-char');
        el.innerText = chars[Math.floor(Math.random() * chars.length)];
        
        const size = Math.random() * 20 + 18 + 'px'; 
        const left = Math.random() * 100 + '%';
        // 速度快：2-5秒
        const duration = Math.random() * 3 + 2 + 's'; 
        
        el.style.fontSize = size;
        el.style.left = left;
        el.style.animationDuration = duration;

        container.appendChild(el);
        setTimeout(() => { el.remove(); }, parseFloat(duration) * 1000);
    }

    registerAnimation('novel',
        () => { intervalId = setInterval(createChar, 400); }, // 频率高：400ms
        () => { clearInterval(intervalId); container.innerHTML = ''; }
    );
})();


// ==================== 3. Pixel Section: 俄罗斯方块雨 ====================
(() => {
    const canvas = document.getElementById('canvas-pixel');
    const ctx = canvas.getContext('2d');
    let width, height;
    let blockSize = 40; 
    let drops = [];
    let animationId;
    const colors = ['#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Block {
        constructor() {
            this.x = Math.floor(Math.random() * (width / blockSize)) * blockSize;
            this.y = -blockSize;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 3 + 2;
        }
        update() {
            this.y += this.speed;
            if (this.y > height) {
                this.y = -blockSize;
                this.x = Math.floor(Math.random() * (width / blockSize)) * blockSize;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + 1, this.y + 1, blockSize - 2, blockSize - 2);
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(this.x + 1, this.y + 1, blockSize - 2, 4);
        }
    }
    function init() { drops = []; for(let i=0; i<15; i++) drops.push(new Block()); }
    function animate() {
        ctx.clearRect(0, 0, width, height);
        drops.forEach(b => { b.update(); b.draw(); });
        animationId = requestAnimationFrame(animate);
    }
    init();
    registerAnimation('pixel', () => { animate(); }, () => { cancelAnimationFrame(animationId); });
})();


// ==================== 4. Game Dev: 进度条背景 ====================
(() => {
    const container = document.getElementById('bg-games');
    let intervalId;
    function createBar() {
        const bar = document.createElement('div');
        bar.classList.add('loading-bar-container');
        const fill = document.createElement('div');
        fill.classList.add('loading-bar-fill');
        const w = Math.random() * 200 + 100 + 'px';
        const top = Math.random() * 100 + '%';
        const left = Math.random() * 80 + 10 + '%';
        const duration = Math.random() * 2 + 1 + 's';
        bar.style.width = w; bar.style.top = top; bar.style.left = left;
        fill.style.animationDuration = duration;
        bar.appendChild(fill);
        container.appendChild(bar);
        setTimeout(() => { bar.remove(); }, parseFloat(duration) * 1000);
    }
    registerAnimation('games',
        () => { intervalId = setInterval(createBar, 500); },
        () => { clearInterval(intervalId); container.innerHTML = ''; }
    );
})();


// ==================== 5. Digital Twin: 数字黑客帝国效果 ====================
(() => {
    const canvas = document.getElementById('canvas-digital');
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;
    let columns;
    let drops = []; 
    const fontSize = 16;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = [];
        for(let i=0; i<columns; i++) drops[i] = Math.random() * -100;
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(2, 255, 2, 1)'; 
        ctx.font = fontSize + 'px monospace';
        for(let i=0; i<drops.length; i++) {
            const text = Math.floor(Math.random()*10);
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            if(drops[i]*fontSize > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        animationId = requestAnimationFrame(draw);
    }
    registerAnimation('digital', () => { draw(); }, () => { cancelAnimationFrame(animationId); });
})();

console.log("Zoey's Portfolio v3.0: Scroll Snap & Transitions Fixed!");