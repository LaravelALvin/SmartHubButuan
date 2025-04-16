import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './Firebase'; // adjust the path if needed

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(isLoggedIn);
  }, []);

  const handleAdminClick = () => {
    if (isLoggedIn) {
      navigate('/Admin');
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // On successful login, set session and close modal
      sessionStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      setShowLogin(false);
      navigate('/Admin');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      sessionStorage.removeItem('adminLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    }).catch((error) => {
      console.error('Error logging out: ', error);
    });
  };

  return (
    <div>
      {/* Navbar Start */}
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
              <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/About" className="nav-item nav-link">About</Link>
              <Link to="/Services" className="nav-item nav-link">Services</Link>
              <Link to="/Packages" className="nav-item nav-link">Packages</Link>
              <div className="nav-item dropdown">
                <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  Pages
                </Link>
                <div className="dropdown-menu m-0">
                  <Link to="/Destination" className="dropdown-item">Destination</Link>
                  <Link to="/Booking" className="dropdown-item">Booking</Link>
                  <Link to="/Team" className="dropdown-item">Travel Guides</Link>
                  <Link to="/Testimonial" className="dropdown-item">Testimonial</Link>
                  <Link to="/Error" className="dropdown-item">404 Page</Link>
                </div>
              </div>
              <Link to="/Contact" className="nav-item nav-link">Contact</Link>
            </div>

            {/* Dynamic Button: Login/Logout */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-danger rounded-pill py-2 px-4">
                Logout
              </button>
            ) : (
              <button onClick={handleAdminClick} className="btn btn-blue rounded-pill py-2 px-4">
                Administrator
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-backdrop-custom" onClick={() => setShowLogin(false)}>
          <div className="modal-dialog-centered-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content p-4" style={{ width: '100%', maxWidth: '400px' }}>
              <div className="modal-header">
                <h5 className="modal-title">Admin Login</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogin(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowLogin(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
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
