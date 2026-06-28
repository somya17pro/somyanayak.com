import os
import glob

# 1. Revert sitemap
sitemap_file = 'sitemap.xml'
if os.path.exists(sitemap_file):
    with open(sitemap_file, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content.replace('somyanaya.com', 'somyanayak.com')
    
    if content != new_content:
        with open(sitemap_file, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Reverted sitemap domain to somyanayak.com")

# 2. Add favicon to all HTML files
html_files = glob.glob('**/*.html', recursive=True)
favicon_tag = '<link rel="icon" type="image/jpeg" href="/assets/somya-profile.jpg">'

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if favicon_tag not in content and '<title>Somya Nayak</title>' in content:
        content = content.replace('<title>Somya Nayak</title>', f'<title>Somya Nayak</title>\n  {favicon_tag}')
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Added favicon to {f}")

print("Done updates!")
