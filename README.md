# SkillSync

> **The peer-powered skill economy** — Teach to earn credits, spend credits to learn.

SkillSync is a full-stack platform where users share knowledge through courses, earn credits for every enrollment, and spend those credits to learn new skills — no money needed, just knowledge.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white)

---

## ✨ Features

### Core
- **Credit Economy** — Earn credits by uploading courses, spend them to enroll. Platform takes a 15% fee per transaction.
- **AI Content Validator** — Every uploaded course is scored by AI for quality, completeness, and originality (0–100).
- **Course Marketplace** — Browse, search, filter by tags, sort by popularity or price, and enroll in peer-created courses.
- **Multi-Step Course Upload** — 4-step wizard: basic info → content & curriculum → pricing → AI review & approval.

### Dashboard & Analytics
- **Dashboard** — Personalized greeting, credit balance, stats (enrolled/created courses, skills, credits earned), recent activity feed, and skill radar chart.
- **Skills Manager** — Add/edit/delete skills with proficiency levels, visualized via radar and bar charts (Recharts).
- **Wallet** — Full credit balance, buy credits via Razorpay (₹49/₹99/₹199), and transaction history ledger.
- **Learning Roadmaps** — AI-curated learning paths with structured milestones (coming soon).

### Auth & UX
- **Google OAuth + Email/Password** — Supabase Auth with auto-profile creation (100 starter credits on signup).
- **Unified Layout** — Persistent sidebar (desktop) + bottom nav (mobile), dynamic top bar with credit badge and user avatar.
- **Responsive Design** — Mobile-first with frosted glass bottom nav and floating Upload FAB.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 3 |
| Routing | React Router v7 (Outlet pattern) |
| State | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP Client | Axios (with auth interceptor) |
| Backend | Node.js, Express 4 |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (Email + Google OAuth) |
| Payments | Razorpay |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
SkillSync/
├── client/                         # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/             # Sidebar, TopBar, Navbar, DashboardLayout, CreditBadge
│   │   │   ├── auth/               # LoginForm, RegisterForm
│   │   │   ├── courses/            # CourseCard, CourseGrid, AIScoreBadge
│   │   │   ├── skills/             # SkillCard, SkillRadarChart, SkillBarChart
│   │   │   └── wallet/             # WalletCard, TransactionList, BuyCreditsModal
│   │   ├── pages/                  # Dashboard, Courses, CourseDetail, Skills, Wallet, UploadCourse, Roadmaps
│   │   ├── store/                  # Zustand stores (authStore, creditStore)
│   │   ├── hooks/                  # useAuth, useCredits
│   │   └── lib/                    # api.js (Axios), supabase.js
│   └── vercel.json
│
├── server/                         # Express Backend
│   ├── index.js                    # Server entry point
│   ├── config/supabase.js          # Admin + public Supabase clients
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification middleware
│   │   └── errorHandler.js         # Global error handler
│   ├── controllers/                # Business logic (auth, course, skill, credit, agent, payment)
│   ├── routes/                     # Express route handlers
│   └── db/
│       ├── schema.sql              # Full database schema + RLS policies
│       └── seed.js                 # Seed script (8 users, 9 courses, skills, enrollments)
│
├── vercel.json                     # Monorepo deploy config
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Clone & Install

```bash
git clone https://github.com/devantaris/SkillSync.git
cd SkillSync

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 2. Database Setup
1. Go to your **Supabase Dashboard → SQL Editor**
2. Paste and run the contents of `server/db/schema.sql`
3. Enable **Google OAuth** in Authentication → Providers → Google

### 3. Environment Variables

**`server/.env`**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
PORT=3001
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Seed the Database (Optional)
```bash
cd server
node db/seed.js
```
Creates 8 demo users, 9 courses, skills, enrollments, and transactions. All users have password `SkillSync123!`.

### 5. Run

```bash
# Terminal 1 — Backend
cd server && npm run dev    # → http://localhost:3001

# Terminal 2 — Frontend
cd client && npm run dev    # → http://localhost:5173
```

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/api/health` | ❌ | Health check |
| `GET` | `/api/auth/profile` | ✅ | Get user profile |
| `PUT` | `/api/auth/profile` | ✅ | Update profile |
| `GET` | `/api/courses` | ❌ | List all approved courses |
| `GET` | `/api/courses/:id` | ❌ | Course detail |
| `POST` | `/api/courses` | ✅ | Create new course |
| `PUT` | `/api/courses/:id` | ✅ | Update own course |
| `DELETE` | `/api/courses/:id` | ✅ | Delete own course |
| `POST` | `/api/courses/:id/enroll` | ✅ | Enroll (deducts credits, pays creator) |
| `GET` | `/api/skills` | ✅ | Get user's skills |
| `POST` | `/api/skills` | ✅ | Add skill |
| `PUT` | `/api/skills/:id` | ✅ | Update skill level |
| `DELETE` | `/api/skills/:id` | ✅ | Delete skill |
| `GET` | `/api/credits/balance` | ✅ | Get credit balance |
| `GET` | `/api/credits/transactions` | ✅ | Transaction history |
| `POST` | `/api/agents/validate` | ✅ | AI course quality review |
| `POST` | `/api/payments/create-order` | ✅ | Create Razorpay order |
| `POST` | `/api/payments/verify` | ✅ | Verify payment & add credits |

---

## 🗺️ Routes

| Route | Page | Auth |
|-------|------|:----:|
| `/` | Landing Page | ❌ |
| `/login` | Sign In | ❌ |
| `/register` | Sign Up | ❌ |
| `/courses` | Public Course Marketplace | ❌ |
| `/courses/:id` | Public Course Detail | ❌ |
| `/app/dashboard` | Dashboard | ✅ |
| `/app/courses` | Courses (in-app) | ✅ |
| `/app/courses/:id` | Course Detail (in-app) | ✅ |
| `/app/skills` | Skills Manager | ✅ |
| `/app/wallet` | Credit Wallet | ✅ |
| `/app/upload` | Upload Course | ✅ |
| `/app/roadmaps` | Learning Roadmaps | ✅ |

---

## 💡 How It Works

```
┌─────────────┐     ┌───────────────┐     ┌──────────────┐
│   Sign Up   │────▶│ Get 100 Free  │────▶│   Browse &   │
│             │     │   Credits     │     │   Enroll     │
└─────────────┘     └───────────────┘     └──────┬───────┘
                                                  │
                    ┌───────────────┐              │
                    │  Credits go   │◀─────────────┘
                    │  to creator   │  (85% to creator, 15% platform fee)
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │  Upload your  │──────▶ AI validates (score 0-100)
                    │  own course   │        Must score ≥ 70 to publish
                    └───────────────┘
```

---

## 🚢 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com) — auto-builds from `client/` directory
- **Backend**: Deployed on [Render](https://render.com) — runs Express server from `server/` directory

Set the same environment variables on both platforms. Update `VITE_API_BASE_URL` to your Render backend URL and `CLIENT_URL` to your Vercel frontend URL.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built by [Devantaris](https://github.com/devantaris)** — a peer-to-peer skill economy experiment.
