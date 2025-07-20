import React, { useEffect, useState } from 'react';
import '../styles/VerifyDriverModal.css';
import { API_BASE_URL } from '../api/apiConfig';

const PendingDriverVerificationModal = ({ userId, onClose, onActionTaken }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/fetch_user.php?id=${userId}`);
        const data = await res.json();
        if (!data.error) {
          setUser(data);
        }
      } catch (err) {
        console.error('Failed to fetch verification info', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleAction = async (status) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/update_driver_verification.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status })
      });
      const result = await res.json();
      alert(result.message || `${status} successfully`);
      onActionTaken(); // Refresh list if needed
      onClose();
    } catch (err) {
      alert('Error updating status');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="verify-modal-overlay"><div className="verify-modal"><p>Loading...</p></div></div>;
  if (!user) return null;

  return (
    <div className="verify-modal-overlay">
      <div className="verify-modal expanded">
        <h2>Review Driver Verification</h2>

        <label>Profile Photo</label>
        <img src={`http://localhost/car-rental-api/api/uploads/${user.profile_photo}`} alt="Profile" className="preview-image" />

        <label>Mobile Number</label>
        <p>{user.mobile}</p>

        <label>License Number</label>
        <p>{user.license_number}</p>

        <label>Current Address</label>
        <p>{user.address}</p>

        <label>Driver’s License Image</label>
        <img src={`http://localhost/car-rental-api/api/uploads/${user.license_image}`} alt="License" className="preview-image" />

        {user.secondary_id_image && (
          <>
            <label>Secondary ID</label>
            <img src={`http://localhost/car-rental-api/api/uploads/${user.secondary_id_image}`} alt="Secondary ID" className="preview-image" />
          </>
        )}

        <div className="verify-actions">
          <button onClick={onClose}>Close</button>
          <button onClick={() => handleAction('approved')} disabled={submitting}>
            {submitting ? 'Processing...' : 'Approve'}
          </button>
          <button onClick={() => handleAction('rejected')} disabled={submitting}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingDriverVerificationModal;
