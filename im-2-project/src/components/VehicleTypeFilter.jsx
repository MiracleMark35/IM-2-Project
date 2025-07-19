import React from 'react';
import './VehicleTypeFilter.css';

const types = [
  'ALL',
  'car',
  'suv',
  'truck',
  'minivan',
  'van',
  'box_truck',
  'cargovan'
];

export default function VehicleTypeFilter({ selectedType, setSelectedType }) {
  return (
    <div className="vehicle-type-filter">
      {types.map(type => (
        <button
          key={type}
          className={`type-btn ${selectedType.toLowerCase() === type.toLowerCase() ? 'active' : ''}`}
          onClick={() => setSelectedType(type.toUpperCase())}
        >
          {type.replace('_', ' ').toUpperCase()}
        </button>
      ))}
    </div>
  );
}