import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './Firebase'; // Adjust path if needed

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(isLoggedIn);
  }, []);

  const handleAdminClick = () => {
    setLoginError('');
    setShowLogin(true);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setLoginError('Both fields are required.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      sessionStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginError('');
      navigate('/Admin');
    } catch (error) {
      let errorMsg =
        error.message.includes('auth/invalid-email') ||
        error.message.includes('auth/user-not-found') ||
        error.message.includes('auth/wrong-password')
          ? 'Incorrect Username/Password'
          : 'Login failed: ' + error.message;

      setLoginError(errorMsg);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem('adminLoggedIn');
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error logging out: ', error);
      });
  };

  return (
    <div>
      {/* Navbar */}
      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
          <Link to="/" className="navbar-brand p-0">
            <h1 className="txt-blue m-0">
              <i className="fa fa-map-marker-alt me-3 txt-blue" />
              SmartButuan
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link to="/About" className="nav-item nav-link">
                About
              </Link>
              <Link to="/Emergency-Services" className="nav-item nav-link">
                Emergency
              </Link>
            </div>

            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-delete rounded-pill py-2 px-4">
                Logout
              </button>
            ) : (
              <button onClick={handleAdminClick} className="btn btn-blue rounded-pill py-2 px-4">
                Admin Login
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-backdrop-custom" onClick={() => setShowLogin(false)}>
          <div className="modal-dialog-centered-custom" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-content p-4 ${shake ? 'shake' : ''}`} style={{ width: '100%', maxWidth: '400px' }}>
              <div className="modal-header">
                <h5 className="modal-title">Admin Login</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogin(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control border-blue mb-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {loginError && <div className="text-danger mt-2">{loginError}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-delete" onClick={() => setShowLogin(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-save" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
