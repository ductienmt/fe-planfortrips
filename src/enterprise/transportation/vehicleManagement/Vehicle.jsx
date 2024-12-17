import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Vehicle.css";
import { Dropdown, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { VehiclesService } from "../../../services/apis/Vehicles";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonDelete from "../../components/ButtonDelete";
import debounce from "lodash.debounce";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { validatePlateNumber } from "../../../utils/PlateNumberValidate";
import { enqueueSnackbar } from "notistack";
import ButtonDeleteRoom from "../../components/ButtonDeleteRoom";

const Vehicle = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [selectedItem, setSelectedItem] = useState("all");
  const [selected, setSelected] = useState("Tất cả");
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [vehicleDeleteId, setVehicleDeleteId] = useState("");

  const [formData, setFormData] = useState({
    plate_number: "",
    code: "",
    type_vehicle: "",
    capacity: "",
    driver_name: "",
    driver_phone: "",
    car_company_id: "",
  });

  const handleRest = () => {
    setFormData({
      plate_number: "",
      code: "",
      type_vehicle: "",
      capacity: "",
      driver_name: "",
      driver_phone: "",
    });
    handleSelectItem("all");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidatePlateNumber = () => {
    if (!validatePlateNumber(formData.plate_number)) {
      setDisabledSubmit(true);
      enqueueSnackbar("Biển số không hợp lệ", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      setDisabledSubmit(false);
    }
  };

  const items = [
    {
      key: "0",
      label: "Tất cả",
      onClick: () => {
        setSelected("Tất cả"), setFilterType("all");
      },
    },
    {
      key: "1",
      label: "Loại xe",
      children: [
        {
          key: "Standard",
          label: "Standard",
          onClick: () => {
            setSelected("Standard"), setFilterType("standard");
          },
        },
        {
          key: "Vip",
          label: "Vip",
          onClick: () => {
            setSelected("Vip"), setFilterType("vip");
          },
        },
      ],
    },
    // {
    //   key: "2",
    //   label: "Trạng thái",
    //   children: [
    //     {
    //       key: "true",
    //       label: "Đang hoạt động",
    //       onClick: () =>

    //     },
    //     {
    //       key: "false",
    //       label: "Ngưng hoạt động",
    //       onClick: () =>

    //     },
    //   ],
    // },
  ];

  const columns = useMemo(
    () => [
      {
        title: "Mã xe",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Biển Số",
        dataIndex: "plateNumber",
        key: "plateNumber",
      },
      {
        title: "Loại xe",
        dataIndex: "type_vehicle",
        key: "type_vehicle",
      },
      {
        title: "Tên tài xế",
        dataIndex: "driverName",
        key: "driverName",
      },
      {
        title: "Sđt tài xế",
        dataIndex: "driverPhone",
        key: "driverPhone",
      },
      {
        title: "Số ghế",
        dataIndex: "capacity",
        key: "capacity",
      },
      {
        title: "Hành động",
        key: "actions",
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ButtonEdit
              toogleModal={"modal"}
              tagertModal={"#editVehicle"}
              onClick={() => {
                setFormData({
                  code: record.code,
                  driver_name: record.driverName,
                  driver_phone: record.driverPhone,
                  capacity: record.capacity,
                  plate_number: record.plateNumber,
                  type_vehicle: record.type_vehicle,
                });
              }}
            />
            <ButtonDelete
              toogleModal={"modal"}
              tagertModal={"#deleteVehicle"}
              onClick={(e) => {
                e.preventDefault();
                setVehicleDeleteId(record.code);
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const loadVehicleData = useCallback(
    debounce(async (filterType) => {
      try {
        const res = await VehiclesService.getVehicleByEnterpriseId(filterType);
        setVehicleData(res.data);
        setFormData({
          ...formData,
          car_company_id: res.data[0].car_company.id,
        });
      } catch (error) {
        console.log(error);
      }
    }, 300),
    []
  );

  const handleSearch = useCallback(
    debounce(async (value) => {
      try {
        const res = await VehiclesService.searchVehicle(value.target.value);
        setVehicleData(res.data);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    []
  );

  const handleCreateVehicle = async () => {
    if (!validateForm) {
      enqueueSnackbar("Vui lòng điền đầy điền thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    if (!validatePlateNumber(formData.plate_number)) {
      enqueueSnackbar("Biển số không hợp lệ", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    try {
      const res = await VehiclesService.createVehicle(formData);
      enqueueSnackbar("Thêm xe thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      handleRest();
      loadVehicleData(filterType);
    } catch (error) {
      enqueueSnackbar(error.data || "Thêm xe thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      handleRest();
    }
  };

  const handleUpdateVehicle = async () => {
    if (!validateForm) {
      enqueueSnackbar("Vui lòng điền đầy điền thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    try {
      const res = await VehiclesService.updateVehicle(formData.code, formData);
      enqueueSnackbar("Cập nhật thông tin xe thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      handleRest();
      loadVehicleData(filterType);
    } catch (error) {
      enqueueSnackbar(error.data || "Cập nhật thông tin xe thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      handleRest();
    }
  };

  const validateForm = () => {
    if (
      formData.plate_number === "" ||
      formData.code === "" ||
      formData.type_vehicle === "" ||
      formData.capacity === "" ||
      formData.driver_name === "" ||
      formData.driver_phone === ""
    ) {
      return false;
    }
    return true;
  };

  const handleDeleteVehicle = async (id) => {
    try {
      const res = await VehiclesService.deleteVehicle(id);
      enqueueSnackbar("Xóa xe thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      document.getElementById("closeDeleteVehicle").click();
      setVehicleDeleteId("");
      loadVehicleData(filterType);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Xóa xe thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      document.getElementById("closeDeleteVehicle").click();
      setVehicleDeleteId("");
    }
  };

  useEffect(() => {
    loadVehicleData(filterType);
  }, [filterType, loadVehicleData]);

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item);
    setFilterType(item);
  }, []);

  useEffect(() => {
    document.title = "Quản lý xe";
  }, []);
  return (
    <>
      <div className="enterprise-vehicle-container">
        <div className="title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Danh Sách Xe
          </h1>
        </div>

        <div className="content mt-3">
          <div className="nav-filter">
            <div className="filter-vehicle">
              <button
                onClick={() => handleSelectItem("all")}
                className={selectedItem === "all" ? "isActive" : ""}
              >
                Tất cả
              </button>
              <button
                onClick={() => handleSelectItem("notInUse")}
                className={selectedItem === "notInUse" ? "isActive" : ""}
              >
                Chưa có chuyến
              </button>
              <button
                onClick={() => handleSelectItem("running")}
                className={selectedItem === "running" ? "isActive" : ""}
              >
                Đang trong chuyến
              </button>
            </div>

            <div className="nav-add-vehicle">
              <InputFlied
                content={"Tìm kiếm"}
                nameInput={"search"}
                onChange={(e) => handleSearch(e)}
              />
              <Dropdown menu={{ items }}>
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "#adadad",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  <Space>
                    {selected} <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addVehicle"
              >
                Thêm Xe
              </button>
            </div>
          </div>
          <div className="content-table mt-4">
            <Table
              dataSource={vehicleData}
              columns={columns}
              // pagination={{
              //   current: currentPage,
              //   pageSize: pageSize,
              //   total: dataSource.length,
              //   onChange: (page, pageSize) => {
              //     setCurrentPage(page);
              //     setPageSize(pageSize);
              //   },
              // }}
            />
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addVehicle"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom add-vehicle-enterprise-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>Thêm xe mới</h3>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleRest}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row-modal-body">
                <InputFlied
                  value={formData.plate_number}
                  onChange={handleInputChange}
                  onBlur={handleValidatePlateNumber}
                  content={"Biển số"}
                  nameInput={"plate_number"}
                  typeInput={"text"}
                  dai={"50%"}
                />
                <InputFlied
                  value={formData.code}
                  onChange={handleInputChange}
                  content={"Mã xe"}
                  nameInput={"code"}
                  typeInput={"text"}
                  dai={"50%"}
                />
              </div>
              <div className="row-modal-body">
                <select
                  name="type_vehicle"
                  value={formData.type_vehicle}
                  onChange={handleInputChange}
                  style={{
                    width: "50%",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                >
                  <option value="">Chọn loại xe</option>
                  <option value="Standard">Standard</option>
                  <option value="Vip">Vip</option>
                </select>
                <InputFlied
                  value={formData.capacity}
                  onChange={handleInputChange}
                  content={"Sức chứa"}
                  nameInput={"capacity"}
                  typeInput={"number"}
                  dai={"50%"}
                />
              </div>
              <div className="row-modal-body">
                <InputFlied
                  value={formData.driver_name}
                  onChange={handleInputChange}
                  content={"Tên tài xế"}
                  nameInput={"driver_name"}
                  typeInput={"text"}
                  dai={"50%"}
                />
                <InputFlied
                  value={formData.driver_phone}
                  onChange={handleInputChange}
                  content={"Số điện thoại"}
                  nameInput={"driver_phone"}
                  typeInput={"text"}
                  dai={"50%"}
                />
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                data-bs-dismiss="modal"
                type="button"
                className="custome-button-footer"
                onClick={handleCreateVehicle}
                disabled={disabledSubmit}
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

      <div
        className="modal fade"
        id="editVehicle"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom add-vehicle-enterprise-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>
                Chỉnh sửa thông tin của xe
              </h3>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleRest}
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", gap: "15px", flexDirection: "column" }}
            >
              <span className="text-danger">
                * Lưu ý bạn chỉ được sửa đổi thông tin tài xế
              </span>
              <InputFlied
                value={formData.driver_name}
                onChange={handleInputChange}
                content={"Tên tài xế"}
                nameInput={"driver_name"}
                typeInput={"text"}
              />
              <InputFlied
                value={formData.driver_phone}
                onChange={handleInputChange}
                content={"Số điện thoại"}
                nameInput={"driver_phone"}
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
                onClick={handleUpdateVehicle}
                disabled={disabledSubmit}
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

      <div
        className="modal fade"
        id="deleteVehicle"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom modal-remove-room">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>Xóa xe</h3>

              <button
                type="button"
                className="btn-close"
                id="closeDeleteVehicle"
                data-bs-dismiss="modal"
                onClick={() => setVehicleDeleteId("")}
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-center">
                Bạn có chắc chắn muốn xóa xe này không?
              </p>
              <p>
                <span className="text-danger" style={{ fontWeight: "700" }}>
                  Chú ý:{" "}
                </span>
                Nếu xe đã được thêm vào lịch trình hoặc đã được khách hàng đặt
                thì sẽ không thể xóa ra khỏi dữ liệu của bạn
              </p>
            </div>
            <div
              className="modal-footer"
              style={{
                width: "100%",
                borderTop: "none",
              }}
            >
              <div
                className="w-100 d-flex justify-content-between button-custom"
                style={{ gap: "10px" }}
              >
                <button
                  className="w-50 btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setVehicleDeleteId("")}
                >
                  Hủy
                </button>
                <span className="w-50">
                  <ButtonDeleteRoom
                    onClick={() => {
                      handleDeleteVehicle(vehicleDeleteId);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehicle;
