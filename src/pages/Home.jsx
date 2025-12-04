import '../css/Home.css';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const Home = () => {
  const loggedIn = isLoggedIn();

  return (
    <div className='home-page'>
      <div className='background-image'></div>
      <h1 className='main-heading'>All in One Fitness and Nutrition Tracker</h1>
      <p className='about-info'>Track your workouts, monitor your nutrition, and achieve your fitness goals all in one place. Join our community of fitness enthusiasts today!</p>
      <br></br>
      <button className='start-button'>
        {loggedIn ? (
          <Link to="/dashboard">View Dashboard</Link>
        ) : (
          <Link to="/login">Get Started Today</Link>
        )}
      </button>

    </div>
  );
};

export default Home;