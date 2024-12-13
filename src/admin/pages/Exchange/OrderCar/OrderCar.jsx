import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { UserService } from "../../../../services/apis/UserService";
import { OrderCarService } from "../../../../services/apis/OrderCarService";
import { Pending, RemoveRedEye } from "@mui/icons-material";
import OrderCarDetail from "./OrderCarDetail/OrderCarDetail";
export default function OrderCarPage() {
  const [orderCar, setOrderCar] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedTicket, setSelectedTicket] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = (ticket) => {    
    setSelectedTicket(ticket);
    setOpen(true);
  };
  React.useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const ticketData = await OrderCarService.getAllTickets();

        if (ticketData && ticketData.listResponse) {
          setOrderCar(ticketData.listResponse);
          setIsLoading(false);
        } else {
          console.warn(
            "Expected 'listResponse' in response data but received:",
            ticketData
          );
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);
  const ToolBar = ()=>{
    React.useEffect(() => {
      setTimeout(() => {
        const buttonCol = document.querySelector(
          "button[aria-label='Select columns']"
        );
        const buttonFilter = document.querySelector(
          "button[aria-label='Show filters']"
        );
        const buttonExport = document.querySelector(
          "button[aria-label='Export']"
        )
        if (buttonCol) {
          buttonCol.innerHTML = "<i class='fas fa-table-columns me-2'></i> Các Cột";
        }
        if(buttonFilter){
          buttonFilter.innerHTML = "<i class='fas fa-filter me-2'></i> Lọc"
        }
        if(buttonExport){
          buttonExport.innerHTML = "<i class='fas fa-download me-2'></i> Xuất"
        }
      }, 100);
    }, []);
    return (
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <GridToolbar />
      </Box>
    );
  }
  const columns = [
    { field: "ticket_id", headerName: "ID", width: 90 },
    {
      field: "user_id",
      headerName: "Người dùng",
      width: 150,
      renderCell: (params) => {
        const [userName, setUserName] = React.useState("");
        React.useEffect(() => {
          const fetchUser = async () => {
            try {
              const response = await UserService.findUserById(
                params.row.user_id
              );
              setUserName(response.data.fullName);
            } catch (error) {
              console.error("Error fetching user:", error);
              setUserName("Unknown User");
            }
          };

          if (params.value) {
            fetchUser();
          }
        }, []);

        return <p>{userName || "Loading..."}</p>;
      },
    },
    {
      field: "total_price",
      headerName: "Tổng tiền",
      type: "number",
      width: 110,
    },
    {
      field: "schedule",
      headerName: "Lịch trình",
      width: 250,
      renderCell: (params) => {
        const schedule = params.row.schedule.route;
        return (
          <p>{`Ga ${schedule.destinationStation.name} - Ga ${schedule.originStation.name}`}</p>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 110,
      renderCell: (params) => {
        if (params.value === "Cancelled") {
          return (
            <span
              style={{
                padding: "4px 8px",
                backgroundColor: "rgb(222 202 202)",
                color: "rgb(159 31 31)",
                border: "2px solid rgb(180 71 71)",
                borderRadius: "4px",
              }}
            >
              {params.value}
            </span>
          );
        } else if (params.value === "Complete") {
          return (
            <span
              style={{
                padding: "4px 8px",
                backgroundColor: "#EBFFF8",
                color: "#0B6E4F",
                border: "2px solid #0B6E4F",
                borderRadius: "4px",
              }}
            >
              {params.value}
            </span>
          );
        } else if (params.value === "Pending") {
          return (
            <span
              style={{
                padding: "4px 8px",
                backgroundColor: "rgb(208 202 222)",
                color: "rgb(31 60 159)",
                border: "2px solid rgb(71 101 180)",
                borderRadius: "4px",
              }}
            >
              {params.value}
            </span>
          );
        }
      },
    },
    {
      field: "create_at",
      headerName: "Ngày tạo",
      type: "date",
      width: 110,
      valueGetter: (params) => {
        const dateStr = params;
        return dateStr ? new Date(dateStr) : new Date();
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      width: 100,
      getActions: (params) => [
        <RemoveRedEye
          key="view"
          onClick={() => {
            handleClick(params.row);
          }}
        />,
      ],
    },
  ];
  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: "40px",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <DataGrid
        loading={isLoading}
        rows={orderCar}
        getRowId={(row) => row.ticket_id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        slots={{ toolbar: ToolBar }}
        disableRowSelectionOnClick
        sx={{
          borderRadius: 2,
          border: "1px solid #ddd",
          background: "#FFF",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
      <OrderCarDetail
        open={open}
        setOpen={setOpen}
        selectedTicket={selectedTicket}
      />
    </Box>
  );
}
