import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { TourService } from "../../../../services/apis/TourService";
import "./TourDetail.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  Rating,
  CircularProgress,
} from "@mui/material";
import {
  DirectionsBus,
  Schedule,
  LocationOn,
  AttachMoney,
  People,
  StarBorder,
} from "@mui/icons-material";

function TourDetail() {
  const { tourId } = useParams();
  const [tourDetail, setTourDetail] = useState();
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDay, setSelectedDate] = useState(null);
  // Dữ liệu chuyến đi
  const [tripData, settripData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [tourId]);

  const fetchData = async () => {
    try {
      const tourData = await TourService.getTourDetail(tourId);
      setTourDetail(tourData);

      const departureDates = tourData?.tourDataByDates
        ?.map((item) => {
          const departureDate = item?.scheduleDes?.departureTime;
          return departureDate
            ? format(new Date(departureDate), "yyyy-MM-dd")
            : null;
        })
        .filter((date) => date !== null);

      setAvailableDates(departureDates);

      console.log("Available Dates:", departureDates);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  const isDateAvailable = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return availableDates.includes(formattedDate);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % 2);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + 2) % 2);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const selectedDateFormatted = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const indexDateSelect = tourDetail.tourDataByDates.findIndex((data) => {
      const departureDate = new Date(data.scheduleDes.departureTime);
      const departureDateFormatted = `${departureDate.getFullYear()}-${(
        departureDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${departureDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;

      return departureDateFormatted === selectedDateFormatted;
    });

    settripData(tourDetail.tourDataByDates[indexDateSelect]);
  };

  const [dataByDate, setDataByDate] = useState();

  const renderDay = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const isAvailable = isDateAvailable(date);

    return React.cloneElement(dayComponent, {
      style: {
        ...dayComponent.props.style,
        backgroundColor: isAvailable ? "#90ee90" : "#ffcccb",
        color: isAvailable ? "#333" : "#777",
        cursor: isAvailable ? "pointer" : "not-allowed",
      },
      onClick: () => {
        if (isAvailable) {
          setSelectedDate(formattedDate);
        }
      },
    });
  };

  const [showMore, setShowMore] = useState(false);
  const shortDescription = tourDetail?.description.slice(0, 150);

  // Phòng
  const [rooms, setRooms] = useState([]);

  const [messageErrorRoom, setMessageErrorRoom] = useState({
    message: "Vui lòng chọn phòng",
    status: 'Not Selected',
    size : 0
  });

  useEffect(() => {
    effectRoom();
  }, [rooms])

  const effectRoom = () => {
    if (tourDetail) {
      const maxSizeRoom = rooms.reduce((accumulator, room) => {
        return accumulator + room.maxSize
      }, 0);
      if (maxSizeRoom > tourDetail.numberPeople) {
        setMessageErrorRoom({
          message: "Sức chứa hiện tại đang vượt quá số người cần thiết",
          status: "Excessive",
          size : maxSizeRoom
        });
        return;s
      }
      else if (maxSizeRoom == tourDetail.numberPeople) {
        setMessageErrorRoom({
          message: "Tuyệt vời, bạn đã chọn vừa đủ với số lượng người",
          status: "Sufficient",
          size : maxSizeRoom
        });
        return;
      }
      else {
        setMessageErrorRoom({
          message: "Chưa chọn đủ số phòng",
          status: "Not Enough",
          size : maxSizeRoom
        });
        return;
      }
    }
  }

  const handleAddRoom = (rAdd) => {
    setRooms([...rooms, rAdd]);
  }

  const handleRemoveRoom = (rRemove) => {
    const newRooms = rooms.filter(r => r.id != rRemove.id);
    setRooms(newRooms);
  }

  


  // Ghế khởi hành
  const [seatOrigin, setSeatOrigin] = useState([]);

  // Ghế trở về
  const [seatDes, setSeatDes] = useState([])

  const handleAddSeatOrigin = (seat) => {
    if (seatOrigin.some(existingSeat => existingSeat.seatId === seat.seatId)) {
      setSeatOrigin(seatOrigin.filter(existingSeat => existingSeat.seatId !== seat.seatId));
    } else {
      setSeatOrigin([...seatOrigin, seat]);
    }
  };
  
  const handleAddSeatDes = (seat) => {
    if (seatDes.some(existingSeat => existingSeat.seatId === seat.seatId)) {
      setSeatDes(seatDes.filter(existingSeat => existingSeat.seatId !== seat.seatId));
    } else {
      setSeatDes([...seatDes, seat]);
    }
  };

  const [messageErrorSeatDes, setMessageErrorSeatDes] = useState({
    message: "Vui lòng chọn ghế cho chuyến đi",
    status: "Not Selected",
    size: 0
  });
  
  const [messageErrorSeatOrigin, setMessageErrorSeatOrigin] = useState({
    message: "Vui lòng chọn ghế cho chuyến về",
    status: "Not Selected",
    size: 0
  });

  useEffect(() => {
    effectSeats();
  }, [seatDes, seatOrigin]);

  const effectSeats = () => {
    const totalSeatsDes = seatDes.length;
    const totalSeatsOrigin = seatOrigin.length;
    
    if (tourDetail) {
      if (totalSeatsDes > tourDetail.numberPeople) {
        setMessageErrorSeatDes({
          message: "Số ghế đã chọn vượt quá số người cần thiết cho chuyến đi",
          status: "Excessive",
          size: totalSeatsDes
        });
      } else if (totalSeatsDes === tourDetail.numberPeople) {
        setMessageErrorSeatDes({
          message: "Tuyệt vời, bạn đã chọn vừa đủ ghế cho chuyến đi",
          status: "Sufficient",
          size: totalSeatsDes
        });
      } else {
        setMessageErrorSeatDes({
          message: "Chưa chọn đủ số ghế cho chuyến đi",
          status: "Not Enough",
          size: totalSeatsDes
        });
      }
  
      // Kiểm tra ghế cho chuyến về
      if (totalSeatsOrigin > tourDetail.numberPeople) {
        setMessageErrorSeatOrigin({
          message: "Số ghế đã chọn vượt quá số người cần thiết cho chuyến về",
          status: "Excessive",
          size: totalSeatsOrigin
        });
      } else if (totalSeatsOrigin === tourDetail.numberPeople) {
        setMessageErrorSeatOrigin({
          message: "Tuyệt vời, bạn đã chọn vừa đủ ghế cho chuyến về",
          status: "Sufficient",
          size: totalSeatsOrigin
        });
      } else {
        setMessageErrorSeatOrigin({
          message: "Chưa chọn đủ số ghế cho chuyến về",
          status: "Not Enough",
          size: totalSeatsOrigin
        });
      }
    }
  };


  const [messageError, setMessageError] = useState(""); 
useEffect(() => {
 if (tourDetail) {
  checkSeatsAndRooms();
 }
}, [seatOrigin, rooms]);

const checkSeatsAndRooms = () => {
  const selectedSeats = seatOrigin.length;
  const maxSeats = tourDetail.numberPeople;

  const roomSize = rooms.reduce((accumulator, room) => {
    return accumulator + room.maxSize
  }, 0);;
  const maxRooms = tourDetail.numberPeople;

  if (selectedSeats < maxSeats && roomSize < maxRooms) {
    setMessageError("Chưa chọn đủ ghế và phòng.");
  } else if (selectedSeats < maxSeats) {
    setMessageError("Chưa chọn đủ ghế.");
  } else if (roomSize < maxRooms) {
    setMessageError("Chưa chọn đủ phòng.");
  } else {
    setMessageError(""); 
  }
};

const handleSubmit = () => {
  
  if (!messageError) {
      sessionStorage.setItem('tourData', JSON.stringify({
        carCompany : tourDetail.carCompanyResponse,
        seat : {
          seatDes,
          seatOrigin
        },
        scheduleDes : tourDetail.scheduleDes,
        scheduleOrigin : tourDetail.scheduleOrigin,
        room : rooms,
        Hotel : tourDetail.hotelResponse
      }));
      alert("Đặt tour thành công")
  }
};
  


  return (
    <>
      {tourDetail ? (
        <div className="detail-tour-info">
          {/* Header */}
          <div className="detail-tour-header">
            <h2 className="detail-tour-title">{tourDetail.title}</h2>
            <p className="detail-tour-description">
              {showMore ? tourDetail.description : shortDescription}
              {tourDetail.description.length > 150 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="toggle-description-btn"
                >
                  {showMore ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            </p>
          </div>

          {/* Summary */}
          <div className="detail-tour-summary">
            <div className="detail-summary-item text-center">
              <span className="detail-icon">👥</span>
              <span className="detail-text">
                <b>{tourDetail.numberPeople}</b> Người
              </span>
            </div>
            <div className="detail-summary-item">
              <span className="detail-icon">⭐</span>
              <span className="detail-text">{tourDetail.rating} Đánh giá</span>
            </div>
            <div className="detail-summary-item">
              <span className="detail-icon">⏳</span>
              <span className="detail-text">
                {tourDetail.day} ngày {tourDetail.night} đêm
              </span>
            </div>
          </div>

          {/* Car Info */}
          {tourDetail.carCompanyResponse && (
            <div className="detail-car-info">
              <h4 className="detail-section-title">Thông tin Nhà xe</h4>
              <div className="detail-info-item">
                🚍 {tourDetail.carCompanyResponse.carCompanyName}
              </div>
              <div className="detail-info-item">
                Mã: {tourDetail.carCompanyResponse.carCompanyId}
              </div>
            </div>
          )}

          {/* Hotel Info */}
          {tourDetail.hotelResponse && (
            <div className="detail-hotel-info">
              <h4 className="detail-section-title">Thông tin Khách sạn</h4>
              <div className="detail-info-item">
                🏨 {tourDetail.hotelResponse.name}
              </div>
              <div className="detail-info-item">
                📍 {tourDetail.hotelResponse.address}
              </div>
              <div className="detail-info-item">
                📞 {tourDetail.hotelResponse.phoneNumber}
              </div>
              <div className="detail-info-item">
                📜 {tourDetail.hotelResponse.description}
              </div>
              <div className="detail-info-item">
                ⭐ Đánh giá: {tourDetail.hotelResponse.rating}
              </div>
              {tourDetail.hotelResponse.images?.length > 0 && (
                <div className="detail-hotel-images">
                  {tourDetail.hotelResponse.images.map((img, index) => (
                    <img
                      key={`hotel-image-${index}`}
                      className="detail-hotel-image"
                      src={img.url}
                      alt={`Hình ảnh khách sạn ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Calendar */}
          <div className="tour-detail-calendar">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <h4>Lịch hoạt động của tour</h4>
              <DateCalendar
                value={selectedDay}
                onChange={handleDateChange}
                renderDay={renderDay}
                shouldDisableDate={(date) => !isDateAvailable(date)}
              />
            </LocalizationProvider>
          </div>

          <div className="tour-detail-date">

          {tripData && 
           <>
             {/* Chọn phòng */}
             <h4>Select Room</h4>

{/* Status Room */}
  <span
    className={`tour-detail-notification ${messageErrorRoom.status === "Not Selected"
        ? "not-selected"
        : messageErrorRoom.status === "Excessive"
          ? "excessive"
          : messageErrorRoom.status === "Sufficient"
            ? "sufficient"
            : "not-enough"
      }`}
  >
    {messageErrorRoom.message}  
    <span className="fs-4 ms-2 text-danger">{messageErrorRoom.size}</span> /{" "}
    <span className="text-info fs-4 fw-bold">
      {tourDetail?.numberPeople} người
    </span>
  </span>


  <div className="tour-detail-date-room">
    {tripData?.rooms.map((room, index) => (
      <div
        key={room.id}
        className={`tour-detail-room-card d-flex flex-column justify-content-between ${rooms.includes(room) ? 'tour-detail-room-selected' : ''}`}
      >
        <div className="tour-detail-room-card-info">
          <h3 className="tour-detail-room-name">{room.roomName}</h3>
          <p className="tour-detail-room-type">Loại phòng: {room.typeOfRoom}</p>
          <p className="tour-detail-room-price">Giá: {room.price} VND</p>
          <p className="tour-detail-room-rating">Đánh giá: {room.rating}</p>
          <p className="tour-detail-room-max-size">Số người tối đa: {room.maxSize}</p>
          <p className=""><span className="text-info fw-bold">Check In Time:</span> {new Date(room.checkInTime).toISOString().slice(0, 19).replace("T", " ")}</p>
          <p className=""><span className="text-info fw-bold">Check Out Time:</span> {new Date(room.checkOutTime).toISOString().slice(0, 19).replace("T", " ")}</p>
        </div>

        {/* Tiện nghi phòng (chỉ hiển thị tên) */}
        {room.roomAmenities.length > 0 ? (
          <div className="tour-detail-room-amenities">
            <h4>Tiện nghi</h4>
            <ul>
              {room.roomAmenities.map((amenity) => (
                <li key={amenity.id}>{amenity.name}</li>
              ))}
            </ul>
          </div>
        ) : <span className="text-danger">**Không có thông tin về tiện nghi**</span>}

        <div className="tour-detail-room-card-footer mt-4">
          {/* Nút chọn phòng */}
          {rooms.includes(room) ? (
            <button className="btn btn-success w-100" onClick={() => handleRemoveRoom(room)}>Hủy</button>
          ) : <button className="btn btn-outline-success w-100" onClick={() => handleAddRoom(room)}>Chọn phòng</button>}
        </div>

        {/* Lớp phủ nếu phòng đã được chọn */}
        {rooms.includes(room) && (
          <div className="tour-detail-room-overlay">
            <span className="tour-detail-overlay-text">Đã chọn</span>
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Chọn tuyến đi */}



       <Box sx={{ width: "100%", padding: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Chuyến đi</StepLabel>
          </Step>
          <Step>
            <StepLabel>Chuyến về</StepLabel>
          </Step>
        </Stepper>

        <Grid container spacing={3} justifyContent="center">
          {/* Trip Detail Card */}
          <Grid item xs={12} md={5}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  {activeStep === 0 ? "Chuyến đi" : "Chuyến về"}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <LocationOn
                        sx={{
                          verticalAlign: "middle",
                          marginRight: 1,
                        }}
                      />
                      <strong>Lộ trình:</strong>{" "}
                      {activeStep === 0
                        ? tripData.scheduleDes.routeId
                        : tripData.scheduleOrigin.routeId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <DirectionsBus
                        sx={{
                          verticalAlign: "middle",
                          marginRight: 1,
                        }}
                      />
                      <strong>Điểm đi:</strong>{" "}
                      {activeStep === 0
                        ? tripData.scheduleDes.departureName
                        : tripData.scheduleOrigin.departureName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <LocationOn
                        sx={{
                          verticalAlign: "middle",
                          marginRight: 1,
                        }}
                      />
                      <strong>Điểm đến:</strong>{" "}
                      {activeStep === 0
                        ? tripData.scheduleDes.arrivalName
                        : tripData.scheduleOrigin.arrivalName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <Schedule
                        sx={{
                          verticalAlign: "middle",
                          marginRight: 1,
                        }}
                      />
                      <strong>Thời gian khởi hành:</strong>{" "}
                      {activeStep === 0
                        ? new Date(tripData.scheduleDes.departureTime).toLocaleString()
                        : new Date(tripData.scheduleOrigin.departureTime).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <Schedule
                        sx={{
                          verticalAlign: "middle",
                          marginRight: 1,
                        }}
                      />
                      <strong>Thời gian đến:</strong>{" "}
                      {activeStep === 0
                        ? new Date(tripData.scheduleDes.arrivalTime).toLocaleString()
                        : new Date(tripData.scheduleOrigin.arrivalTime).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <AttachMoney
                        sx={{
                          verticalAlign: "middle",
                          marginRight: 1,
                        }}
                      />
                      <strong>Giá vé:</strong>{" "}
                      {activeStep === 0
                        ? tripData.scheduleDes.priceForOneTicket + '.000VND'
                        : tripData.scheduleOrigin.priceForOneTicket + '.000VND'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <People
                        sx={{
                          verticalAlign: "middle",
                          marginRight: 1,
                        }}
                      />
                      <strong>Số ghế trống:</strong>{" "}
                      {activeStep === 0
                        ? tripData.scheduleSeatsDes.length
                        : tripData.scheduleSeatsOrigin.length}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Available Seats */}
          <Grid item xs={12} md={5}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Ghế trống
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={1} justifyContent="center">
                  {activeStep === 0
                    ? <>
                      {tripData.scheduleSeatsDes.map((seat) => (
                      <div item key={seat.seatId} style={{ cursor: 'pointer', marginRight : '10px' }} onClick={() => handleAddSeatDes(seat)}  
                      >
                        <Chip
                          label={seat.seatNumber}
                          onClick={() => handleAddSeatDes(seat)}
                          sx={{ margin: 0.5, borderRadius: '5px', fontSize: '1rem' }}
                          className={seatDes.includes(seat) ? 'tour-detail-seat-active' : ''}
                          disabled={seatDes.length >= tourDetail.numberPeople && !seatOrigin.includes(seat)}
                          
                        />
                      </div>
                    ))}
                    </>
                    : tripData.scheduleSeatsOrigin.map((seat) => (
                      <Grid item key={seat.seatId} 
                      >
                        <Chip
                          label={seat.seatNumber}
                          onClick={() => handleAddSeatOrigin(seat)}
                          sx={{ margin: 0.5, borderRadius: '5px', fontSize: '1rem' }}
                          className={seatOrigin.includes(seat) ? 'tour-detail-seat-active' : ''}
                          disabled={seatOrigin.length >= tourDetail.numberPeople && !seatOrigin.includes(seat)}
                        />
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className="tour-detail-schedule-notification d-flex justify-content-around mt-3">
  {/* Thông báo trạng thái ghế cho chuyến đi */}
  <div className={`seat-status-message ${messageErrorSeatDes.status.toLowerCase()}`}>
    <span>{messageErrorSeatDes.message}</span>
  </div>

  {/* Thông báo trạng thái ghế cho chuyến về */}
  <div className={`seat-status-message ${messageErrorSeatOrigin.status.toLowerCase()}`}>
    <span>{messageErrorSeatOrigin.message}</span>
  </div>
</div>


        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={handleNext}
          >
            {activeStep === 0 ? "Chuyến về" : "Chuyến đi"}
          </Button>
        </Box>
      </Box>
      <div>
      <div>
  <div className="tour-detail-schedule-notification">
    <span>{messageError}</span>
  </div>

  <button
    className="w-100 btn btn-primary fs-4"
    disabled={messageError !== ""} 
    onClick={handleSubmit}
  >
    Đặt tour
  </button>
</div>
</div>
          </>}

          </div>



        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );

}

export default TourDetail;
