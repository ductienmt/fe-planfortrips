import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TourCard.css'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function TourCard({tour}) {
    return ( 

        <div className="tour-content-data-item col-12 col-md-6 col-lg-4 mb-4">
        <img
          className="c-tour-item-img"
          src={tour.image}
          alt={tour.title}
        />
        <div className="c-tour-item-content">
          <div className="c-content-container d-flex flex-column justify-content-between">
            <div className="c-content-top">
              <div className="c-tour-conent-title">
                <span>{tour.title}</span>
              </div>
              <div className="c-tour-content-des">
                <p>{tour.description}</p>
              </div>
              <div className="c-tour-content-time">
                <FontAwesomeIcon icon={faClock} />
                <span className="ms-1">{tour.date}</span>
              </div>
            </div>
  
            <div className="c-content-footer">
              <div className="c-content-footer-container d-flex justify-content-between w-100">
                <div className="c-content-footer-left">
                  <div className="content-footer-left-container d-flex">
                    <div className="c-content-img me-3">
                      <img src={tour.author.image} alt={tour.author.name} />
                    </div>
                    <div className="c-content-info mt-2">
                      <div className="c-content-info-name">
                        {tour.author.name}
                      </div>
                      <div className="c-content-info-time">
                        {tour.author.role}
                      </div>
                      <div className="c-tour-hashtags">
                        {tour.hashtags.map((hashtag, index) => (
                          <span key={index} className="hashtag">
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="c-content-footer-right d-block">
                  <Link to={`detail/${tour.id}`} className="btn btn-dark">Xem</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
     );
}

export default TourCard;