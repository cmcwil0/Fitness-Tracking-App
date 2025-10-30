import classes from '../css/SignUpForm.module.css'

const SignUpForm = () => {
  return (
    <div className={`${classes.signUpFormContainer}`}>
        <div className={`${classes.signUpForm}`}>
            <h1>SIGN UP</h1>

            <form className={`${classes.signUpInputs}`} action="">
                <input type="text" placeholder='First Name' />
                <input type="text" placeholder='Last Name'/>
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password' />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default SignUpForm
