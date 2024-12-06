import React from "react";
import "./Account.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Account = () => {
  return (
    <>
      <div className="transportation-account-container">
        {/* Account Modal */}
        <div
          className="modal fade"
          id="accountModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="accountModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered custom-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="accountModalLabel">
                  THAY ĐỔI THÔNG TIN DOANH NGHIỆP
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="content">
                  <ul>
                    <li>
                      <button
                        className="btn account-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#contactModal"
                      >
                        <span>Liên lạc</span>

                      </button>
                    </li>
                    <li>
                      <button
                        className="btn account-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#businessInfoModal"
                      >
                        <span>Thông Tin </span>

                      </button>
                    </li>
                    <li>
                      <button
                        className="btn account-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#avatarModal"
                      >
                        <span>Thay Đổi Hình đại diện</span>

                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Modal */}
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
                <h5 className="modal-title" id="contactModalLabel">
                  Cập Nhật Liên Lạc
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Số Điện Thoại"
                      />
                      <label htmlFor="phone">Số Điện Thoại</label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#accountModal"
                >
                  Quay Lại
                </button>
                <button type="button" className="btn btn-primary">
                  Thay Đổi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Info Modal */}
        <div
          className="modal fade"
          id="businessInfoModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="businessInfoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="businessInfoModalLabel">
                  Cập Nhật Tên Doanh Nghiệp
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="businessName"
                        name="businessName"
                        placeholder="Tên Doanh Nghiệp"
                      />
                      <label htmlFor="businessName">Tên Doanh Nghiệp</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="representative"
                        name="representative"
                        placeholder="Người Đại Diện"
                      />
                      <label htmlFor="representative">Người Đại Diện</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="taxId"
                        name="taxId"
                        placeholder="Mã Số Thuế"
                      />
                      <label htmlFor="taxId">Mã Số Thuế</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Địa Chỉ"
                      />
                      <label htmlFor="address">Địa Chỉ</label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#accountModal"
                >
                  Quay Lại
                </button>
                <button type="button" className="btn btn-primary">
                  Thay Đổi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Modal */}
        <div
          className="modal fade"
          id="avatarModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="avatarModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="avatarModalLabel">
                  Thay Đổi Hình Đại Diện
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Chọn Hình Ảnh</label>
                    <input
                      type="file"
                      className="form-control"
                      name="avatar"
                    // onChange={handleAvatarChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#accountModal"
                >
                  Quay Lại
                </button>
                <button type="button" className="btn btn-primary">
                  Thay Đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
