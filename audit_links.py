import os
import glob
import re

html_files = glob.glob('**/*.html', recursive=True)
all_links = set()
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        links = re.findall(r'href="(.*?)"', content)
        img_srcs = re.findall(r'src="(.*?)"', content)
        for link in links:
            if link.startswith('/') or link.endswith('.html'):
                all_links.add((f, 'link', link))
        for img in img_srcs:
            all_links.add((f, 'img', img))

print("Broken links/images:")
for source_file, type_, url in all_links:
    if url.startswith('http'): continue
    if url.startswith('mailto'): continue
    
    # Resolve URL to local file path
    # URLs starting with '/' are relative to root
    local_path = url.split('?')[0] # remove query params
    if local_path == '/':
        local_path = 'index.html'
    elif local_path.startswith('/'):
        # Check if it's a directory
        dir_path = local_path[1:]
        if os.path.isdir(dir_path):
            local_path = os.path.join(dir_path, 'index.html')
        else:
            local_path = local_path[1:] # strip leading slash
            
    if not os.path.exists(local_path):
        print(f"File {source_file}: Broken {type_} -> {url} (mapped to {local_path})")

print("Audit complete.")
