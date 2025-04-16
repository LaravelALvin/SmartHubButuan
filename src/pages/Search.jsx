import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../components/Firebase";

const COLLECTIONS = [
  "Education",
  "EmergencyServices",
  "FoodAndDining",
  "GovernmentServices",
  "HotelAndLodging",
  "MedicalServices",
  "PublicTransportation"
];

function Search() {
  const [keyword, setKeyword] = useState(""); // For capturing search input
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    duration: "",
    contact: "",
    description: "",
    image: ""
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // For delete confirmation

  useEffect(() => {
    const checkLogin = sessionStorage.getItem("adminLoggedIn") === "true";
    setIsAdmin(checkLogin);

    const fetchAllCollections = async () => {
      try {
        setLoading(true); // Show loading indicator
        const allResults = [];

        for (const colName of COLLECTIONS) {
          const snapshot = await getDocs(collection(db, colName));

          const filteredDocs = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
              collection: colName,
            }))
            .filter((doc) => {
              const name = (doc.Name || "").toLowerCase();
              const description = (doc.description || "").toLowerCase();
              return name.includes(keyword.toLowerCase()) || description.includes(keyword.toLowerCase());
            });

          allResults.push(...filteredDocs);
        }

        setResults(allResults); // Set the final results to state
        setLoading(false); // Hide loading after fetching
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    if (keyword) {
      fetchAllCollections(); // Fetch data when a keyword is typed
    } else {
      setResults([]); // Clear results when there's no keyword
    }
  }, [keyword]);

  const handleEdit = (item) => {
    setFormData(item);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      id: "",
      name: "",
      location: "",
      duration: "",
      contact: "",
      description: "",
      image: ""
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (formData.id) {
        const { id, ...updateData } = formData;
        await updateDoc(doc(db, formData.collection, id), updateData);
        console.log("Item updated:", id);
      } else {
        const newRef = doc(collection(db, formData.collection));
        const { id, ...newData } = formData;
        await setDoc(newRef, newData);
        console.log("New item added.");
      }
      window.location.reload(); // Refresh the page to reflect changes
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, formData.collection, formData.id));
      console.log("Item deleted:", formData.id);
      window.location.reload(); // Refresh the page to reflect changes
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
    setShowDeleteConfirm(false); // Close the confirmation modal
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false); // Close the confirmation modal without deleting
  };

  return (
    <div>
      {/* Banner */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Discover
                <br />
                <span className="txt-heading">Our Amazing City</span>
              </h1>
              <p className="fs-4 text-white mb-4 animated slideInDown">
                Find great places to stay, food, shop, & visit from local experts
              </p>
              <div className="position-relative w-75 mx-auto animated slideInDown">
                <input
                  className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Eg: Shopping"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)} // Update keyword
                />
                <button
                  type="button"
                  className="btn btn-blue rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                  style={{ marginTop: 7 }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>} {/* Loading indicator */}

      {/* Cards */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {results.length > 0 ? (
              results.map((pkg, index) => (
                <div key={pkg.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`}>
                  <div className="package-item d-flex flex-column">
                    <div className="overflow-hidden position-relative" style={{ height: "250px" }}>
                      <img
                        className="img-fluid w-100 h-100"
                        src={pkg.image || "assets/img/restaurant-2.jpg"}
                        alt={pkg.location}
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                      {isAdmin && (
                        <button onClick={() => handleEdit(pkg)} className="btn btn-sm btn-warning position-absolute top-0 end-0 m-2">
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="d-flex border-bottom">
                      <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt text-primary me-2" />{pkg.location}</small>
                      <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2" />{pkg.duration}</small>
                    </div>
                    <div className="text-center p-4 flex-grow-1">
                      <h3 className="mb-0">{pkg.Name}</h3>
                      <h3 className="mb-0">{pkg.contact}</h3>
                      <p className="description" style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden"
                      }}>
                        {pkg.description}
                      </p>
                      <div className="d-flex justify-content-center mb-2">
                        <a href="#" className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: "30px 0 0 30px" }}>Read More</a>
                        <a href="#" className="btn btn-sm btn-primary px-3" style={{ borderRadius: "0 30px 30px 0" }}>Book Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}

            {}
          </div>
        </div>
      </div>

      {/* Modal Popup for Editing */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">{formData.id ? "Edit Entry" : "Add Entry"}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  {["Name", "location", "duration", "contact", "description", "image"].map((field) => (
                    <div className="mb-2" key={field}>
                      <label className="form-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={formData[field]}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  {formData.id && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
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

export default Search;
