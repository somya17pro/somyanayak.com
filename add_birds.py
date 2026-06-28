import os
import glob

files = glob.glob('*/index.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Add birds if not present
    if '<div class="bird bird-1" aria-hidden="true"></div>' not in content:
        content = content.replace('<div class="cloud cloud-three" aria-hidden="true"></div>', 
                                  '<div class="cloud cloud-three" aria-hidden="true"></div>\n    <div class="bird bird-1" aria-hidden="true"></div>\n    <div class="bird bird-2" aria-hidden="true"></div>\n    <div class="bird bird-3" aria-hidden="true"></div>')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Added birds to subpages successfully!")
