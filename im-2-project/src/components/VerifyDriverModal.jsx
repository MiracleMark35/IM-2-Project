import React, { useState, useEffect } from 'react';
import '../styles/VerifyDriverModal.css';
import { API_BASE_URL } from '../api/apiConfig';

const VerifyDriverModal = ({ onClose, userId, refreshUser }) => {
  const [form, setForm] = useState({
    mobile: '',
    license_number: '',
    address: ''
  });

  const [existing, setExisting] = useState({
    profile_photo: '',
    license_image: '',
    secondary_id_image: ''
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [secondaryIdImage, setSecondaryIdImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/fetch_user.php?id=${userId}`);
        const data = await res.json();
        if (!data.error) {
          setForm({
            mobile: data.mobile || '',
            license_number: data.license_number || '',
            address: data.address || ''
          });
          setExisting({
            profile_photo: data.profile_photo || '',
            license_image: data.license_image || '',
            secondary_id_image: data.secondary_id_image || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch user info', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!form.mobile || !form.license_number || !form.address) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('mobile', form.mobile);
    formData.append('license_number', form.license_number);
    formData.append('address', form.address);
    if (profilePhoto) formData.append('profile_photo', profilePhoto);
    if (licenseImage) formData.append('license_image', licenseImage);
    if (secondaryIdImage) formData.append('secondary_id_image', secondaryIdImage);

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/submit_driver_verification.php`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      alert(result.message || 'Submitted!');
      onClose();
      refreshUser();
    } catch (err) {
      alert('Error submitting verification');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="verify-modal-overlay">
      <div className="verify-modal expanded">
        <h2>Driver Verification</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Profile Photo */}
            <label>Profile Photo *</label>
            <small>Please provide a clear photo of your face so your hosts can recognize you.</small>
            {existing.profile_photo && (
              <img
                src={`http://localhost/car-rental-api/api/uploads/${existing.profile_photo}`}
                alt="Current Profile"
                className="preview-image"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, setProfilePhoto)}
              required={!existing.profile_photo}
            />

            {/* Mobile Number */}
            <label>Mobile Number *</label>
            <small>So we can contact you.</small>
            <input name="mobile" value={form.mobile} onChange={handleInput} required />

            {/* License Number */}
            <label>Driver’s License Number *</label>
            <small>Enter your official license number.</small>
            <input
              name="license_number"
              value={form.license_number}
              onChange={handleInput}
              required
            />

            {/* Current Address */}
            <label>Current Address *</label>
            <textarea name="address" value={form.address} onChange={handleInput} required></textarea>

            {/* Driver's License Image */}
            <label>Driver's License Image *</label>
            <small>Upload your driver’s license. Make sure it is readable and valid.</small>
            {existing.license_image && (
              <img
                src={`http://localhost/car-rental-api/api/uploads/${existing.license_image}`}
                alt="Current License"
                className="preview-image"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, setLicenseImage)}
              required={!existing.license_image}
            />

            {/* Secondary ID */}
            <label>Secondary ID (Optional)</label>
            <small>Optional: Upload a secondary government-issued ID (e.g., passport, voter ID).</small>
            {existing.secondary_id_image && (
              <img
                src={`http://localhost/car-rental-api/api/uploads/${existing.secondary_id_image}`}
                alt="Secondary ID"
                className="preview-image"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, setSecondaryIdImage)}
            />

            {/* Action Buttons */}
            <div className="verify-actions">
              <button onClick={onClose}>Cancel</button>
              <button onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Verification'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyDriverModal;
