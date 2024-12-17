import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Switch, Toolbar } from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { CouponService } from "../../../services/apis/CouponService";
import AddIcon from "@mui/icons-material/Add";
import PlaceDialog from "./PlaceDialog";
import { PlaceService } from "../../../services/apis/PlaceService";
import { CheckinService } from "../../../services/apis/CheckinService";
import { toast } from "react-toastify";

export default function PlacePageAdmin() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedCouponId, setSelectedCouponId] = React.useState(null);
  const [viewMode, setViewMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pageCurrent, setPageCurrent] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [formData, setFormData] = React.useState({
    cityId: "",
    name: "", // default value
    address: "",
    latitude: "",
    longitude: "",
    payFee: 0,
  });

  const handleClick = (coupon = null) => {
    console.log(coupon);

    setEditMode(!!coupon);
    setSelectedCouponId(coupon ? coupon.id : null);
    setFormData(
      coupon || {
        cityId: "",
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        payFee: 0,
      }
    );
    setOpen(true);
  };

  React.useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponData = await PlaceService.getData(pageCurrent);
        if (couponData && couponData.checkinResponses) {
          setRows(couponData.checkinResponses);
          setTotalPage(couponData.totalPages);
          setIsLoading(false);
        } else {
          console.warn(
            "Expected 'checkinResponses' in response data but received:",
            couponData
          );
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await CheckinService.delete(id);
      if (response) {
        toast("Xóa thành công");
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      toast("Lỗi");
      console.log(error.message);
    }
  };
  const ToolBar = () => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          style={{ fontSize: "13px", padding: "4px 5px" }}
          startIcon={<AddIcon />}
          onClick={() => {
            setEditMode(false);
            setOpen(true);
          }}
        >
          Thêm địa điểm
        </Button>
        <GridToolbar />
      </Box>
    );
  };
  const columns = [
    { field: "cityName", headerName: "Tên thành phố", width: 240 },
    {
      field: "name",
      headerName: "Tên",
      width: 240,
    },
    {
      field: "address",
      headerName: "Địa điểm",
      width: 240,
    },
    {
      field: "payFee",
      headerName: "Phí",
      type: "number",
      width: 90,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      width: 100,
      getActions: (params) => [
        // <RemoveRedEye
        //   key="view"
        //   onClick={() => {
        //     handleClick(params.row);
        //     setViewMode(true);
        //   }}
        // />,
        <Edit
          key="edit"
          onClick={() => {
            handleClick(params.row);
            setViewMode(false);
          }}
        />,
        <Delete
          key="delete"
          onClick={() => {
            console.log(params);
            handleDelete(params.row.id);
          }}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <DataGrid
        loading={isLoading}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        slots={{ toolbar: ToolBar }}
      />
      <PlaceDialog
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        setEditMode={setEditMode}
        setRows={setRows}
        selectedCouponId={selectedCouponId}
        viewMode={viewMode}
      />
    </Box>
  );
}
