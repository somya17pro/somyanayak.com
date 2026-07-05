import os
import glob

gtag_snippet = """
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T9X21WVYJD"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-T9X21WVYJD');
  </script>
"""

html_files = glob.glob('**/*.html', recursive=True)

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if already installed
    if "G-T9X21WVYJD" not in content:
        # Insert after <head>
        new_content = content.replace('<head>', f'<head>{gtag_snippet}')
        
        if content != new_content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Added gtag to {f}")

print("Done installing Google Analytics.")
