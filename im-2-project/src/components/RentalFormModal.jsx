import React, { useState, useEffect } from 'react';
import './RentalFormModal.css';
import { API_BASE_URL } from '../api/apiConfig';


export default function RentalFormModal({ vehicle, isOpen, onClose, selectedDateRange }) {
  if (!isOpen || !vehicle) return null;

  const [formData, setFormData] = useState({
  fullName: localStorage.getItem('userFullName') || '',
  email: localStorage.getItem('userEmail') || '',
  phone: localStorage.getItem('userPhone') || '',
  pickupLocation: localStorage.getItem('location') || 'main_branch',
  pickupDate: '',
  returnDate: '',
  licenseImage: null,
  idImage: null
});


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formatToDate = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toISOString().split('T')[0];
  };

  const [fromRaw, toRaw] = selectedDateRange?.split(' - ') || ['', ''];
  const pickupDateValue = formatToDate(fromRaw);
  const returnDateValue = formatToDate(toRaw);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Get user ID from localStorage or wherever it's stored
  const userId = localStorage.getItem('id');

      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Create FormData for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('user_id', userId);
      formDataToSend.append('car_id', vehicle.id);
      formDataToSend.append('start_date', formData.pickupDate || pickupDateValue);
      formDataToSend.append('end_date', formData.returnDate || returnDateValue);
      formDataToSend.append('pickup_location', formData.pickupLocation);
      formDataToSend.append('return_location', formData.pickupLocation); // Same as pickup for now
      formDataToSend.append('total_price', vehicle.price); // You might want to calculate this based on days
      
      if (formData.licenseImage) {
        formDataToSend.append('license_image', formData.licenseImage);
      }
      if (formData.idImage) {
        formDataToSend.append('id_image', formData.idImage);
      }

      const response = await fetch(`${API_BASE_URL}/bookings/index.php`, {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header - let the browser set it with boundary
      });

      const data = await response.json();

      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to create booking');
      }

      setSuccess(true);
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
        // Optionally redirect to bookings page
        // navigate('/my-bookings');
      }, 2000);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button" aria-label="Close Modal">
          &times;
        </button>

        <h2 className="modal-title">Rent {vehicle.name}</h2>

        {success && (
          <div className="alert alert-success">
            Booking created successfully! Redirecting...
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form className="rental-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label className="form-label">Full Name</label>
    <p className="readonly-field">{formData.fullName}</p>
  </div>

  <div className="form-group">
    <label className="form-label">Email</label>
    <p className="readonly-field">{formData.email}</p>
  </div>

  <div className="form-group">
    <label className="form-label">Phone #</label>
    <p className="readonly-field">{formData.phone}</p>
  </div>

  <div className="form-group">
    <label className="form-label">Vehicle</label>
    <input type="text" value={vehicle.name} readOnly className="form-input" />
  </div>

  <div className="form-group">
    <label className="form-label">Pick-up Location</label>
    <input 
      type="text" 
      name="pickupLocation"
      placeholder="Enter location" 
      className="form-input" 
      value={formData.pickupLocation}
      onChange={handleChange}
      required 
    />
  </div>

  <div className="form-group form-grid">
    <div>
      <label className="form-label">Pick-up Date</label>
      <input 
        type="date" 
        name="pickupDate"
        className="form-input" 
        defaultValue={pickupDateValue}
        onChange={handleChange}
        required 
      />
    </div>
    <div>
      <label className="form-label">Return Date</label>
      <input 
        type="date" 
        name="returnDate"
        className="form-input" 
        defaultValue={returnDateValue}
        onChange={handleChange}
        required 
      />
    </div>
  </div>

  <div className="form-group">
    <label className="form-label">Attach Required Documents</label>
    <div className="file-upload-group">
      <label>Driver's License:</label>
      <input 
        type="file" 
        name="licenseImage"
        className="form-input-file" 
        accept="image/*,application/pdf" 
        onChange={handleChange}
        required 
      />
      <label>ID Proof:</label>
      <input 
        type="file" 
        name="idImage"
        className="form-input-file" 
        accept="image/*,application/pdf" 
        onChange={handleChange}
        required 
      />
    </div>
  </div>

  <div className="form-group">
    <button 
      type="submit" 
      className="submit-button"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  </div>
</form>

      </div>
    </div>
  );
}