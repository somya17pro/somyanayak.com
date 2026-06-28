import os
import glob

html_files = glob.glob('**/*.html', recursive=True)
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Bust style cache
    content = content.replace('styles.css?v=45', 'styles.css?v=46')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Busted CSS cache to v46!")
