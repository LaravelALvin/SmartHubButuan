import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { getAuth, updatePassword, updateEmail, signOut, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

function Admin() {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const cancelChangePassword = () => {
    setShowChangePassword(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage('Password updated successfully!');
      setShowChangePassword(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.message.includes('auth/invalid-credential')) {
          setMessage(`Invalid old password`);
      }
      
    }
    setIsLoading(false);

  };

  const handleSendOtp = () => {
    if (!newEmail) {
      setMessage('Please enter a new email.');
      return;
    }
    // Simulate OTP sending
    setOtpSent(true);
    setMessage('OTP sent to new email (simulated).');
  };

  const handleEmailChange = async () => {
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }
    setLoading(true);
    try {
      await updateEmail(user, newEmail);
      setMessage('Email updated successfully!');
      setShowChangeEmail(false);
      setNewEmail('');
      setOtp('');
      setOtpSent(false);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('adminLoggedIn');
      navigate('/');
    } catch (error) {
      setMessage(`Logout Error: ${error.message}`);
    }
  };

  const handleNavigateFoodDining = () => {
    navigate('/food-and-dining');
  };

  const handleHotel = () => {
    navigate('/hotel-and-lodging');
  };

  const handleEducation = () => {
    navigate('/education');
  };

  const handleEmergency = () => {
    navigate('/Emergency-Services');
  };

  const handleMedical = () => {
    navigate('/Medical-Services');
  };

  const handleGovernment = () => {
    navigate('/Government-Services');
  };

  const handleTranspo = () => {
    navigate('/Public-Transportation');
  };

  return (
    <div>
      {/* Service Start */}
        {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-3">Our Services</h1>
          </div>
          <div className="row g-4">
      
            {/* Food and Dining Service */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/Food-and-Dining" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <i className="fa fa-3x fa-cutlery txt-blue mb-4" />
                    <h3>Food and Dining</h3>
                    <p className="txt-black flex-grow-1">
                      Explore a variety of dining options in the area, ranging from local delicacies to international cuisine.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
      
            {/* Hotel and Lodging Service */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/Hotel-and-Lodging" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <i className="fa fa-3x fa-hotel txt-blue mb-4" />
                    <h3>Hotel and Lodging</h3>
                    <p className="txt-black flex-grow-1">
                      Find the best places to stay, whether you're looking for luxury, comfort, or budget-friendly accommodations.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
      
            {/* Medical Services */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/Medical-Services" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <i className="fa fa-3x fa-hospital txt-blue mb-4" />
                    <h3>Medical Services</h3>
                    <p className="txt-black flex-grow-1">
                      Access healthcare services with ease, including hospitals, clinics, and emergency medical assistance.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
      
            {/* Public Transportation */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/Public-Transportation" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <i className="fa fa-3x fa-taxi txt-blue mb-4" />
                    <h3>Public Transportation</h3>
                    <p className="txt-black flex-grow-1">
                      Easily navigate the city with reliable and convenient public transport options like buses, taxis, and more.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
      
            {/* Education */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/Education" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <i className="fa fa-3x fa-graduation-cap txt-blue mb-4" />
                    <h3>Education</h3>
                    <p className="txt-black flex-grow-1">
                      Access top-quality educational institutions and resources to foster learning and skill development.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
      
            {/* Emergency Services */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/Emergency-Services" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <i className="fa fa-3x fa-triangle-exclamation txt-blue mb-4" />
                    <h3>Emergency Services</h3>
                    <p className="txt-black flex-grow-1">
                      Immediate access to emergency services and rescue operations when you need them most.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
      
            {/* Government Services */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/Government-Services" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <i className="fa fa-3x fa-building-columns txt-blue mb-4" />
                    <h3>Government Services</h3>
                    <p className="txt-black flex-grow-1">
                      Connect with various government departments for essential services like permits, registration, and more.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
      
            {/* About */}
            <div className="col-lg-3 col-sm-6 d-flex">
              <Link to="/about" className="w-100">
                <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                  <div className="p-4 d-flex flex-column flex-grow-1 text-center">
                    <img
                      src="assets/img/Butuan_Logo_Transparent.webp"
                      alt="Government Services Logo"
                      className="img-fluid rounded-circle mx-auto mb-3"
                      style={{ width: '100%', height: '210px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </Link>
            </div>
      
          </div>
          {/* Buttons for Change Info */}
          <div className="mt-5 text-left">
              <button className="btn btn-blue me-3" onClick={() => setShowChangePassword(true)}>Change Password</button>
              <button className="btn btn-blue me-3" onClick={() => setShowChangeEmail(true)}>Change Email</button>            
          </div>
        </div>
      </div>
      {/* Service End */}
       
      {/* Modal for Password Change */}
      {showChangePassword && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowChangePassword(false)}></button>
              </div>
              <div className="modal-body">
                <input type="password" className="form-control mb-2" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                <input type="password" className="form-control mb-2" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <input type="password" className="form-control" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                {message && <p className="mt-3 text-danger">{message}</p>}
                {loading && <p className="text-muted">Processing...</p>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-delete" onClick={() => {
                  setShowChangePassword(false);
                  cancelChangePassword();
                }}>Cancel</button>
               
                {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  ) : (
                    <button className="btn btn-save" onClick={handlePasswordChange} disabled={!oldPassword || !newPassword || !confirmPassword || loading}>Update</button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Email Change */}
      {showChangeEmail && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Email</h5>
                <button type="button" className="btn-close" onClick={() => setShowChangeEmail(false)}></button>
              </div>
              <div className="modal-body">
                <input type="email" className="form-control mb-2" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                <button className="btn btn-blue btn-outline-primary mb-2" onClick={handleSendOtp}>Send OTP</button>
                {otpSent && (
                  <input type="text" className="form-control" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-delete" onClick={() => setShowChangeEmail(false)}>Cancel</button>
                <button className="btn btn-save" onClick={handleEmailChange} disabled={!newEmail || !otp || loading}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
