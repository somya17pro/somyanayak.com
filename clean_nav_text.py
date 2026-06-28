import os
import glob
import re

html_files = glob.glob('**/*.html', recursive=True)
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove <br> from About Me in desktop-icon span
    content = content.replace('<span>About<br>Me</span>', '<span>About Me</span>')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Removed <br> from About Me successfully!")
