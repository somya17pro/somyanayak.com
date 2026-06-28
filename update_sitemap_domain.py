import os

f = 'sitemap.xml'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# Replace the URLs
new_content = content.replace('somyanayak.com', 'somyanaya.com')

if content != new_content:
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
    print(f"Updated sitemap domain to somyanaya.com")
else:
    print("No changes made to sitemap.")
