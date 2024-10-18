import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css';
const footerPage = () => {
  return (
    <footer>
      <hr />
    <div className="container-fluid">
      <div className="row py-4">

        <div className="col-md-4">
          <h5>Plan for Trips</h5>
          <p>Người bạn đồng hành đáng tin cậy trong mọi hành trình. Với giao diện thân thiện và tính năng thông minh, chúng tôi giúp bạn dễ dàng lên kế hoạch cho những chuyến đi mơ ước, từ tìm kiếm địa điểm, lịch trình đến gợi ý trải nghiệm tuyệt vời. Hãy để Planfortrips mang lại cho bạn những khoảnh khắc đáng nhớ!</p>
        </div>

        <div className="col-md-2 ">
          <h5>Sản phẩm</h5>
          <p>React JS (FE)</p>
          <p>Spring Boot (BE)</p>
          <p>Bootstrap</p>
          <p>SQL Server</p>
        </div>

        <div className="col-md-2">
          <h5>Liên hệ</h5>
          <p>FPT Polytechnic</p>
          <p>planfortrips.296@gmail.com</p>
          <p>+ 84 123 456 789</p>
        </div>

        <div className="col-md-2 text-center">
          <h5>Thành viên</h5>
          <p>Đinh Tăng Đưc Tiến</p>
          <p>Huỳnh Hạo Nam</p>
          <p>Hồ Minh Nhựt</p>
          <p>Đặng Thành Hùng</p>
        </div>

        <div className="col-md-2 text-center ">
          <p>Huỳnh Anh Quân</p>
          <p>Nguyễn Anh Tài</p>
        </div>
      </div>
    </div>

    <hr />
    <div className='text-center'>
      <h6>FPT Polytechnic nhóm 2 dự án Plan For trip</h6>
    </div>
  </footer>
  );
};

export default footerPage;
