import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Switch } from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { CouponService } from "../../../services/apis/CouponService";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import PlaceDialog from "./PlaceDialog";
import { PlaceService } from "../../../services/apis/PlaceService";

const paginationModel = { page: 0, pageSize: 100 };

export default function PlacePageAdmin() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedCouponId, setSelectedCouponId] = React.useState(null);
  const [viewMode, setViewMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
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
        const couponData = await PlaceService.getData(
          paginationModel.page,
          paginationModel.pageSize,
          ""
        );
        if (couponData && couponData.checkinResponses) {
          setRows(couponData.checkinResponses);
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
      const response = await CouponService.deleteCoupon(id);
      if (response) {
        toast("Cập nhật thành công");
        setRows((prevRows) => prevRows.filter((row) => row.coupon_id !== id));
      }
    } catch (error) {
      toast("Lỗi");
      console.log(error.message);
    }
  };

  function EditToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          style={{ fontSize: "13px", padding: "4px 5px" }}
          startIcon={<AddIcon />}
          onClick={() => {
            setEditMode(false);
            setOpen(true);
          }}
        >
          Thêm mã giảm
        </Button>
        <GridToolbar />
      </GridToolbarContainer>
    );
  }

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
            handleDelete(params.row.coupon_id);
          }}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
              pageSize: 5,
            },
          },
        }}
        getRowId={(row) => row.id}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: EditToolbar }}
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
