import os
import glob

bad_pixel = """    <div class="pixel-girl" id="pixelSomya" aria-hidden="true">
      <button id="dismissAvatar" aria-label="Dismiss avatar" class="avatar-dismiss">×</button>
      <div class="speech-bubble" id="speechBubble">Hey, I'm Mini Somya. Click me to chat.</div>
    </div>"""

good_pixel = """    <section class="pixel-girl pixel-somya" id="pixelSomya" aria-label="Pixel art character of Somya" role="button" tabindex="0">
      <button id="dismissAvatar" aria-label="Dismiss avatar" class="avatar-dismiss">×</button>
      <div class="speech-bubble" id="speechBubble">Hey, I'm Mini Somya. Click me to chat.</div>
      <div class="hair"></div>
      <div class="face"></div>
      <div class="body"></div>
      <div class="legs"></div>
    </section>"""

# Also fix index.html which has it as <section> but might be missing the dismiss button
bad_index_pixel = """    <section class="pixel-girl pixel-somya" id="pixelSomya" aria-label="Pixel art character of Somya" role="button" tabindex="0">
      <div class="speech-bubble" id="speechBubble">Hey, I'm Mini Somya. Click me to chat.</div>
      <div class="hair"></div>
      <div class="face"></div>
      <div class="body"></div>
      <div class="legs"></div>
    </section>"""

html_files = glob.glob('**/*.html', recursive=True)

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content.replace(bad_pixel, good_pixel).replace(bad_index_pixel, good_pixel)
    
    if content != new_content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Fixed pixel avatar in {f}")

print("Done fixing pixel avatars.")
