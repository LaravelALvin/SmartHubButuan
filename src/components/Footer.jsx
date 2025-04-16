import React from 'react'

export default function Footer() {
  return (
    <div>
           {/* Footer Start */}
    <div
      className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
    
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
                <a href="/">Home</a>
                <a href="/">Cookies</a>
                <a href="/">Help</a>
                <a href="/">FQAs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
    </div>
  )
}
