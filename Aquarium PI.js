class Aquarium {
    constructor() {
        this.canvas = document.getElementById('aquariumCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.organisms = [];
        this.particles = [];
        this.bubbles = [];
        this.isRunning = true;
        this.selectedOrganism = null;
        this.hoveredOrganism = null;

        // Configurar canvas
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        // Event listeners
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('infoToggle').addEventListener('click', () => this.toggleInfoPanel());

        // Inicializar
        this.init();
        this.animate();
    }

    init() {
        // Crear organismos
        ORGANISMS_DATA.forEach((data, index) => {
            const organism = new Organism(data, this.canvas.width, this.canvas.height);
            this.organisms.push(organism);
        });

        // Crear partículas (algas, detritos, etc.)
        for (let i = 0; i < 15; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }

        // Crear burbujas
        for (let i = 0; i < 20; i++) {
            this.bubbles.push(new Bubble(this.canvas.width, this.canvas.height));
        }

        this.updateOrganismCount();
    }

    animate() {
        // Limpiar canvas con gradiente
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#001a33');
        gradient.addColorStop(0.5, '#0a3a5c');
        gradient.addColorStop(1, '#1a5a7a');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar arena del fondo
        this.drawSeafloor();

        if (this.isRunning) {
            // Actualizar y dibujar burbujas
            this.bubbles.forEach(bubble => {
                bubble.update();
                bubble.draw(this.ctx);
            });

            // Actualizar y dibujar partículas
            this.particles.forEach(particle => {
                particle.update();
                particle.draw(this.ctx);
            });

            // Actualizar y dibujar organismos
            this.organisms.forEach(organism => {
                organism.update(this.canvas.width, this.canvas.height);
                organism.draw(this.ctx);

                // Resaltar si está seleccionado
                if (this.selectedOrganism && this.selectedOrganism.id === organism.id) {
                    this.drawSelectionAura(organism);
                }

                // Resaltar si está siendo hoverado
                if (this.hoveredOrganism && this.hoveredOrganism.id === organism.id) {
                    this.drawHoverAura(organism);
                }
            });
        } else {
            // Si está pausado, dibujar organismos sin actualizar
            this.organisms.forEach(organism => {
                organism.draw(this.ctx);

                if (this.selectedOrganism && this.selectedOrganism.id === organism.id) {
                    this.drawSelectionAura(organism);
                }
            });
        }

        // Continuar animación
        requestAnimationFrame(() => this.animate());
    }

    drawSeafloor() {
        // Arena del fondo
        this.ctx.fillStyle = '#3d2817';
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);

        // Textura de arena
        this.ctx.fillStyle = 'rgba(200, 150, 100, 0.3)';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.canvas.width;
            const y = this.canvas.height - 50 + Math.random() * 50;
            const size = Math.random() * 2;
            this.ctx.fillRect(x, y, size, size);
        }
    }

    drawSelectionAura(organism) {
        this.ctx.strokeStyle = 'rgba(0, 204, 153, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(organism.x, organism.y, organism.size + 10, 0, Math.PI * 2);
        this.ctx.stroke();

        // Aura pulsante
        const pulse = Math.sin(Date.now() / 300) * 3;
        this.ctx.strokeStyle = `rgba(0, 204, 153, ${0.3 + pulse * 0.1})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(organism.x, organism.y, organism.size + 15 + pulse, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawHoverAura(organism) {
        this.ctx.strokeStyle = 'rgba(0, 102, 204, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(organism.x, organism.y, organism.size + 8, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Buscar si se hizo clic en un organismo
        for (let organism of this.organisms) {
            const distance = Math.hypot(clickX - organism.x, clickY - organism.y);
            if (distance < organism.size + 10) {
                this.selectedOrganism = organism;
                this.displayOrganismInfo(organism);
                return;
            }
        }

        // Si no se hizo clic en nada, limpiar selección
        this.selectedOrganism = null;
        this.displayWelcomeMessage();
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.hoveredOrganism = null;
        for (let organism of this.organisms) {
            const distance = Math.hypot(mouseX - organism.x, mouseY - organism.y);
            if (distance < organism.size + 10) {
                this.hoveredOrganism = organism;
                this.canvas.style.cursor = 'pointer';
                return;
            }
        }

        this.canvas.style.cursor = 'crosshair';
    }

    displayOrganismInfo(organism) {
        const infoContainer = document.getElementById('infoContainer');

        const conservationClass = organism.data.cites.includes('I') ? 'status-cites' :
                                   organism.data.cites.includes('II') ? 'status-cites' : 'status-lc';

        infoContainer.innerHTML = `
            <div class="organism-info">
                <h2>${organism.data.commonName}</h2>
                <div class="organism-image">${organism.data.emoji}</div>

                <div class="info-item">
                    <div class="info-label">Nombre Científico</div>
                    <div class="info-value"><em>${organism.data.scientificName}</em></div>
                </div>

                <div class="info-item">
                    <div class="info-label">Tamaño</div>
                    <div class="info-value">${organism.data.size}</div>
                </div>

                <div class="info-item">
                    <div class="info-label">Hábitat</div>
                    <div class="info-value">${organism.data.habitat}</div>
                </div>

                <div class="info-item">
                    <div class="info-label">Dieta</div>
                    <div class="info-value">${organism.data.diet}</div>
                </div>

                <div class="info-item">
                    <div class="info-label">Comportamiento</div>
                    <div class="info-value">${organism.data.behavior}</div>
                </div>

                <div class="conservation-status ${conservationClass}">
                    🛡️ ${organism.data.cites}
                </div>

                ${organism.data.minCatchSize !== 'N/A' ? `
                    <div class="info-item">
                        <div class="info-label">Talla Mínima de Captura</div>
                        <div class="info-value">${organism.data.minCatchSize}</div>
                    </div>
                ` : ''}

                <div class="curiosity-box">
                    <div class="curiosity-title">🔍 Dato Curioso</div>
                    <div class="curiosity-text">${organism.data.curiosity}</div>
                </div>
            </div>
        `;
    }

    displayWelcomeMessage() {
        const infoContainer = document.getElementById('infoContainer');
        infoContainer.innerHTML = `
            <div class="welcome-message">
                <h2>Bienvenido al Arrecife</h2>
                <p>Selecciona un organismo del acuario para conocer más sobre él.</p>
            </div>
        `;
    }

    togglePause() {
        this.isRunning = !this.isRunning;
        document.getElementById('pauseBtn').textContent = this.isRunning ? '⏸ Pausar' : '▶️ Reanudar';
    }

    reset() {
        this.organisms.forEach(org => org.randomizePosition(this.canvas.width, this.canvas.height));
        this.selectedOrganism = null;
        this.displayWelcomeMessage();
    }

    toggleInfoPanel() {
        const panel = document.querySelector('.info-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }

    updateOrganismCount() {
        document.getElementById('organismCount').textContent = `Organismos: ${this.organisms.length}`;
    }
}

class Organism {
    constructor(data, maxX, maxY) {
        this.data = data;
        this.id = data.id;
        this.maxX = maxX;
        this.maxY = maxY;
        this.size = 20 + Math.random() * 10;
        this.x = Math.random() * maxX;
        this.y = Math.random() * (maxY - 100) + 50;
        this.vx = (Math.random() - 0.5) * data.speed * 2;
        this.vy = (Math.random() - 0.5) * data.speed;
        this.rotation = Math.random() * Math.PI * 2;
        this.wobble = 0;
    }

    randomizePosition(maxX, maxY) {
        this.x = Math.random() * maxX;
        this.y = Math.random() * (maxY - 100) + 50;
        this.rotation = Math.random() * Math.PI * 2;
    }

    update(maxX, maxY) {
        // Movimiento
        this.x += this.vx;
        this.y += this.vy;

        // Rebotar en paredes
        if (this.x - this.size < 0 || this.x + this.size > maxX) {
            this.vx *= -1;
            this.x = Math.max(this.size, Math.min(maxX - this.size, this.x));
        }

        if (this.y - this.size < 0 || this.y + this.size > maxY - 50) {
            this.vy *= -1;
            this.y = Math.max(this.size, Math.min(maxY - 50 - this.size, this.y));
        }

        // Actualizar rotación
        if (this.vx !== 0) {
            this.rotation = Math.atan2(this.vy, this.vx);
        }

        // Movimiento ondulante
        this.wobble += 0.05;
        this.y += Math.sin(this.wobble) * 0.5;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Dibujar organismo como emoji
        ctx.font = `${this.size * 2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.data.emoji, 0, 0);

        ctx.restore();
    }
}

class Particle {
    constructor(maxX, maxY) {
        this.x = Math.random() * maxX;
        this.y = Math.random() * maxY;
        this.size = Math.random() * 1 + 0.5;
        this.vy = Math.random() * 0.5 + 0.2;
        this.vx = Math.random() * 0.2 - 0.1;
        this.maxX = maxX;
        this.maxY = maxY;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
    }

    update() {
        this.y -= this.vy;
        this.x += this.vx;
        this.life--;

        if (this.y < 0 || this.life <= 0) {
            this.y = this.maxY;
            this.x = Math.random() * this.maxX;
            this.life = Math.random() * 200 + 100;
        }
    }

    draw(ctx) {
        const opacity = this.life / this.maxLife;
        ctx.fillStyle = `rgba(100, 150, 200, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Bubble {
    constructor(maxX, maxY) {
        this.x = Math.random() * maxX;
        this.y = maxY;
        this.radius = Math.random() * 3 + 1;
        this.vy = Math.random() * 1 + 0.5;
        this.vx = Math.random() * 0.3 - 0.15;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    update() {
        this.y -= this.vy;
        this.x += this.vx;

        if (this.y < 0) {
            this.y = this.maxY;
            this.x = Math.random() * this.maxX;
        }
    }

    draw(ctx) {
        ctx.strokeStyle = `rgba(200, 220, 255, 0.3)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Inicializar acuario cuando la página carga
window.addEventListener('load', () => {
    new Aquarium();
});