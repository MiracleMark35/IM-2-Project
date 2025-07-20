import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api/apiConfig';
import './PendingVerificationView.css';

const PendingVerificationView = ({ userId, onClose }) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/fetch_user_application_form.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setApplication(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching verification:', err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return null;
  if (!application || application.status !== 'pending') return null;

  return (
    <div className="modal-overlay">
      <div className="pending-verification-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3>Pending Driver Verification</h3>
   
        <p><strong>Mobile:</strong> {application.mobile}</p>
        <p><strong>Address:</strong> {application.address}</p>
        <p><strong>License Number:</strong> {application.license_number}</p>

        <div className="document-preview">
          <p><strong>Driver’s License:</strong></p>
          <img
            src={`http://localhost/car-rental-api/api/uploads/${application.license_image}`}
            alt="License"
            className="license-preview"
          />
        </div>

 {application.secondary_id_image && (
  <div className="document-preview">
    <p><strong>Secondary ID:</strong></p>
    <img
      src={`http://localhost/car-rental-api/api/uploads/${application.secondary_id_image}`}
      alt="Secondary ID"
      className="license-preview"
    />
  </div>
)}

        <p>Status: <strong>{application.status.toUpperCase()}</strong></p>
      </div>
    </div>
  );
};

export default PendingVerificationView;
