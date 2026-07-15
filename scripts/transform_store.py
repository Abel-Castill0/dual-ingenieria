import re

with open('dual-ingenieria-v2.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ─── 1. Reemplazar imágenes de productos en el array JS ───
# Mapping: old URL -> new local image
product_img_map = {
    'img-Interruptores-Diferenciales-300x300.jpg': 'panel.jpg',
    'img-Interruptores-Termomagneticos-Caja-Moldeada-300x300.jpg': 'industrial2.jpg',
    'img-Interruptores-Termomagneticos-Riel-Din-300x300.jpg': 'industrial2.jpg',
    'img-Bandeja-Portacable-Perforada-300x300.jpg': 'tienda-bg2.jpg',
    'img-Bandeja-Portacables-Escalera-300x300.jpg': 'tienda-bg2.jpg',
    'img-Bandeja-Portacbles-Lisa-300x300.jpg': 'tienda-bg2.jpg',
    'img-mallas-300x300.jpg': 'tienda-bg2.jpg',
    'img-accesorios-bpord-300x300.jpg': 'tienda-bg2.jpg',
    'img-N2XOH-300x300.jpg': 'tendido.jpg',
    'img-NH-80-300x300.jpg': 'tendido.jpg',
    'img-N2XSY-300x300.jpg': 'tendido.jpg',
    'img-arnes-300x300.jpg': 'ingeniero2.jpg',
    'img-casco-300x300.jpg': 'ingeniero2.jpg',
    'img-segurida-vial-300x300.jpg': 'ingeniero2.jpg',
    'ROPA-DE-TRABAJSOS-300x300.jpg': 'ingeniero2.jpg',
    'img-barrillas-de-cobre-300x300.jpg': 'prod-copper.jpg',
    'img-Bentonita-Sodica-300x300.jpg': 'grounding.jpg',
    'img-caja-de-concreto-300x300.jpg': 'panel.jpg',
    'img-togel-300x300.jpg': 'grounding.jpg',
    'img-soports-300x300.jpg': 'panel.jpg',
    'img-tablero-1-300x300.jpg': 'panel.jpg',
    'img-tuberia-conduit-emt-300x300.jpg': 'tienda-bg2.jpg',
    'img-Tuberia-Conduit-Flexible-300x300.jpg': 'tienda-bg2.jpg',
    'img-Tuberia-Conduit-PVC-300x300.jpg': 'tienda-bg2.jpg',
    'img-accesorios-tuberias-300x300.jpg': 'tienda-bg2.jpg',
}

for old, new in product_img_map.items():
    html = html.replace(old, new)

# Also replace the full BASE url references if any remain (product images use BASE+filename)
# The BASE variable is 'https://dualingenier.com/wp-content/uploads/2022/06/'
# Some images might still have the full BASE path. Replace those too.
for old, new in product_img_map.items():
    html = html.replace('BASE+"' + old + '"', '"' + new + '"')
    html = html.replace('BASE+"' + old, '"' + new)  # without closing quote just in case


# ─── 2. Add store-header background image and overlay ───
store_header_css = '''
        .store-header {
            position: relative;
            background: url('tienda-bg2.jpg') center/cover no-repeat;
            border-bottom: 1px solid var(--border);
            padding: 40px 5%;
            margin-top: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            overflow: hidden;
        }
        .store-header::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(240,245,250,0.92) 0%, rgba(230,240,255,0.88) 100%);
            backdrop-filter: blur(4px);
            z-index: 0;
        }
        .store-header > * {
            position: relative;
            z-index: 1;
        }
'''
html = html.replace(
    '''        .store-header {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 20px 5%;
            margin-top: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
        }''',
    store_header_css
)

# ─── 3. Add 3D canvas to the tienda page ───
# Insert after the store-header in the tienda page
html = html.replace(
    '<div id="pg-tienda" class="page">\n        <div class="store-header">',
    '<div id="pg-tienda" class="page">\n        <canvas id="store-three-canvas" style="position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.35;"></canvas>\n        <div class="store-header">'
)

# Also ensure the store layout has z-index above the canvas
store_layout_old = '<div class="store-layout">'
store_layout_new = '<div class="store-layout" style="position:relative;z-index:1;">'
html = html.replace(store_layout_old, store_layout_new, 1)  # only first occurrence

# ─── 4. Enhance .pcard 3D effect CSS ───
pcard_3d_css = '''
        .pcard {
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: var(--r16);
            overflow: hidden;
            transition: all 0.3s;
            display: flex;
            flex-direction: column;
            transform-style: preserve-3d;
            perspective: 800px;
        }
        .pcard:hover { border-color: var(--border-mid); transform: translateY(-6px) rotateX(4deg) rotateY(-2deg); box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(26,111,255,0.12); }
        .pcard-img {
            background: #f9fafb;
            aspect-ratio: 1;
            overflow: hidden;
            position: relative;
            transition: background 0.3s;
        }
        .pcard:hover .pcard-img { background: #eef2f7; }
        .pcard-img img { width: 100%; height: 100%; object-fit: contain; padding: 16px; transition: transform 0.4s; }
        .pcard:hover .pcard-img img { transform: scale(1.06); }
'''
html = html.replace(
    '''        .pcard {
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: var(--r16);
            overflow: hidden;
            transition: all 0.3s;
            display: flex;
            flex-direction: column;
        }
        .pcard:hover { border-color: var(--border-mid); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.05); }
        .pcard-img {
            background: #f9fafb;
            aspect-ratio: 1;
            overflow: hidden;
            position: relative;
        }
        .pcard-img img { width: 100%; height: 100%; object-fit: contain; padding: 16px; transition: transform 0.4s; }
        .pcard:hover .pcard-img img { transform: scale(1.06); }''',
    pcard_3d_css
)

# ─── 5. Add store 3D canvas JS at the end of the script block ───
store_three_js = '''

        // ═══ STORE THREE.JS 3D BACKGROUND ═══
        (function(){
            const canvas = document.getElementById('store-three-canvas');
            if(!canvas || !window.THREE) return;
            const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
            camera.position.z = 30;
            const particles = new THREE.BufferGeometry();
            const count = 100;
            const pos = new Float32Array(count*3);
            for(let i=0;i<count;i++){
                pos[i*3] = (Math.random()-0.5)*60;
                pos[i*3+1] = (Math.random()-0.5)*40;
                pos[i*3+2] = (Math.random()-0.5)*20;
            }
            particles.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            const mat = new THREE.PointsMaterial({color:0x1a6fff, size:0.12, transparent:true, opacity:0.5});
            const pts = new THREE.Points(particles, mat);
            scene.add(pts);
            const lineGeo = new THREE.BufferGeometry();
            const lineMat = new THREE.LineBasicMaterial({color:0x1a6fff, transparent:true, opacity:0.12});
            const lines = new THREE.LineSegments(lineGeo, lineMat);
            scene.add(lines);
            let time = 0;
            function animate(){
                requestAnimationFrame(animate);
                time += 0.004;
                const positions = particles.attributes.position.array;
                for(let i=0;i<count;i++){
                    positions[i*3+1] += Math.sin(time+i)*0.015;
                    positions[i*3] += Math.cos(time+i*0.5)*0.008;
                }
                particles.attributes.position.needsUpdate = true;
                const linePositions = [];
                for(let i=0;i<count;i++){
                    for(let j=i+1;j<count;j++){
                        const dx = positions[i*3]-positions[j*3];
                        const dy = positions[i*3+1]-positions[j*3+1];
                        const dz = positions[i*3+2]-positions[j*3+2];
                        const dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                        if(dist < 10){
                            linePositions.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
                            linePositions.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
                        }
                    }
                }
                lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
                pts.rotation.y = time * 0.08;
                renderer.render(scene, camera);
            }
            animate();
            window.addEventListener('resize', ()=>{
                const w = canvas.clientWidth, h = canvas.clientHeight;
                camera.aspect = w/h; camera.updateProjectionMatrix();
                renderer.setSize(w,h);
            });
        })();
'''

html = html.replace('    </script>', store_three_js + '    </script>')

with open('dual-ingenieria-v2.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Done! Store background, 3D canvas, product images, and enhanced card effects applied.')
