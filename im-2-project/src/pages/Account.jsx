import React, { useEffect, useState } from 'react';
import '../styles/Account.css';
import { API_BASE_URL } from '../api/apiConfig';
import VerifyDriverModal from '../components/VerifyDriverModal';

const Account = () => {


    


  const [user, setUser] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const userId = localStorage.getItem('id');
    const [showVerifyModal, setShowVerifyModal] = useState(false);
const loadUserData = () => {
  fetch(`${API_BASE_URL}/auth/fetch_user.php?id=${userId}`)
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error('Failed to fetch user data:', err));
};


    useEffect(() => {
  loadUserData();
}, [userId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const response = await fetch(`${API_BASE_URL}/auth/update_user.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await response.json();
    alert(data.message);
    setIsSaving(false);
  };

  return (
    <div className="account-container">
      <h2>Account</h2>

      <div className="account-section">
        <label>Email</label>
        <input type="email" value={user.email || ''} disabled />
      </div>

      <div className="account-section">
        <label>Mobile</label>
        <input name="mobile" value={user.mobile || ''} onChange={handleChange} />
      </div>

      <div className="account-section">
        <label>License Number</label>
        <input name="license_number" value={user.license_number || ''} onChange={handleChange} />
      </div>

      <div className="account-section">
        <label>Address</label>
        <textarea name="address" value={user.address || ''} onChange={handleChange}></textarea>
      </div>

      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>

      <div className="account-section">
        <label>Balance</label>
        <input type="text" value={`$${user.balance || 0}`} disabled />
      </div>

      <div className="account-section">
        <label>Status</label>
        <input type="text" value={user.status || ''} disabled />
        <button onClick={() => setShowVerifyModal(true)}>Get approved to drive</button>
      </div>
      {showVerifyModal && (
  <VerifyDriverModal
    userId={localStorage.getItem('id')}
    onClose={() => setShowVerifyModal(false)}
    refreshUser={loadUserData}
  />
)}
    </div>
    
  );
};

export default Account;