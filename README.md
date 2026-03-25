# SkillSync

> **The peer-powered skill economy** — Teach to earn credits, spend credits to learn.

SkillSync is a platform where users share knowledge, earn credits, and spend them to level up — no money needed, just knowledge.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **Credit Wallet** — Earn, spend, and track credits with a full transaction ledger
- **AI Content Validator** — Every uploaded course is reviewed by AI for quality, completeness, and originality
- **Skills Dashboard** — Visualize your skill profile with radar & bar charts
- **Course Marketplace** — Browse, search, filter, and enroll in peer-created courses
- **Multi-Step Course Upload** — 4-step form with pricing, curriculum builder, and AI review
- **Learning Roadmaps** — AI-curated learning paths with structured milestones
- **Protected Routes** — Auth-gated pages with Supabase session management

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| API Client | Axios |
| Auth | Supabase (client-side auth only) |

---

## 📁 Project Structure

```
client/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Router setup
│   ├── index.css             # Tailwind + design system
│   ├── lib/
│   │   ├── supabase.js       # Supabase auth client
│   │   └── api.js            # Axios instance + interceptors
│   ├── store/
│   │   ├── authStore.js      # Zustand auth state
│   │   └── creditStore.js    # Zustand credit state + mock data
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useCredits.js
│   ├── components/
│   │   ├── shared/           # Navbar, Sidebar, ProtectedRoute, etc.
│   │   ├── auth/             # LoginForm, RegisterForm
│   │   ├── skills/           # SkillRadarChart, SkillBarChart, SkillCard
│   │   ├── courses/          # CourseCard, CourseGrid, AIScoreBadge
│   │   └── wallet/           # CreditBalance, TransactionList
│   └── pages/
│       ├── Landing.jsx       # Public landing page
│       ├── Login.jsx         # Auth - login
│       ├── Register.jsx      # Auth - register
│       ├── Dashboard.jsx     # User dashboard
│       ├── Skills.jsx        # Skill management + charts
│       ├── Courses.jsx       # Course marketplace
│       ├── CourseDetail.jsx  # Individual course view
│       ├── UploadCourse.jsx  # 4-step course upload with AI review
│       ├── Wallet.jsx        # Credit wallet + transactions
│       ├── Roadmaps.jsx      # Learning roadmaps
│       └── NotFound.jsx      # 404 page
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/devantaris/SkillSync.git
cd SkillSync/client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in `client/` with:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 📄 Pages & Routes

| Route | Page | Auth Required |
|-------|------|:---:|
| `/` | Landing | ❌ |
| `/login` | Login | ❌ |
| `/register` | Register | ❌ |
| `/courses` | Course Marketplace | ❌ |
| `/courses/:id` | Course Detail | ❌ |
| `/dashboard` | Dashboard | ✅ |
| `/skills` | Skills Manager | ✅ |
| `/wallet` | Credit Wallet | ✅ |
| `/upload` | Upload Course | ✅ |
| `/roadmaps` | Learning Roadmaps | ✅ |

---

## 💡 How It Works

1. **Sign up** → Get 100 free starter credits
2. **Browse & enroll** in courses using credits
3. **Teach what you know** → Earn credits per enrollment
4. **AI validates** every course for quality (score 0–100)
5. **Platform takes 15%** fee per transaction

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
