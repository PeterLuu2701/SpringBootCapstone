import Link from "next/link";

const ClientsComments = () => {
  return (
    <>
      <div className="comments mt-30 mb-60">
        <div
          className="comment-body"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="author-thumb">
            <img src="assets/images/blog/comment-author1.jpg" alt="Author" />
          </div>
          <div className="content">
            <h6>Lonnie B. Horwitz</h6>
            <div className="ratting">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
            </div>
            <span className="time">
              Venice, Rome and Milan – 9 Days 8 Nights
            </span>
            <p>
              Tours and travels play a crucial role in enriching lives by
              offering unique experiences, cultural exchanges, and the joy of
              exploration.
            </p>
            <a className="read-more" href="#">
              Reply <i className="far fa-angle-right" />
            </a>
          </div>
        </div>
        <div
          className="comment-body comment-child"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="author-thumb">
            <img src="assets/images/blog/comment-author2.jpg" alt="Author" />
          </div>
          <div className="content">
            <h6>William G. Edwards</h6>
            <div className="ratting">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
            </div>
            <span className="time">
              Venice, Rome and Milan – 9 Days 8 Nights
            </span>
            <p>
              Tours and travels play a crucial role in enriching lives by
              offering unique experiences, cultural exchanges, and the joy of
              exploration.
            </p>
            <a className="read-more" href="#">
              Reply <i className="far fa-angle-right" />
            </a>
          </div>
        </div>
        <div
          className="comment-body"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="author-thumb">
            <img src="assets/images/blog/comment-author3.jpg" alt="Author" />
          </div>
          <div className="content">
            <h6>Jaime B. Wilson</h6>
            <div className="ratting">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
            </div>
            <span className="time">
              Venice, Rome and Milan – 9 Days 8 Nights
            </span>
            <p>
              Tours and travels play a crucial role in enriching lives by
              offering unique experiences, cultural exchanges, and the joy of
              exploration.
            </p>
            <a className="read-more" href="#">
              Reply <i className="far fa-angle-right" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsComments;