import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { CouponService } from "../../../services/apis/CouponService";
import { toast } from "react-toastify";
import { TourService } from "../../../services/apis/TourService";
import TourForm from "./Tour";
import TourFormUpdate from "./TourEdit";

const paginationModel = { page: 0, pageSize: 100 };

export default function TourAdmin() {
  const [rows, setRows] = React.useState([]);
  const [selectedTourId, setSelectedTourId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleClick = (tour = null) => {
    setSelectedTourId(tour ? tour.tour_id : null);
  };

  React.useEffect(() => {
    const fetchTourData = async () => {
      try {
        const tourData = await TourService.getTours(
          paginationModel.page,
          paginationModel.pageSize
        );

        if (tourData && tourData.listResponse) {
          setRows(tourData.listResponse);
          setIsLoading(false);
        } else {
          console.warn(
            "Expected 'listResponse' in response data but received:",
            tourData
          );
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchTourData();
  }, []);
  const handleDelete = async (id) => {
    try {
      console.log("ID" +id);
      
      const response = await TourService.deleteTour(id);
      if (response) {("Xóa thành công");
        setRows((prevRows) => prevRows.filter((row) => row.tour_id !== id));
      }
    } catch (error) {
      toast("Lỗi");
      console.log(error.message);
    }
  };

  function EditToolbar() {
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
        );
        if (buttonCol) {
          buttonCol.innerHTML =
            "<i class='fas fa-table-columns me-2'></i> Các Cột";
        }
        if (buttonFilter) {
          buttonFilter.innerHTML = "<i class='fas fa-filter me-2'></i> Lọc";
        }
        if (buttonExport) {
          buttonExport.innerHTML = "<i class='fas fa-download me-2'></i> Xuất";
        }
      }, 100);
    }, []);
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <TourForm setRows={setRows}/>
        <GridToolbar />
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: "title", headerName: "Tiêu đề", width: 120 },
    {
      field: "number_people",
      headerName: "Số người tham gia",
      width: 90,
    },
    {
      field: "total_price",
      headerName: "Tổng số tiền",
      width: 90,
    },
    {
      field: "day",
      headerName: "Số ngày",
      width: 90,
    },
    {
      field: "night",
      headerName: "Số đêm",
      width: 90,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 150,
      renderCell: (params) => {
        const tags = params.value;
        return (
          <div>
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  marginRight: "5px",
                  background: "#f0f0f0",
                  padding: "2px 5px",
                  borderRadius: "3px",
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      field: "is_active",
      headerName: "Trạng thái",
      renderCell: (params) => {
        if (params.value) {
          return (
            <span
              style={{
                padding: "4px 8px",
                backgroundColor: "rgb(202 222 207)",
                color: "rgb(31 159 60)",
                border: "2px solid rgb(71 180 96)",
                borderRadius: "4px",
              }}
            >
              Hoạt động
            </span>
          );
        }
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
            Hết hạn
          </span>
        );
      },
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      width: 100,

      getActions: (params) => [
        <Edit
          key="edit"
          style={{ cursor: "pointer" }}
          data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
          onClick={() => {
            handleClick(params.row);
          }}
        />,
        <Delete
          key="delete"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(params.row.tour_id);
          }}
        />,
        // <RemoveRedEye
        //   key="detail"
        //   style={{ cursor: "pointer" }}
        //   onClick={() => {
        //     handleClick(params.row);
        //   }}
        // />,
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
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
        }}
        getRowHeight={(params) => {
          const baseHeight = 52; // Chiều cao tối thiểu
          if (params.model.tags && params.model.tags.length > 1) {
            return baseHeight + (params.model.tags.length * 10); 
          }
          return baseHeight;
        }}
        checkboxSelection={false}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={(row) => row.tour_id}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
        slots={{ toolbar: EditToolbar }}
        sx={{
          borderRadius: 2,
          border: "1px solid #ddd",
          background: "#FFF",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
      <TourFormUpdate setRows={setRows} selectedTourId={selectedTourId}/>
    </Box>
  );
}
