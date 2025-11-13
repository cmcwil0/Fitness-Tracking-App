export function makeCandidateUsername({ firstName, lastName, email }) {
  const clean = (s = '') => s.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20);
  const emailPrefix = (email || '').split('@')[0];

  const a = clean(firstName);
  const b = clean(lastName);
  const e = clean(emailPrefix);

  const candidates = [];
  if (a && b) candidates.push(`${a}.${b}`, `${a}${b}`);
  if (a) candidates.push(a);
  if (e) candidates.push(e);
  if (!candidates.length) candidates.push('user');

  return candidates.filter(Boolean);
}