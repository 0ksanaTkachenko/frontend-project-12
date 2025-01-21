function MainCard({ children, img, cardFooter = null }) {
  return (
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
}

export const scroll = (direction, containerRef, behavior = 'smooth') => {
  if (containerRef.current) {
    const scrollTop =
      direction === 'top' ? 0 : containerRef.current.scrollHeight;
    containerRef.current.scrollTo({
      top: scrollTop,
      behavior,
    });
  }
};

export default MainCard;
