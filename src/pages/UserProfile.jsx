import { useEffect, useState, useCallback } from 'react';
import classes from '../css/UserProfile.module.css';

const API = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

const ProfileCard = ({ name, value, onChange, onToggle, onSave }) => (
  <div className={classes.profileCard}>
    <label>{name}</label>
    <section>
      {value.isEditing ? (
        <input
          value={value.text ?? ''}
          onChange={(e) => onChange(name, e.target.value)}
        />
      ) : (
        <span>{value.text ?? ''}</span>
      )}
    </section>

    <span
      className={classes.editButton}
      onClick={() => (value.isEditing ? onSave(name) : onToggle(name, true))}
      title={value.isEditing ? 'Save' : 'Edit'}
    >
      {value.isEditing ? (
        <svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" fill="var(--accent-color)" viewBox="0 0 512 512">
          <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" fill="var(--accent-color)" viewBox="0 0 512 512">
          <path d="M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z"/>
        </svg>
      )}
    </span>
  </div>
);

const tokenHeaders = () => {
  const t = localStorage.getItem('token');
  return t
    ? { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

const UserProfile = () => {
  const [currentSection, setCurrentSection] = useState('main');

  const [fields, setFields] = useState({
    name:   { text: '', isEditing: false },
    email:  { text: '', isEditing: false },
    height: { text: '', isEditing: false },
    weight: { text: '', isEditing: false },
    age:    { text: '', isEditing: false },
    gender: { text: '', isEditing: false },
  });

  const userName = fields.name.text || 'John Doe';
  const userEmail = fields.email.text || 'John.doe@example.com';

  useEffect(() => {
    const load = async () => {
      try {
        const cached = localStorage.getItem('user');
        if (cached) {
          const u = JSON.parse(cached);
          setFields(prev => ({
            ...prev,
            name:  { ...prev.name,  text: u?.username ?? prev.name.text },
            email: { ...prev.email, text: u?.email ?? prev.email.text }
          }));
        }
      } catch { /* ignore */ }

      try {
        const me = await fetch(`${API}/api/auth/me`, { headers: tokenHeaders() });
        if (me.ok) {
          const data = await me.json();
          const username = data?.user?.username ?? '';
          const email = data?.user?.email ?? '';
          setFields(prev => ({
            ...prev,
            name:  { ...prev.name,  text: username || prev.name.text },
            email: { ...prev.email, text: email || prev.email.text },
          }));
          const merged = { ...(JSON.parse(localStorage.getItem('user') || '{}')), username, email };
          localStorage.setItem('user', JSON.stringify(merged));
        }
      } catch {}

      try {
        const goals = await fetch(`${API}/api/goals/me`, { headers: tokenHeaders() });
        if (goals.ok) {
          const g = await goals.json();
          const pick = (v) => (v === undefined || v === null ? '' : String(v));
          setFields(prev => ({
            ...prev,
            height: { ...prev.height, text: pick(g?.height) },
            weight: { ...prev.weight, text: pick(g?.weight) },
            age:    { ...prev.age,    text: pick(g?.age) },
            gender: { ...prev.gender, text: pick(g?.gender) },
          }));
        }
      } catch {}
    };

    load();
  }, []);

  const handleSectionChange = (section) => setCurrentSection(section);

  const handleChange = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], text: value } }));
  };

  const toggleEdit = (name, on) => {
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], isEditing: !!on } }));
  };

  const saveMain = useCallback(async () => {
    const payload = {
      username: fields.name.text?.trim() || '',
      email: fields.email.text?.trim() || '',
    };
    const tries = [
      ['PATCH', `${API}/api/users/me`],
      ['PATCH', `${API}/api/auth/me`], 
    ];
    for (const [method, url] of tries) {
      try {
        const r = await fetch(url, { method, headers: tokenHeaders(), body: JSON.stringify(payload) });
        if (r.ok) {
          const cached = JSON.parse(localStorage.getItem('user') || '{}');
          localStorage.setItem('user', JSON.stringify({ ...cached, username: payload.username, email: payload.email }));
          return true;
        }
      } catch {}
    }
    alert('Could not save profile (name/email)');
    return false;
  }, [fields.name.text, fields.email.text]);

  const saveInfo = useCallback(async () => {
    const toNum = (v) => {
      if (v === '' || v === null || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };
    const payload = {
      height: toNum(fields.height.text),
      weight: toNum(fields.weight.text),
      age:    toNum(fields.age.text),
      gender: fields.gender.text || null,
    };
    try {
      const r = await fetch(`${API}/api/goals/me`, {
        method: 'PATCH',
        headers: tokenHeaders(),
        body: JSON.stringify(payload),
      });
      if (r.ok) return true;
    } catch {}
    alert('Could not save profile (info)');
    return false;
  }, [fields.height.text, fields.weight.text, fields.age.text, fields.gender.text]);

  const handleSave = async (name) => {
    const isMain = name === 'name' || name === 'email';
    const ok = await (isMain ? saveMain() : saveInfo());
    if (ok) toggleEdit(name, false);
  };

  return (
    <div className={classes.userProfilePage}>
      <div className={classes.userProfileContainer}>
        <div className={classes.header}>
          <div className={classes.profilePicture}>
            <span
              className={classes.editButton}
              onClick={() => console.log('Edit Profile Picture')}
              title="Edit Profile Picture"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="var(--accent-color)" viewBox="0 0 512 512">
                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/>
              </svg>
            </span>
          </div>
          <div className={classes.mainText}>
            <div className={classes.userName}>{userName}</div>
            <div className={classes.userEmail}>{userEmail}</div>
          </div>
        </div>

        <div className={classes.mainSection}>
          <div className={classes.navButtons}>
            <button className={`${currentSection === 'main' && classes.buttonSelected}`} onClick={() => handleSectionChange('main')}>Main</button>
            <button className={`${currentSection === 'info' && classes.buttonSelected}`} onClick={() => handleSectionChange('info')}>Info</button>
            <button className={`${currentSection === 'other' && classes.buttonSelected}`} onClick={() => handleSectionChange('other')}>Other</button>
          </div>

          {currentSection === 'main' && (
            <>
              <ProfileCard
                name="name"
                value={fields.name}
                onChange={handleChange}
                onToggle={toggleEdit}
                onSave={handleSave}
              />
              <ProfileCard
                name="email"
                value={fields.email}
                onChange={handleChange}
                onToggle={toggleEdit}
                onSave={handleSave}
              />
            </>
          )}

          {currentSection === 'info' && (
            <>
              <ProfileCard
                name="height"
                value={fields.height}
                onChange={handleChange}
                onToggle={toggleEdit}
                onSave={handleSave}
              />
              <ProfileCard
                name="weight"
                value={fields.weight}
                onChange={handleChange}
                onToggle={toggleEdit}
                onSave={handleSave}
              />
              <ProfileCard
                name="age"
                value={fields.age}
                onChange={handleChange}
                onToggle={toggleEdit}
                onSave={handleSave}
              />
              <ProfileCard
                name="gender"
                value={fields.gender}
                onChange={handleChange}
                onToggle={toggleEdit}
                onSave={handleSave}
              />
            </>
          )}

          {currentSection === 'other' && (
            <div style={{ opacity: 0.8, fontSize: 14 }}>Coming soon…</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;