const cursor = document.getElementById('cursor');
const card = document.getElementById('card');

// 1. Device Check (Mobile/Touch detection)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// 2. Mouse Tracking & Tilt Logic
document.addEventListener('mousemove', (e) => {
    // Custom Cursor move (Only if not a touch device)
    if (!isTouchDevice && cursor) {
        gsap.to(cursor, { x: e.clientX - 12, y: e.clientY - 12, duration: 0.1 });
    }

    // Card Tilt Logic (Only if not a touch device)
    if (!isTouchDevice && card) {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 50;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 50;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
});

// Reset card position when mouse leaves
document.addEventListener('mouseleave', () => {
    if (!isTouchDevice && card) {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
});

// 3. Section Navigation (For multi-page compatibility)
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(s => s.classList.remove('active'));
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
    console.log(`Navigating to: ${sectionId}`);
}

// 4. Typewriter Effect (Updated with your name from CV)
// [cite: 1, 48]
const lines = [
    { id: "typewriter", text: "System Initialized. Hello, I'm Bala Akash Burunolla..."},
    { id: "type-line-2", text: "DevOps Engineer | AWS Cloud Solutions" },
    { id: "type-line-3", text: "Infrastructure as Code (IaC) & CI/CD Automation Expert." }
];

let lineIdx = 0;
let charIdx = 0;

function typeWriter() {
    if (lineIdx < lines.length) {
        let currentLine = lines[lineIdx];
        let targetElement = document.getElementById(currentLine.id);

        if (targetElement) {
            if (charIdx < currentLine.text.length) {
                // Type character + blinking underscore
                targetElement.innerHTML = currentLine.text.substring(0, charIdx + 1) + '<span class="cursor">_</span>';
                charIdx++;
                setTimeout(typeWriter, 40);
            } else {
                // Line finished: remove cursor from finished line
                targetElement.innerHTML = currentLine.text;
                
                // Move to next line
                lineIdx++;
                charIdx = 0;
                
                // Slight delay before starting next line for realism
                setTimeout(typeWriter, 500);
            }
        }
    } else {
        // Final line finished: Add a permanent blinking cursor to the last line
        const lastLine = document.getElementById(lines[lines.length - 1].id);
        lastLine.innerHTML += '<span class="cursor">_</span>';
    }
}

// Make sure window.onload calls this new version
window.onload = () => {
    typeWriter();
    if (typeof animate === "function") animate(); // Start particles if they exist
};


// 5. Background Animation (Particles) - Your custom logic
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Use your specific particle generation logic
let particles = Array.from({ length: isTouchDevice ? 30 : 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 0.5 - 0.25,
    vy: Math.random() * 0.5 - 0.25
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Standard terminal-style green glow
    ctx.fillStyle = 'rgba(0, 255, 204, 0.15)'; 
    
    particles.forEach(p => {
        p.x += p.vx; 
        p.y += p.vy;
        
        // Bounce logic from your script
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

// 6. Launch Sequence
window.onload = () => {
    typeWriter();
    animate();
};