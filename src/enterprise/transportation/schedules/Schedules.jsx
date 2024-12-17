import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import "./Schedules.css";
import { Dropdown, Space, Table, Spin, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import { DateFormatter } from "../../../utils/DateFormat";
import { convertToVNDDB } from "../../../utils/FormatMoney";
import { RouteService } from "../../../services/apis/RouteService";
import { VehiclesService } from "../../../services/apis/Vehicles";
import { enqueueSnackbar } from "notistack";
import { InputFlied } from "../../../client/Components/Input/InputFlied";

const Schedules = () => {
  const [schedulesData, setScheduleData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("all");
  const [routeOptions, setRouteOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleRoutes, setVisibleRoutes] = useState([]);
  const [visibleUlli, setVisibleUlli] = useState(false);
  const [formData, setFormData] = useState({
    routeId: "",
    vehicleCode: "",
    priceForOneSeat: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [vehicleDataCode, setVehicleDataCode] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFilterByRoute = useCallback(
    (routeId) => {
      if (routeId === "all") {
        loadScheduleData();
      } else {
        const filtered = schedulesData.filter(
          (item) => item.routeId === routeId
        );
        // setFilteredData(filtered);
        setScheduleData(filtered);
      }
    },
    [schedulesData]
  );

  const columns = useMemo(
    () => [
      {
        title: "Mã Tuyến",
        dataIndex: "routeId",
        key: "routeId",
      },
      {
        title: "Điểm xuất phát",
        dataIndex: "departureStation",
        key: "departureStation",
      },
      {
        title: "Điểm đến",
        dataIndex: "arrivalStation",
        key: "arrivalStation",
      },
      {
        title: "Ngày/Giờ Xuất Phát",
        dataIndex: "departureTime",
        key: "departureTime",
        render: (text) => DateFormatter(text),
      },
      {
        title: "Ngày/Giờ Đến",
        dataIndex: "arrivalTime",
        key: "arrivalTime",
        render: (text) => DateFormatter(text),
      },
      {
        title: "Mã Xe",
        dataIndex: "vehicleCode",
        key: "vehicleCode",
      },
      {
        title: "Giá Vé",
        dataIndex: "priceForOneTicket",
        key: "priceForOneTicket",
        render: (text) => convertToVNDDB(text),
      },
      {
        title: "Hành Động",
        dataIndex: "action",
        key: "action",
      },
    ],
    []
  );

  const items = useMemo(
    () => [
      {
        key: "0",
        label: "Tất cả",
        onClick: () => {
          setSelected("Tất cả");
          handleFilterByRoute("all");
        },
      },
      {
        key: "1",
        label: "Mã tuyến",
        children: routeOptions,
      },
    ],
    [routeOptions, handleFilterByRoute]
  );

  const loadScheduleData = useCallback(async () => {
    try {
      const res = await ScheduleService.getScheduleByEnterpriseId("all");
      setScheduleData(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.error("Error loading schedule data:", error);
      message.error("Failed to load schedule data");
    }
  }, []);

  const loadScheduleDataFilter = useCallback(async (value) => {
    try {
      const res = await ScheduleService.getScheduleByEnterpriseId(value);
      setScheduleData(res.data.data);
    } catch (error) {
      console.error("Error loading filtered schedule data:", error);
      message.error("Failed to load filtered schedule data");
    }
  }, []);

  const handleSelectItem = useCallback(
    (item) => {
      setSelectedItem(item);
      loadScheduleDataFilter(item);
    },
    [loadScheduleDataFilter]
  );

  // const loadRouteData = useCallback(async () => {
  //   try {
  //     setLoading(true);

  //     const res = await RouteService.getRouteRelevance(page, 10);
  //     // console.log("res", res.data.content);

  //     if (res.data.content.length > 0) {
  //       const reversedList = [...res.data.content];
  //       setRouteData((prevData) => [...prevData, ...reversedList]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Error loading routes:", error);
  //     message.error("Failed to load routes");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [page]);
  // const loadRouteData = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const res = await RouteService.getRouteRelevance(page, 10);

  //     if (res.data.content.length > 0) {
  //       // Sắp xếp dữ liệu theo relevance (tăng dần)
  //       const sortedList = res.data.content.sort(
  //         (a, b) => a.relevance - b.relevance
  //       );

  //       setRouteData((prevData) => [...prevData, ...sortedList]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Error loading routes:", error);
  //     message.error("Failed to load routes");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [page]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const loadRouteData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await RouteService.getRouteRelevance(page, 10);
      const { content, totalPages, totalElements } = res.data; // Lấy giá trị totalPages và totalElements từ backend

      if (content.length > 0) {
        const reversedList = [...content];
        setRouteData((prevData) => [...prevData, ...reversedList]);
        setPage((prevPage) => prevPage + 1); // Tăng số trang lên
      } else {
        setHasMore(false); // Nếu không còn dữ liệu, dừng tải
      }

      // Lưu các giá trị totalPages và totalElements
      setTotalPages(totalPages); // Lưu totalPages
      setTotalElements(totalElements); // Lưu totalElements
    } catch (error) {
      console.error("Error loading routes:", error);
      message.error("Failed to load routes");
    } finally {
      setLoading(false);
    }
  }, [page]);

  // const handleScroll = useCallback(() => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //       document.documentElement.offsetHeight ||
  //     !hasMore
  //   ) {
  //     return;
  //   }
  //   loadRouteData();
  // }, [hasMore, loadRouteData]);
  const handleScroll = useCallback(
    (e) => {
      const container = e.target; // Lấy phần tử chứa danh sách (ví dụ <div>)

      // Kiểm tra nếu cuộn đến cuối trang
      const isAtBottom =
        container.scrollHeight === container.scrollTop + container.clientHeight;

      // Kiểm tra điều kiện dừng cuộn khi:
      // - Đã đạt đến trang cuối cùng (currentPage >= totalPages)
      // - Không còn dữ liệu để tải (hasMore === false)
      if (isAtBottom && hasMore && page < totalPages) {
        loadRouteData();
      }
    },
    [hasMore, page, totalPages, loadRouteData]
  );

  const loadRouteDataFilter = useCallback(
    (searchTerm) => {
      const filtered = routeData.filter(
        (route) =>
          route.origin_station_id?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          route.destination_station_id?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredRoutes(filtered);
      setVisibleUlli(true);
    },
    [routeData]
  );

  const loadVehicleDataId = useCallback(async () => {
    try {
      const res = await VehiclesService.getVehicleByEnterpriseId("all");
      setVehicleDataCode(res.data);
    } catch (error) {
      console.error("Error loading vehicle data:", error);
    }
  }, []);

  const handleReset = useCallback(() => {
    setFormData({
      routeId: "",
      vehicleCode: "",
      priceForOneSeat: "",
      departureTime: "",
      arrivalTime: "",
    });
    setVisibleUlli(false);
    setSearchTerm("");
  }, []);

  const handleCreateSchedule = useCallback(async () => {
    try {
      await ScheduleService.createSchedule(formData);
      enqueueSnackbar("Thêm lịch trình thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      handleReset();
      loadScheduleData();
      document.getElementById("closeButtonAddSchedule").click();
    } catch (error) {
      console.error("Error creating schedule:", error);
      message.error(
        error.response?.data?.message || "Failed to create schedule"
      );
    }
  }, [formData, handleReset, loadScheduleData]);

  const handleSelectRoute = (route) => {
    setSelectedRoute(
      `${route.origin_station_id?.name} - ${route.destination_station_id?.name}`
    );
    setSearchTerm(
      `${route.origin_station_id?.name} - ${route.destination_station_id?.name}`
    );
    setFilteredRoutes([]);
    setVisibleUlli(false);
  };

  useEffect(() => {
    loadRouteDataFilter(searchTerm);
  }, [searchTerm, loadRouteDataFilter]);

  useEffect(() => {
    loadScheduleData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadScheduleData, handleScroll]);

  useEffect(() => {
    if (schedulesData.length > 0) {
      const uniqueRoutes = Array.from(
        new Set(schedulesData.map((item) => item.routeId))
      );
      const formattedRoutes = uniqueRoutes.map((routeId) => ({
        key: routeId,
        label: `Tuyến ${routeId}`,
        onClick: () => {
          handleFilterByRoute(routeId);
          setSelected(`Tuyến ${routeId}`);
        },
      }));
      setRouteOptions(formattedRoutes);
    }
  }, [schedulesData, handleFilterByRoute]);

  useEffect(() => {
    document.title = "Quản lý chuyến xe";
  }, []);

  return (
    <div className="enterprise-schedules-container">
      <div className="title">
        <h1
          style={{
            fontSize: "30px",
            textTransform: "uppercase",
            color: "#ADADAD",
          }}
        >
          Lịch Trình
        </h1>
      </div>

      <div className="content mt-3">
        <div className="nav-filter">
          <div className="filter-schedules">
            <button
              onClick={() => handleSelectItem("all")}
              className={selectedItem === "all" ? "isActive" : ""}
            >
              Tất cả
            </button>
            <button
              onClick={() => handleSelectItem("complete")}
              className={selectedItem === "complete" ? "isActive" : ""}
            >
              Đã hoàn thành
            </button>
            <button
              onClick={() => handleSelectItem("uncomplete")}
              className={selectedItem === "uncomplete" ? "isActive" : ""}
            >
              Chưa hoàn thành
            </button>
          </div>

          <div className="nav-add-schedules">
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
              data-bs-target="#addSchedule"
              onClick={() => {
                loadVehicleDataId();
                loadRouteData();
              }}
            >
              Thêm Lịch Trình
            </button>
          </div>
        </div>
        <div className="content-table mt-4">
          <Table dataSource={schedulesData} columns={columns} />
        </div>
      </div>

      <div
        className="modal fade"
        id="addSchedule"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="m-0"> Danh Sách Xe</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeButtonAddSchedule"
                onClick={handleReset}
              ></button>
            </div>

            <div className="modal-nav p-2">
              <div className="row">
                <div>
                  <InputFlied
                    content={"Tìm tuyến đường..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {/* <div
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      boxShadow: "2px 2px 5px 5px #ccc",
                      borderRadius: "10px",
                    }}
                    onScroll={handleScroll}
                    className={`${visibleUlli ? "" : "d-none"}`}
                  >
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {filteredRoutes.length > 0
                        ? filteredRoutes.map((route, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelectRoute(route)}
                              className="li-list-route"
                            >
                              {route.origin_station_id?.name} -{" "}
                              {route.destination_station_id?.name}
                            </li>
                          ))
                        : visibleRoutes.map((route) => (
                            <li
                              key={route.id}
                              onClick={() => handleSelectRoute(route)}
                              className="li-list-route"
                            >
                              {route.origin_station_id?.name} -{" "}
                              {route.destination_station_id?.name}
                            </li>
                          ))}
                    </ul>
                  </div> */}
                  <div
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      boxShadow: "2px 2px 5px 5px #ccc",
                      borderRadius: "10px",
                    }}
                    onScroll={handleScroll}
                    className={`${visibleUlli ? "" : "d-none"}`}
                  >
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {filteredRoutes.length > 0
                        ? filteredRoutes.map((route, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelectRoute(route)}
                              className="li-list-route"
                            >
                              {route.origin_station_id?.name} -{" "}
                              {route.destination_station_id?.name}
                            </li>
                          ))
                        : visibleRoutes.map((route) => (
                            <li
                              key={route.route_id}
                              onClick={() => handleSelectRoute(route)}
                              className="li-list-route"
                            >
                              {route.origin_station_id?.name} -{" "}
                              {route.destination_station_id?.name}
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="busCode" className="form-label">
                    Mã Xe
                  </label>
                  <select
                    className="form-control"
                    id="busCode"
                    name="vehicleCode"
                    value={formData.vehicleCode}
                    onChange={handleChangeFormData}
                  >
                    <option value="" disabled>
                      Chọn Mã Xe
                    </option>
                    {vehicleDataCode.map((vehicle) => (
                      <option key={vehicle.code} value={vehicle.code}>
                        {vehicle.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="Price" className="form-label">
                    Giá Vé (VNĐ)
                  </label>
                  <input
                    className="form-control"
                    placeholder="Nhập giá vé"
                    name="priceForOneSeat"
                    value={formData.priceForOneSeat}
                    onChange={handleChangeFormData}
                  />
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="departureTime" className="form-label">
                    Ngày/Giờ Xuất Phát
                  </label>
                  <input
                    type="datetime-local"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChangeFormData}
                    id="departureTime"
                    className="form-control"
                  />
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="arrivalTime" className="form-label">
                    Ngày/Giờ Đến
                  </label>
                  <input
                    type="datetime-local"
                    id="arrivalTime"
                    className="form-control"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleChangeFormData}
                  />
                </div>
              </div>
            </div>

            <div className="modal3-footer">
              <button
                className="btn footer-btn"
                type="button"
                onClick={handleCreateSchedule}
              >
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
