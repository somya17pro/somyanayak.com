import os
import glob

chat_window_html = """
      <article class="window chat-window" id="chat" style="left: 54vw; top: 14vh;" aria-label="Chat with Mini Somya">
        <div class="window-titlebar">
          <div class="traffic"><button data-close></button><button></button><button></button></div>
          <span>Chat with Mini Somya</span>
        </div>
        <div class="window-body chat-body">
          <div class="chat-log" id="chatLog" aria-live="polite">
            <div class="chat-message bot">
              <span class="mini-avatar" aria-hidden="true"></span>
              <p>Hey, I'm Mini Somya. Ask me anything about Somya.</p>
            </div>
          </div>
          <form class="chat-form" id="chatForm">
            <label class="sr-only" for="chatInput">Ask Mini Somya a question</label>
            <input id="chatInput" name="question" type="text" autocomplete="off" placeholder="Ask about experience, skills, contact..." required>
            <button type="submit">Ask</button>
          </form>
          <div class="quick-asks" aria-label="Suggested questions">
            <button type="button" data-question="Can you summarize your marketing experience?">Experience</button>
            <button type="button" data-question="What did you do at Intempt?">Intempt</button>
            <button type="button" data-question="How did you scale Marvedge to $1k MRR?">Marvedge</button>
            <button type="button" data-question="What were your biggest achievements at Interactly?">Interactly</button>
            <button type="button" data-question="Do you have experience with B2B outbound?">Outbound</button>
            <button type="button" data-question="What are your core marketing skills?">Skills</button>
            <button type="button" data-question="How can I contact Somya?">Contact</button>
          </div>
        </div>
      </article>
"""

html_files = glob.glob('**/*.html', recursive=True)

for f in html_files:
    if f.endswith('index.html') and f != 'index.html': # Exclude root index.html because it already has it
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if 'id="chat"' not in content:
            # Find the closing </section> for windows
            target = '</section>'
            windows_section = '<section class="windows" id="windows"'
            
            if windows_section in content:
                # Find the corresponding closing tag for windows section
                # Since there are multiple <section> tags, we should be careful.
                # A safe way is to replace the start of the section with the chat window + start of section
                # But wait, we want it INSIDE the windows section.
                # Let's just insert it right after `<section class="windows" id="windows" aria-live="polite">`
                
                parts = content.split('<section class="windows" id="windows" aria-live="polite">')
                if len(parts) > 1:
                    new_content = parts[0] + '<section class="windows" id="windows" aria-live="polite">\n' + chat_window_html + parts[1]
                    
                    with open(f, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    print(f"Injected chat window into {f}")

print("Done injecting chat windows.")
