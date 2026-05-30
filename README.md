# aquarium
Acuario interactivo
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acuario Interactivo - Arrecife de Coral</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🌊 Acuario Interactivo</h1>
            <p class="subtitle">Explora los misterios del Arrecife de Coral</p>
        </header>

        <div class="main-content">
            <!-- Canvas del acuario -->
            <div class="aquarium-section">
                <canvas id="aquariumCanvas"></canvas>
                <div class="canvas-info">
                    <p>💡 Haz clic en cualquier organismo para obtener información</p>
                </div>
            </div>

            <!-- Panel de información -->
            <aside class="info-panel">
                <div class="info-container" id="infoContainer">
                    <div class="welcome-message">
                        <h2>Bienvenido al Arrecife</h2>
                        <p>Selecciona un organismo del acuario para conocer más sobre él.</p>
                    </div>
                </div>
            </aside>
        </div>

        <!-- Controles -->
        <footer class="controls">
            <button id="pauseBtn" class="btn">⏸ Pausar</button>
            <button id="resetBtn" class="btn">🔄 Reiniciar</button>
            <button id="infoToggle" class="btn">ℹ️ Info</button>
            <span class="organism-count" id="organismCount">Organismos: 0</span>
        </footer>
    </div>

    <script src="data.js"></script>
    <script src="aquarium.js"></script>
</body>
</html>
:root {
    --primary-color: #0066cc;
    --secondary-color: #00cc99;
    --dark-bg: #0a0e27;
    --light-text: #ffffff;
    --panel-bg: #1a1f3a;
    --border-color: #00cc99;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, var(--dark-bg) 0%, #1a0a2e 100%);
    color: var(--light-text);
    min-height: 100vh;
    overflow-x: hidden;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 30px;
    animation: fadeInDown 0.8s ease-out;
}

header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

header .subtitle {
    font-size: 1.1em;
    color: #00cc99;
    opacity: 0.8;
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 20px;
    margin-bottom: 20px;
    animation: fadeInUp 0.8s ease-out;
}

.aquarium-section {
    background: linear-gradient(135deg, #001a33 0%, #002d5c 100%);
    border: 3px solid var(--border-color);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 204, 153, 0.3),
                inset 0 0 20px rgba(0, 204, 153, 0.1);
    position: relative;
}

#aquariumCanvas {
    display: block;
    width: 100%;
    height: 600px;
    cursor: crosshair;
    background: linear-gradient(180deg, #001a33 0%, #0a3a5c 50%, #1a5a7a 100%);
}

.canvas-info {
    padding: 10px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 0.9em;
    color: #00cc99;
}

.info-panel {
    background: var(--panel-bg);
    border: 2px solid var(--border-color);
    border-radius: 15px;
    padding: 20px;
    overflow-y: auto;
    max-height: 650px;
    box-shadow: 0 0 20px rgba(0, 204, 153, 0.2);
    animation: slideInRight 0.8s ease-out;
}

.info-panel::-webkit-scrollbar {
    width: 8px;
}

.info-panel::-webkit-scrollbar-track {
    background: rgba(0, 204, 153, 0.1);
    border-radius: 10px;
}

.info-panel::-webkit-scrollbar-thumb {
    background: var(--secondary-color);
    border-radius: 10px;
}

.info-panel::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
}

.welcome-message {
    text-align: center;
    padding: 30px 10px;
}

.welcome-message h2 {
    font-size: 1.8em;
    margin-bottom: 15px;
    color: var(--secondary-color);
}

.welcome-message p {
    color: #aaa;
    font-size: 0.95em;
    line-height: 1.5;
}

.organism-info {
    animation: fadeIn 0.5s ease-out;
}

.organism-info h2 {
    color: var(--secondary-color);
    font-size: 1.6em;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border-color);
}

.organism-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, rgba(0, 204, 153, 0.2), rgba(0, 102, 204, 0.2));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5em;
    margin-bottom: 15px;
    border: 2px dashed var(--border-color);
}

.info-item {
    margin-bottom: 15px;
    padding: 12px;
    background: rgba(0, 204, 153, 0.1);
    border-left: 3px solid var(--secondary-color);
    border-radius: 5px;
}

.info-label {
    font-weight: bold;
    color: var(--secondary-color);
    font-size: 0.9em;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.info-value {
    color: #ddd;
    margin-top: 5px;
    font-size: 0.95em;
    line-height: 1.5;
}

.conservation-status {
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
    font-size: 0.85em;
}

.status-cites {
    background: rgba(255, 69, 0, 0.2);
    color: #ff6b6b;
    border: 1px solid #ff6b6b;
}

.status-lc {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
    border: 1px solid #4caf50;
}

.status-vn {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
    border: 1px solid #ffc107;
}

.curiosity-box {
    background: linear-gradient(135deg, rgba(0, 204, 153, 0.15), rgba(0, 102, 204, 0.15));
    border: 2px solid var(--secondary-color);
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
}

.curiosity-title {
    color: var(--secondary-color);
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 0.95em;
}

.curiosity-text {
    color: #ccc;
    font-size: 0.9em;
    font-style: italic;
    line-height: 1.6;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
    background: var(--panel-bg);
    border-radius: 10px;
    border: 1px solid var(--border-color);
}

.btn {
    padding: 12px 25px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: bold;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 204, 153, 0.3);
}

.btn:active {
    transform: translateY(-1px);
}

.organism-count {
    padding: 10px 20px;
    background: rgba(0, 204, 153, 0.2);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-weight: bold;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media (max-width: 1024px) {
    .main-content {
        grid-template-columns: 1fr;
    }

    .info-panel {
        max-height: 400px;
    }

    header h1 {
        font-size: 2em;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 15px;
    }

    header h1 {
        font-size: 1.5em;
    }

    #aquariumCanvas {
        height: 400px;
    }

    .controls {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}
// Base de datos de organismos del arrecife de coral
const ORGANISMS_DATA = [
    {
        id: 1,
        commonName: 'Pez Payaso',
        scientificName: 'Amphiprion ocellaris',
        emoji: '🐠',
        color: '#FF6B35',
        size: 'Pequeño (8-10 cm)',
        cites: 'No CITES',
        minCatchSize: 'N/A',
        behavior: 'Vive en simbiosis con anémonas de mar. Es muy territorial y agresivo con otros peces de su especie.',
        curiosity: '¡El pez payaso puede cambiar de sexo! Si la hembra muere, el macho dominante se convierte en hembra para reproducirse.',
        habitat: 'Arrecifes de coral del Indo-Pacífico',
        diet: 'Omnívoro (pequeños crustáceos, algas, detritos)',
        speed: 3
    },
    {
        id: 2,
        commonName: 'Pez Cirujano Azul',
        scientificName: 'Paracanthurus hepatus',
        emoji: '🐟',
        color: '#0066FF',
        size: 'Mediano (20-25 cm)',
        cites: 'No CITES',
        minCatchSize: 'N/A',
        behavior: 'Pez activo que vive en grupos. Se alimenta durante el día en las zonas rocosas del arrecife.',
        curiosity: 'Tiene espinas venenosas en la cola que utiliza como defensa. ¡Se conoce como "Tang Azul"!',
        habitat: 'Arrecifes de coral indopacíficos',
        diet: 'Principalmente algas (herbívoro)',
        speed: 2
    },
    {
        id: 3,
        commonName: 'Raya Manta',
        scientificName: 'Manta birostris',
        emoji: '🦼',
        color: '#2E2E2E',
        size: 'Grande (4-7 m)',
        cites: 'Apéndice II CITES',
        minCatchSize: 'No especificado',
        behavior: 'Viaja en grandes grupos llamados "escuelas". Realiza acrobacias fuera del agua.',
        curiosity: 'Tiene el cerebro más grande de todos los peces. ¡Puede saltar hasta 2 metros fuera del agua!',
        habitat: 'Aguas tropicales y templadas de arrecifes',
        diet: 'Filtrador (zooplancton, huevos de peces)',
        speed: 2
    },
    {
        id: 4,
        commonName: 'Pez León',
        scientificName: 'Pterois volitans',
        emoji: '🦁',
        color: '#FF4500',
        size: 'Mediano (30-38 cm)',
        cites: 'No CITES',
        minCatchSize: 'N/A',
        behavior: 'Cazador nocturno que permanece inmóvil durante el día. Altamente venenoso.',
        curiosity: 'Sus aletas tienen veneno neurotóxico extremadamente potente. Una espina puede causar dolor intenso en humanos.',
        habitat: 'Arrecifes de coral del Indo-Pacífico',
        diet: 'Carnívoro (peces pequeños, camarones)',
        speed: 1
    },
    {
        id: 5,
        commonName: 'Tortuga Marina',
        scientificName: 'Chelonia mydas',
        emoji: '🐢',
        color: '#228B22',
        size: 'Grande (80-110 cm)',
        cites: 'Apéndice I CITES - EN PELIGRO',
        minCatchSize: 'Protegida',
        behavior: 'Migra miles de km entre zonas de alimentación y reproducción. Es muy lenta pero resistente.',
        curiosity: 'Las tortugas marinas pueden vivir más de 100 años. ¡Las hembras siempre regresan a la playa donde nacieron para desovar!',
        habitat: 'Océanos tropicales y subtropicales',
        diet: 'Omnívoro (algas, invertebrados, especialmente medusas)',
        speed: 1
    },
    {
        id: 6,
        commonName: 'Pez Loro Arcoíris',
        scientificName: 'Scarus guacamaia',
        emoji: '🦜',
        color: '#FF1493',
        size: 'Grande (76-92 cm)',
        cites: 'No CITES',
        minCatchSize: '30-36 cm',
        behavior: 'Vive en solitario o en parejas. Es muy activo durante el día.',
        curiosity: 'Come coral y excreta arena de la que está hecho 70% de las playas tropicales. ¡Un solo pez puede producir toneladas de arena al año!',
        habitat: 'Arrecifes de coral del Atlántico Occidental',
        diet: 'Herbívoro (algas y coral duro)',
        speed: 2
    },
    {
        id: 7,
        commonName: 'Caballito de Mar',
        scientificName: 'Hippocampus kuda',
        emoji: '🐴',
        color: '#FFD700',
        size: 'Muy Pequeño (15-30 cm)',
        cites: 'Apéndice II CITES',
        minCatchSize: 'Protegido',
        behavior: 'Se mueve lentamente agarrado a plantas marinas. Es monógamo.',
        curiosity: '¡El macho es quien da a luz! Lleva los huevos en una bolsa especial durante el embarazo.',
        habitat: 'Aguas costeras poco profundas',
        diet: 'Carnívoro (pequeños crustáceos)',
        speed: 0.5
    },
    {
        id: 8,
        commonName: 'Coral Cerebro',
        scientificName: 'Diploria strigosa',
        emoji: '🧠',
        color: '#8B4513',
        size: 'Variable',
        cites: 'Apéndice II CITES',
        minCatchSize: 'Protegido',
        behavior: 'Sedentario. Vive en colonias que pueden durar siglos.',
        curiosity: 'Los corales son animales, no plantas. Generan su propio alimento mediante algas simbióticas llamadas zooxantelas.',
        habitat: 'Arrecifes de coral del Caribe',
        diet: 'Zooxantelas y zooplancton',
        speed: 0
    },
    {
        id: 9,
        commonName: 'Pulpo de Arrecife',
        scientificName: 'Octopus cyanea',
        emoji: '🐙',
        color: '#8B0000',
        size: 'Pequeño a Mediano (15-20 cm)',
        cites: 'No CITES',
        minCatchSize: 'N/A',
        behavior: 'Nocturno y solitario. Cambista de color experto.',
        curiosity: 'Tiene 3 corazones y sangre azul. Puede cambiar de color en milisegundos. ¡Es extremadamente inteligente!',
        habitat: 'Arrecifes de coral del Indo-Pacífico',
        diet: 'Carnívoro (cangrejos, camarones, peces)',
        speed: 2
    },
    {
        id: 10,
        commonName: 'Erizo de Mar',
        scientificName: 'Diadema antillarum',
        emoji: '🌰',
        color: '#000000',
        size: 'Pequeño (5-7 cm)',
        cites: 'No CITES',
        minCatchSize: 'N/A',
        behavior: 'Se esconde en grietas durante el día. Sale a alimentarse por la noche.',
        curiosity: 'Sus púas tienen veneno. Si se clavan en la piel humana, pueden causar dolor intenso. ¡Tienen 5 ojos además de los ocelos!',
        habitat: 'Arrecifes de coral tropicales',
        diet: 'Herbívoro (algas, detritos)',
        speed: 0.5
    }
];

// Configuración del acuario
const AQUARIUM_CONFIG = {
    width: 1000,
    height: 600,
    particleCount: 15,
    bubbleCount: 20,
    backgroundColor: '#001a33',
    particleSpeed: 1
};
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
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Build
dist/
build/
*.min.js
*.min.css

# Environment
.env
.env.local
.env.*.local