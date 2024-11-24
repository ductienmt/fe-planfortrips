import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Sumbitenterprise.css";
import Http from "../../../services/Http";

const Sumbitenterprise = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState([]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [enterpriseForm, setEnterpriseForm] = useState({
    username: "",
    email: "",
    enterpriseName: "",
    representative: "",
    taxCode: "",
    phoneNumber: "",
    address: "",
    typeEnterpriseDetailId: "",
  });

  const getTypeEnterprise = async () => {
    try {
      const response = await Http.get(
        "http://localhost:8080/api/v1/type-enterprise-details/all"
      );
      console.log("response", response);
      setType(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 138);
    document.title = "Đăng ký doanh nghiệp";
    getTypeEnterprise();
  }, []);

  return (
    <main className="signInFormMainContainer">
      <section className="signInFormContentContainer">
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <h2 className="signInFormTitle">Đăng ký doanh nghiệp</h2>

          <TextField
            id="input-login"
            label="Tên người dùng * &nbsp;"
            variant="outlined"
            placeholder="Email hoặc số điện thoại"
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              id="input-email"
              label="Email"
              type="email"
              variant="outlined"
              placeholder="Nhập email của bạn"
              fullWidth
            />
            <TextField
              id="input-enterpriseName"
              label="Doanh nghiệp"
              variant="outlined"
              placeholder="Doanh nghiệp"
              fullWidth
            />
          </Box>

          <TextField
            id="input-representative"
            label="Người đại diện"
            variant="outlined"
            placeholder="Người đại diện"
          />
          <TextField
            id="input-taxCode"
            label="Mã số thuế"
            variant="outlined"
            placeholder="Mã số thuế"
          />
          <TextField
            id="input-phoneNumber"
            label="Số điện thoại"
            type="tel"
            variant="outlined"
            placeholder="Số điện thoại"
          />
          <TextField
            id="input-address"
            label="Địa chỉ"
            variant="outlined"
            placeholder="Địa chỉ"
          />

          <FormControl fullWidth>
            {/* <InputLabel id="business-type-label">Loại Doanh Nghiệp</InputLabel> */}
            {/* <Select
              labelId="business-type-label"
              id="business-type-select"
              value={type}
              label="Loại Doanh Nghiệp"
              onChange={handleChange}
            >
              <MenuItem value={10}>Khách Sạn</MenuItem>
              <MenuItem value={20}>Xe Khách</MenuItem>
              <MenuItem value={30}>Dịch Vụ Khác</MenuItem>
            </Select> */}
            <label htmlFor="">Loại doanh nghiệp</label>
            <select
              name="typeEnterpriseDetailId"
              id=""
              onChange={handleChange}
              style={{ height: "40px", backgroundColor: "transparent" }}
            >
              {type.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormControl>

          <Button className="customButton" variant="contained" sx={{ mt: 2 }}>
            Đăng ký
          </Button>
        </Box>

        <hr className="signInSeparator" />
      </section>
      <div className="signInBrandName">PlanForTrips</div>
    </main>
  );
};

export default Sumbitenterprise;
