import guitarist from "../../assets/felipe-portella-h6gTtqBZUxc-unsplash.png"
import BlobAnimation from "../../Components/Background";

function HomePage() {

  return (
    <div id="home-page">
      <BlobAnimation/>
      <div id="home-page-info">
        <h2>Mood Magic Unleashed: Playlists Tailored Just for You!</h2>
        <p>Dive into a musical journey with Troubadour! Our playlists go beyond music; they are your personal mood maestros. Let the beats sync with your emotions, transforming each day into a symphony of sound. Explore the joy of personalized playlists, where your mood finds its perfect melody!</p>
        <img src={guitarist}/>
      </div>
    </div>
  );
}

export default HomePage;

