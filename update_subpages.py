import os
import glob

files = glob.glob('*/index.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update CSS cache buster
    content = content.replace('styles.css?v=2', 'styles.css?v=3')
    
    # Update Home icon
    content = content.replace('<span class="pixel-icon icon-profile" aria-hidden="true"></span>\n        <span>Home</span>', '<span class="pixel-icon icon-dashboard" aria-hidden="true"></span>\n        <span>Home</span>')
    
    # Update Newsletter icon
    content = content.replace('<span class="pixel-icon icon-growth" aria-hidden="true"></span>\n        <span>Newsletter</span>', '<span class="pixel-icon icon-contact" aria-hidden="true"></span>\n        <span>Newsletter</span>')
    
    # Update Contact page visible class
    if 'contact/index.html' in f:
        content = content.replace('<article class="window socials-window"', '<article class="window open socials-window"')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated subpages successfully!")
