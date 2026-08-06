# TalentLync Unfurl 🚀

> **Social Media Talent Discovery & Signal Enrichment Engine**

TalentLync Unfurl is a full-stack MERN recruiter dashboard designed to extract, enrich, and manage public social media talent profiles (GitHub, LinkedIn, Behance, X/Twitter, Dribbble, Portfolio) with **zero external API dependencies** and **zero paid scrapers**.

---

## 🌟 Key Features

- **☀️ TalentLync Light Theme**: Clean, responsive, high-contrast UI matching [talentlynk.ai](https://talentlynk.ai/) aesthetics.
- **⚡ 100% Offline / Zero-API Metadata Engine**: Local Node.js URL parser extracts profile handles, formatted names, titles, bios, and skills matrix without third-party APIs.
- **🎨 Pure Local Vector SVG Avatars**: Dynamically generates gradient vector initials avatars in pure code without calling external image services.
- **🔍 Real-Time Search & Multi-Platform Filtering**: Filter talent by GitHub, LinkedIn, Behance, X, Dribbble, or Portfolio with minimum relevance score sliders.
- **📊 Interactive Signal Enrichment**: Control candidate relevance match scores, experience level badges (Junior, Mid, Senior, Lead, Executive), and skill tags.
- **📥 One-Click CSV Export**: Download filtered candidate pools directly to structured CSV spreadsheets.
- **🔄 Grid & Table Views**: Toggle seamlessly between rich candidate cards and compact table views.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB / In-Memory MongoDB Store
- **Styling**: Modern Light Glassmorphism, Tailwind design tokens matching `talentlynk.ai`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rakeshreddyannem/TalentLync-Unfurl.git
cd TalentLync-Unfurl
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Run Locally

**Start Backend (Port 5000):**
```bash
cd backend
npm start
```

**Start Frontend (Port 3000):**
```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📄 License
MIT © 2026 TalentLync Unfurl
