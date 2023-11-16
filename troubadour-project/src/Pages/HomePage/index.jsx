import { useState } from 'react';
import Navbar from '../../Components/Navbar';

function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () =>{
    setShowPopup(true);
  }

  return (
    <div id="home-page">
    <div id="home-page-info">
        <h2>Mood Magic Unleashed: Playlists Tailored Just for You!</h2>
        <p>Dive into a musical journey with Troubadour! Our playlists go beyond music; they are your personal mood maestros. Let the beats sync with your emotions, transforming each day into a symphony of sound. Explore the joy of personalized playlists, where your mood finds its perfect melody!</p>
        <button type="submit" onClick={handleClick}>Get started!</button>
    </div>
      <Navbar showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  );
}

export default HomePage;

