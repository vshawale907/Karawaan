// ─────────────────────────────────────────────────────────
// Karawaan — API Configuration
// Centralized API base URL from environment variables
// Uses VITE_API_URL from .env (local) or Vercel dashboard (production)
// ─────────────────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
