import os
import glob

files = glob.glob('*/index.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update CSS cache buster
    if 'styles.css?v=3' in content:
        content = content.replace('styles.css?v=3', 'styles.css?v=42')
        # Add no-cache tags before the link
        tags = """<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <link rel="stylesheet" href="/styles.css?v=42">"""
        content = content.replace('<link rel="stylesheet" href="/styles.css?v=42">', tags)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated subpages successfully!")
