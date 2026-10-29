const audio = document.getElementById('bgAudio');
const secondVideo = document.getElementById('secondVideo');

function startVideoSafely() {
    if (!secondVideo) return;
    secondVideo.muted = true;
    secondVideo.currentTime = 0;
    secondVideo.play().catch(() => {
        setTimeout(() => {
            secondVideo.muted = true;
            secondVideo.play().catch(() => {});
        }, 300);
    });
}

const lightsContainer = document.getElementById('top-lights');
for (let i = 0; i < 20; i++) {
    const light = document.createElement('div');
    light.className = 'light';
    light.style.backgroundColor = ['#ff00ff', '#ffffff', '#00ffff'][i % 3];
    light.style.animationDelay = (i * 0.1) + 's';
    lightsContainer.appendChild(light);
}

const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');
let width, height, hearts = [];

function initHearts() {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width; canvas.height = height;
    hearts = Array.from({ length: 35 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5,
        type: Math.random() > 0.5 ? '💖' : '❤️'
    }));
}

function drawHearts() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(h => {
        ctx.globalAlpha = h.opacity;
        ctx.font = `${h.size}px Arial`;
        ctx.fillText(h.type, h.x, h.y);
        h.y += h.speed;
        if (h.y > height) h.y = -20;
    });
    requestAnimationFrame(drawHearts);
}

let giftIsOpening = false;

function enterGiftContent() {
    audio.play().catch(() => {});
    document.getElementById('p1').classList.remove('active');
    document.getElementById('p2').classList.add('active');
}

function openGiftBox(box) {
    if (giftIsOpening) return;
    giftIsOpening = true;
    const giftBox = box || document.querySelector('.gift-stage');
    if (giftBox) giftBox.classList.add('opening');

    setTimeout(() => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.52 },
                colors: ['#ff00ff', '#ff69b4', '#ffffff', '#ffd700']
            });
        }
    }, 420);

    setTimeout(enterGiftContent, 1350);
}

const routeBtn = document.getElementById('goToTemplateBtn');

function showRouteButton() {
    if (!routeBtn) return;
    routeBtn.style.display = 'inline-flex';
    routeBtn.style.visibility = 'visible';
    routeBtn.style.opacity = '1';
    routeBtn.classList.add('visible');
}

function hideRouteButton() {
    if (!routeBtn) return;
    routeBtn.style.display = 'none';
    routeBtn.style.visibility = 'hidden';
    routeBtn.style.opacity = '0';
    routeBtn.classList.remove('visible');
}

routeBtn?.addEventListener('click', () => {
    window.location.href = '../02_new_template/index.html';
});

function startSurprise() {
    const blackScreen = document.getElementById('blackScreen');
    const typingText = document.getElementById('typingText');
    const finalContent = document.getElementById('finalContent');
    const msg = "بيقولوا إن الأرواح بتتشابه، بس أنا متأكد إن أرواحنا اتخلقت لبعض. كل سنة وأنتي النور اللي بينور عالمي، والروح اللي مكمله روحي. دمت لي شيئاً جميلاً لا ينتهي، كل سنة وأنتي طيبه يا أغلى ما عندي 🥹🎂🥳";

    blackScreen.style.display = 'flex';
    blackScreen.style.opacity = '1';
    hideRouteButton();
    let i = 0;
    typingText.innerHTML = '';

    function typeWriter() {
        if (i < msg.length) {
            typingText.innerHTML += msg.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        } else {
            setTimeout(() => {
                blackScreen.style.opacity = '0';
                setTimeout(() => {
                    blackScreen.style.display = 'none';
                    finalContent.style.display = 'block';
                    showRouteButton();
                }, 500);
            }, 1400);
        }
    }
    typeWriter();
}

function goToSignature() {
    document.getElementById('p3')?.classList.remove('active');
    document.getElementById('p4')?.classList.add('active');
}

function checkPassword() {
    const pass = document.getElementById('passCode').value.trim();
    if (pass === 'حبيبتي') {
        audio.play().catch(() => {});
        document.getElementById('p1').classList.remove('active');
        document.getElementById('p2').classList.add('active');
    } else {
        alert('الباسورد غلط سنتوت! 😂');
    }
}

function blowOut() {
    const b = document.getElementById('candleArea');
    if (!b || b.classList.contains('out')) return;
    b.classList.add('out');
    if (typeof confetti === 'function') {
        confetti({ particleCount: 200, spread: 70, origin: { y: 0.7 }, colors: ['#ff00ff', '#ffffff', '#ffd700'] });
    }

    startVideoSafely();

    setTimeout(() => {
        document.getElementById('p2').classList.remove('active');
        document.getElementById('p3').classList.add('active');
        if (audio && audio.paused) {
            audio.play().catch(() => {});
        }
        if (secondVideo) {
            secondVideo.currentTime = 0;
            secondVideo.muted = true;
            secondVideo.play().catch(() => {});
        }
    }, 2500);
}

window.addEventListener('resize', initHearts);
initHearts();
drawHearts();
