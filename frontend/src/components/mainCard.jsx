const MainCard = ({ children, img, cardFooter = null }) => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img src={img} className="rounded-circle" alt="avatarImg" />
            </div>
            <div className="col-md-6">
              <div className="card-body">{children}</div>
            </div>
          </div>
          {cardFooter}
        </div>
      </div>
    </div>
  </div>
);

export default MainCard;
