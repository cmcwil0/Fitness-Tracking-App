import jwt from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = { id: payload.id, username: payload.username, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ message: 'invalid token' });
  }
}