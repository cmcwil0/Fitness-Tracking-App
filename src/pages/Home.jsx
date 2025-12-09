import '../css/Home.css'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'
import { useState, useEffect } from 'react'

const Home = () => {
  const loggedIn = isLoggedIn();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop',
      title: 'Track Your Fitness Journey',
      subtitle: 'Monitor workouts, set goals, and achieve results'
    },
    {
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop',
      title: 'Nutrition Made Simple',
      subtitle: 'Log meals and track macros effortlessly'
    },
    {
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=600&fit=crop',
      title: 'Reach Your Goals',
      subtitle: 'Personalized recommendations for your fitness journey'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='home-page'>
      <div className='slideshow-container'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className='slide-overlay'>
              <h2 className='slide-title'>{slide.title}</h2>
              <p className='slide-subtitle'>{slide.subtitle}</p>
            </div>
          </div>
        ))}
        
        <div className='slide-indicators'>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className='content-section'>
        <h1 className='main-heading'>All in One Fitness and Nutrition Tracker</h1>
        <button className='start-button'>
          {loggedIn ? (
            <Link to="/dashboard">View Dashboard</Link>
          ) : (
            <Link to="/login">Get Started Today</Link>
          )}
        </button>
      </div>
    </div>
  )
}

export default Home