import React, { useEffect, useState } from "react";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import { AreaService } from "../../../services/apis/AreaService";
import { HotelService } from "../../../services/apis/HotelService";
import { CarService } from "../../../services/apis/CarCompanyService";
import { TagService } from "../../../services/apis/TagService";
import { TourService } from "../../../services/apis/TourService";
import { toast } from "react-toastify";
import { parseJwt } from "../../../utils/Jwt";

function TourForm({ setRows }) {
  const token = sessionStorage.getItem("token");
  const userName = token ? parseJwt(token).sub : "";
  const [hidden, setHidden] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [area, setArea] = useState([]);
  const [areaDepartSelected, setAreaDepartSelected] = useState([]);
  const [areaArriveSelected, setAreaArriveSelected] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [car, setCar] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    destination: "City 1",
    number_people: 0,
    total_price: 0,
    day: 0,
    night: 0,
    is_active: true,
    tagNames: [],
    note: "",
    hotel_id: "",
    car_company_id: "",
    schedule_id: 3,
    admin_username: userName,
  });

  const handleSelectTags = (tagNames) => {
    setFormData((prevData) => ({
      ...prevData,
      tagNames,
    }));
  };
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
      const hotel = await HotelService.getHotels(0, 100, "");
      console.log(hotel.hotelResponseList);

      setHotel(hotel.hotelResponseList);
      const car = await CarService.getcars(0, 100);
      setCar(car.listResponse);
      const tag = await TagService.getTags(0, 100);

      setTags(tag.listResponse);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khu vực:", error);
    }
  };

  const handleAreaDepChange = (e) => {
    const selectedArea = area.find((a) => a.id === e.target.value);
    setAreaDepartSelected(selectedArea?.cities || []);
    document.getElementById("endPoint").value = "";
  };
  const handleAreaArriveChange = (e) => {
    const selectedArea = area.find((a) => a.id === e.target.value);
    setAreaArriveSelected(selectedArea?.cities || []);
    document.getElementById("endPoint").value = "";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    const response = await TourService.createTour(formData);
    if (response) {
      const newFormData = { ...formData, tour_id: response.tour_id };
      setHidden(false);
      toast("Tạo mới thành công");
      setRows((prevRows) => [...prevRows, newFormData]);
    }
  };
  useEffect(() => {
    let price = 0;
    if (formData.hotel_id) {
      price += 400000;
    }
    if (formData.car_company_id) {
      price += 500000;
    }
    setFormData((prevState) => ({
      ...prevState,
      total_price: price,
    }));
  }, [formData.hotel_id, formData.car_company_id]);
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => setHidden(true)}
      >
        Thêm Chuyến Tour Mới
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden={hidden}
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
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
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
                    name="destination"
                    defaultValue=""
                    onChange={(e) => {
                      handleAreaDepChange(e);
                      handleChange();
                    }}
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
                  <label htmlFor="endPoint" className="form-label"></label>
                  <select id="endPoint" className="form-select">
                    <option value="" disabled>
                      Chọn thành phố
                    </option>
                    {areaDepartSelected.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.nameCity}
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
                    name="destination"
                    onChange={(e) => {
                      handleAreaArriveChange(e);
                      handleChange();
                    }}
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
                  <label htmlFor="endPoint" className="form-label"></label>
                  <select id="endPoint" className="form-select" defaultValue="">
                    <option value="" disabled>
                      Chọn thành phố
                    </option>
                    {areaArriveSelected.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.nameCity}
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
                    name="number_people"
                    className="form-control"
                    placeholder="Nhập số người"
                    value={formData.number_people}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="dayCount" className="form-label">
                    Số ngày
                  </label>
                  <input
                    type="number"
                    id="dayCount"
                    name="day"
                    className="form-control"
                    placeholder="Nhập số ngày"
                    value={formData.dayCount}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="nightCount" className="form-label">
                    Số đêm
                  </label>
                  <input
                    type="number"
                    id="night"
                    name="night"
                    className="form-control"
                    placeholder="Nhập số đêm"
                    value={formData.nightCount}
                    onChange={handleChange}
                  />
                </div>

                {/* Dịch vụ */}
                <div className="col-12">
                  <h6 className="text-primary mt-3">Dịch vụ</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="transport" className="form-label">
                        Nhà xe
                      </label>
                      <select
                        id="transport"
                        className="form-select"
                        name="car_company_id"
                        value={formData.transport}
                        onChange={handleChange}
                      >
                        <option disabled selected>
                          Chọn phương tiện
                        </option>
                        {car.map((c) => (
                          <option
                            key={c.car_company_id}
                            value={c.car_company_id}
                          >
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="accommodation" className="form-label">
                        Khách sạn
                      </label>
                      <select
                        id="accommodation"
                        className="form-select"
                        name="hotel_id"
                        value={formData.accommodation}
                        onChange={handleChange}
                      >
                        <option disabled selected>
                          Chọn nơi ở
                        </option>
                        {hotel.map((h) => (
                          <option key={h.hotel_id} value={h.hotel_id}>
                            {h.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Chủ đề */}
                <div className="col-12">
                  <label htmlFor="tourTags" className="form-label mt-3">
                    Chủ đề
                  </label>
                  {tags && tags.length > 0 ? (
                    <Multiselect
                      data={tags.map((tag) => tag.name)}
                      value={formData.tagNames}
                      onChange={handleSelectTags}
                      placeholder="Chọn các chủ đề"
                    />
                  ) : (
                    <p>Không có chủ đề nào để hiển thị</p>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <h3>
                {" "}
                <span>Tổng tiền: {formData.total_price}</span>{" "}
              </h3>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSave();
                }}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourForm;
