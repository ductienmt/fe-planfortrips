import React, { useEffect, useState, useCallback } from "react";
import "./HotelManagement.css";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { Table } from "antd";
import { HotelService } from "../../../services/apis/HotelService";
import Loader from "../../../client/Components/Loading";
import { enqueueSnackbar } from "notistack";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const HotelManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotelmData, setHotelmData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    description: "",
    address: "",
    hotel_id: "",
  });

  const columns = [
    // { title: "Mã khách sạn", dataIndex: "hotel_id", key: "hotel_id" },
    { title: "Tên khách sạn", dataIndex: "hotelName", key: "hotelName" },
    { title: "Địa chỉ", dataIndex: "hotelAddress", key: "hotelAddress" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hotline",
      dataIndex: "hotelPhoneNumber",
      key: "hotelPhoneNumber",
    },
    { title: "Đánh giá", dataIndex: "rating", key: "rating" },
    { title: "Trạng thái", dataIndex: "hotelStatus", key: "hotelStatus" },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div>
          <button
            className="button-edit btn"
            data-bs-toggle="modal"
            data-bs-target="#editHotelModal"
            onClick={() => {
              setFormData(record);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="button-delete btn">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const fetchHotelData = async () => {
    setIsLoading(true);
    try {
      const response = await HotelService.detail();
      console.log(response);

      setHotelmData(response);
    } catch (error) {
      console.error("Error fetching hotel data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  const searchHotel = useCallback(
    debounce(async (keyword) => {
      if (!keyword) {
        fetchHotelData();
        return;
      }
      try {
        const response = await HotelService.getHotels(0, 10, keyword);
        setHotelmData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error searching hotel", error);
      }
    }, 500),
    []
  );

  const handleEditHotel = async () => {
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
      enqueueSnackbar("Số điện thoại là bắt buộc", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    try {
      const dataToSend = {
        name: formData.name,
        phone_number: formData.phoneNumber,
        description: formData.description,
        address: formData.address,
      };

      await HotelService.update(formData.hotel_id, dataToSend);
      enqueueSnackbar("Cập nhật thành công!", {
        variant: "success",
        autoHideDuration: 2000,
        onExit: () => {
          fetchHotelData();
        },
      });
    } catch (error) {
      console.error("Error updating hotel", error);
    }
  };

  useEffect(() => {
    document.title = "Quản lý khách sạn";
    fetchHotelData();
  }, []);

  useEffect(() => {
    searchHotel(searchKeyword);
  }, [searchKeyword, searchHotel]);

  return (
    <>
      {isLoading ? (
        <div className="w-100">
          <Loader rong={"80vh"} />
        </div>
      ) : (
        <div className="enterprise-hotelm-container">
          <div className="hotelm-title">
            <h1 className="title">Quản Lý Khách sạn</h1>
          </div>
          <div className="hotelm-content mt-3">
            <div className="nav-filterCombobox-hotelm">
              <InputFlied
                nameInput="search"
                content="Tìm kiếm"
                typeInput="text"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addHotelModal"
              >
                Thêm khách sạn
              </button>
            </div>

            <div className="content-table mt-4">
              <Table
                columns={columns}
                dataSource={hotelmData.map((hotel, index) => ({
                  ...hotel,
                  key: hotel.id || index,
                }))}
              />
            </div>
          </div>
        </div>
      )}

      <button
        className="btn-close"
        data-bs-dismiss="modal"
        style={{ display: "none" }}
        id="closeButton"
      ></button>

      <div
        className="modal fade"
        id="editHotelModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600" }}>
                Chỉnh sửa thông tin khách sạn
              </h3>
              <button
                type="button"
                className="btn-close"
                // data-bs-toggle="modal"
                // data-bs-target="#main"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <InputFlied
                value={formData.name}
                onChange={handleChange}
                content={"Tên khách sạn"}
                nameInput={"name"}
                typeInput={"text"}
              />
              <InputFlied
                value={formData.address}
                onChange={handleChange}
                content={"Địa chỉ"}
                nameInput={"address"}
                typeInput={"text"}
              />
              <InputFlied
                value={formData.description}
                onChange={handleChange}
                content={"Mô tả"}
                nameInput={"description"}
                typeInput={"text"}
              />
              <InputFlied
                value={formData.phoneNumber}
                onChange={handleChange}
                content={"Số điện thoại"}
                nameInput={"phoneNumber"}
                typeInput={"text"}
              />
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                data-bs-dismiss="modal"
                type="button"
                className="custome-button-footer"
                onClick={handleEditHotel}
                style={{
                  width: "100%",
                  height: "50px",
                  margin: "0",
                  border: "none",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelManagement;
