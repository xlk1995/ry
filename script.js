// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  initializePage();

  // 立即启动烟花特效
  setTimeout(() => {
    addDynamicEffects();
  }, 500);
});

// 初始化页面
function initializePage() {
  // 添加页面加载动画
  addPageLoadAnimation();

  // 初始化音乐控制
  initializeMusicControl();

  // 添加触摸交互
  addTouchInteractions();

  // 添加键盘交互
  addKeyboardInteractions();

  // 添加屏幕点击特效
  addClickEffects();
}

// 页面加载动画
function addPageLoadAnimation() {
  const container = document.querySelector(".container");
  container.style.opacity = "0";
  container.style.transform = "scale(0.9)";

  setTimeout(() => {
    container.style.transition = "all 0.8s ease-out";
    container.style.opacity = "1";
    container.style.transform = "scale(1)";
  }, 50);
}

// 初始化音乐控制
function initializeMusicControl() {
  const musicBtn = document.getElementById("musicToggle");
  let isPlaying = false;

  // 创建音频上下文（用于生成生日快乐歌）
  let audioContext = null;
  let oscillator = null;

  musicBtn.addEventListener("click", function () {
    if (!isPlaying) {
      playBirthdayMusic();
      musicBtn.classList.add("playing");
      musicBtn.textContent = "🔊";
      isPlaying = true;
    } else {
      stopMusic();
      musicBtn.classList.remove("playing");
      musicBtn.textContent = "🎵";
      isPlaying = false;
    }
  });
}

// 播放生日快乐歌
function playBirthdayMusic() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const notes = [
      { frequency: 523.25, duration: 0.5 }, // C5
      { frequency: 523.25, duration: 0.5 }, // C5
      { frequency: 587.33, duration: 1.0 }, // D5
      { frequency: 523.25, duration: 1.0 }, // C5
      { frequency: 659.25, duration: 1.0 }, // E5
      { frequency: 587.33, duration: 2.0 }, // D5
    ];

    let currentTime = audioContext.currentTime;

    notes.forEach((note, index) => {
      setTimeout(() => {
        playNote(note.frequency, note.duration);
      }, index * 1000);
    });

    // 循环播放
    setTimeout(() => {
      if (audioContext) {
        playBirthdayMusic();
      }
    }, notes.length * 1000);
  } catch (error) {
    console.log("音频播放失败:", error);
  }
}

// 播放单个音符
function playNote(frequency, duration) {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// 停止音乐
function stopMusic() {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

// 添加触摸交互
function addTouchInteractions() {
  const birthdayCard = document.querySelector(".birthday-card");

  // 触摸开始效果
  birthdayCard.addEventListener("touchstart", function (e) {
    this.style.transform = "scale(0.98)";
    createTouchRipple(e.touches[0].clientX, e.touches[0].clientY);
  });

  // 触摸结束效果
  birthdayCard.addEventListener("touchend", function (e) {
    this.style.transform = "scale(1)";
  });

  // 触摸移动效果
  birthdayCard.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });
}

// 添加键盘交互
function addKeyboardInteractions() {
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case " ":
      case "Enter":
        e.preventDefault();
        document.getElementById("musicToggle").click();
        break;
      case "Escape":
        stopMusic();
        document.getElementById("musicToggle").classList.remove("playing");
        document.getElementById("musicToggle").textContent = "🎵";
        break;
    }
  });
}

// 添加点击特效
function addClickEffects() {
  document.addEventListener("click", function (e) {
    createClickRipple(e.clientX, e.clientY);
  });
}

// 创建触摸涟漪效果
function createTouchRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000;
        animation: ripple-animation 0.6s ease-out;
    `;

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// 创建点击涟漪效果
function createClickRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000;
        animation: ripple-animation 0.4s ease-out;
    `;

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 400);
}

// 添加涟漪动画样式
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple-animation {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 添加更多动态特效
function addDynamicEffects() {
  // 随机创建烟花
  setInterval(() => {
    createFirework();
  }, 800);
}

// 创建烟花特效
function createFirework() {
  const fireworksContainer = document.querySelector(".fireworks-container");
  if (!fireworksContainer) return;

  // 创建烟花主体
  const firework = document.createElement("div");
  firework.className = "firework";

  // 随机位置和颜色
  const x = Math.random() * window.innerWidth;
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#ffe66d",
    "#a8e6cf",
    "#ff8e8e",
    "#ffd93d",
    "#ff9ff3",
    "#54a0ff",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // 随机大小
  const size = 8 + Math.random() * 8; // 8-16px
  firework.style.cssText = `
    left: ${x}px;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    box-shadow: 0 0 20px ${color}, 0 0 40px ${color};
  `;

  fireworksContainer.appendChild(firework);

  // 烟花爆炸效果 - 在顶部1/6位置爆炸
  const explosionTime = 1500; // 固定1.5秒后爆炸，此时烟花到达顶部1/6位置
  setTimeout(() => {
    // 爆炸位置固定在屏幕顶部1/6处
    const explosionY = window.innerHeight * 0.167; // 顶部1/6位置
    createFireworkExplosion(x, explosionY, color);
    firework.remove();
  }, explosionTime);
}

// 创建烟花爆炸效果 - 爱心形状
function createFireworkExplosion(x, y, color) {
  const fireworksContainer = document.querySelector(".fireworks-container");
  if (!fireworksContainer) return;

  const particleCount = 50; // 固定50个粒子形成爱心

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "firework-particle";

    // 计算爱心形状的坐标
    const t = (i / particleCount) * 2 * Math.PI;
    const scale = 30 + Math.random() * 20; // 30-50px的爱心大小

    // 爱心数学公式
    const heartX = scale * 16 * Math.pow(Math.sin(t), 3);
    const heartY =
      -scale *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));

    // 添加一些随机偏移，让爱心看起来更自然
    const randomOffsetX = (Math.random() - 0.5) * 10;
    const randomOffsetY = (Math.random() - 0.5) * 10;

    // 随机颜色变化
    const colors = [
      color,
      "#ffffff",
      "#ffd700",
      "#ff69b4",
      "#ff1493",
      "#ff69b4",
    ];
    const particleColor = colors[Math.floor(Math.random() * colors.length)];

    // 随机粒子大小
    const particleSize = 2 + Math.random() * 3; // 2-5px

    particle.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${particleSize}px;
      height: ${particleSize}px;
      background: ${particleColor};
      box-shadow: 0 0 6px ${particleColor}, 0 0 12px ${particleColor};
      --x: ${heartX + randomOffsetX}px;
      --y: ${heartY + randomOffsetY}px;
    `;

    fireworksContainer.appendChild(particle);

    // 清理粒子
    setTimeout(() => {
      particle.remove();
    }, 1200);
  }
}

// 添加性能优化
let animationFrameId;
function optimizePerformance() {
  // 使用 requestAnimationFrame 优化动画
  function animate() {
    // 动画逻辑
    animationFrameId = requestAnimationFrame(animate);
  }

  // 页面不可见时暂停动画
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });
}

// 初始化性能优化
optimizePerformance();
