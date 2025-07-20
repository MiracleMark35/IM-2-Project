import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api/apiConfig';

const PendingVerificationView = ({ userId }) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/driver_verification/fetch_user_verification.php?user_id=${userId}`)
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

  if (loading) return <p>Loading pending application...</p>;

  if (!application || application.status !== 'pending') return null;

  return (
    <div className="pending-verification-view">
      <h3>Pending Driver Verification</h3>
      <p><strong>Full Name:</strong> {application.first_name} {application.middle_name} {application.last_name}</p>
      <p><strong>Date of Birth:</strong> {application.date_of_birth}</p>
      <p><strong>Mobile:</strong> {application.mobile}</p>
      <p><strong>Address:</strong> {application.address}</p>
      <p><strong>License Number:</strong> {application.license_number}</p>

      <div className="document-preview">
        <p><strong>Driver’s License:</strong></p>
        <img
          src={`${API_BASE_URL}/uploads/${application.license_image}`}
          alt="License"
          className="license-preview"
        />
      </div>

      <div className="document-preview">
        <p><strong>Secondary ID:</strong></p>
        <img
          src={`${API_BASE_URL}/uploads/${application.secondary_id_image}`}
          alt="Secondary ID"
          className="license-preview"
        />
      </div>

      <p>Status: <strong>{application.status.toUpperCase()}</strong></p>
    </div>
  );
};

export default PendingVerificationView;