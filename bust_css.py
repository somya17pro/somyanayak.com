import os
import glob

files = glob.glob('*/index.html') + ['index.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Bust style cache
    content = content.replace('styles.css?v=2', 'styles.css?v=44')
    content = content.replace('styles.css?v=3', 'styles.css?v=44')
    content = content.replace('styles.css?v=4', 'styles.css?v=44')
    content = content.replace('styles.css?v=42', 'styles.css?v=44')
    content = content.replace('styles.css?v=43', 'styles.css?v=44')
    content = content.replace('href="styles.css"', 'href="styles.css?v=44"')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Busted CSS cache successfully to v44!")
