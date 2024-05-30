import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Assuming you're using Next.js for image optimization
import styles from '../../styles/Carousel.module.css'; // Custom CSS for styling

const Carousel = ({ imags, autoPlayInterval = 3000 }:{imags:any, autoPlayInterval:any}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imags?.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [imags?.length, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imags?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imags?.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.arrowButton} onClick={prevSlide}>
        &#10094;
      </button>
      <div className={styles.imageContainer}>
        {imags?.map((image:any, index:any) => (
          <div
            key={index}
            className={`${styles.image} ${
              index === currentIndex ? styles.active : styles.inactive
            }`}
          >
            <Image
              src={image?.secure_url}
              alt={`Image ${index + 1}`}
              width={300}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <button className={styles.arrowButton} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;












