import React from "react";
import "./CommentCard-t.css";

const CommentCardt = ({ commentCount }) => {
  return (
    <>
      <div className="comment-section mt-3">
        <div className="comment-info">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            BÌNH LUẬN & GÓP Ý
          </h1>
          <span className="comment-count">( {commentCount} )</span>
        </div>
        <button className="view-report-btn">Xem chi tiết</button>
      </div>
    </>
  );
};
export default CommentCardt;
