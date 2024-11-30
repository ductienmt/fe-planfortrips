import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TourCard.css';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TourCard({ tour }) {
  // Dữ liệu mặc định
  const defaultTour = {
    tourId: 'default-id',
    tourTitle: 'Chưa có tiêu đề',
    tourDes: 'Chưa có mô tả',
    timeCreate: 'Không rõ thời gian',
    image: 'https://img.freepik.com/free-vector/hand-drawn-404-error_23-2147735273.jpg?semt=ais_hybrid',
    admin: {
      image: 'https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-10996.jpg?semt=ais_hybrid',
    },
    author: {
      fullName: 'Quản trị viên',
    },
    tags: ['#mặc_định', '#du_lịch'],
  };

  // Sử dụng dữ liệu mặc định nếu thiếu dữ liệu
  const tourData = {
    ...defaultTour,
    ...tour, // Ghi đè giá trị từ props nếu có
    admin: {
      ...defaultTour.admin,
      ...tour?.admin,
    },
    author: {
      ...defaultTour.author,
      ...tour?.author,
    },
  };

  return (
    <div className="tour-content-data-item col-12 col-md-6 col-lg-4 mb-4">
      <img
        className="c-tour-item-img"
        src={tourData.urlImage}
        alt={tourData.tourTitle}
      />
      <div className="c-tour-item-content">
        <div className="c-content-container d-flex flex-column justify-content-between">
          <div className="c-content-top">
            <div className="c-tour-conent-title">
              <span>{tourData.tourTitle}</span>
            </div>
            <div className="c-tour-content-des">
              <p>{tourData.tourDes.slice(0, 150) + '. . .'}</p>
            </div>
            <div className="c-tour-content-time">
              <FontAwesomeIcon icon={faClock} />
              <span className="ms-1">Tạo lúc <span className='text-success fw-bold fs-6'>{tourData.timeCreate.replace('T', ' ')}</span></span>
            </div>
          </div>

          <div className="c-content-footer">
            <div className="c-content-footer-container d-flex justify-content-between w-100">
              <div className="c-content-footer-left">
                <div className="content-footer-left-container d-flex">
                  <div className="c-content-img me-3">
                    <img
                      src={tourData.admin.image}
                      alt={tourData.admin.fullName}
                    />
                  </div>
                  <div className="c-content-info mt-2">
                    <div className="c-content-info-name">
                      {tourData.admin.fullName}
                    </div>
                    <div className="c-content-info-time">Admin</div>
                    <div className="c-tour-hashtags">
                      {tourData.tags.map((tag, index) => (
                        <span key={index} className="hashtag" title={tag.description}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="c-content-footer-right d-block">
                <Link to={`detail/${tourData.tourId}`} className="btn btn-dark">
                  Xem
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
