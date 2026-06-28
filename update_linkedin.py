import os
import glob

html_files = glob.glob('**/*.html', recursive=True)
txt_files = glob.glob('**/*.txt', recursive=True)

all_files = html_files + txt_files

for f in all_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the URLs
    new_content = content.replace('linkedin.com/in/somyarajannayak', 'linkedin.com/in/somyaranjannayak/')
    
    if content != new_content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated LinkedIn URL in {f}")

print("Done updating LinkedIn URLs.")
