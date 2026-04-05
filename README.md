# SkillSync

> **The peer-powered skill economy** — Teach to earn credits, spend credits to learn.

SkillSync is a platform where users share knowledge, earn credits, and spend them to level up — no money needed, just knowledge.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white)

---

## ✨ Features

- **Credit Wallet** — Earn, spend, and track credits with a full transaction ledger
- **AI Content Validator** — Every uploaded course is reviewed by AI for quality, completeness, and originality
- **Skills Dashboard** — Visualize your skill profile with radar & bar charts
- **Course Marketplace** — Browse, search, filter, and enroll in peer-created courses
- **Multi-Step Course Upload** — 4-step form with pricing, curriculum builder, and AI review
- **Learning Roadmaps** — AI-curated learning paths with structured milestones
- **Razorpay Payments** — Buy credits with ₹49 / ₹99 / ₹199 plans
- **Google Auth** — Sign in/up with Google via Supabase

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 18, Vite, Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| API Client | Axios |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email + Google OAuth) |
| Payments | Razorpay |

---

## 📁 Project Structure

```
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Shared, auth, skills, courses, wallet
│   │   ├── pages/              # 11 pages (Landing → NotFound)
│   │   ├── store/              # Zustand stores (auth, credits)
│   │   ├── hooks/              # useAuth, useCredits
│   │   └── lib/                # Supabase client, Axios instance
│   └── ...config files
│
├── server/                     # Express Backend
│   ├── index.js                # Server entry point
│   ├── config/supabase.js      # Supabase admin client
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   └── errorHandler.js     # Global error handler
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── skillController.js
│   │   ├── creditController.js
│   │   ├── agentController.js  # Mock AI validation
│   │   └── paymentController.js # Razorpay
│   ├── routes/                 # API routes
│   └── db/schema.sql           # Database migrations
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Supabase project

### Installation

```bash
# Clone the repo
git clone https://github.com/devantaris/SkillSync.git
cd SkillSync

# --- Backend Setup ---
cd server
npm install
cp .env.example .env
# Edit .env with your Supabase + Razorpay keys
npm run dev                    # Runs on http://localhost:3001

# --- Frontend Setup (new terminal) ---
cd ../client
npm install
cp .env.example .env
# Edit .env with your Supabase keys
npm run dev                    # Runs on http://localhost:5173
```

### Database Setup
1. Go to your Supabase Dashboard → SQL Editor
2. Paste and run `server/db/schema.sql`
3. Enable Google OAuth in Authentication → Providers → Google

---

## 🔐 Environment Variables

### `client/.env`
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### `server/.env`
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
PORT=3001
CLIENT_URL=http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| GET | `/api/health` | ❌ | Health check |
| GET | `/api/auth/profile` | ✅ | Get profile |
| PUT | `/api/auth/profile` | ✅ | Update profile |
| GET | `/api/courses` | ❌ | List courses |
| GET | `/api/courses/:id` | ❌ | Course detail |
| POST | `/api/courses` | ✅ | Create course |
| PUT | `/api/courses/:id` | ✅ | Update course |
| DELETE | `/api/courses/:id` | ✅ | Delete course |
| POST | `/api/courses/:id/enroll` | ✅ | Enroll (deducts credits) |
| GET | `/api/skills` | ✅ | Get skills |
| POST | `/api/skills` | ✅ | Add skill |
| PUT | `/api/skills/:id` | ✅ | Update skill |
| DELETE | `/api/skills/:id` | ✅ | Delete skill |
| GET | `/api/credits/balance` | ✅ | Credit balance |
| GET | `/api/credits/transactions` | ✅ | Transaction history |
| POST | `/api/agents/validate` | ✅ | AI course review |
| POST | `/api/payments/create-order` | ✅ | Razorpay order |
| POST | `/api/payments/verify` | ✅ | Verify payment |

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
6. **Buy credits** via Razorpay (₹49/₹99/₹199)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
