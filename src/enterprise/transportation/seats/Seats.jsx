import React from "react";
import "./Seats.css";
import SeatsCard from "../seatscard/Seatscard";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { useNavigate } from "react-router-dom";

const Seats = () => {
  const navigate = useNavigate();

  const hotelmData = {
    hotelCode: "001",
    name: "City Center Hotel",
    status: "Đang hoạt động",
    licensePlate: "79A-123.45",
    capacity: "4 người",
    driverName: "Nguyễn Văn A",

    phone: "0456123789",
    image: "/src/assets/beach.jpg",
  };

  const handleClick = () => {
    navigate("/enterprise/accomodation/room-management");
  };

  return (
    <>
      <div className="enterprise-Seats-container">
        {/* Tiêu đề */}
        <div className="Seats-title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          ></h1>
        </div>

        {/* Nội dung tìm kiếm */}
        <div className="Seats-content mt-3"></div>

        {/* Lựa chọn khách sạn */}
        <div className="Seats-selection">
          <div className="Seats-container">
            <SeatsCard {...hotelmData} />
            <button
              type="button"
              className="btn select-Seats-btn"
              data-bs-toggle="modal"
              data-bs-target="#contactModal"
            >
              Chọn xe
            </button>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="contactModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="contactModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-toggle="modal"
                  data-bs-target="#main"
                ></button>
              </div>
              <div className="nav-filterCombobox-Seats ">
                <InputFlied
                  className="seact-search"
                  nameInput="search"
                  content="Tìm kiếm"
                  typeInput="text"
                />

                <button
                  type="button"
                  className="btn seats-button"
                  data-bs-toggle="modal"
                  data-bs-target="#addrouteModal"
                >
                  Thêm ghế
                </button>
              </div>

              {/* Header */}

              <div className="Seats-nav mt-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Mã Xe</th>
                      <th>Mã Ghế</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <button
                          className="btn seats-btn btn-danger"
                          onClick={() => console.log("Xóa ghế A1")}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <button
                          className="btn seats-btn btn-danger"
                          onClick={() => console.log("Xóa ghế A2")}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                    {/* Thêm các hàng khác nếu cần */}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="modal3-footer">
                <div className="modal-footer ">
                  <div className="pagination">
                    <button className="btn btn-light">1</button>
                    <button className="btn btn-light">2</button>
                    <button className="btn btn-light">3</button>
                    <button className="btn btn-light">4</button>
                    <button className="btn btn-light">5</button>
                    <button className="btn btn-primary">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="addrouteModal"
          tabIndex="-1"
          aria-labelledby="addrouteModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Thông Tin Ghế
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <div className="row">
                  {/* Cột 1 */}
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="start-seat1">
                      Tầng 1
                    </label>
                    <div className="mb-3 seat-input-wrapper">
                      <div className="mb-3 ">
                        <label htmlFor="start-seat1" className="form-label">
                          Ghế Bắt Đầu
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="start-seat1"
                          placeholder="Nhập ghế bắt đầu"
                        />
                      </div>
                      <div className="mb-3 ">
                        <label htmlFor="end-seat1" className="form-label">
                          Ghế Kết Thúc
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="end-seat1"
                          placeholder="Nhập ghế kết thúc"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cột 2 */}

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="start-seat1">
                      Tầng 2
                    </label>
                    <div className="mb-3 seat-input-wrapper">
                      <div className="mb-3 ">
                        <label htmlFor="start-seat1" className="form-label">
                          Ghế Bắt Đầu
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="start-seat1"
                          placeholder="Nhập ghế bắt đầu"
                        />
                      </div>
                      <div className="mb-3 ">
                        <label htmlFor="end-seat1" className="form-label">
                          Ghế Kết Thúc
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="end-seat1"
                          placeholder="Nhập ghế kết thúc"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="button" className="btn btn-primary">
                  Xác Nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seats;
