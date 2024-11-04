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
      width: 90,
      renderCell: (params) => {
        if (params.value === "Cancelled") {
          return (
            <div
              style={{
                border: "1px solid #DF0404",
                background: "#FFC5C5",
                color: "#DF0404",
                margin: "6px 0px 8px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              {params.value}
            </div>
          );
        } else if (params.value === "Complete") {
          return (
            <div
              style={{
                border: "1px solid #00B087",
                background: "#16C098",
                color: "#fff",
                margin: "6px 0px 8px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              {params.value}
            </div>
          );
        } else if (params.value === "Pending") {
          return (
            <div
              style={{
                border: "1px solid #FFCF00",
                background: "#FFF9C5",
                color: "#FFCF00",
                margin: "6px 0px 8px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              {params.value}
            </div>
          );
        }
      },
    },
    {
      field: "created_at",
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
    <Box sx={{ height: 400, width: "100%" }}>
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
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
      />
      <OrderCarDetail open={open} setOpen={setOpen} selectedTicket={selectedTicket}/>
    </Box>
  );
}
