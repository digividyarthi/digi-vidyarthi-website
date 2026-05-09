import os

css_code = """
/* ===== YOUTUBE FACADE (LAZY LOAD) ===== */
.youtube-facade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #000;
  overflow: hidden;
  border-radius: 12px; /* Matches video wrapper */
}

.youtube-facade img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.youtube-facade:hover img {
  opacity: 1;
}

.youtube-facade .play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68px;
  height: 48px;
  background-color: rgba(33, 33, 33, 0.8);
  border-radius: 14px;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.youtube-facade:hover .play-button {
  background-color: #ff0000;
}

.youtube-facade .play-button::before {
  content: "";
  border-style: solid;
  border-width: 10px 0 10px 20px;
  border-color: transparent transparent transparent #fff;
  margin-left: 5px;
}
"""

js_code = """
// ===== YOUTUBE FACADE (LAZY LOAD) =====
document.addEventListener("DOMContentLoaded", function() {
  const facades = document.querySelectorAll('.youtube-facade');
  
  facades.forEach(facade => {
    facade.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video-id');
      const title = this.getAttribute('data-video-title') || "YouTube Video";
      const iframe = document.createElement('iframe');
      
      iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
      iframe.setAttribute('title', title);
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', 'true');
      
      // Iframe inherits wrapper styles but facade was absolute, so we make iframe match
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      
      this.parentNode.replaceChild(iframe, this);
    });
  });
});
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_code)
    
with open('script.js', 'a', encoding='utf-8') as f:
    f.write(js_code)

print("CSS and JS appended.")
