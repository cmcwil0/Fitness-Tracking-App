import '../css/Home.css'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'

const Home = () => {
  const loggedIn = isLoggedIn();

  return (
    <div className='home-page'>
      <h1 className='main-heading'>All in One Fitness and Nutrition Tracker</h1>
      <button className='start-button'>
        {loggedIn ? (
          <Link to="/dashboard">View Dashboard</Link>
        ) : (
          <Link to="/login">Get Started Today</Link>
        )}
      </button>
    </div>
  )
}

export default Home