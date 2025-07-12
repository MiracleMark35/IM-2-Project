import React, { useState } from 'react';

const Login = () => {
  const [userID, setUserID] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleSubmit = () => {
    if (!userID || !passcode) {
      alert('Please enter both User ID and Passcode.');
    } else {
      alert(`Submitted!\nUser ID: ${userID}\nPasscode: ${passcode}`);
    }
  };

  const handleRedirect = (path) => {
    window.location.href = path;
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: 'sans-serif',
    },
    navbar: {
      backgroundColor: '#f1e4d2',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
    },
    leftNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '40px',
    },
    logo: {
      fontSize: '24px',
      color: '#3b2e1e',
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
      gap: '32px',
    },
    navLink: {
      color: '#222',
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
    loginButton: {
      backgroundColor: '#f1e4d2',
      color: '#2a174d',
      border: 'none',
      padding: '8px 20px',
      borderRadius: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    background: {
      background: "carvibes.jpg", // background cover
      height: 'calc(100vh - 70px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginBox: {
      backgroundColor: '#6d4d2d',
      padding: '40px',
      borderRadius: '20px',
      width: '340px',
      color: '#f9d69e',
      boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    input: {
      padding: '12px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      outline: 'none',
    },
    submitButton: {
      backgroundColor: '#d3c5b9',
      border: 'none',
      padding: '6px 14px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      alignSelf: 'flex-end',
    }
  };

  return (
    <div style={styles.body}>
      <nav style={styles.navbar}>
        <div style={styles.leftNav}>
          <div style={styles.logo}>Mc. <strong>IE</strong></div>
          <ul style={styles.navLinks}>
            <li style={styles.navLink} onClick={() => handleRedirect('/home')}>Home</li>
            <li style={styles.navLink} onClick={() => handleRedirect('/rentals')}>Rentals</li>
            <li style={styles.navLink} onClick={() => handleRedirect('/contacts')}>Contacts</li>
          </ul>
        </div>
        <button style={styles.loginButton} onClick={() => alert('Navbar Login clicked')}>
          Login
        </button>
      </nav>

      <div style={styles.background}>
        <div style={styles.loginBox}>
          <div style={styles.formGroup}>
            <label>User ID</label>
            <input
              type="text"
              placeholder="Type here"
              style={styles.input}
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Passcode</label>
            <input
              type="password"
              placeholder="Type here"
              style={styles.input}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
          </div>

          <button style={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
