import BookedTourItem from "@/components/booked-tour-item/BookedTourItem";
import TourItem from "@/components/tour-item/TourItem";
import ReveloLayout from "@/layout/ReveloLayout";

const page = () => {
  return (
    <ReveloLayout>
      <div
        className="bg-info bg-opacity-50"
        style={{ backgroundImage: `url("/assets/images/hero/hero.jpg")`,
            backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat" }}
      >
        <div className="py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      style={{ width: "150px", zIndex: "1" }}
                    />
                  </div>
                </div>
                <div className="p-4 bg-light text-black">
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Bookings</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Comments</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body text-black p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">About You</p>
                </div>
                <div className="card p-4 bg-light text-black rounded-3 pb-100">
                <form className="mb-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="Enter your first name" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Enter your last name" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="birthday" className="form-label fw-semibold">Birthday</label>
                            <input type="date" id="birthday" name="birthday" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                                <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
                                <input type="tel" id="phone" name="phone" className="form-control" placeholder="Enter your phone number" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-dark">Save</button>
                    </div>
                </form>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 pt-50">
                    <p className="lead fw-normal mb-0">Your Booking</p>
                </div>
                  <div className="row">
                    <BookedTourItem />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReveloLayout>
  );
};
export default page;
