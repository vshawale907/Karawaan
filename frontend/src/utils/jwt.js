// JWT utility for client-side token management
// Uses base64-encoded JSON tokens with expiration (simulates real JWT flow)

const JWT_SECRET_KEY = 'karawaan-b2b-portal-2026';
const TOKEN_KEY = 'jwt_token';
const TOKEN_EXPIRY_HOURS = 24;

/**
 * Encode a string to base64 (URL-safe)
 */
function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode a base64url string
 */
function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

/**
 * Generate a JWT-like token containing user data
 */
export function generateToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Date.now();
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000,
    iss: 'karawaan-portal',
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
  // Simulated signature (in production, this would be HMAC-SHA256)
  const signature = base64UrlEncode(
    JSON.stringify({ verified: true, key: JWT_SECRET_KEY.substring(0, 4) })
  );

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Decode and validate a JWT token
 * Returns the payload if valid, null if expired or invalid
 */
export function verifyToken(token) {
  try {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(base64UrlDecode(parts[1]));

    // Check expiration
    if (payload.exp && Date.now() > payload.exp) {
      removeToken();
      return null;
    }

    return payload;
  } catch (e) {
    console.error('JWT verification failed:', e);
    removeToken();
    return null;
  }
}

/**
 * Store token in localStorage
 */
export function storeToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Retrieve token from localStorage
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove token from localStorage
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Check if a valid (non-expired) token exists
 */
export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  const payload = verifyToken(token);
  return payload !== null;
}

/**
 * Get current user data from stored token
 */
export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;

  // Return only user-relevant fields
  return {
    email: payload.email,
    role: payload.role,
    name: payload.name,
    agencyName: payload.agencyName,
    phone: payload.phone,
    avatar: payload.avatar,
  };
}
