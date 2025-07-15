import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/featured.css';
import classicCars from '../assets/Images/classic.jpg';

const Featured = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Update your categories with correct `type` filters
  const categories = [
    { id: 'all', name: 'ALL', type: 'image', image: classicCars, filter: 'ALL' },
    { id: 'suv', name: 'SUVs', type: 'text', filter: 'suv' },
    { id: 'car', name: 'Cars', type: 'text', filter: 'car' },
    { id: 'truck', name: 'Trucks', type: 'text', filter: 'truck' },
    { id: 'van', name: 'Vans', type: 'text', filter: 'van' },
    { id: 'box_truck', name: 'Box Trucks', type: 'text', filter: 'box_truck' },
    { id: 'cargovan', name: 'Cargo Vans', type: 'text', filter: 'cargovan' },
    { id: 'minivan', name: 'Minivans', type: 'text', filter: 'minivan' },
  ];

  const handleClick = (filterType) => {
    navigate(`/rentals?type=${filterType}`);
  };

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
              onClick={() => handleClick(category.filter)}
            >
              {category.type === 'image' ? (
                <>
                  <div className="image-overlay"></div>
                  <img src={category.image} alt={category.name} className="category-bg" />
                  <div className="category-label image-label">{category.name}</div>
                  <div className="hover-effect"></div>
                </>
              ) : (
                <>
                  <div className="category-label text-label">{category.name}</div>
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
