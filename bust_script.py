import os
import glob

files = glob.glob('*/index.html') + ['index.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Bust script cache
    content = content.replace('script.js?v=3', 'script.js?v=42')
    content = content.replace('src="script.js"', 'src="script.js?v=42"')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Busted script cache successfully!")
