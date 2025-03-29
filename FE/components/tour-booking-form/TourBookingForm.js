import Link from 'next/link';

const TourBookingForm = () => {
  return (
    <div
      className="widget widget-booking"
      data-aos="fade-up"
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <h5 className="widget-title">Tour Booking</h5>
      <form action="#">
        <div className="date mb-25">
          <b>From Date</b>
          <input type="date" />
        </div>
        <hr />
        <h6>Tickets:</h6>
        <ul className="tickets clearfix">
          <li>
            Adult (18- years) <span className="price">$28.50</span>
            <select name="18-" id="18-">
              <option value="value1">01</option>
              <option value="value1">02</option>
              <option value="value1" selected="">
                03
              </option>
            </select>
          </li>
          <li>
            Adult (18+ years) <span className="price">$50.40</span>
            <select name="18+" id="18+">
              <option value="value1">01</option>
              <option value="value1">02</option>
              <option value="value1">03</option>
            </select>
          </li>
        </ul>
        <hr className="mb-25" />
        <h6>
          Total: <span className="price">$74</span>
        </h6>
        <button type="submit" className="theme-btn style-two w-100 mt-15 mb-5">
          <span data-hover="Book Now">Book Now</span>
          <i className="fal fa-arrow-right" />
        </button>
        <div className="text-center">
          <Link href="contact">Need some help?</Link>
        </div>
      </form>
    </div>
  );
};

export default TourBookingForm;