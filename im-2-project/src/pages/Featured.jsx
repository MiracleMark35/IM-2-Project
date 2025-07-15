import React, { useEffect, useState } from 'react';
import '../styles/featured.css';
import classicCars from '../assets/Images/classic.jpg';

const Featured = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'ALL', type: 'image', image: classicCars },
    { id: 'suvs', name: 'SUVs', type: 'text' },
    { id: 'specialty', name: 'Specialty Vehicles', type: 'text' },
    { id: 'economy', name: 'Economy', type: 'text' }
  ];

  return (
    <div className="featured-page">
      <div className="featured-container">
        <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>
          Explore Our Car Categories
        </h2>
        
        <div className={`category-grid ${isVisible ? 'grid-animate' : ''}`}>
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`category-card ${category.type === 'image' ? 'all-card' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category.type === 'image' ? (
                <>
                  <div className="image-overlay"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="category-bg" 
                  />
                  <div className="category-label image-label">
                    {category.name}
                  </div>
                  <div className="hover-effect"></div>
                </>
              ) : (
                <>
                  <div className="category-label text-label">
                    {category.name}
                  </div>
                  <div className="hover-effect"></div>
                  <div className="card-shine"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
