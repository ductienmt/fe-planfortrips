import React, { useEffect, useState } from "react";
import "./TripCompo.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Feedback from "../../FeedBack/FeedBack";
import { PlanServiceApi } from "../../../../services/apis/PlanServiceApi";

const TripCompo = ({ trip }) => {
  const [showModal, setShowModal] = useState(false);
  const [planDetail, setPlanDetail] = useState({});
  const [loadingPlanDetail, setLoadingPlanDetail] = useState(false);

  const getStatusDisplay = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return { text: "Chưa bắt đầu", bgColor: "status-not-started" };
      case "IN_PROGRESS":
        return { text: "Đang tiến hành", bgColor: "status-in-progress" };
      case "COMPLETE":
        return { text: "Đã hoàn thành", bgColor: "status-completed" };
      default:
        return { text: "Không xác định", bgColor: "status-unknown" };
    }
  };
  
  console.log(trip);


  const fetchPlanDetail = async () => {    
    setLoadingPlanDetail(true);
    try {
      const resPlanDetail = await PlanServiceApi.getPlanById(trip.plan_id);
      setPlanDetail(resPlanDetail.data);
    } catch (error) {
      console.error("Error fetching plan detail:", error);
    } finally {
      setLoadingPlanDetail(false); 
    }
  };

  const openModal = async () => {
    await fetchPlanDetail();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const convertToVND = (amount) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ`;
  };

  const handleCheckFeedBack = () => {
      closeModal();
  };

  const { text, bgColor } = getStatusDisplay(trip.status);
  const [isFeedBack, setIsFeedBack] = useState({
    hotel: false,
    vehicle: false,
  });

  return (
    <>
      {loadingPlanDetail && (
        <div className="feedback-loading-overlay">
          <div className="feedback-spinner"></div>
        </div>
      )}

      <div className="tripcompo-container-custom">
        <div className="tripcompo-card">
          <div className="card-left">
            <div
              className="head"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <div className="tripcompo-title" style={{ fontSize: "25px" }}>
                {trip.plan_name}
              </div>
              <div className={`tripcompo-status ${bgColor}`}>{text}</div>
              <div className="tripcompo-number">{trip.numberPeople} người</div>
            </div>
            <div className="body" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <div
                className="body-lefy"
                style={{ borderRight: "1px solid #fff", paddingRight: "20px" }}
              >
                <div className="tripcompo-location">
                  {trip.origin_location} <ArrowForwardIcon style={{ fontSize: "15px" }} />{" "}
                  {trip.destination}
                </div>
                <div className="tripcompo-date">
                  Từ {trip.start_date} đến {trip.end_date}
                </div>
              </div>
              <div className="body-right" style={{ paddingLeft: "20px" }}>
                <div>Chi phí: {convertToVND(trip.budget)}</div>
                <div>
                  Còn lại: {convertToVND(trip.budget - trip.final_price)}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center card-right">

      {trip.status != 'COMPLETE' ? <>
            {(trip.isFbHotel && trip.isFbVehicle) ? 
            <>
        <span className="me-2 btn btn btn-success text-nowrap">Đã dánh giá</span>
            </> : 
            <>
            <button
              className="btn btn-primary text-white border p-2 me-3 tripcombo-feedback-btn bookmarkBtn"
              style={{ width: "fit-content", padding: "1rem" }}
              onClick={openModal}
            >
              <span className="IconContainer me-2">
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
              </span>
              <p className="text" style={{ textWrap: "nowrap" }}>
                Đánh giá
              </p>
            </button>
            </>}
      </> : <>
        <button className="me-2 btn btn-outline-light text-nowrap" disabled>Chưa hoàn thành</button>
      </>}

          

            <button className="bookmarkBtn">
              <span className="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
              </span>
              <p className="text">Lưu</p>
            </button>
          </div>
        </div>
      </div>

      {showModal && planDetail && (
        <div
          className="modal-feedback"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
        >
          <div className="show-feedback d-flex">
            <div
              className="d-flex"
              style={{ position: "relative", width: "80vw", height: "100vh", margin: "auto" }}
            >
              <button
                className="show-feedback btn-close text-white fs-4 bg-light"
                onClick={() => handleCheckFeedBack()}
              ></button>

          

              {!trip.isFbHotel &&  <Feedback
                planId={trip.plan_id}
                accountEnterpriseId={planDetail.etp_hotel_id}
                accountEnterpriseName={planDetail.hotel_name}
                nameService={planDetail.rooms}
                typeService="hotel"
              />}

                {!trip.isFbVehicle && <Feedback
                planId={trip.plan_id}
                accountEnterpriseId={planDetail?.vehicle?.etp_company_id}
                accountEnterpriseName={planDetail?.vehicle?.car_company_name}
                nameService={planDetail?.vehicle?.vehicle_name}
                typeService="Xe"
              />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripCompo;
