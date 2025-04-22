import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { Link } from "react-router-dom";

function FoodAndDining() {
  const [packagesData, setPackagesData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    openingTime: "",
    closingTime: "",
    contact: "",
    price: "",
    description: "",
    image: ""
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const checkLogin = sessionStorage.getItem("adminLoggedIn") === "true";
    setIsAdmin(checkLogin);

    const fetchData = async () => {
      try {
        const colRef = collection(db, "FoodAndDining");
        const snapshot = await getDocs(colRef);

        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPackagesData(data);
        } else {
          console.log("No data found in FoodAndDining collection.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    return `${hours}:${minutes}`;
  };
  
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name || "",
      location: item.location || "",
      contact: item.contact || "",
      price: item.price || "",
      description: item.description || "",
      image: item.image || "",
      openingTime: formatTime(item.openingTime),
      closingTime: formatTime(item.closingTime),
    });
    console.log("Editing item:", item.openingTime, item.closingTime);
    setShowModal(true);
  };
  

  const handleAddNew = () => {
    setFormData({
      id: "",
      name: "",
      location: "",
      openingTime: "",
      closingTime: "",
      contact: "",
      price: "",
      description: "",
      image: ""
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const formattedData = {
        ...formData,
        openingTime: formatTimeTo12Hour(formData.openingTime),
        closingTime: formatTimeTo12Hour(formData.closingTime)
      };

      if (formData.id) {
        const { id, ...updateData } = formattedData;
        await updateDoc(doc(db, "FoodAndDining", id), updateData);
        console.log("Item updated:", id);
      } else {
        const newRef = doc(collection(db, "FoodAndDining"));
        const { id, ...newData } = formattedData;
        await setDoc(newRef, newData);
        console.log("New item added.");
      }
      window.location.reload();
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  const formatTimeTo12Hour = (timeStr) => {
    if (!timeStr || timeStr.includes("AM") || timeStr.includes("PM")) {
      // Already formatted
      return timeStr;
    }
  
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  function convertTo24HourFormat(time) {
    const [timeString, period] = time.split(' ');
    let [hours, minutes] = timeString.split(':');
    
    if (period === 'AM' && hours === '12') hours = '00'; // Special case for 12 AM
    else if (period === 'PM' && hours !== '12') hours = String(Number(hours) + 12); // Convert PM hours
    
    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "FoodAndDining", formData.id));
      console.log("Item deleted:", formData.id);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-1">
          <div className="row justify-content-center py-1">
            <div className="col-lg-10 pt-lg-1 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">Food and Dining</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item text-white active" aria-current="page">Food & Dining</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
          {packagesData.map((pkg, index) => {
            // Convert opening and closing times to 24-hour format
            const openingTime24 = convertTo24HourFormat(pkg.openingTime);
            const closingTime24 = convertTo24HourFormat(pkg.closingTime);

            const currentTime = new Date();
            const currentTime24 = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

            const isOpen = currentTime24 >= openingTime24 && currentTime24 <= closingTime24;

            return (
              <div key={pkg.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`}>
                <div className="package-item d-flex flex-column">
                  <div className="overflow-hidden position-relative" style={{ height: "250px" }}>
                    <img className="img-fluid w-100 h-100" src={pkg.image || "assets/img/restaurant-2.jpg"} alt={pkg.location} style={{ objectFit: "cover", height: "100%" }} />
                    {isAdmin && (
                      <button onClick={() => handleEdit(pkg)} className="btn-sm btn-yellow position-absolute top-0 end-0 m-2">Edit</button>
                    )}
                    <div
                      className={`position-absolute top-0 start-0 m-2 py-2 px-4 ${isOpen ? 'bg-open' : 'bg-close'}`}
                      style={{ fontSize: "1rem", color: "white", borderRadius: "25px" }}
                    >
                      {isOpen ? "Now Open" : "Closed"}
                    </div>
                  </div>
                  <div className="d-flex border-bottom">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-map-marker-alt txt-blue me-2" />
                      {pkg.location}
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-clock txt-blue me-2" />
                      {pkg.openingTime} - {pkg.closingTime}
                    </small>
                  </div>
                  <div className="text-center p-4 flex-grow-1">
                    <h3 className="mb-0">{pkg.name}</h3>
                    <h3 className="mb-0">
                      <i className="fa fa-phone-alt me-2 txt-blue" />
                      {pkg.contact}
                    </h3>
                    <p className="description text-muted"
                      style={{
                        fontSize: "0.8rem",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 1,
                      }}
                    >
                      {pkg.description}
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Link to={`/view/${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                      state={{ id: pkg.id, category: "FoodAndDining"  }}
                      className="btn btn-sm btn-blue px-5" 
                      style={{ borderRadius: "15px" }}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

            {isAdmin && (
              <div className="col-lg-4 col-md-6 wow fadeInUp d-flex align-items-center justify-content-center" data-wow-delay="0.1s">
                <div className="package-item text-center p-5 border" style={{ cursor: "pointer" }} onClick={handleAddNew}>
                  <div className="display-1 text-primary">+</div>
                  <p className="mt-2 mb-0">Add New Entry</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
  <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content" style={{ maxHeight: '80vh', overflow: 'hidden' }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="modal-header">
            <h5 className="modal-title">{formData.id ? "Edit Entry" : "Add Entry"}</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleFormChange} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Location</label>
              <input type="text" className="form-control" name="location" value={formData.location} onChange={handleFormChange} required />
            </div>
            <div className="mb-2 d-flex gap-2">
              <div className="flex-fill">
                <label className="form-label">Opening Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="openingTime"
                  value={convertTo24HourFormat(formData.openingTime || "8:00 AM")} // Convert the opening time to 24-hour format
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="flex-fill">
                <label className="form-label">Closing Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="closingTime"
                  value={convertTo24HourFormat(formData.closingTime || "5:00 AM")} // Convert the closing time to 24-hour format
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">Contact</label>
              <input type="text" className="form-control" name="contact" value={formData.contact} onChange={handleFormChange} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleFormChange} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Image URL</label>
              <input type="text" className="form-control" name="image" value={formData.image} onChange={handleFormChange} required />
            </div>
          </div>
          <div className="modal-footer">
           <button type="submit" className="btn btn-save">Save</button>
            {formData.id && (
              <button type="button" className="btn btn-delete" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
)}


      {showDeleteConfirm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this entry?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodAndDining;