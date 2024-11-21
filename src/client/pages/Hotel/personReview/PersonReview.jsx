import "./PersonReview.css";
// import person_avt from "../../../assets/img/person-review-avt.jpg";

const PersonReview = () => {
  return (
    <>
      <div className="person-review mb-3">
        <div className="person-avatar" style={{ flexGrow: 1 }}>
          <img
            src={person_avt}
            alt="person-avatar"
            style={{ width: "100px" }}
          />
        </div>
        <div className="person-info ms-5 me-4" style={{ flexGrow: 8 }}>
          <h5>
            John Doe | <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </h5>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            similique debitis facilis, deleniti nostrum aperiam molestias
            repellendus exercitationem fugit ipsam sint? Temporibus hic
            distinctio consequuntur fugiat rem. Hic, illum voluptatibus. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Magni earum iste
            illum id quam repudiandae ducimus reprehenderit animi ut ipsam.
          </p>
        </div>
        <div className="review-rating" style={{ flexGrow: 1 }}>
          <i className="fa-solid fa-flag"></i>
        </div>
      </div>
    </>
  );
};

export default PersonReview;
