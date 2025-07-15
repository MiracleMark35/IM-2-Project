// src/components/VerifyDriverModal.jsx
import React, { useState } from 'react';
import '../styles/VerifyDriverModal.css';
import { API_BASE_URL } from '../api/apiConfig';

const VerifyDriverModal = ({ onClose, userId, refreshUser }) => {
  const [form, setForm] = useState({
    mobile: '',
    license_number: '',
    address: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('mobile', form.mobile);
    formData.append('license_number', form.license_number);
    formData.append('address', form.address);
    if (profilePhoto) formData.append('profile_photo', profilePhoto);
    if (licenseImage) formData.append('license_image', licenseImage);

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify_user.php`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      alert(result.message || 'Submitted!');
      onClose();
      refreshUser(); // reload user info
    } catch (err) {
      alert('Error submitting verification');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="verify-modal-overlay">
      <div className="verify-modal">
        <h2>Get approved to drive</h2>
        
        <p className="verify-label">Profile photo</p>
        <input type="file" accept="image/*" onChange={(e) => handleFile(e, setProfilePhoto)} />

        <p className="verify-label">Mobile number</p>
        <input name="mobile" value={form.mobile} onChange={handleInput} />

        <p className="verify-label">Driver's license number</p>
        <input name="license_number" value={form.license_number} onChange={handleInput} />

        <p className="verify-label">Upload license image</p>
        <input type="file" accept="image/*" onChange={(e) => handleFile(e, setLicenseImage)} />

        <p className="verify-label">Current address</p>
        <textarea name="address" value={form.address} onChange={handleInput}></textarea>

        <div className="verify-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyDriverModal;
