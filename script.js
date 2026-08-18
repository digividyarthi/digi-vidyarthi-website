/* ============================================
   DIGI VIDYARTHI — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------- Mobile Hamburger Menu -------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ------- Navbar scroll effect -------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ------- Active nav link -------
  const currentPage = window.location.pathname.split('/').pop() || '';
  const normalizedCurrent = currentPage.replace('.html', '');
  const pageMap = {
    '': 'index',
    'index': 'index'
  };
  const mappedPage = pageMap[normalizedCurrent] || normalizedCurrent;
  
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href') || '';
    const hrefPage = href.split('/').pop().replace('.html', '') || 'index';
    
    if (hrefPage === mappedPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ------- Scroll Reveal -------
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Fallback: Check viewport position immediately and after short delay
  function checkInitialReveals() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        el.classList.add('visible');
      }
    });
  }
  checkInitialReveals();
  setTimeout(checkInitialReveals, 300);
  setTimeout(checkInitialReveals, 1000);

  // ------- Counter Animation -------
  const counters = document.querySelectorAll('.hero-stat h3');
  let counterAnimated = false;

  function animateCounters() {
    if (counterAnimated) return;
    counterAnimated = true;

    counters.forEach(counter => {
      const text = counter.textContent;
      const target = parseInt(text);
      if (isNaN(target)) return;

      const suffix = text.replace(/[0-9]/g, '');
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = text;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 20);
    });
  }

  // Trigger counter animation when hero is visible
  const heroSection = document.getElementById('hero');
  if (heroSection && counters.length > 0) {
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(animateCounters, 500);
        heroObserver.disconnect();
      }
    });
    heroObserver.observe(heroSection);
  }

});

// ------- FAQ Accordion -------
function toggleFaq(element) {
  const faqItem = element.closest('.faq-item');
  const answer = faqItem.querySelector('.faq-answer');
  const isActive = faqItem.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    item.querySelector('.faq-answer').style.maxHeight = '0';
  });

  // Open clicked (if it wasn't already open)
  if (!isActive) {
    faqItem.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ------- Contact Form Handler (Email) -------
  const emailForm = document.getElementById('email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const form = this;
      const btn = form.querySelector('button[type="submit"]');
      const formMessage = document.getElementById('form-message');
      const originalText = btn.innerHTML;
      
      // Visual feedback while sending
      btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      btn.disabled = true;
      formMessage.style.display = 'none';
      
      // Get form data
      const formData = new FormData(form);
      
      // Send via Fetch API to PHP script
      fetch('contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        // Success
        form.reset();
        formMessage.innerHTML = '✅ Thank you! Your message has been sent successfully. We will get back to you soon.';
        formMessage.style.backgroundColor = '#d4edda';
        formMessage.style.color = '#155724';
        formMessage.style.border = '1px solid #c3e6cb';
        formMessage.style.display = 'block';
      })
      .catch(error => {
        // Error
        formMessage.innerHTML = '❌ Oops! Something went wrong. Please try again later, or contact us via WhatsApp.';
        formMessage.style.backgroundColor = '#f8d7da';
        formMessage.style.color = '#721c24';
        formMessage.style.border = '1px solid #f5c6cb';
        formMessage.style.display = 'block';
        console.error('Error:', error);
      })
      .finally(() => {
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Hide success message after 5 seconds
        if (formMessage.style.backgroundColor === 'rgb(212, 237, 218)' || formMessage.style.backgroundColor === '#d4edda') {
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        }
      });
    });
  }

// ------- Blog Filter & Load More -------
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogGrid = document.getElementById('blogGrid');

  if (blogGrid) {
    let allBlogPosts = [];
    let postsPerPage = 6;
    let currentVisible = postsPerPage;
    let currentFilter = 'all';

    // Load posts from JSON API
    async function loadBlogPosts() {
      try {
        const res = await fetch('admin.php?action=get_posts');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          allBlogPosts = data.data;
        } else {
          throw new Error('Database returned no posts or connection failed');
        }
      } catch(e) {
        // Fallback: try loading blogs.json directly
        try {
          const res = await fetch('blogs.json');
          allBlogPosts = await res.json();
        } catch(e2) {
          allBlogPosts = [];
        }
      }
      renderBlogPosts();
    }

    function escBlogHtml(str) {
      const d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }

    function resolveImagePath(imgPath) {
      if (!imgPath) return '/images/og-banner.webp';
      if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) return imgPath;
      return imgPath.startsWith('/') ? imgPath : '/' + imgPath;
    }

    function renderBlogPosts() {
      // Filter posts
      const filtered = currentFilter === 'all'
        ? allBlogPosts
        : allBlogPosts.filter(p => p.category === currentFilter);

      if (filtered.length === 0) {
        blogGrid.innerHTML = `
          <div style="grid-column:1/-1; text-align:center; padding:3rem; color:#6C757D;">
            <i class="fa-regular fa-newspaper" style="font-size:3rem; margin-bottom:1rem; display:block; opacity:0.3;"></i>
            <h3 style="color:#343A40; margin-bottom:0.5rem;">No posts found</h3>
            <p>New posts coming soon. Stay tuned!</p>
          </div>`;
        document.getElementById('blogLoadMore').style.display = 'none';
        return;
      }

      const visible = filtered.slice(0, currentVisible);

      blogGrid.innerHTML = visible.map(post => `
        <article class="blog-card reveal visible" data-category="${escBlogHtml(post.category)}">
          <div class="blog-card-image">
            <img src="${escBlogHtml(resolveImagePath(post.image))}" alt="${escBlogHtml(post.alt || post.title)}" loading="lazy" onerror="this.src='/images/og-banner.webp';">
            <span class="blog-card-tag">${escBlogHtml(post.categoryLabel || post.category)}</span>
          </div>
          <div class="blog-card-content">
            <div class="blog-card-meta">
              <span><i class="fa-regular fa-calendar"></i> Last Updated: ${escBlogHtml(post.dateFormatted || post.date)}</span>
              <span><i class="fa-regular fa-user"></i> ${escBlogHtml(post.author || 'Digi Vidyarthi')}</span>
            </div>
            <h3><a href="/blog/${encodeURIComponent(post.slug || post.id)}">${escBlogHtml(post.title)}</a></h3>
            <p>${escBlogHtml(post.excerpt || '')}</p>
            ${post.tags && post.tags.length > 0 ? `
              <div class="blog-card-tags">
                ${post.tags.map(tag => `<span class="blog-tag-pill"><i class="fa-solid fa-hashtag"></i> ${escBlogHtml(tag)}</span>`).join('')}
              </div>
            ` : ''}
            <a href="/blog/${encodeURIComponent(post.slug || post.id)}" class="blog-read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>
      `).join('');

      // Show/hide load more
      const loadMoreDiv = document.getElementById('blogLoadMore');
      if (loadMoreDiv) {
        loadMoreDiv.style.display = filtered.length > currentVisible ? 'block' : 'none';
      }

      // Populate Sidebar Widgets
      populateSidebarWidgets(allBlogPosts);
    }

    function populateSidebarWidgets(posts) {
      if (!posts || posts.length === 0) return;

      // 1. Categories Count
      const catCounts = { 'all': posts.length, 'seo': 0, 'social-media': 0, 'google-ads': 0, 'ai-tools': 0, 'tips': 0 };
      posts.forEach(p => {
        if (catCounts[p.category] !== undefined) catCounts[p.category]++;
      });
      document.getElementById('count-all') && (document.getElementById('count-all').textContent = catCounts['all']);
      document.getElementById('count-seo') && (document.getElementById('count-seo').textContent = catCounts['seo']);
      document.getElementById('count-smm') && (document.getElementById('count-smm').textContent = catCounts['social-media']);
      document.getElementById('count-ads') && (document.getElementById('count-ads').textContent = catCounts['google-ads']);
      document.getElementById('count-ai') && (document.getElementById('count-ai').textContent = catCounts['ai-tools']);
      document.getElementById('count-tips') && (document.getElementById('count-tips').textContent = catCounts['tips']);

      // 2. Recent Posts (Top 3-5)
      const recentPostsContainer = document.getElementById('sidebarRecentPosts');
      if (recentPostsContainer) {
        const recentPosts = posts.slice(0, 5); // Take first 5 since JSON is assumed sorted
        recentPostsContainer.innerHTML = recentPosts.map(rp => `
          <div class="recent-post-item">
            <div class="recent-post-img">
              <img src="${escBlogHtml(resolveImagePath(rp.image))}" alt="${escBlogHtml(rp.alt || rp.title)}" onerror="this.src='/images/og-banner.webp';">
            </div>
            <div>
              <a href="/blog/${encodeURIComponent(rp.slug || rp.id)}" class="recent-post-title">${escBlogHtml(rp.title)}</a>
              <div class="recent-post-date">${escBlogHtml(rp.dateFormatted || rp.date)}</div>
            </div>
          </div>
        `).join('');
      }

      // 3. Archives by Month
      const archivesContainer = document.getElementById('sidebarArchives');
      if (archivesContainer) {
        const monthCounts = {};
        posts.forEach(p => {
          // Attempt to parse Date format "August 24, 2026" or "2026-08-24"
          let d;
          if (p.dateFormatted) {
             d = new Date(p.dateFormatted);
          } else {
             d = new Date(p.date);
          }
          if (!isNaN(d)) {
            const monthYear = d.toLocaleString('default', { month: 'long', year: 'numeric' });
            monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
          }
        });

        // Convert to array and sort (descending visually)
        const archiveNames = Object.keys(monthCounts);
        if (archiveNames.length > 0) {
          archivesContainer.innerHTML = archiveNames.map(m => `
            <li><a href="#">${escBlogHtml(m)} <span class="cat-count">${monthCounts[m]}</span></a></li>
          `).join('');
        } else {
          archivesContainer.innerHTML = '<li><span style="color:var(--gray-400);font-size:0.9rem;">No archives available.</span></li>';
        }
      }
    }

    // Filter buttons
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.dataset.filter;
          currentVisible = postsPerPage;
          renderBlogPosts();
        });
      });
    }

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentVisible += postsPerPage;
        renderBlogPosts();
      });
    }

    // Initial load
    loadBlogPosts();
  }


// ===== YOUTUBE FACADE (LAZY LOAD) =====
document.addEventListener("DOMContentLoaded", function() {
  const facades = document.querySelectorAll('.youtube-facade');
  
  facades.forEach(facade => {
    facade.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video-id');
      const title = this.getAttribute('data-video-title') || "YouTube Video";
      const iframe = document.createElement('iframe');
      
      iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`);
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

// ===== VIDEO TESTIMONIALS CAROUSEL =====
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (!track) return;
  
  const cards = Array.from(track.children);
  let currentIndex = 0;
  let autoScrollTimer = null;
  const autoScrollDelay = 4000;
  
  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }
  
  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);
    
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    
    const slideAmount = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${slideAmount}px)`;
    
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
    
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === maxIndex;
  }
  
  function createDots() {
    dotsContainer.innerHTML = '';
    const visibleCount = getVisibleCount();
    const totalDots = Math.max(0, cards.length - visibleCount + 1);
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        resetAutoScroll();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visibleCount);
      
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, autoScrollDelay);
  }
  
  function stopAutoScroll() {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
    }
  }
  
  function resetAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
      resetAutoScroll();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
      resetAutoScroll();
    });
  }
  
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      createDots();
      updateCarousel();
    }, 150);
  });
  
  createDots();
  updateCarousel();
  startAutoScroll();
});
