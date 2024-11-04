import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import IOSSwitch from "./IOSSwitch";
import { CouponService } from "../../../services/apis/CouponService";

export default function CouponDialog({
  open,
  setOpen,
  editMode,
  setEditMode,
  setRows,
  selectedCouponId,
  viewMode,
}) {
  const [formData, setFormData] = useState({
    code: "",
    discount_type: 1,
    discount_value: "",
    start_date: "",
    end_date: "",
    use_limit: "",
    is_active: true,
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {editMode ? "Chỉnh sửa Mã Giảm Giá" : "Thêm Mã Giảm Giá"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="code"
          name="code"
          label="Mã"
          variant="outlined"
          value={formData.code}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: viewMode,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="discount-type-label">Thể loại giảm</InputLabel>
          <Select
            labelId="discount-type-label"
            id="discount-type"
            name="discount_type"
            value={formData.discount_type}
            onChange={handleInputChange}
            disabled={viewMode}
          >
            <MenuItem value={"PERCENT"}>Phần trăm</MenuItem>
            <MenuItem value={"FIXED_AMOUNT"}>Giá trị</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="discount-value"
          name="discount_value"
          label="Giá trị giảm"
          variant="outlined"
          value={formData.discount_value}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: viewMode,
          }}
        />
        <TextField
          id="start-date"
          name="start_date"
          label="Ngày bắt đầu"
          type="date"
          variant="outlined"
          value={formData.start_date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: viewMode,
          }}
        />
        <TextField
          id="end-date"
          name="end_date"
          label="Ngày kết thúc"
          type="date"
          variant="outlined"
          value={formData.end_date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: viewMode,
          }}
        />
        <TextField
          id="use-limit"
          name="use_limit"
          label="Giới hạn sử dụng"
          type="number"
          variant="outlined"
          value={formData.use_limit}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: viewMode,
          }}
        />
        <FormControlLabel
          control={
            <IOSSwitch
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
            />
          }
          label="Trạng thái kích hoạt"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button
          onClick={() => {
            editMode
              ? handleUpdate(formData, selectedCouponId)
              : handleSave(formData);
            handleClose();
          }}
          color="primary"
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
