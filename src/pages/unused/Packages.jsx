import React from "react";

function Packages() {
  const packagesData = [
    {
      image: "assets/img/package-1.jpg",
      location: "Thailand",
      duration: "3 days",
      people: "2 Person",
      price: "$149.00",
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos"
    },
    {
      image: "assets/img/package-2.jpg",
      location: "Indonesia",
      duration: "3 days",
      people: "2 Person",
      price: "$139.00",
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos"
    },
    {
      image: "assets/img/package-3.jpg",
      location: "Malaysia",
      duration: "3 days",
      people: "2 Person",
      price: "$18asd9.00",
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos"
    }
  ];

  return (
    <div>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Packages
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Packages
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Package Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-5">Awesome Packages</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {packagesData.map((pkg, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`${0.1 + index * 0.2}s`}
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={pkg.image}
                      alt={pkg.location}
                    />
                  </div>
                  <div className="d-flex border-bottom">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-map-marker-alt text-primary me-2" />
                      {pkg.location}
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-calendar-alt text-primary me-2" />
                      {pkg.duration}
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-user text-primary me-2" />
                      {pkg.people}
                    </small>
                  </div>
                  <div className="text-center p-4">
                    <h3 className="mb-0">{pkg.price}</h3>
                    <div className="mb-3">
                      {[...Array(5)].map((_, starIdx) => (
                        <small
                          key={starIdx}
                          className="fa fa-star text-primary"
                        />
                      ))}
                    </div>
                    <p>{pkg.description}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <a
                        href="#"
                        className="btn btn-sm btn-primary px-3 border-end"
                        style={{ borderRadius: "30px 0 0 30px" }}
                      >
                        Read More
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-primary px-3"
                        style={{ borderRadius: "0 30px 30px 0" }}
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Package End */}
    </div>
  );
}

export default Packages;
