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
                params.value
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
    <Box sx={{ height: 400, width: "100%" }}>
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
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
      />
      <FeedbackDetail  open={open} setOpen={setOpen} selectedTicket={selectedTicket}/>
    </Box>
  );
}
