import React, { useState, useEffect } from "react";

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch images from Img.json
  useEffect(() => {
    fetch("http://localhost:3000/Img")
      .then((response) => {
        console.log("Response Object:", response);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        if (data.Img && Array.isArray(data.Img)) {
          setImages(data.Img.map(img => `/assets/${img.url.split('/').pop()}`));
        } else {
          console.error("Invalid data format", data);
        }
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  // Function to move to the next image
  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to move to the previous image
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-slide effect
  useEffect(() => {
    fetch("http://localhost:3000/Img")
      .then((response) => {
        console.log("Response Object:", response);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        if (Array.isArray(data)) {  // Directly checking if it's an array
          setImages(data.map(img => img.url));
        } else {
          console.error("Invalid data format", data);
        }
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  // Auto-slide effect with cleanup
useEffect(() => {
  if (!isPaused && images.length > 0) {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(timer); // Cleanup on unmount
  }
}, [isPaused, images.length]);

// Pause auto-slide when user interacts
const handleUserInteraction = () => {
  setIsPaused(true);
  clearTimeout(window.resumeTimeout);
  window.resumeTimeout = setTimeout(() => setIsPaused(false), 5000); // Resume after 5s
};

  


  return (
    <div className="carousel-container" onMouseEnter={handleUserInteraction}>
      {images.length > 0 ? (
        <>
          <button className="prev" onClick={prevSlide} disabled={currentIndex === 0}>
            &#10094;
          </button>
          <img src={images[currentIndex]} alt="carousel-slide" className="carousel-image" />
          <button className="next" onClick={nextSlide} disabled={currentIndex === images.length - 1}>
            &#10095;
          </button>
          <div className="dots-container">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default ImageCarousel;
