import re

with open('dual-ingenieria-v2.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ─── 1. Reemplazo de imágenes de secciones principales ───
replacements = [
    # Home hero bg
    ('https://dualingenier.com/wp-content/uploads/2022/06/img-servico-005.jpg', 'subestacion.jpg'),
    # Home services preview
    ('https://dualingenier.com/wp-content/uploads/2022/06/imservicios-001.jpg', 'subestacion.jpg'),
    ('https://dualingenier.com/wp-content/uploads/2022/06/imservicios-002.jpg', 'ingeniero.jpg'),
    ('https://dualingenier.com/wp-content/uploads/2022/06/imservicios-003.jpg', 'tendido.jpg'),
    ('https://dualingenier.com/wp-content/uploads/2022/06/img-servicio-004.jpg', 'hero.jpg'),
    ('https://dualingenier.com/wp-content/uploads/2022/06/img-servicio-006.jpg', 'grounding.jpg'),
    # Home why us photo
    ('https://dualingenier.com/wp-content/uploads/2022/06/img-snosotors.jpg', 'ingeniero2.jpg'),
    # Nosotros hero
    # (ya cubierto arriba por img-snosotors.jpg -> ingeniero2.jpg)
    # Nosotros en acción (mismas URLs que servicios preview)
    # Servicios hero
    # (ya cubierto arriba por imservicios-002.jpg -> ingeniero.jpg)
    # Servicios page full cards (mismas URLs)
    # INDECI
    ('https://dualingenier.com/wp-content/uploads/2022/06/IMG-SERVICO-ING.jpg', 'panel.jpg'),
    # Contacto hero
    # (ya cubierto arriba por img-servico-005.jpg -> subestacion.jpg, pero para contacto usaremos tendido)
]

# Hacer reemplazos generales
for old, new in replacements:
    html = html.replace(old, new)

# Reemplazo específico para contacto hero (img-servico-005.jpg ya fue reemplazado a subestacion.jpg arriba,
# pero queremos tendido.jpg para contacto. Necesito ser más específico con regex.)
html = html.replace(
    '<img src="subestacion.jpg" alt="Contacto" />',
    '<img src="tendido.jpg" alt="Contacto" />'
)

# Reemplazo específico para home hero bg: ya es subestacion.jpg, está bien.
# Pero para el home hero original, el overlay es muy claro (blanco). Con una imagen oscura de subestación,
# necesitamos ajustar el overlay. Pero mantendré el diseño light y ajustaré la opacidad en CSS.

# ─── 2. Insertar CSS mejorado antes de </style> ───
enhanced_css = '''
        /* ═══ 3D & ANIMATION ENHANCEMENTS ═══ */
        #three-canvas {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
            opacity: 0.6;
        }
        .hero {
            background: linear-gradient(135deg, #f0f4f9 0%, #e2e8f0 100%);
        }
        .hero-bg img {
            opacity: 0.25;
            filter: contrast(1.1) saturate(0.9);
        }
        .hero-bg-overlay {
            background: linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(240,245,250,0.85) 60%, rgba(230,240,255,0.7) 100%);
        }
        .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s;
        }
        .card-3d:hover {
            transform: translateY(-6px) rotateX(2deg) rotateY(-2deg);
            box-shadow: 0 20px 40px rgba(26,111,255,0.15), 0 0 0 1px rgba(26,111,255,0.08);
        }
        .ppcard {
            transform-style: preserve-3d;
            transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ppcard:hover {
            transform: translateY(-6px) rotateX(2deg) rotateY(-2deg);
            box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(26,111,255,0.1);
        }
        .svc-card-full {
            transform-style: preserve-3d;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .svc-card-full:hover {
            transform: translateY(-4px) rotateX(1deg);
            box-shadow: 0 24px 48px rgba(0,0,0,0.06), 0 0 0 1px rgba(26,111,255,0.08);
            border-color: rgba(26,111,255,0.2);
        }
        .value-card {
            transform-style: preserve-3d;
            transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .value-card:hover {
            transform: translateY(-5px) rotateX(2deg);
            box-shadow: 0 16px 32px rgba(0,0,0,0.06);
        }
        .cert-card {
            transition: all 0.3s;
        }
        .cert-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.05);
            border-color: rgba(26,111,255,0.2);
        }
        .why-item {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .why-item:hover {
            transform: translateX(6px);
            border-color: rgba(26,111,255,0.25);
            box-shadow: 0 8px 24px rgba(26,111,255,0.06);
        }
        .hcard {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .hcard:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 28px rgba(0,0,0,0.08);
        }
        .cinfo-item {
            transition: all 0.3s;
        }
        .cinfo-item:hover {
            transform: translateX(4px);
            border-color: rgba(26,111,255,0.2);
        }
        .float-wa {
            animation: wa-bounce 2s infinite;
        }
        @keyframes wa-bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
        }
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .reveal.vis {
            opacity: 1;
            transform: none;
        }
        .stagger-1 { transition-delay: 0.05s; }
        .stagger-2 { transition-delay: 0.1s; }
        .stagger-3 { transition-delay: 0.15s; }
        .stagger-4 { transition-delay: 0.2s; }
        .stagger-5 { transition-delay: 0.25s; }
        .stagger-6 { transition-delay: 0.3s; }
        .shimmer {
            position: relative;
            overflow: hidden;
        }
        .shimmer::after {
            content: "";
            position: absolute;
            top: 0; left: -100%;
            width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 200%; }
        }
        .photo-frame {
            transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s;
            box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .photo-frame:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }
        .nav-logo {
            transition: transform 0.2s;
        }
        .nav-logo:hover {
            transform: scale(1.02);
        }
        .btn {
            transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-blue:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(26, 111, 255, 0.35);
        }
        .pcard-img {
            transition: background 0.3s;
        }
        .pcard:hover .pcard-img {
            background: #eef2f7;
        }
        .svc-prev-card {
            transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .svc-prev-card:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 16px 32px rgba(0,0,0,0.08);
        }
        .hero-stats {
            backdrop-filter: blur(8px);
            background: rgba(255,255,255,0.4);
            border-radius: 16px;
            padding: 24px 32px;
            border: 1px solid rgba(255,255,255,0.5);
        }
        .hstat-num {
            background: linear-gradient(135deg, var(--white), var(--blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
'''

html = html.replace('    </style>', enhanced_css + '    </style>')

# ─── 3. Insertar Three.js canvas en el hero ───
hero_insert = '<div class="hero-bg">'
hero_canvas = '<canvas id="three-canvas"></canvas><div class="hero-bg">'
html = html.replace(hero_insert, hero_canvas, 1)

# ─── 4. Insertar Three.js y mejoras JS antes de </script> ───
three_js_code = '''

        // ═══ THREE.JS 3D BACKGROUND ═══
        (function(){
            const canvas = document.getElementById('three-canvas');
            if(!canvas || !window.THREE) return;
            const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
            camera.position.z = 30;
            const particles = new THREE.BufferGeometry();
            const count = 120;
            const pos = new Float32Array(count*3);
            for(let i=0;i<count;i++){
                pos[i*3] = (Math.random()-0.5)*60;
                pos[i*3+1] = (Math.random()-0.5)*40;
                pos[i*3+2] = (Math.random()-0.5)*20;
            }
            particles.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            const mat = new THREE.PointsMaterial({color:0x1a6fff, size:0.15, transparent:true, opacity:0.6});
            const pts = new THREE.Points(particles, mat);
            scene.add(pts);
            const lineGeo = new THREE.BufferGeometry();
            const lineMat = new THREE.LineBasicMaterial({color:0x1a6fff, transparent:true, opacity:0.15});
            const lines = new THREE.LineSegments(lineGeo, lineMat);
            scene.add(lines);
            let time = 0;
            function animate(){
                requestAnimationFrame(animate);
                time += 0.005;
                const positions = particles.attributes.position.array;
                for(let i=0;i<count;i++){
                    positions[i*3+1] += Math.sin(time+i)*0.02;
                    positions[i*3] += Math.cos(time+i*0.5)*0.01;
                }
                particles.attributes.position.needsUpdate = true;
                // Update connections
                const linePositions = [];
                for(let i=0;i<count;i++){
                    for(let j=i+1;j<count;j++){
                        const dx = positions[i*3]-positions[j*3];
                        const dy = positions[i*3+1]-positions[j*3+1];
                        const dz = positions[i*3+2]-positions[j*3+2];
                        const dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                        if(dist < 12){
                            linePositions.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
                            linePositions.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
                        }
                    }
                }
                lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
                pts.rotation.y = time * 0.1;
                renderer.render(scene, camera);
            }
            animate();
            window.addEventListener('resize', ()=>{
                const w = canvas.clientWidth, h = canvas.clientHeight;
                camera.aspect = w/h; camera.updateProjectionMatrix();
                renderer.setSize(w,h);
            });
        })();

        // ═══ PARALLAX HERO ═══
        (function(){
            const hero = document.querySelector('.hero');
            const bg = hero?.querySelector('.hero-bg img');
            if(!hero || !bg) return;
            window.addEventListener('scroll', ()=>{
                const y = window.scrollY;
                if(y < hero.offsetHeight){
                    bg.style.transform = `translateY(${y*0.3}px) scale(1.05)`;
                }
            });
        })();

        // ═══ 3D TILT CARDS ═══
        (function(){
            document.querySelectorAll('.ppcard, .svc-card-full, .value-card').forEach(card=>{
                card.addEventListener('mousemove', e=>{
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    card.style.transform = `translateY(-6px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
                });
                card.addEventListener('mouseleave', ()=>{
                    card.style.transform = '';
                });
            });
        })();

        // ═══ STAGGERED REVEAL ═══
        (function(){
            function staggerReveal(containerSelector){
                const container = document.querySelector(containerSelector);
                if(!container) return;
                const children = container.querySelectorAll('.reveal');
                children.forEach((el, i)=>{
                    el.classList.add('stagger-' + Math.min(i+1, 6));
                });
            }
            ['.svc-preview-grid', '.prod-preview-row', '.about-values', '.services-full-grid', '.products-grid', '.cert-grid', '.why-list'].forEach(sel=>staggerReveal(sel));
        })();
'''

# Insertar Three.js desde CDN en el head
html = html.replace(
    '<link rel="preconnect" href="https://fonts.googleapis.com" />',
    '<link rel="preconnect" href="https://fonts.googleapis.com" />\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'
)

html = html.replace('    </script>', three_js_code + '    </script>')

# ─── 5. Agregar clases card-3d a ciertos elementos ───
# A ppcard
html = html.replace('class="ppcard"', 'class="ppcard card-3d"')
# A svc-card-full
html = html.replace('class="svc-card-full reveal">', 'class="svc-card-full reveal card-3d">')
# A value-card
html = html.replace('class="value-card reveal">', 'class="value-card reveal card-3d">')
# A cert-card
html = html.replace('class="cert-card">', 'class="cert-card card-3d">')

with open('dual-ingenieria-v2.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Done! File updated with 3D effects, real images, and professional animations.')
