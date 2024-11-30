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

      // Kiểm tra lại dữ liệu ngày để đảm bảo nó được tải đúng
      console.log("Available Dates:", departureDates);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  const isDateAvailable = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return availableDates.includes(formattedDate);
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
        backgroundColor: isAvailable ? "#4caf50" : "#f44336",
        color: isAvailable ? "#fff" : "#000",
        cursor: isAvailable ? "pointer" : "not-allowed",
      },
      onClick: () => {
        if (isAvailable) {
          setSelectedDate(formattedDate);
        }
      },
    });
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % 2);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + 2) % 2);
  };

  const [showMore, setShowMore] = useState(false);
  const shortDescription = tourDetail?.description.slice(0, 150);

  const [bookTour, setBookTour] = useState({
    room: [],
    seatsOrigin: [],
    seatDes: [],
  });

  const handleRoomClick = (room) => {
    setBookTour((prev) => ({
      ...prev,
      room: [...prev.room, room], 
    }));
  };
  
  const handleAddSeatDes = (seat) => {
    setBookTour((prev) => ({
      ...prev,
      seatDes: [...prev.seatDes, seat], 
    }));
  };
  
  const handleAddSeatOrigin = (seat) => {
    setBookTour((prev) => ({
      ...prev,
      seatsOrigin: [...prev.seatsOrigin, seat],
    }));
  };
  
  
  
  
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      {tourDetail ? (
        <div className="detail-tour-info">
          <div className="detail-tour-header">
            <h2 className="detail-tour-title">{tourDetail.title}</h2>
            <p className="detail-tour-description">
              {showMore ? tourDetail.description : shortDescription}
              {tourDetail.description.length > 150 && !showMore && (
                <button
                  onClick={() => setShowMore(true)}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                    outline: "none",
                    backgroundColor: "#00c6ff",
                    border: "none",
                  }}
                >
                  Xem thêm
                </button>
              )}
              {showMore && (
                <button
                  onClick={() => setShowMore(false)}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Thu gọn
                </button>
              )}
            </p>
          </div>

          <div className="detail-tour-summary">
            <div className="detail-summary-item text-center">
              <div className="" style={{ margin: "auto" }}>
                <span className="detail-icon">👥</span>
                <span className="detail-text">
                  <b>{tourDetail.numberPeople}</b> Người
                </span>
              </div>
            </div>
            <div className="detail-summary-item">
              <div className="" style={{ margin: "auto" }}>
                <span className="detail-icon">⭐</span>
                <span className="detail-text">
                  {tourDetail.rating} Đánh giá
                </span>
              </div>
            </div>
            <div className="detail-summary-item">
              <div className="" style={{ margin: "auto" }}>
                <span className="detail-icon">⏳</span>
                <span className="detail-text">
                  {tourDetail.day} ngày {tourDetail.night} đêm
                </span>
              </div>
            </div>
          </div>

          {/* Thông tin Nhà xe */}
          <div className="detail-car-info">
            <h4 className="detail-section-title">Thông tin Nhà xe</h4>
            <div className="detail-info-item">
              🚍 {tourDetail.carCompanyResponse.carCompanyName}
            </div>
            <div className="detail-info-item">
              Mã: {tourDetail.carCompanyResponse.carCompanyId}
            </div>
          </div>

          {/* Thông tin Khách sạn */}
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

            {tourDetail.hotelResponse.images.length > 0 && (
              <div className="detail-hotel-images">
                {tourDetail.hotelResponse.images.map((img, index) => (
                  <img
                    key={index}
                    className="detail-hotel-image"
                    src={img.url}
                    alt={`Hình ảnh khách sạn ${index}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Lịch chọn ngày */}
          <div className="tour-detail-calendar bg-info">
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

          {/* {JSON.stringify(tripData)} */}
          {tripData == null ? (
            <p>...</p>
          ) : (
            <>
              <Box sx={{ padding: 3 }}>
                {/* Rooms List */}
                <Grid container spacing={3} justifyContent="center">
                  {tripData.rooms.map((room) => (
                    <Grid item xs={12} sm={6} md={4} key={room.id}>
                      <Card className={bookTour.room.includes(room) ? 'room-active' : 'tour-card-hover'}
                        sx={{
                          boxShadow: 3,
                          borderRadius: 2,
                          padding: 2,
                          height: "20rerm",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRoomClick(room)}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            Phòng {room.roomName}
                          </Typography>
                          <Divider sx={{ marginBottom: 2 }} />

                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Loại phòng:</strong> {room.typeOfRoom}
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Giá:</strong> {room.price} VND
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Chỗ ở tối đa:</strong> {room.maxSize} người
                          </Typography>
                          <Typography
                            variant="body1"
                            color={room.available ? "green" : "red"}
                            sx={{ marginBottom: 2 }}
                          >
                            <strong>Trạng thái:</strong>{" "}
                            {room.available ? "Có sẵn" : "Hết phòng"}
                          </Typography>

                          {room.rating > 0 ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 1,
                              }}
                            >
                              <Rating
                                value={room.rating}
                                readOnly
                                sx={{ marginRight: 1 }}
                              />
                              <Typography variant="body2" sx={{ fontSize: 14 }}>
                                {room.rating} / 5
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: 14 }}>
                              Chưa có đánh giá
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Trip Details Stepper */}
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
                              ? tripData.scheduleSeatsDes.map((seat) => (
                                <Grid item key={seat.seatId} style={{ cursor: 'pointer' }} onClick={() => handleSeatClick(seat)}
                                  className={bookTour.seatDes.some(selectedSeat => selectedSeat.seatId === seat.seatId) ? 'seat-active' : ''}
                                >
                                  <Chip
                                    label={seat.seatNumber}
                                    color="primary"
                                    onClick={() => handleAddSeatDes(seat)}
                                    sx={{ margin: 0.5 }}
                                  />
                                </Grid>
                              ))
                              : tripData.scheduleSeatsOrigin.map((seat) => (
                                <Grid item key={seat.seatId} 
                                className={bookTour.seatsOrigin.includes(seat) ? 'seat-active' : ''}
                                >
                                  <Chip
                                    label={seat.seatNumber}
                                    onClick={() => handleAddSeatOrigin(seat)}
                                    sx={{ margin: 0.5 }}
                                  />
                                </Grid>
                              ))}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

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
              </Box>
            </>
          )}
          <>
            <div>
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn btn-outline-success w-100 fw-bold fs-4"
                onClick={toggleModal}
              >
                Đặt tour
              </button>

              {/* Modal */}
              {isModalOpen && (
                <div
                  className="modal fade show"
                  style={{ display: "block" }}
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Danh sách đã chọn
                        </h5>
                      </div>
                      <div className="modal-body">
                        <Box sx={{ marginTop: 3 }}>
                          <Typography variant="h6">Phòng đã chọn:</Typography>
                          {bookTour.room.length > 0 ? (
                            bookTour.room.map((selectedRoom, index) => (
                              <Typography key={index} variant="body1">
                                - {selectedRoom.roomName}: {selectedRoom.price} VND
                              </Typography>
                            ))
                          ) : (
                            <Typography variant="body2">Chưa chọn phòng nào.</Typography>
                          )}

                          <Typography variant="h6" sx={{ marginTop: 2 }}>Ghế đã chọn:</Typography>
                          {bookTour.seatsOrigin.length > 0 || bookTour.seatDes.length > 0 ? (
                            <>
                              {bookTour.seatsOrigin.length > 0 && (
                                <>
                                  <Typography variant="body1">Ghế khởi hành (Đi từ điểm khởi hành):</Typography>
                                  {bookTour.seatsOrigin.map((seat, index) => (
                                    <Typography key={index} variant="body1">
                                      - Ghế {seat.seatNumber}
                                    </Typography>
                                  ))}
                                </>
                              )}
                              {bookTour.seatDes.length > 0 && (
                                <>
                                  <Typography variant="body1" sx={{ marginTop: 1 }}>Ghế điểm đến (Đi đến điểm đến):</Typography>
                                  {bookTour.seatDes.map((seat, index) => (
                                    <Typography key={index} variant="body1">
                                      - Ghế {seat.seatNumber}
                                    </Typography>
                                  ))}
                                </>
                              )}
                            </>
                          ) : (
                            <Typography variant="body2">Chưa chọn ghế nào.</Typography>
                          )}
                        </Box>


                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={toggleModal}
                        >
                          Hủy
                        </button>
                        <button type="button" className="btn btn-primary">
                          Đồng ý và thanh toán
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default TourDetail;
