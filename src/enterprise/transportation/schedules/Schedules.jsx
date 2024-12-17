// import React, { useEffect, useRef, useState } from "react";
// import "./Schedules.css";
// import { Dropdown, Space, Table } from "antd";
// import { DownOutlined } from "@ant-design/icons";
// import { ScheduleService } from "../../../services/apis/ScheduleService";
// import { DateFormatter } from "../../../utils/DateFormat";
// import { convertToVNDDB } from "../../../utils/FormatMoney";
// import { RouteService } from "../../../services/apis/RouteService";
// import { List, Spin, message } from "antd";

// const Schedules = () => {
//   const [schedulesData, setScheduleData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState("all");
//   const [routeOptions, setRouteOptions] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selected, setSelected] = useState("Tất cả");
//   const [routeData, setRouteData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const limit = 5;
//   const selectRef = useRef(null);

//   const handleFilterByRoute = (routeId) => {
//     if (routeId === "all") {
//       return loadScheduleData();
//     }
//     const filtered = schedulesData.filter((item) => item.routeId === routeId);
//     setScheduleData(filtered);
//   };

//   const columns = [
//     {
//       title: "Mã Tuyến",
//       dataIndex: "routeId",
//       key: "routeId",
//     },
//     {
//       title: "Điểm xuất phát",
//       dataIndex: "departureStation",
//       key: "departureStation",
//     },
//     {
//       title: "Điểm đến",
//       dataIndex: "arrivalStation",
//       key: "arrivalStation",
//     },
//     {
//       title: "Ngày/Giờ Xuất Phát",
//       dataIndex: "departureTime",
//       key: "departureTime",
//       render: (text) => DateFormatter(text),
//     },
//     {
//       title: "Ngày/Giờ Đến",
//       dataIndex: "arrivalTime",
//       key: "arrivalTime",
//       render: (text) => DateFormatter(text),
//     },
//     {
//       title: "Mã Xe",
//       dataIndex: "vehicleCode",
//       key: "vehicleCode",
//     },
//     {
//       title: "Giá Vé",
//       dataIndex: "priceForOneTicket",
//       key: "priceForOneTicket",
//       render: (text) => convertToVNDDB(text),
//     },
//     {
//       title: "Hành Động",
//       dataIndex: "action",
//       key: "action",
//     },
//   ];

//   const items = [
//     {
//       key: "0",
//       label: "Tất cả",
//       onClick: () => {
//         setSelected("Tất cả"), handleFilterByRoute("all");
//       },
//     },
//     {
//       key: "1",
//       label: "Mã tuyến",
//       children: routeOptions,
//     },
//   ];

//   const loadScheduleDataFilter = async (value) => {
//     try {
//       const res = await ScheduleService.getScheduleByEnterpriseId(value);
//       console.log(res.data.data);

//       setScheduleData(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadScheduleData = async () => {
//     try {
//       const res = await ScheduleService.getScheduleByEnterpriseId("all");
//       setScheduleData(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setSelectedItem(item);
//     loadScheduleDataFilter(item);
//   };

//   const loadRouteData = async () => {
//     try {
//       const res = await RouteService.getAll(page, limit);

//       if (res.listResponse.length > 0) {
//         setRouteData((prevData) => [...prevData, ...res.listResponse]);
//         setPage((prevPage) => prevPage + 1);
//       } else {
//         setHasMore(false); // Không còn dữ liệu để load
//       }
//     } catch (error) {
//       console.error("Error loading routes:", error);
//     }
//   };

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//         document.documentElement.offsetHeight ||
//       !hasMore
//     ) {
//       return;
//     }
//     loadRouteData();
//   };

//   useEffect(() => {
//     loadScheduleData();
//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (schedulesData.length > 0) {
//       const uniqueRoutes = Array.from(
//         new Set(schedulesData.map((item) => item.routeId))
//       );

//       const formattedRoutes = uniqueRoutes.map((routeId) => ({
//         key: routeId,
//         label: `Tuyến ${routeId}`,
//         onClick: () => {
//           handleFilterByRoute(routeId), setSelected(`Tuyến ${routeId}`);
//         },
//       }));

//       setRouteOptions(formattedRoutes);
//     }
//   }, [schedulesData]);

//   return (
//     <>
//       <div className="enterprise-schedules-container">
//         <div className="title">
//           <h1
//             style={{
//               fontSize: "30px",
//               textTransform: "uppercase",
//               color: "#ADADAD",
//             }}
//           >
//             Lịch Trình
//           </h1>
//         </div>

//         <div className="content mt-3">
//           <div className="nav-filter">
//             <div className="filter-schedules">
//               <button
//                 onClick={() => handleSelectItem("all")}
//                 className={selectedItem === "all" ? "isActive" : ""}
//               >
//                 Tất cả
//               </button>
//               <button
//                 onClick={() => handleSelectItem("complete")}
//                 className={selectedItem === "complete" ? "isActive" : ""}
//               >
//                 Đã hoàn thành
//               </button>
//               <button
//                 onClick={() => handleSelectItem("uncomplete")}
//                 className={selectedItem === "uncomplete" ? "isActive" : ""}
//               >
//                 Chưa hoàn thành
//               </button>
//             </div>

//             <div className="nav-add-schedules">
//               <Dropdown menu={{ items }}>
//                 <a
//                   onClick={(e) => e.preventDefault()}
//                   style={{
//                     padding: "8px 20px",
//                     borderRadius: "10px",
//                     border: "1px solid #ccc",
//                     outline: "none",
//                     backgroundColor: "transparent",
//                     color: "#adadad",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <Space>
//                     {selected} <DownOutlined />
//                   </Space>
//                 </a>
//               </Dropdown>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 data-bs-toggle="modal"
//                 data-bs-target="#addSchedule"
//                 onClick={() => {
//                   loadRouteData();
//                 }}
//               >
//                 Thêm Lịch Trình
//               </button>
//             </div>
//           </div>
//           <div className="content-table mt-4">
//             <Table dataSource={schedulesData} columns={columns} />
//           </div>
//         </div>
//       </div>

//       <div
//         className="modal fade"
//         id="addSchedule"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="m-0"> Danh Sách Xe</h3>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <div className="modal-nav p-2">
//               <div className="row">
//                 <div>
//                   <label htmlFor="routeSelect">Chọn Mã Tuyến</label>
//                   <div style={{ position: "relative" }}>
//                     <select
//                       id="routeSelect"
//                       ref={selectRef}
//                       onScroll={handleScroll}
//                       style={{
//                         width: "100%",
//                         overflowY: "auto",
//                         padding: "10px",
//                         borderRadius: "5px",
//                       }}
//                     >
//                       {routeData.map((route) => (
//                         <option key={route.route_id} value={route.route_id}>
//                           {route.origin_station_id.name} -{" "}
//                           {route.destination_station_id.name}
//                         </option>
//                       ))}
//                     </select>
//                     {loading && (
//                       <div
//                         style={{
//                           position: "absolute",
//                           bottom: "5px",
//                           width: "100%",
//                           textAlign: "center",
//                         }}
//                       >
//                         <Spin size="small" />
//                       </div>
//                     )}
//                   </div>
//                   {!hasMore && (
//                     <p style={{ textAlign: "center", marginTop: "10px" }}>
//                       Đã tải hết tất cả dữ liệu
//                     </p>
//                   )}
//                 </div>

//                 <div className="col-6 mb-3">
//                   <label htmlFor="busCode" className="form-label">
//                     Mã Xe
//                   </label>
//                   <select className="form-control" id="busCode" name="busCode">
//                     <option value="">Chọn Mã Xe</option>
//                     <option value="bus1">Xe 1</option>
//                     <option value="bus2">Xe 2</option>
//                     <option value="bus3">Xe 3</option>
//                     <option value="bus4">Xe 4</option>
//                     {/* Thêm các lựa chọn khác nếu cần */}
//                   </select>
//                 </div>

//                 <div className="col-6 mb-3">
//                   <label htmlFor="Price" className="form-label">
//                     Giá Vé (VNĐ)
//                   </label>
//                   <input className="form-control" placeholder="Nhập giá vé" />
//                 </div>

//                 <div className="col-6 mb-3">
//                   <label htmlFor="departureTime" className="form-label">
//                     Ngày/Giờ Xuất Phát
//                   </label>
//                   <input
//                     type="datetime-local"
//                     id="departureTime"
//                     className="form-control"
//                   />
//                 </div>

//                 <div className="col-6 mb-3">
//                   <label htmlFor="arrivalTime" className="form-label">
//                     Ngày/Giờ Đến
//                   </label>
//                   <input type="datetime-local" id="" className="form-control" />
//                 </div>
//               </div>
//             </div>

//             <div className="modal3-footer">
//               <button className="btn footer-btn" type="button">
//                 Xác Nhận
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Schedules;

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
import debounce from "lodash.debounce";
import Select from "react-select";

const Schedules = () => {
  const [schedulesData, setScheduleData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("all");
  const [routeOptions, setRouteOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState("Tất cả");

  const handleFilterByRoute = useCallback(
    (routeId) => {
      if (routeId === "all") {
        return loadScheduleData();
      }
      const filtered = schedulesData.filter((item) => item.routeId === routeId);
      setFilteredData(filtered);
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
      setFilteredData(res.data.data);
    } catch (error) {
      console.error("Error loading schedule data:", error);
      message.error("Failed to load schedule data");
    }
  }, []);

  const loadScheduleDataFilter = useCallback(
    debounce(async (value) => {
      try {
        const res = await ScheduleService.getScheduleByEnterpriseId(value);
        setScheduleData(res.data.data);
      } catch (error) {
        console.error("Error loading filtered schedule data:", error);
        message.error("Failed to load filtered schedule data");
      }
    }, 300),
    []
  );

  const handleSelectItem = useCallback(
    (item) => {
      setSelectedItem(item);
      loadScheduleDataFilter(item);
    },
    [loadScheduleDataFilter]
  );

  useEffect(() => {
    loadScheduleData();
  }, [loadScheduleData]);

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
              // onClick={loadRouteData}
            >
              Thêm Lịch Trình
            </button>
          </div>
        </div>
        <div className="content-table mt-4">
          <Table dataSource={filteredData} columns={columns} />
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
              ></button>
            </div>

            <div className="modal-nav p-2">
              <div className="row">
                <div>
                  <label htmlFor="routeSelect">Chọn Mã Tuyến</label>
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="busCode" className="form-label">
                    Mã Xe
                  </label>
                  <select className="form-control" id="busCode" name="busCode">
                    <option value="">Chọn Mã Xe</option>
                    <option value="bus1">Xe 1</option>
                    <option value="bus2">Xe 2</option>
                    <option value="bus3">Xe 3</option>
                    <option value="bus4">Xe 4</option>
                  </select>
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="Price" className="form-label">
                    Giá Vé (VNĐ)
                  </label>
                  <input className="form-control" placeholder="Nhập giá vé" />
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="departureTime" className="form-label">
                    Ngày/Giờ Xuất Phát
                  </label>
                  <input
                    type="datetime-local"
                    id="departureTime"
                    className="form-control"
                  />
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="arrivalTime" className="form-label">
                    Ngày/Giờ Đến
                  </label>
                  <input type="datetime-local" id="" className="form-control" />
                </div>
              </div>
            </div>

            <div className="modal3-footer">
              <button className="btn footer-btn" type="button">
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
