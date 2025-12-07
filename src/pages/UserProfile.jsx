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
            <svg xmlns="http://www.w3.org/2000/svg" width='85px' height='85px' fill='var(--accent-color)' viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>
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
              <ProfileCard 
                name="password"
                value={'********'}
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
            <div className={classes.otherContainer}>
              <div className={classes.bottomContent}>
                <div>
                  <label>Account Management</label>
                  <button>Delete Account</button>
                </div>
                <div>
                  <label>AI Privacy</label>
                  <button>Clear Chatbot Data</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;