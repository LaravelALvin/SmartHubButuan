import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    setLoading(true);
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
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
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
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3" onClick={handleNavigateFoodDining} style={{ cursor: 'pointer' }}>
                <div className="p-4">
                  <i className="fa fa-3x fa-cutlery txt-blue mb-4" />
                  <h5>Food and Dining</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3" onClick={handleHotel} style={{ cursor: 'pointer' }}>
                <div className="p-4">
                  <i className="fa fa-3x fa-hotel txt-blue mb-4" />
                  <h5>Hotel and Lodging</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3" onClick={handleMedical} style={{ cursor: 'pointer' }}>
                <div className="p-4">
                  <i className="fa fa-3x fa-hospital txt-blue mb-4" />
                  <h5>Medical Services</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3" onClick={handleTranspo} style={{ cursor: 'pointer' }}>
                <div className="p-4">
                  <i className="fa fa-3x fa-taxi txt-blue mb-4" />
                  <h5>Public Transportation</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3" onClick={handleEducation} style={{ cursor: 'pointer' }}>
                <div className="p-4">
                  <i className="fa fa-3x fa-graduation-cap txt-blue mb-4" />
                  <h5>Education</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3" onClick={handleEmergency} style={{ cursor: 'pointer' }}>
                <div className="p-4">
                  <i className="fa fa-3x fa-triangle-exclamation txt-blue mb-4" />
                  <h5>Emergency Services</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3" onClick={handleGovernment} style={{ cursor: 'pointer' }}>
                <div className="p-4">
                  <i className="fa fa-3x fa-building-columns txt-blue mb-4" />
                  <h5>Government Services</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons for Change Info */}
          <div className="mt-5 text-left">
            <button className="btn btn-primary me-3" onClick={() => setShowChangePassword(true)}>Change Password</button>
            <button className="btn btn-secondary me-3" onClick={() => setShowChangeEmail(true)}>Change Email</button>            
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
                <button className="btn btn-secondary" onClick={() => setShowChangePassword(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handlePasswordChange} disabled={!oldPassword || !newPassword || !confirmPassword || loading}>Update</button>
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
                <button className="btn btn-sm btn-outline-primary mb-2" onClick={handleSendOtp}>Send OTP</button>
                {otpSent && (
                  <input type="text" className="form-control" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowChangeEmail(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEmailChange} disabled={!newEmail || !otp || loading}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
