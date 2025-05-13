document.addEventListener('DOMContentLoaded', () => {
    // Logo Generation
    const canvases = document.querySelectorAll('#logo');
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(50, 50, 50, 0, Math.PI * 2);
        ctx.fill();

        // Stylized "M"
        ctx.font = '60px Dancing Script';
        ctx.fillStyle = '#6D2077';
        ctx.textAlign = 'center';
        ctx.fillText('M', 50, 70);

        // Bead-like pattern
        const colors = ['#E63946', '#F4A8B8', '#6D2077', '#FFFFFF'];
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30) * Math.PI / 180;
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
        }
    });

    // Download Logo
    const downloadLogo = () => {
        const canvas = document.querySelector('#logo');
        const link = document.createElement('a');
        link.download = 'magibidz-logo.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    // Particle Animation
    const particleCanvases = document.querySelectorAll('#particle-canvas');
    particleCanvases.forEach(canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const particles = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 2;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = ['#E63946', '#F4A8B8', '#6D2077', '#FFFFFF'][Math.floor(Math.random() * 4)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    });

    // Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.querySelector('#lightbox');
    const lightboxImage = document.querySelector('#lightbox-image');
    const close = document.querySelector('.close');

    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImage.src = item.src;
                lightbox.style.display = 'flex';
            });
        });
    }

    if (close) {
        close.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Form Submission (Placeholder)
    const forms = document.querySelectorAll('.contact-form, .newsletter');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Submitted! (You are amazing)');
            form.reset();
        });
    });

    // Shop Filter
    const filterButtons = document.querySelectorAll('.filter button');
    const shopItems = document.querySelectorAll('.shop-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                shopItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Page Transition
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = 1;

    // Expose downloadLogo to global scope
    window.downloadLogo = downloadLogo;
});