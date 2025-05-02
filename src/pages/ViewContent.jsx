import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firebase";

function ViewContent() {
  const [entry, setEntry] = useState(null);
  const location = useLocation();
  const { id, category } = location.state || {};  // Get both `id` and `category`

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const docRef = doc(db, category, id); // Dynamically use category
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEntry(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (id && category) {
      fetchEntry();
    }
  }, [id, category]);

  if (!entry) return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 d-flex align-items-center">
          <div className="me-4">
            <div className="skeleton-image mb-3"></div>
          </div>
          <div className="flex-grow-1">
            <div className="skeleton-text skeleton-title mb-3"></div>
            <div className="skeleton-text mb-2" style={{ width: "80%" }}></div>
            <div className="skeleton-text mb-2" style={{ width: "60%" }}></div>
            <div className="skeleton-text mb-2" style={{ width: "70%" }}></div>
            <div className="skeleton-text mb-2" style={{ width: "50%" }}></div>
            <div className="skeleton-text mb-2" style={{ width: "90%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-primary py-1 mb-5 hero-header">
        <div className="container py-1">
          <div className="row justify-content-center py-1">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-5 text-white animated slideInDown">
                {category.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item">
                    <a href={`/${category.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`}>
                    {category.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </a>
                  </li>
                  <li className="breadcrumb-item text-white active" aria-current="page">
                    {entry.name}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
  
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 d-flex align-items-center">
            <div className="image-container me-4">
              <img
                src={entry.image || "assets/img/restaurant-2.jpg"}
                alt={entry.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="details-container">
              <h2 className="mb-3">{entry.name}</h2>
              <p><strong>Location:</strong> {entry.location}</p>
              <p><strong>Contact:</strong> {entry.contact}</p>
              <p><strong>Operating Hours:</strong> {entry.openingTime} - {entry.closingTime}</p>
              <p><strong>Price Range:</strong> {entry.price}</p>
              <p><strong>Description:</strong></p>
              <p>{entry.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewContent;
