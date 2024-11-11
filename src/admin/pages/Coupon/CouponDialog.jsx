import React, { useEffect, useState } from "react";
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
    use_count: 0,
    is_active: true,
  });
  const [errors, setErrors] = useState({});
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
    const newErrors = {};
    const {
      code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      use_limit,
    } = formData;

    if (!code) newErrors.code = "Mã không được để trống.";
    if (!discount_type)
      newErrors.discount_type = "Vui lòng chọn thể loại giảm giá.";
    if (!discount_value || isNaN(discount_value) || Number(discount_value) <= 0)
      newErrors.discount_value =
        "Giá trị giảm phải là một số hợp lệ và lớn hơn 0.";

    const startYear = new Date(start_date).getFullYear().toString();
    const endYear = new Date(end_date).getFullYear().toString();

    if (startYear.length > 4)
      newErrors.start_date = "Năm của ngày bắt đầu không được quá 4 chữ số.";
    if (endYear.length > 4)
      newErrors.end_date = "Năm của ngày kết thúc không được quá 4 chữ số.";

    if (new Date(start_date) < new Date())
      newErrors.start_date = "Ngày bắt đầu không được ở quá khứ.";
    if (new Date(end_date) < new Date(start_date))
      newErrors.end_date = "Ngày kết thúc phải sau ngày bắt đầu.";
    if (!use_limit || isNaN(use_limit) || Number(use_limit) < 0)
      newErrors.use_limit =
        "Giới hạn sử dụng phải là một số hợp lệ và không âm.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async (formData) => {
    if (!validateCouponData()) return;
    try {
      const response = await CouponService.createCoupon(formData);
      if (response) {
        const newFormData = { ...formData, coupon_id: response.coupon_id };
        toast("Tạo mới thành công");
        setRows((prevRows) => [...prevRows, newFormData]);
        handleClose();
      }
    } catch (error) {
      toast("Lỗi");
      console.log(error.message);
    }
  };

  const handleUpdate = async (formData, id) => {
    if (!validateCouponData()) return;
    try {
      const response = await CouponService.updateCoupon(id, formData);
      if (response) {
        toast("Cập nhật thành công");
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.coupon_id === response.coupon_id ? { ...row, ...formData } : row
          )
        );
        handleClose();
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
          error={!!errors.code}
          helperText={errors.code}
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
            error={!!errors.discount_type}
            helperText={errors.discount_type}
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
          error={!!errors.discount_value}
          helperText={errors.discount_value}
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
            min: "1900-01-01",
            max: "9999-12-31",
          }}
          error={!!errors.start_date}
          helperText={errors.start_date}
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
            min: "1900-01-01",
            max: "9999-12-31",
          }}
          error={!!errors.end_date}
          helperText={errors.end_date}
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
          error={!!errors.use_limit}
          helperText={errors.use_limit}
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
          }}
          color="primary"
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
