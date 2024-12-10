import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Pending, RemoveRedEye } from "@mui/icons-material";
import { FeedbackService } from "../../../services/apis/FeedbackService";
import { UserService } from "../../../services/apis/UserService";
import { Star } from "../Components/Star";
import FeedbackDetail from "./Feedback/FeedbackDetail";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedTicket, setSelectedTicket] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (ticket) => {
    console.log(ticket);

    setSelectedTicket(ticket);
    setOpen(true);
  };

  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackData = await FeedbackService.getAllFeedbacks();
        if (feedbackData) {
          setFeedbacks(feedbackData);
          setIsLoading(false);
        } else {
          console.warn("Expected feedback data but received:", feedbackData);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
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
    { field: "id", headerName: "ID", width: 270 },
    {
      field: "userName",
      headerName: "Người dùng",
      width: 150,
      renderCell: (params) => {
        const [userName, setUserName] = React.useState("Loading...");
        React.useEffect(() => {
          const fetchUser = async () => {
            try {
              const response = await UserService.findUserByUsername(
                params.row.userName
              );
              setUserName(response.fullName);
            } catch (error) {
              console.error("Error fetching user:", error);
              setUserName("Unknown User");
            }
          };
          if (params.value) fetchUser();
        }, [params.value]);

        return <p>{userName}</p>;
      },
    },
    {
      field: "content",
      headerName: "Nội dung",
      width: 110,
    },
    {
      field: "rating",
      headerName: "Đánh giá",
      width: 90,
      renderCell: (params) => <Star rating={params.value} />,
    },
    {
      field: "createdAt",
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
      renderCell: (params) => (
        <RemoveRedEye
          onClick={() => handleClick(params.row)}
          style={{ cursor: "pointer" }}
        />
      ),
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
        rows={feedbacks}
        getRowId={(row) => row.id}
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
      <FeedbackDetail
        open={open}
        setOpen={setOpen}
        selectedTicket={selectedTicket}
      />
    </Box>
  );
}
