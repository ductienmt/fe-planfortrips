import { useCallback, useEffect, useState } from "react";
import "./AccommodationCard.css";
import { HotelService } from "../../../services/apis/HotelService";
import imghotel from "../../../assets/beach.jpg";
import HotelCard from "../Hotel/card/hotelCard";
import RoomCard from "./roomCard/RoomCard";
import { convertToVND, convertToVNDDB } from "../../../utils/FormatMoney";
import { RoomService } from "../../../services/apis/RoomService";
import { debounce } from "lodash";
import Loader from "../../../client/Components/Loading";
import { enqueueSnackbar } from "notistack";

function AccommodationCard({
  className,
  onClick,
  accomodation,
  destination,
  numberPeople,
  loadAgain,
}) {
  const [loading, setLoading] = useState(false);
  const [hotelImage1, setHotelImage1] = useState("");
  const [hotelImage2, setHotelImage2] = useState("");
  const [hotelImage3, setHotelImage3] = useState("");
  const [hotelAmentities, setHotelAmentities] = useState([]);
  // console.log(accomodation);

  const [selectedRooms, setSelectedRooms] = useState([]); // Lưu danh sách phòng được chọn

  // const handleSelectRoom = (room) => {
  //   const totalPeople = selectedRooms.reduce(
  //     (total, room) => total + room.quantity * room.maxSize,
  //     0
  //   );

  //   // Kiểm tra số lượng người có hợp lý không
  //   const newTotalPeople = totalPeople + room.maxSize;

  //   if (newTotalPeople <= numberPeople) {
  //     setSelectedRooms((prevRooms) => {
  //       const existingRoom = prevRooms.find((r) => r.id === room.id);

  //       if (existingRoom) {
  //         // Nếu phòng đã tồn tại, tăng số lượng
  //         return prevRooms.map((r) =>
  //           r.id === room.id
  //             ? { ...r, quantity: Math.min(r.quantity + 1, room.maxSize) }
  //             : r
  //         );
  //       } else {
  //         // Nếu phòng chưa tồn tại, thêm mới với số lượng 1
  //         return [...prevRooms, { ...room, quantity: 1 }];
  //       }
  //     });
  //     setShowCard(true); // Hiển thị thẻ chi tiết phòng
  //   } else {
  //     enqueueSnackbar("Số lượng phòng đã đạt giới hạn", {
  //       variant: "error",
  //       autoHideDuration: 1000,
  //     });
  //   }
  // };

  const handleSelectRoom = (room) => {
    // Kiểm tra nếu maxSize của phòng lớn hơn số người, không cho phép đặt
    if (room.maxSize > numberPeople + 1) {
      enqueueSnackbar("Không thể đặt phòng có sức chứa vượt quá số người", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return;
    }

    const totalPeople = selectedRooms.reduce(
      (total, room) => total + room.quantity * room.maxSize,
      0
    );

    // Kiểm tra số lượng người có hợp lý không
    const newTotalPeople = totalPeople + room.maxSize;

    if (newTotalPeople <= numberPeople + 1) {
      setSelectedRooms((prevRooms) => {
        const existingRoom = prevRooms.find((r) => r.id === room.id);

        if (existingRoom) {
          // Nếu phòng đã tồn tại, tăng số lượng
          enqueueSnackbar("Bạn đã đặt phòng này rùi mò bạn ui", {
            variant: "warning",
            autoHideDuration: 3000,
          });
          return prevRooms;
        } else {
          // Nếu phòng chưa tồn tại, thêm mới với số lượng 1
          return [...prevRooms, { ...room, quantity: 1 }];
        }
      });
      setShowCard(true); // Hiển thị thẻ chi tiết phòng
    } else {
      enqueueSnackbar("Phòng đáp ứng đủ ùi ó, không cần đặt thêm âu", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    }
  };

  // const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  // const [selectedRoomToRemove, setSelectedRoomToRemove] = useState(null);

  const [showCard, setShowCard] = useState(false); // Quản lý trạng thái hiển thị card

  const loadHotelImages = useCallback(
    debounce(async () => {
      try {
        const response = await HotelService.findHotelById(accomodation.hotelId);
        const images = response.images;
        setHotelAmentities(response.hotelAmenities);

        if (images.length > 0) {
          const selectedIndices = new Set();

          while (
            selectedIndices.size < 3 &&
            selectedIndices.size < images.length
          ) {
            const randomIndex = Math.floor(Math.random() * images.length);
            selectedIndices.add(randomIndex);
          }

          const indicesArray = Array.from(selectedIndices);

          setHotelImage1(images[indicesArray[0]]?.url);
          setHotelImage2(images[indicesArray[1]]?.url);
          setHotelImage3(images[indicesArray[2]]?.url);
        }
      } catch (error) {
        console.error("Error fetching hotel images:", error);
      }
    }, 300),
    [accomodation.hotelId]
  );

  const [hotelChangeData, setHotelChangeData] = useState([]);

  const loadHotelChangeData = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        const response = await HotelService.getHotelSamePrice(
          accomodation.rooms[0]?.price_per_night / 1000,
          destination
        );
        setHotelChangeData(response);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [accomodation.price_per_night, destination]
  );

  const [rooms, setRooms] = useState([]);

  const loadRooms = useCallback(
    debounce(
      async (id, pageNo = 0, pageSize = 5, sortBy = null, sortType = null) => {
        try {
          setLoading(true);
          const response = await RoomService.getRoomsByHotelId(
            id,
            accomodation.rooms[0].checkin,
            accomodation.rooms[0].checkout,
            pageNo,
            pageSize
          );
          setRooms(response.content);
        } catch (error) {
          console.error("Error fetching room data", error);
        } finally {
          setLoading(false);
        }
      },
      300
    ),
    [accomodation.rooms]
  );

  const [hotelIdChange, setHotelIdChange] = useState("");

  const handleChangeRoom = async () => {
    try {
      let tripData = JSON.parse(sessionStorage.getItem("tripData"));
      const budget = tripData.userData?.budget;
      const oldTotalPrice = tripData.accomodation.total;
      // console.log(tripData);

      const roomInSelect = selectedRooms.map((room) => ({
        id: room.id,
        nameRoom: room.roomName,
        roomSize: room.maxSize,
        roomType: room.typeOfRoom,
        price_per_night: room.price * 1000,
        checkin: accomodation.rooms[0].checkin,
        checkout: accomodation.rooms[0].checkout,
      }));

      const totalPrice = roomInSelect.reduce(
        (total, room) => total + room.price_per_night,
        0
      );
      const totalPeople = selectedRooms.reduce(
        (total, room) => total + room.maxSize,
        0
      );

      if (totalPeople < numberPeople) {
        enqueueSnackbar(
          `Bạn đặt thiếu phòng rồi cần chổ cho ${numberPeople - totalPeople} bạn nữa nè !`,
          {
            variant: "warning",
            autoHideDuration: 3000,
          }
        );
      } else {
        const response = await HotelService.findHotelById(hotelIdChange);
        // console.log(response);
        // console.log(selectedRooms);
        const newDataToSet = {
          hotelId: hotelIdChange,
          nameHotel: response.name,
          total:
            totalPrice *
            calculateNights(
              accomodation.rooms[0].checkin,
              accomodation.rooms[0].checkout
            ),
          rooms: roomInSelect,
        };
        tripData.accomodation = {
          ...tripData.accomodation,
          ...newDataToSet,
        };
        const newEstimatedCost =
          tripData.estimatedCost - oldTotalPrice + newDataToSet.total;
        if (newEstimatedCost <= budget) {
          tripData.estimatedCost = newEstimatedCost;
          sessionStorage.setItem("tripData", JSON.stringify(tripData));
          enqueueSnackbar("Đặt phòng thành công", {
            variant: "success",
            autoHideDuration: 1000,
            onExit: () => {
              setSelectedRooms([]);
              setShowCard(false);
              document.getElementById("closeChooseRooms").click();
              loadAgain();
            },
          });
        } else {
          enqueueSnackbar(
            "Bạn không đủ chí phí để phông bạt âu, hãy chọn phòng/khách sạn khác nè !",
            {
              variant: "error",
              autoHideDuration: 3000,
            }
          );
        }
      }
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  const calculateNights = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const nights = timeDifference / (1000 * 3600 * 24);

    return nights <= 0 ? 0 : nights;
  };

  useEffect(() => {
    // console.log(accomodation.hotelId);
    // console.log(accomodation);

    loadHotelImages();
    // console.log(hotelAmentities);
  }, [accomodation.hotelId]);

  return (
    <>
      <article className={`accommodation-card ${className}`} onClick={onClick}>
        <div className="image-gallery">
          <img
            src={hotelImage1}
            alt="Accommodation view 1"
            className="gallery-image"
            loading="lazy"
          />
          <img
            src={hotelImage2}
            alt="Accommodation view 2"
            className="gallery-image1"
            loading="lazy"
          />
          <img
            src={hotelImage3}
            alt="Accommodation view 3"
            className="gallery-image2 full-width"
            loading="lazy"
          />
        </div>
        <div className="accommodation-details">
          <div className="details-header">
            <div className="accommodation-info">
              <h3 className="accommodation-name" style={{ fontSize: "25px" }}>
                {accomodation.nameHotel}
              </h3>

              {/* {accomodation.rooms?.map((room, index) => (
                <div key={index}>
                  <p className="room-type" style={{ fontSize: "15px" }}>
                    {room.nameRoom} - {room.roomType}
                  </p>
                  <CheckInOut checkIn={room.checkin} checkOut={room.checkout} />
                </div>
              ))} */}

              <div className="d-flex" style={{ gap: "10px" }}>
                {accomodation.rooms?.map((room, index) => (
                  <p
                    key={index}
                    className="room-type"
                    style={{ fontSize: "15px" }}
                  >
                    {room.nameRoom} - {room.roomType}
                    {/* <CheckInOut
                      checkIn={room.checkin}
                      checkOut={room.checkout}
                    /> */}
                  </p>
                ))}
              </div>

              <div
                className=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {accomodation.rooms?.map((room, index) => (
                  <p
                    key={index}
                    className="room-type"
                    style={{ fontSize: "15px" }}
                  >
                    <CheckInOut
                      checkIn={room.checkin}
                      checkOut={room.checkout}
                    />
                  </p>
                ))}
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8312b6c1afbf8ba2407ea61d3c83d5228f569367fc22cfce1fef9201d811a2c5?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
              alt="Accommodation logo"
              className="accommodation-logo"
            />
          </div>
          <div className="amenities">
            {/* {hotelAmentities.map((amenity, index) => (
              <span className="amenity" key={index}>
                {amenity.name}
              </span>
            ))} */}
          </div>
          <div className="action-buttons">
            {/* Bắt đầu xem chi tiết nơi ở */}
            <button
              className="action-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#detailLiveModal"
              // onClick={onNext()}
            >
              Chi tiết nơi ở<i className="fa-solid fa-chevron-right"></i>
            </button>
            {/* Kết thúc xem chi tiết nơi ở */}

            {/* Bắt đầu thay đổi nơi ở */}
            <button
              className="action-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#changeLiveModal"
              onClick={() => {
                loadHotelChangeData();
              }}
            >
              Thay đổi nơi ở<i className="fa-solid fa-chevron-right"></i>
            </button>
            {/* Kết thúc thay đổi nơi ở */}
          </div>
        </div>
      </article>

      {/* Detail Modal */}
      <div
        className="modal fade"
        id="detailLiveModal"
        tabIndex="-1"
        aria-labelledby="detailLiveLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body detail-ticket-color">
              <div className="d-flex justify-content-lg-between">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                  id="detailLiveLabel"
                >
                  {accomodation.nameHotel}
                </h5>

                {/* Sử dụng css của RoomVoucher   */}
                <button
                  className="voucher-close-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="voucher-close-X"></span>
                  <span className="voucher-close-Y"></span>
                  <div className="voucher-close-close">Close</div>
                </button>
              </div>

              {/* Form chi tiết vé */}
              <div className="ticket-detail">
                {/* Ảnh nhà xe */}
                <div className="ticket-detail-image mt-4">
                  <img src={hotelImage1} />
                </div>

                <h5>Thông tin nơi ở</h5>
                <div className="tripTicket-info mb-3">
                  <div className="tripTicket-item">
                    <p>Phòng:</p>
                    <h6>
                      {accomodation.rooms?.map((room, index) => (
                        <div key={index}>
                          <h6>
                            {room.nameRoom} - {room.roomType}
                          </h6>
                        </div>
                      ))}
                    </h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Địa chỉ:</p>
                    <h6>Vũng Tàu</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Liên hệ:</p>
                    <h6>0123 456 789</h6>
                  </div>
                  {accomodation.rooms?.map((room, index) => (
                    <div key={index}>
                      <div className="tripTicket-item">
                        <p>Check-in:</p>
                        <h6>{room.checkin}</h6>
                      </div>
                      <div className="tripTicket-item">
                        <p>Check-out:</p>
                        <h6>{room.checkout}</h6>
                      </div>
                    </div>
                  ))}

                  <div className="tripTicket-item">
                    {/* <p>Tiện ích phòng:</p>
                    {hotelAmentities.slice(0, 4).map((amenity, index) => (
                      <span
                        className=""
                        key={index}
                        style={{ fontSize: "15px" }}
                      >
                        {amenity.name},{" "}
                      </span>
                    ))} */}
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="totalTicket-container d-flex justify-content-md-between">
                  <h3
                    style={{
                      fontWeight: 450,
                    }}
                  >
                    Tổng tiền:
                  </h3>
                  <div className="totalTicket-amount">
                    <h5
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "red",
                      }}
                    >
                      {convertToVND(accomodation.total)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Modal */}
      <div
        className="modal fade"
        id="changeLiveModal"
        tabIndex="-1"
        aria-labelledby="changeLiveLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            width: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          role="document"
        >
          <div
            className="modal-content"
            style={{
              width: "1000px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="modal-body change-ticket-color2"
              style={{
                width: "1000px",
              }}
            >
              <div className="d-flex justify-content-lg-between mb-3">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "darkblue",
                  }}
                  id="changeLiveLabel"
                >
                  Thay đổi nơi ở
                </h5>

                <button
                  className="voucher-close-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="voucher-close-X"></span>
                  <span className="voucher-close-Y"></span>
                  <div className="voucher-close-close">Close</div>
                </button>
              </div>
              {loading ? (
                <Loader rong={"50vh"} />
              ) : (
                <>
                  {hotelChangeData?.map((hotel) => (
                    // <HotelCard
                    //   key={hotel.hotelId}
                    //   img={hotel.hotelImage[0]?.url}
                    //   name={hotel.hotelName}
                    //   address={hotel.hotelAddress}
                    //   originalPrice={hotel.roomPrice}
                    //   hotelAmenities={hotel.hotelAmenities}
                    //   contentButton={"Chọn khách sạn"}
                    //   item={{

                    //   }}
                    //   modalTarget={"#changeRoomModal"}
                    //   modalToogle={"modal"}
                    //   onClick={() => {
                    //     loadRooms(hotel.hotelId);
                    //   }}
                    // />
                    <HotelCard
                      key={hotel.hotelId}
                      contentButton={"Chọn khách sạn"}
                      item={{
                        name: hotel.hotelName,
                        address: hotel.hotelAddress,
                        price: hotel.roomPrice,
                        hotelAmenities: hotel.hotelAmenities,
                        images: hotel.hotelImage[0]?.url,
                        rating: hotel.rating,
                      }}
                      modalTarget={"#changeRoomModal"}
                      modalToogle={"modal"}
                      onClick={() => {
                        loadRooms(hotel.hotelId);
                        setHotelIdChange(hotel.hotelId);
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Modal */}
      <div
        className="modal fade"
        id="changeRoomModal"
        tabIndex="-1"
        aria-labelledby="changeRoomLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            width: "1200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          role="document"
        >
          <div
            className="modal-content"
            style={{
              width: "1200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="modal-body change-ticket-color2"
              style={{
                width: "1200px",
              }}
            >
              <div className="d-flex justify-content-lg-between mb-3">
                <div className="d-flex align-items-center gap-3">
                  <i
                    className="fa-solid fa-chevron-left"
                    style={{
                      color: "darkblue",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#changeLiveModal"
                    onClick={() => {
                      setRooms(null);
                    }}
                  ></i>
                  <h5
                    style={{
                      fontSize: "25px",
                      textTransform: "uppercase",
                      color: "darkblue",
                    }}
                    id="changeRoomLabel"
                    className="mb-0"
                  >
                    Chọn phòng
                  </h5>
                </div>

                <button
                  className="voucher-close-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeChooseRooms"
                >
                  <span className="voucher-close-X"></span>
                  <span className="voucher-close-Y"></span>
                  <div className="voucher-close-close">Close</div>
                </button>
              </div>

              {showCard && (
                <div className="room-details-card">
                  <h5 className="d-flex justify-content-center mb-2">
                    Chi tiết đặt phòng
                  </h5>
                  {selectedRooms.map((room) => (
                    <div
                      key={room.id}
                      className="room-detail-row d-flex justify-content-between mb-3"
                    >
                      <p>
                        <strong className="d-flex justify-content-center">
                          Tên phòng:
                        </strong>
                        <p>
                          {room.roomName}{" "}
                          <span
                            style={{
                              color: "#ccc",
                              fontSize: "15px",
                              fontStyle: "italic",
                            }}
                          >
                            (có sức chứa: {room.maxSize})
                          </span>
                        </p>
                      </p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-link px-2"
                          onClick={() => {
                            setSelectedRooms((prevRooms) => {
                              const updatedRooms = prevRooms
                                .map((r) =>
                                  r.id === room.id && r.quantity > 0
                                    ? { ...r, quantity: r.quantity - 1 }
                                    : r
                                )
                                .filter((r) => r.quantity > 0); // Xóa phòng nếu số lượng = 0

                              // Kiểm tra nếu số người tổng giảm xuống dưới giới hạn
                              // const totalPeople = updatedRooms.reduce(
                              //   (total, room) =>
                              //     total + room.quantity * room.maxSize,
                              //   0
                              // );

                              // if (totalPeople < numberPeople) {
                              //   enqueueSnackbar(
                              //     "Tổng số người không được ít hơn số lượng tối thiểu",
                              //     {
                              //       variant: "error",
                              //       autoHideDuration: 1000,
                              //     }
                              //   );
                              //   return prevRooms; // Không thay đổi nếu vi phạm
                              // }

                              if (updatedRooms.length === 0) {
                                setShowCard(false);
                              }

                              return updatedRooms;
                            });

                            // Ẩn card nếu không còn phòng
                            if (updatedRooms.length === 0) {
                              setShowCard(false);
                            }
                          }}
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <span>{room.quantity}</span>
                        {/* <button
                          className="btn btn-link px-2"
                          onClick={() => {
                            setSelectedRooms((prevRooms) => {
                              const updatedRooms = prevRooms.map((r) =>
                                r.id === room.id && r.quantity < room.maxSize
                                  ? { ...r, quantity: r.quantity + 1 }
                                  : r
                              );

                              // Kiểm tra nếu số lượng người tổng vượt quá số người cho phép
                              const totalPeople = updatedRooms.reduce(
                                (total, room) =>
                                  total + room.quantity * room.maxSize,
                                0
                              );

                              if (totalPeople > numberPeople) {
                                enqueueSnackbar(
                                  "Số lượng người đã vượt quá giới hạn phòng",
                                  {
                                    variant: "error",
                                    autoHideDuration: 2000,
                                  }
                                );
                                return prevRooms;
                              }

                              return updatedRooms;
                            });
                          }}
                        >
                          <i className="fas fa-plus"></i>
                        </button> */}
                      </div>

                      <p>
                        <strong className="d-flex justify-content-center">
                          Giá:
                        </strong>
                        <p>
                          {convertToVNDDB(room.price)} x {room.quantity}
                        </p>
                      </p>
                    </div>
                  ))}
                  <div className="total-price d-flex justify-content-center align-items-end flex-column mb-3">
                    <h5>
                      Tổng tiền:{" "}
                      {convertToVNDDB(
                        selectedRooms.reduce(
                          (total, room) =>
                            total +
                            room.quantity *
                              parseInt(room.price) *
                              calculateNights(
                                accomodation.rooms[0].checkin,
                                accomodation.rooms[0].checkout
                              ),
                          0
                        )
                      )}{" "}
                      <span style={{ fontWeight: "400", fontStyle: "italic" }}>
                        -{" "}
                        {calculateNights(
                          accomodation.rooms[0].checkin,
                          accomodation.rooms[0].checkout
                        )}{" "}
                        đêm
                      </span>
                    </h5>

                    <span
                      style={{
                        fontSize: "15px",
                        fontStyle: "italic",
                      }}
                    >
                      ({accomodation.rooms[0].checkin} -{" "}
                      {accomodation.rooms[0].checkout})
                    </span>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleChangeRoom();
                      }}
                    >
                      Xác nhận đặt phòng
                    </button>
                  </div>
                </div>
              )}

              {loading ? (
                <Loader rong={"50vh"} />
              ) : (
                <>
                  {/* Render RoomCard bằng map */}
                  <div>
                    {rooms?.map((room) => (
                      <RoomCard
                        key={room.id} // Key là duy nhất trong danh sách
                        img={room.images[0]}
                        typeRoom={room.typeOfRoom}
                        amenities={room.roomAmenities.slice(0, 4)}
                        roomSize={room.maxSize}
                        roomName={room.roomName}
                        priceOneNight={room.price}
                        onBook={() => handleSelectRoom(room)} // Truyền callback đúng cách
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {showConfirmPopup && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="confirmModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmModalLabel">
                  Xác nhận giảm số lượng phòng
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowConfirmPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                Bạn có chắc chắn muốn giảm số lượng phòng{" "}
                {selectedRoomToRemove?.roomSize} xuống 0 không?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowConfirmPopup(false)}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    // Xóa phòng khi xác nhận
                    setSelectedRooms((prevRooms) =>
                      prevRooms.filter((r) => r.id !== selectedRoomToRemove.id)
                    );
                    setShowConfirmPopup(false);
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

// const rooms = [
//   {
//     id: 1,
//     img: imghotel,
//     roomSize: "Phòng đơn 1 người",
//     priceOneNight: "200,000",
//   },
//   {
//     id: 2,
//     img: imghotel,
//     roomSize: "Phòng đôi 2 người",
//     priceOneNight: "350,000",
//   },
//   {
//     id: 3,
//     img: imghotel,
//     roomSize: "Phòng gia đình 4 người",
//     priceOneNight: "500,000",
//   },
// ];

function CheckInOut({ checkIn, checkOut }) {
  return (
    <div className="check-in-out">
      <div className="check-item">
        <span className="check-label" style={{ fontSize: "15px" }}>
          Check-in
        </span>
        <span className="check-date" style={{ fontSize: "15px" }}>
          {checkIn}
        </span>
        {/* <span className="check-time">14:00 - 00:00</span> */}
      </div>
      <div className="check-item">
        <span className="check-label" style={{ fontSize: "15px" }}>
          Check-out
        </span>
        <span className="check-date" style={{ fontSize: "15px" }}>
          {checkOut}
        </span>
        {/* <span className="check-time">until 12:00</span> */}
      </div>
    </div>
  );
}

export default AccommodationCard;
