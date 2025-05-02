import React from 'react'

function About() {
  return (
    <div>
        <div className="container-fluid bg-primary py-5 mb-5 hero-header">
    <div className="container py-5">
      <div className="row justify-content-center py-5">
        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
          <h1 className="display-3 text-white animated slideInDown">
            About Us
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              {/* <li className="breadcrumb-item">
                <a href="/Pages">Pages</a>
              </li> */}
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
        
            {/* About Start */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ minHeight: 400 }}
          >
            <div className="position-relative h-100">
              <img
                className="img-fluid position-absolute w-100 h-100"
                src="assets/img/about.jpg"
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h1 className="mb-4">
              About <span className="txt-blue">BUTUAN CITY</span>
            </h1>
            <p className="mb-4">
            Butuan City is a vibrant urban center in the Caraga region of Mindanao, Philippines. 
            Known as the “Home of the Balangay,” it is rich in history and culture, being one of 
            the oldest settlements in the country. Nestled along the Agusan River, Butuan is a growing 
            hub for commerce, education, and tourism in northeastern Mindanao.
            </p>
            <p className="mb-4">
            As the regional center of Caraga, Butuan plays a key role in driving economic and infrastructural 
            development in the area. It blends modern progress with deep cultural roots, offering a unique experience
             for both residents and visitors. Landmarks like the Balangay Shrine Museum, Bood Promontory Eco Park, 
             and festivals such as the Balangay Festival reflect its proud heritage. With its strategic location, 
             welcoming community, and commitment to sustainable growth, Butuan continues to thrive as a dynamic and 
             forward-looking city in Mindanao.
            </p>
            
             
          </div>
        </div>
      </div>
    </div>
    {/* About End */}
    {/* Team Start */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h1 className="mb-5">OFFICIALS</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/RCL.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Engr. Ronnie Vicente C. Lagnada</h5>
                <small>City Mayor</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Fortun.jpg" alt="RCL" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Atty. Lawrence Lemuel H. Fortun</h5>
                <small>City Vice Mayor</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Aquino.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Cong. Jose S. Aquino II</h5>
                <small>Congressman</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Andaya.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
             
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Joseph Omar O. Andaya</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Nortega.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Cromwell P. Nortega</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Desiata.jpg" alt="RCL" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Reynante B. Desiata</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Unay.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Atty. John Gil S. Unay, Sr.</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Busa.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
             
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Cherry May G. Busa</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Sanchez.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Atty. Ehrnest John C. Sanchez</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Rosario.jpg" alt="RCL" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Engr. Vincent Rizal C. Rosario</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Plaza.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Victor Vicente G. Plaza</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Gonzales.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
             
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Dr. Eduardo S. Gonzalez</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Gado.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Arturo P. Gado</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Nalcot.jpg" alt="RCL" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Ferdinand E. Nalcot</h5>
                <small>SP Member</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/Kap Gemma.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                
              </div>
              <div className="text-center p-3">
                <h5 className="mb-0">Gemma P. Tabada</h5>
                <small>SP Member, President Liga ng mga Barangay</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/officials/SK Fed Pres.jpg" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
             
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Joseph Manuel L. Morcilla</h5>
                <small>SP Member, President SK Federation</small>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    {/* Team End */}
    </div>
  )
}

export default About