import os

base_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Somya Nayak - {title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Press+Start+2P&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css?v=3">
</head>
<body>
  <main class="desktop" id="desktop">
    <div class="cloud cloud-one" aria-hidden="true"></div>
    <div class="cloud cloud-two" aria-hidden="true"></div>
    <div class="cloud cloud-three" aria-hidden="true"></div>

    <section class="desktop-icons" aria-label="Project icons">
      <a class="desktop-icon" href="/">
        <span class="pixel-icon icon-dashboard" aria-hidden="true"></span>
        <span>Home</span>
      </a>
      <a class="desktop-icon" href="/about">
        <span class="pixel-icon icon-profile" aria-hidden="true"></span>
        <span>About<br>Me</span>
      </a>
      <a class="desktop-icon" href="/work">
        <span class="pixel-icon icon-megaphone" aria-hidden="true"></span>
        <span>Works</span>
      </a>
      <a class="desktop-icon" href="/resources">
        <span class="pixel-icon icon-seo" aria-hidden="true"></span>
        <span>Resources</span>
      </a>
      <a class="desktop-icon" href="/newsletter">
        <span class="pixel-icon icon-contact" aria-hidden="true"></span>
        <span>Newsletter</span>
      </a>
      <a class="desktop-icon" href="/contact">
        <span class="pixel-icon icon-socials" aria-hidden="true"></span>
        <span>Contact</span>
      </a>
    </section>

    <section class="windows" id="windows" aria-live="polite">
      {window_content}
    </section>

    <div class="pixel-girl" id="pixelSomya" aria-hidden="true">
      <div class="speech-bubble" id="speechBubble">Hey, I'm Mini Somya. Click me to chat.</div>
    </div>
  </main>

  <script src="/script.js?v=3"></script>
</body>
</html>
"""

pages = {
    'about': {
        'title': 'About',
        'content': """
      <article class="window profile-window" id="profile" style="left: 16vw; top: 14vh;" aria-label="About Somya Nayak">
        <div class="window-titlebar">
          <div class="traffic"><a href="/"><button></button></a><button></button><button></button></div>
          <span>About Me</span>
        </div>
        <div class="window-body">
          <div class="profile-card">
            <img src="/assets/somya-profile.jpg" alt="Portrait of Somya Nayak">
            <div>
              <h1>Somya Nayak</h1>
              <p class="role-line">Full-Stack Marketer</p>
              <p>With 6+ years in marketing, I have scaled two SaaS products as a founding marketer, closed high-ticket revenue through social media, built GTM operations from scratch, and grown teams from zero.</p>
            </div>
          </div>
          <div class="project-grid">
            <span>Focus: GTM operations, product marketing, growth systems</span>
            <span>Education: B.Tech, SOA ITER; MBA Marketing, SRM University</span>
            <span>Languages: English, Hindi, Odia</span>
          </div>
        </div>
      </article>
      <article class="window" id="skills" style="left: 45vw; top: 24vh;" aria-label="Expertise stack">
        <div class="window-titlebar">
          <div class="traffic"><button data-close></button><button></button><button></button></div>
          <span>Expertise Stack</span>
        </div>
        <div class="window-body">
          <h1>Marketing Systems</h1>
          <p>I connect strategy, product, and execution to build repeatable growth systems.</p>
          <div class="skill-cloud">
            <span>GTM Ops</span><span>SMM</span><span>AI SEO</span><span>PPC Ads</span><span>Growth Ops</span><span>B2B Outbound</span><span>CRM</span><span>Team Leadership</span>
          </div>
          <div class="swatches" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        </div>
      </article>
"""
    },
    'work': {
        'title': 'Work',
        'content': """
      <article class="window" id="experience" style="left: 10vw; top: 16vh;" aria-label="Experience log">
        <div class="window-titlebar">
          <div class="traffic"><a href="/"><button></button></a><button></button><button></button></div>
          <span>Works</span>
        </div>
        <div class="window-body">
          <h1>Selected Works</h1>
          <ul class="timeline-list">
            <li><b>Intempt, Product Marketing Manager</b><span>Sep 2024 - Present</span><em>Joined as a founding marketer, set up GTM ops from scratch, built a team of 4, and led growth across channels.</em></li>
            <li><b>Marvedge, Founder & CEO</b><span>Dec 2023 - Sep 2024</span><em>Started from scratch, scaled to $1K MRR, and managed a team of 8 across SDRs, analysts, editors, and designers.</em></li>
            <li><b>Svapak, CMO</b><span>Feb 2020 - Dec 2023</span><em>Signed 10+ local doctors for social media marketing and handled a team of 4.</em></li>
            <li><b>HighRadius, B2B ABM Intern</b><span>Feb 2022 - May 2023</span><em>Handled outbound leads, CRM, client meetings, cold calling, LinkedIn outreach, and email marketing.</em></li>
            <li><b>Interactly, B2B Marketing Manager</b><span>Jun 2023 - Mar 2024</span><em>Worked directly with the founder and led marketing that helped drive 5x revenue in 2 months.</em></li>
          </ul>
        </div>
      </article>
      <article class="window" id="intempt" style="left: 48vw; top: 18vh;" aria-label="Intempt product marketing role">
        <div class="window-titlebar">
          <div class="traffic"><button data-close></button><button></button><button></button></div>
          <span>Intempt GTM</span>
        </div>
        <div class="window-body">
          <h1>Product Marketing Manager</h1>
          <p>Joined Intempt as a founding marketer and worked directly with the founder to set up GTM operations from scratch.</p>
          <div class="project-grid">
            <span>Timeline: Sep 2024 - Present</span>
            <span>Built a high-performing marketing team of 4</span>
            <span>Led strategy and execution across growth channels</span>
          </div>
          <div class="pixel-chart" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
      </article>
"""
    },
    'contact': {
        'title': 'Contact',
        'content': """
      <article class="window socials-window" id="socials" style="left: 30vw; top: 31vh;" aria-label="Contact links">
        <div class="window-titlebar">
          <div class="traffic"><a href="/"><button></button></a><button></button><button></button></div>
          <span>Contact</span>
        </div>
        <div class="window-body">
          <h1>Contact</h1>
          <div class="social-grid" aria-label="Social media links">
            <a class="social-tile" href="https://x.com/thesomyanayak" target="_blank" rel="noreferrer" aria-label="Open X">
              <span class="social-logo logo-x" aria-hidden="true"></span>
              <b>X</b>
            </a>
            <a class="social-tile" href="https://www.instagram.com/thesomyanayak/" target="_blank" rel="noreferrer" aria-label="Open Instagram">
              <span class="social-logo logo-instagram" aria-hidden="true"></span>
              <b>Instagram</b>
            </a>
            <a class="social-tile" href="https://www.linkedin.com/in/somyarajannayak" target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
              <span class="social-logo logo-linkedin" aria-hidden="true"></span>
              <b>LinkedIn</b>
            </a>
            <a class="social-tile" href="https://www.youtube.com/@thesomyanayak" target="_blank" rel="noreferrer" aria-label="Open YouTube">
              <span class="social-logo logo-youtube" aria-hidden="true"></span>
              <b>YouTube</b>
            </a>
            <a class="social-tile" href="mailto:somyanayak281@gmail.com" aria-label="Email Somya">
              <span class="social-logo logo-email" aria-hidden="true"></span>
              <b>Email</b>
            </a>
          </div>
        </div>
      </article>
"""
    },
    'resources': {
        'title': 'Resources',
        'content': """
      <article class="window" id="resources" style="left: 30vw; top: 25vh;" aria-label="Resources">
        <div class="window-titlebar">
          <div class="traffic"><a href="/"><button></button></a><button></button><button></button></div>
          <span>Resources</span>
        </div>
        <div class="window-body">
          <h1>Free Marketing Resources</h1>
          <p>Templates, playbooks, and systems to scale your GTM operations.</p>
          <div class="project-grid">
            <span>Coming soon! I'm packaging my best GTM frameworks into downloadable templates.</span>
          </div>
        </div>
      </article>
"""
    },
    'newsletter': {
        'title': 'Newsletter',
        'content': """
      <article class="window" id="newsletter" style="left: 30vw; top: 25vh;" aria-label="Newsletter">
        <div class="window-titlebar">
          <div class="traffic"><a href="/"><button></button></a><button></button><button></button></div>
          <span>Newsletter</span>
        </div>
        <div class="window-body">
          <h1>Growth Systems Newsletter</h1>
          <p>Join 25K+ marketers getting actionable GTM strategies every week.</p>
          <div class="project-grid">
            <span>Subscribe form coming soon!</span>
          </div>
        </div>
      </article>
"""
    }
}

for page, data in pages.items():
    os.makedirs(page, exist_ok=True)
    with open(f"{page}/index.html", "w", encoding="utf-8") as f:
        f.write(base_html.format(title=data['title'], window_content=data['content']))

print("Successfully generated static pages.")
