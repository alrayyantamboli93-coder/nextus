const envApiUrl = (import.meta.env.VITE_API_URL || '').trim();
const isVercelHost = typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app');

export const API_URL = (envApiUrl || (isVercelHost ? 'https://nextus-ze2d.onrender.com' : '')).replace(/\/$/, '');

export const ADMIN_EMAILS: string[] = (import.meta.env.VITE_ADMIN_EMAILS || 'alrayyantamboli93@gmail.com')
  .split(',')
  .map((e: string) => e.trim().toLowerCase())
  .filter(Boolean);

export function isEmailAdmin(email?: string): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
