import React from 'react';

import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          Rent Cars or
          Earn by Sharing Yours
        </h1>

        <p>
          A modern platform where renters
          find vehicles easily and car
          owners grow income through
          fleet sharing.
        </p>

        {/* <div className="hero-buttons">
          <button className="primary-btn">
            Rent a Car
          </button>

          <button className="secondary-btn">
            List Your Car
          </button>
        </div> */}
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
          alt="car"
        />
      </div>
    </section>
  );
}

export default Hero;