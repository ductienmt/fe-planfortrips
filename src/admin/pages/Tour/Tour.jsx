import React, { useEffect, useState } from "react";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import { AreaService } from "../../../services/apis/AreaService";
import { HotelService } from "../../../services/apis/HotelService";

function Tour() {
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = ["Phiêu lưu", "Thư giãn", "Văn hóa", "Ẩm thực", "Khám phá"];

  const [area, setArea] = useState([]);
  const [areaSelected, setAreaSelected] = useState([]);



  // Init
  useEffect(() => {
    fetchDataInit();
  }, []);

  const fetchDataInit = async () => {
    try {
      // Area
      const areaData = await AreaService.getAll();
      setArea(areaData);

      // Hotel
      const hotel = await HotelService.getHotels();
      console.log(hotel);
      
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khu vực:", error);
    }
  };

  const handleAreaChange = (e) => {
    const selectedArea = area.find((a) => a.id === e.target.value);
    setAreaSelected(selectedArea?.cities || []); 
    document.getElementById("endPoint").value = ""; 
  };
  

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Thêm Chuyến Tour Mới
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: 9999 }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="exampleModalLabel">
                Thêm Chuyến Tour
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                {/* Tiêu đề */}
                <div className="col-12">
                  <label htmlFor="tourTitle" className="form-label">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    id="tourTitle"
                    className="form-control"
                    placeholder="Nhập tiêu đề tour"
                  />
                </div>

                {/* Điểm bắt đầu + Điểm đến */}
                <div className="col-md-6">
                  <label htmlFor="startPoint" className="form-label">
                    Điểm bắt đầu
                  </label>
                  <select
                    id="startPoint"
                    className="form-select"
                    defaultValue=""
                    onChange={handleAreaChange}
                  >
                    <option value="" disabled>
                      Chọn khu vực
                    </option>
                    {area.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="endPoint" className="form-label">
                  </label>
                  <select
                    id="endPoint"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Chọn thành phố
                    </option>
                    {areaSelected.map((city) => (
                      <option key={city.cityId} value={city.cityId}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>

                    {/* Điểm bắt đầu + Điểm đến */}
                    <div className="col-md-6">
                  <label htmlFor="startPoint" className="form-label">
                    Điểm đến
                  </label>
                  <select
                    id="startPoint"
                    className="form-select"
                    defaultValue=""
                    onChange={handleAreaChange}
                  >
                    <option value="" disabled>
                      Chọn khu vực
                    </option>
                    {area.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="endPoint" className="form-label">
                  </label>
                  <select
                    id="endPoint"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Chọn thành phố
                    </option>
                    {areaSelected.map((city) => (
                      <option key={city.cityId} value={city.cityId}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Số người, số ngày, số đêm */}
                <div className="col-md-4">
                  <label htmlFor="peopleCount" className="form-label">
                    Số người
                  </label>
                  <input
                    type="number"
                    id="peopleCount"
                    className="form-control"
                    placeholder="Nhập số người"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="dayCount" className="form-label">
                    Số ngày
                  </label>
                  <input
                    type="number"
                    id="dayCount"
                    className="form-control"
                    placeholder="Nhập số ngày"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="nightCount" className="form-label">
                    Số đêm
                  </label>
                  <input
                    type="number"
                    id="nightCount"
                    className="form-control"
                    placeholder="Nhập số đêm"
                  />
                </div>

                {/* Dịch vụ */}
                <div className="col-12">
                  <h6 className="text-primary mt-3">Dịch vụ</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="transport" className="form-label">
                        Phương tiện
                      </label>
                      <select id="transport" className="form-select">
                        <option disabled selected>
                          Chọn phương tiện
                        </option>
                        <option value="bus">Xe khách</option>
                        <option value="plane">Máy bay</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="accommodation" className="form-label">
                        Nơi Ở
                      </label>
                      <select id="accommodation" className="form-select">
                        <option disabled selected>
                          Chọn nơi ở
                        </option>
                        <option value="hotel">Khách sạn</option>
                        <option value="resort">Khu nghĩ dưỡng</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="restaurant" className="form-label">
                        Nơi ăn uống
                      </label>
                      <select id="restaurant" className="form-select">
                        <option disabled selected>
                          Chọn nơi ăn uống
                        </option>
                        <option value="restaurant">Nhà hàng</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Chủ đề */}
                <div className="col-12">
                  <label htmlFor="tourTags" className="form-label">
                    Chủ đề
                  </label>
                  <Multiselect
                    data={tags}
                    value={selectedTags}
                    onChange={setSelectedTags}
                    placeholder="Chọn các chủ đề"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="button" className="btn btn-primary">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tour;
