import os
import glob

files = glob.glob('*/index.html') + ['index.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Bust script cache
    content = content.replace('script.js?v=42', 'script.js?v=43')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Busted script cache successfully to v43!")
