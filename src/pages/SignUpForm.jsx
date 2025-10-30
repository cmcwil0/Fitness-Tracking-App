import classes from '../css/SignUpForm.module.css'
import { useState } from 'react';

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userAge, setAge] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');

  return (
    <div className={`${classes.signUpFormContainer}`}>
        <div className={`${classes.signUpForm}`}>
            <h1>SIGN UP</h1>

            <form className={`${classes.signUpInputs}`} action="">
                <input type="text" placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input type="text" placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}/>
                <input type="text" placeholder='Email' value={userEmail} onChange={e => setEmail(e.target.value)}/>
                <input type="text" placeholder='Password' value={userPassword} onChange={e => setPassword(e.target.value)} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default SignUpForm
