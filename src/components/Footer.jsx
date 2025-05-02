import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './Firebase'; // Adjust path if needed

export default function Footer() {

  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Add loading state

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

    setIsLoading(true);  // Start loading

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      sessionStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginError('');
      setUsername('');        // Clear username
      setPassword('');        // Clear password
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
    } finally {
      setIsLoading(false);  // End loading
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
      {/* Footer Start */}
      <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{" "}
                <a className="border-bottom" href="#">
                  SmartHub:Butuan City
                </a>
                , All Right Reserved.
                Designed For{" "}
                <a className="border-bottom" href="#">
                  IS 215
                </a>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  {isLoggedIn ? (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                      Logout
                    </a>
                  ) : (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleAdminClick(); }}>
                      Admin Login
                    </a>
                  )}
                  <a href="/Admin">Admin Dashboard</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

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
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
