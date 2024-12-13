import "./PersonReview.css";
// import person_avt from "../../../../assets/beach.jpg";
import { Star } from "../../../../admin/pages/Components/Star";

const PersonReview = ({ feedback }) => {
  const convertDate = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };
  return (
    <>
      <div className="person-review mb-3 rounded border p-2">
        <div className="person-avatar" style={{ flexGrow: 1 }}>
          <img
            src="https://s3-alpha-sig.figma.com/img/4f64/ea2e/a69de299a3042be1d84c27afb74eb82b?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Oj~WiAXeNVjoZ2UXiIYUucnHH4zU8mxtH~59hyvrjYTEg6bLITciOfDhV4eRpgpSlJobI6Nsq-45F9MYtW5IkJQFVaqp0IsD5qLx81BOFGsYOGPk5lQOhl5NY5A~SuwA3GAG3OJEid80Cb4ytskhwNU-El5UauC52G7tXzFG12S1~E9-GaBCGeDbXsQqi75dcCA9yLNe3EOMtExmm~n2el5hRYkJfNzE5yToJF9bbN3QlsYLPtLX7JDeKOW1gxMD~DJP4zHW6nz2HmOTekql8iYQbeMMOLLtzVCyx65CJGeA09-e4sJ5chIGmKQttB7ZmFpXlJgIOyVd0Pn3lGRbjw__"
            alt="person-avatar"
            style={{ width: "100px", height: "90px" }}
          />
        </div>
        <div
          className="person-info ms-5 me-4 "
          style={{
            flexGrow: 8,
            maxWidth: "800px",
            maxHeight: "150px",
            wordWrap: "break-word", 
            whiteSpace: "pre-wrap", 
          }}
        >
          <h5>
            {feedback?.userName} <Star rating={feedback?.rating} />
          </h5>
          <p>{feedback?.content}</p>
        </div>
        <div className="review-rating" style={{ flexGrow: 1 }}>
          <h5>{feedback?.typeEnterpriseName}</h5>
          <span>
            <p>{convertDate(feedback?.createdAt)}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default PersonReview;
