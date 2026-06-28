import os
import glob

html_files = glob.glob('**/*.html', recursive=True)
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if '<button id="dismissAvatar"' not in content:
        content = content.replace('<div class="pixel-girl" id="pixelSomya" aria-hidden="true">',
                                  '<div class="pixel-girl" id="pixelSomya" aria-hidden="true">\n      <button id="dismissAvatar" aria-label="Dismiss avatar" class="avatar-dismiss">×</button>')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Added dismiss button to HTML files!")
