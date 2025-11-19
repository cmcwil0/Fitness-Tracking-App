import { useState } from 'react';
import classes from '../css/UserProfile.module.css';

//card to be reused
const ProfileCard = ({ name, value, onEdit }) => (
  <div className={classes.profileCard}>
    <label>{name}</label>
    <section>
      {value.isEditing ? (
        <input
          value={value.text}
          onChange={(e) => onEdit(name, e.target.value)}
        />
      ) : (
        <span>{value.text}</span>
      )}
    </section>
    <div
      className={classes.editButton}
      onClick={() => onEdit(name, null, !value.isEditing)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="12px"
        width="12px"
        fill="var(--accent-color)"
        viewBox="0 0 512 512"
      >
        <path d="M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z" />
      </svg>
    </div>
  </div>
);

const UserProfile = () => {
  const [currentSection, setCurrentSection] = useState('main');
  

  const handleEditField = () => {
    
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className={classes.userProfilePage}>
      <div className={classes.userProfileContainer}>
        <div className={classes.header}>
          <div className={classes.profilePicture}>
            <span
              className={classes.editButton}
              onClick={() => console.log('Edit Profile Picture')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="15px"
                fill="var(--accent-color)"
                viewBox="0 0 512 512"
              >
                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
              </svg>
            </span>
          </div>
          <div className={classes.mainText}>
            <div className={classes.userName}>{'John Doe'}</div>
            <div className={classes.userEmail}>{'John.doe@example.com'}</div>
          </div>
        </div>
        <div className={classes.mainSection}>
          <div className={classes.navButtons}>
            <button onClick={() => handleSectionChange('main')}>Main</button>
            <button onClick={() => handleSectionChange('info')}>Info</button>
            <button onClick={() => handleSectionChange('other')}>Other</button>
          </div>
          {currentSection === 'main' && (
            <>
              <ProfileCard
                name="name"
                value={``}
                onEdit={handleEditField}
              />
              <ProfileCard
                name="email"
                value={``}
                onEdit={handleEditField}
              />
            </>
          )}
          {currentSection === 'info' && (
            <>
              <ProfileCard 
                name="height"
                value={``}
              />
              <ProfileCard 
                name="weight"
                value={``}
              />
              <ProfileCard 
                name="age"
                value={``}
              />
              <ProfileCard 
                name="gender"
                value={``}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;