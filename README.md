# Karawaan - Trails & Safaris

**B2B Premium Travel Solutions Platform**

This is a high-fidelity frontend prototype built for client presentation and approval. It demonstrates the complete flow of the Karawaan B2B platform, from public landing pages to a full admin dashboard.

## 🚀 Tech Stack

- **React 18** (Vite)
- **Tailwind CSS 3** (Custom Theme & Styling)
- **Framer Motion** (Smooth Animations & Page Transitions)
- **React Router DOM 6** (Routing & Layouts)
- **Lucide React** (Beautiful Icons)
- **Recharts** (Dashboard Analytics)

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── ui.jsx           # Animated UI helpers, badges, headers
│   ├── Navbar.jsx       # Public navigation
│   └── Footer.jsx       # Public footer
├── pages/               # Main application pages
│   ├── HomePage.jsx     # Landing page
│   ├── AboutPage.jsx    # Company info & timeline
│   ├── ServicesPage.jsx # B2B offerings
│   ├── ContactPage.jsx  # Contact form & info
│   ├── InquiryPage.jsx  # Complex multi-step form
│   └── admin/           # Admin Dashboard pages
│       ├── AdminLayout.jsx     # Dashboard shell & sidebar
│       ├── AdminDashboard.jsx  # Main stats & charts
│       ├── AllInquiries.jsx    # Table with filters & modals
│       ├── FollowUps.jsx       # Urgent action items
│       ├── PartnerAgencies.jsx # Global network
│       ├── Destinations.jsx    # Available locations
│       └── AdminSettings.jsx   # Admin preferences
├── data/
│   └── dummyData.js     # Simulated backend data
├── App.jsx              # Routes setup
├── index.css            # Tailwind & Custom CSS
└── main.jsx             # Entry point
```

## 🛠️ Setup Instructions

To run this project locally:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## 🌐 Deployment to Vercel

This project is fully ready to be deployed to Vercel:

1. Create a GitHub repository and push this code.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New Project**.
4. Import your GitHub repository.
5. Vercel will automatically detect that it's a Vite React project.
6. Click **Deploy**.

*Alternatively, using Vercel CLI:*
```bash
npm i -g vercel
vercel
```

## 🎨 Theme & Design System

The platform uses a luxury dark theme inspired by premium travel:
- **Obsidian**: Deep blacks and dark greys (`#0A0A0A`)
- **Gold**: Metallic gradients and accents (`#C9A84C`)
- **Forest**: Rich emerald greens for safari accents (`#1B4332`)
- **Typography**: Cormorant Garamond (Display) & Inter (Sans)

## ⚠️ Note

This is a **Frontend Prototype**. It uses mock data and simulates interactions (like form submissions) to demonstrate the user experience. No real backend, database, or authentication is connected yet.
