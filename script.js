// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Add glitch effect to title on hover
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.5s ease-in-out';
    });
    
    heroTitle.addEventListener('animationend', function() {
        this.style.animation = 'glow 2s ease-in-out infinite alternate';
    });
}

// Add CSS for glitch effect
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Add hover effects to game features
document.querySelectorAll('.game-feature').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    feature.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console easter egg
console.log(`
    ███████╗██╗███████╗██╗  ██╗ ██████╗ ██╗   ██╗███████╗██╗  ██╗ █████╗     ██╗      █████╗      ██╗███╗   ██╗ █████╗ 
    ╚══███╔╝██║╚══███╔╝██║ ██╔╝██╔═══██╗██║   ██║██╔════╝██║ ██╔╝██╔══██╗    ██║     ██╔══██╗     ██║████╗  ██║██╔══██╗
      ███╔╝ ██║  ███╔╝ █████╔╝ ██║   ██║██║   ██║███████╗█████╔╝ ███████║    ██║     ███████║     ██║██╔██╗ ██║███████║
     ███╔╝  ██║ ███╔╝  ██╔═██╗ ██║   ██║╚██╗ ██╔╝╚════██║██╔═██╗ ██╔══██║    ██║     ██╔══██║██   ██║██║╚██╗██║██╔══██║
    ███████╗██║███████╗██║  ██╗╚██████╔╝ ╚████╔╝ ███████║██║  ██╗██║  ██║    ███████╗██║  ██║╚█████╔╝██║ ╚████║██║  ██║
    ╚══════╝╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝
    
    🎮 Pixelart Topdown Shooter 🎮
    Vyrobeno s láskou v Godotu!
    
    Našel jsi easter egg! 🥚
`);

// Add some retro sound effects (optional - can be enabled later)
function playRetroSound(frequency = 440, duration = 200) {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'square'; // Retro square wave
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
}

// Add sound to buttons (commented out by default)
// document.querySelectorAll('.btn').forEach(button => {
//     button.addEventListener('click', () => playRetroSound(800, 100));
// });

// Add sound to navigation (commented out by default)
// document.querySelectorAll('.nav-link').forEach(link => {
//     link.addEventListener('click', () => playRetroSound(600, 150));
// });
