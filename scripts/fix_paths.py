import re

with open('dual-ingenieria-v2.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Corrección 1: en el JS de productos, BASE+"imagen.jpg" -> "imagen.jpg"
# Usar regex para encontrar BASE+"nombre.jpg" y reemplazar por "nombre.jpg"
html = re.sub(r'BASE\+"([a-zA-Z0-9_-]+\.jpg)"', r'"\1"', html)

# Corrección 2: en el HTML, las URLs completas de dualingenier.com para imágenes locales
local_images = [
    'panel.jpg', 'industrial2.jpg', 'tienda-bg2.jpg', 'tendido.jpg', 'ingeniero2.jpg',
    'prod-copper.jpg', 'grounding.jpg'
]

for img in local_images:
    old_url = 'https://dualingenier.com/wp-content/uploads/2022/06/' + img
    html = html.replace(old_url, img)
    # Also check for 2025 paths
    old_url2 = 'https://dualingenier.com/wp-content/uploads/2025/04/' + img
    html = html.replace(old_url2, img)

with open('dual-ingenieria-v2.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Fixed local image paths in JS and HTML.')
