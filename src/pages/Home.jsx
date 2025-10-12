import '../css/Home.css'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='home-page'>
      <h1 className='main-heading'>All in One Fitness and Nutrition Tracker</h1>
      <button className='start-button'><Link to="/login" >Get Started Today</Link></button>
    </div>
  )
}

export default Home
