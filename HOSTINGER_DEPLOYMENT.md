# 🚀 Digi Vidyarthi — Hostinger GitHub Deployment Guide

Aapki website ab fully **Next.js (App Router + Static Export + Tailwind CSS)** me migrate ho chuki hai. Har commit par automatically Hostinger par live hone ke liye GitHub Actions setup kiya gaya hai.

---

## 📋 Kaise Kaam Karega?

1. Aap jab bhi GitHub ke `main` branch me code push karenge (`git push origin main`).
2. **GitHub Actions** automatically:
   - Saari dependencies install karega (`npm install`).
   - Production build aur static pre-rendering generate karega (`npm run build`).
   - Pure compiled HTML, CSS, Images, sitemap, robots aur `.htaccess` ko **Hostinger ke `public_html/` folder** me deploy kar dega.
3. Website bina kisi manual FTP ke live update ho jayegi!

---

## 🔑 Step-by-Step Hostinger FTP Setup (Only 2 Minutes)

GitHub Actions ko Hostinger se connect karne ke liye GitHub me 3 Secrets add karne hain:

### Step 1: Hostinger hPanel se FTP Details nikalein
1. **Hostinger hPanel** (`hpanel.hostinger.com`) me login karein.
2. Apne domain **digividyarthi.com** par click karein.
3. Left menu me **Files** -> **FTP Accounts** par jayein.
4. Wahan aapko ye 3 details milengi:
   - **FTP IP / Hostname**: (e.g. `ftp.digividyarthi.com` ya Hostinger server IP jaise `185.xxx.xxx.xxx`)
   - **FTP Username**: (e.g. `u123456789`)
   - **FTP Password**: (Aapka FTP account password, agar yaad nahi to *Change Password* par click karein)

---

### Step 2: GitHub Repository me Secrets save karein
1. Apne GitHub repo par jayein:  
   👉 [https://github.com/digividyarthi/digi-vidyarthi-website](https://github.com/digividyarthi/digi-vidyarthi-website)
2. Upar **Settings** tab par click karein.
3. Left sidebar me **Secrets and variables** -> **Actions** par click karein.
4. **New repository secret** button par click karein aur ye 3 secrets add karein:

| Secret Name | Hostinger se value |
|---|---|
| `HOSTINGER_FTP_SERVER` | Aapka FTP Hostname ya IP (e.g. `ftp.digividyarthi.com` ya IP) |
| `HOSTINGER_FTP_USERNAME` | Aapka FTP Username |
| `HOSTINGER_FTP_PASSWORD` | Aapka FTP Password |

---

### Step 3: Code Push Karein
Ab jab bhi aap terminal me run karenge:
```bash
git add .
git commit -m "feat: Next.js migration and SEO update"
git push origin main
```
GitHub automatically deploy kar dega! Aap **Actions** tab me live deployment progress dekh sakte hain.

---

## 🛠️ Local Development Commands

Agar apne computer par website run karni ho:

```bash
# 1. Dev Server chalane ke liye:
npm run dev
# Browser me kholein: http://localhost:3000

# 2. Production Static Build test karne ke liye:
npm run build
# 'out/' folder generate ho jayega jisme pure production ready HTML files hongi
```

---

## 🔍 SEO & URL Guarantees (No Drop in Rankings)

1. ✅ **Exact URLs Preserved**:
   - `/about`, `/courses`, `/tools`, `/blog`, `/contact`
   - `/blog/<slug>` (Saare 8 dynamic blog posts pre-rendered hain)
2. ✅ **Google Search Console**:
   - `0TRbdMv4MR2gE6LsxD-fuP2x2YcskC3P6S0j8PKK4HY` meta tag intact hai.
3. ✅ **Structured Data (JSON-LD)**:
   - Homepage & Pages: `EducationalOrganization` with complete Varanasi address & geo-coordinates.
   - Blog Posts: `BlogPosting` schema with author, date, image, headline.
4. ✅ **Sitemap & Robots**:
   - `/sitemap.xml` automatically dynamically updated.
   - `/robots.txt` properly configured for all major search bots.
