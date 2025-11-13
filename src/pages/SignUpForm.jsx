import classes from '../css/SignUpForm.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [userEmail, setEmail]     = useState('');
  const [userPassword, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email: userEmail, password: userPassword
        })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.message || 'Sign up failed');

      alert(`Account created! Your username is: ${data.username}`);
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={classes.signUpFormContainer}>
      <div className={classes.signUpForm}>
        <h1>SIGN UP</h1>
        <form className={classes.signUpInputs} onSubmit={onSubmit}>
          <input type="text" placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input type="text" placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} />
          <input type="text" placeholder='Email' value={userEmail} onChange={e => setEmail(e.target.value)} />
          <input type="text" placeholder='Password' value={userPassword} onChange={e => setPassword(e.target.value)} />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;