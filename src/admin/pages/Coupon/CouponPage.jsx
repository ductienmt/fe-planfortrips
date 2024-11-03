import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import {
  Button,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { CouponService } from "../../../services/apis/CouponService";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import CouponDialog from "./CouponDialog";
import IOSSwitch from "./IOSSwitch";

const paginationModel = { page: 0, pageSize: 20 };

export default function CouponAdmin() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedCouponId, setSelectedCouponId] = React.useState(null);
  const [viewMode, setViewMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    code: "",
    discount_type: 1, // default value
    discount_value: "",
    start_date: "",
    end_date: "",
    use_limit: "",
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

  const handleClose = () => {
    setOpen(false);
    setFormData({
      code: "",
      discountType: 1,
      discountValue: "",
      startDate: "",
      endDate: "",
      useLimit: "",
      is_active: true,
    });
  };

  React.useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponData = await CouponService.getCoupons(
          paginationModel.page,
          paginationModel.pageSize,
          ""
        );

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
  }, []);
  const validateCouponData = () => {
    const {
      code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      use_limit,
    } = formData;
    const errors = [];

    if (!code) errors.push("Mã không được để trống.");
    if (!discount_type) errors.push("Vui lòng chọn thể loại giảm giá.");
    if (!discount_value || isNaN(discount_value) || Number(discount_value) <= 0)
      errors.push("Giá trị giảm phải là một số hợp lệ và lớn hơn 0.");
    if (new Date(start_date) < new Date())
      errors.push("Ngày bắt đầu không được ở quá khứ.");
    if (new Date(end_date) < new Date(start_date))
      errors.push("Ngày kết thúc phải sau ngày bắt đầu.");
    if (!use_limit || isNaN(use_limit) || Number(use_limit) < 0)
      errors.push("Giới hạn sử dụng phải là một số hợp lệ và không âm.");

    return errors;
  };

  const handleSave = async (formData) => {
    const validationErrors = validateCouponData();
    if (validationErrors.length > 0) {
      toast(validationErrors.join(" "));
      return;
    }
    try {
      const response = await CouponService.createCoupon(formData);
      if (response) {
        const newFormData = { ...formData, coupon_id: response.coupon_id };
        toast("Tạo mới thành công");
        setRows((prevRows) => [...prevRows, newFormData]);
      }
    } catch (error) {
      toast("Lỗi");
      console.log(error.message);
    }
  };

  const handleUpdate = async (formData, id) => {
    const validationErrors = validateCouponData();
    if (validationErrors.length > 0) {
      toast(validationErrors.join(" "));
      return;
    }
    try {
      const response = await CouponService.updateCoupon(id, formData);
      if (response) {
        toast("Cập nhật thành công");
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.coupon_id === response.coupon_id ? { ...row, ...formData } : row
          )
        );
      }
    } catch (error) {
      toast("Lỗi");
      console.log(error.message);
    }
  };
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
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    { field: "code", headerName: "Mã", width: 150 },
    {
      field: "discount_type",
      headerName: "Thể loại giảm giá",
      width: 150,
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
      editable: true,
      renderCell: (params) => (
        <IOSSwitch
          name="active"
          checked={formData.active}
          onChange={handleInputChange}
        />
      ),
      width: 90,
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
            setViewMode(true);
          }}
        />,
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
        getRowId={(row) => row.coupon_id}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: EditToolbar }}
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
