import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { CouponService } from "../../../services/apis/CouponService";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import CouponDialog from "./CouponDialog";
const paginationModel = { page: 0, pageSize: 200 };

export default function CouponAdmin() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedCouponId, setSelectedCouponId] = React.useState(null);
  const [viewMode, setViewMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRemove,setIsRemove] = React.useState(false)
  const [formData, setFormData] = React.useState({
    code: "",
    discount_type: 1, // default value
    discount_value: "",
    start_date: "",
    end_date: "",
    use_limit: "",
    use_count: 0,
    is_active: true,
  });

  const handleClick = (coupon = null) => {
    setEditMode(!!coupon);
    setSelectedCouponId(coupon ? coupon.coupon_id : null);
    setFormData(
      coupon || {
        code: "",
        discount_type: 1,
        discount_value: "",
        start_date: "",
        end_date: "",
        use_limit: "",
        is_active: true,
      }
    );
    setOpen(true);
  };

  React.useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponData = await CouponService.getCoupons(
          paginationModel.page,
          paginationModel.pageSize,
          ""
        );
        setIsRemove(false)
        if (couponData && couponData.listResponse) {
          setRows(couponData.listResponse);
          setIsLoading(false);
        } else {
          console.warn(
            "Expected 'listResponse' in response data but received:",
            couponData
          );
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, [setIsRemove]);
  const handleDelete = async (id) => {
    try {
      const response = await CouponService.deleteCoupon(id);
      if (response) {
        toast.success("Xóa thành công");
        // setRows((prevRows) => prevRows.filter((row) => row.coupon_id !== id));
        setIsRemove(true)
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
      <GridToolbarContainer
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
          Thêm mã giảm
        </Button>
        <GridToolbar />
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: "code", headerName: "Mã voucher", width: 90 },
    {
      field: "discount_type",
      headerName: "Thể loại giảm giá",
      width: 150,
      valueGetter: (params) => {
        const discount_type = params;
        return discount_type == "PERCENT" ? "Phần trăm (%) " : "Giá trị (VNĐ) ";
      },
    },
    {
      field: "discount_value",
      headerName: "Giá trị giảm",
      width: 90,
    },
    {
      field: "start_date",
      headerName: "Ngày bắt đầu",
      type: "date",
      width: 130,
      valueGetter: (params) => {
        const dateStr = params;
        return dateStr ? new Date(dateStr) : new Date();
      },
    },
    {
      field: "end_date",
      headerName: "Ngày kết thúc",
      type: "date",
      width: 130,
      valueGetter: (params) => {
        const dateStr = params;
        return dateStr ? new Date(dateStr) : new Date();
      },
    },
    {
      field: "use_limit",
      headerName: "Giới hạn",
      type: "number",
      width: 90,
    },
    { field: "use_count", headerName: "Lượt dùng", type: "number", width: 90 },
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
              Còn hạn
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
          style={{ cursor:"pointer" }}
          onClick={() => {
            handleClick(params.row);
            setEditMode(true)
            setViewMode(false);
          }}
        />,
        <Delete
          key="delete"
          style={{ cursor:"pointer" }}
          onClick={() => {
            handleDelete(params.row.coupon_id);
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
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
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
        getRowId={(row) => row.coupon_id}
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
      <CouponDialog
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
