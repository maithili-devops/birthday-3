// Terminal blink effect on load
window.addEventListener('load', () => {
    createFloatingHearts();
    animateBirthdayText();
});

// Animate birthday text letters
function animateBirthdayText() {
    const text = document.querySelector('.birthday-text');
    text.style.opacity = '0';
    setTimeout(() => {
        text.style.transition = 'opacity 1s';
        text.style.opacity = '1';
    }, 500);
}

// Create floating binary hearts (coder theme)
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💻';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }, 300);
}

// Confetti explosion with Canvas (interactive for devs)
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ['#ff00ff', '#00ff41', '#ffeb3b', '#ff5722', '#2196f3'];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 5 + 5,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.1
    };
}

function drawParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
}

function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1; // gravity
    p.rotation += p.rotSpeed;
    if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        drawParticle(p);
        updateParticle(p);
    });
    requestAnimationFrame(animate);
}

animate();

// Explode on button click
document.getElementById('explode-btn').addEventListener('click', () => {
    for (let i = 0; i < 200; i++) {
        particles.push(createParticle());
    }
});

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
