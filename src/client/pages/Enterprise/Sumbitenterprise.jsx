import React, { useEffect, useState } from "react";
import { Box, TextField, Button, FormControl } from "@mui/material";
import "./Sumbitenterprise.css";
import { TypeEnterpriseDetailService } from "../../../services/apis/TypeEnterpriseDetailService";
import { CityService } from "../../../services/apis/CityService";
import { enqueueSnackbar } from "notistack";
import { AccountEtpService } from "../../../services/apis/AccountEnterprise";
import { useNavigate } from "react-router-dom";

const Sumbitenterprise = () => {
  const [type, setType] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [validation, setValidation] = useState({
    username: true,
    email: true,
    phoneNumber: true,
  });
  const navigate = useNavigate();
  const [enterpriseForm, setEnterpriseForm] = useState({
    username: "",
    email: "",
    enterpriseName: "",
    representative: "",
    taxCode: "",
    phoneNumber: "",
    address: "",
    typeEnterpriseDetailId: "",
    cityId: "",
  });

  const fetchData = async () => {
    try {
      const [typeResponse, cityResponse] = await Promise.all([
        TypeEnterpriseDetailService.getAll(),
        CityService.getAll(),
      ]);
      setType(typeResponse.data);
      setCityData(cityResponse);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnterpriseForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      username,
      email,
      phoneNumber,
      enterpriseName,
      representative,

      address,
      typeEnterpriseDetailId,
      cityId,
    } = enterpriseForm;
    const newValidation = {
      username: !!username,
      email: !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      phoneNumber: !!phoneNumber && /^\d{10,11}$/.test(phoneNumber),
      enterpriseName: !!enterpriseName,
      representative: !!representative,

      address: !!address,
      typeEnterpriseDetailId: !!typeEnterpriseDetailId,
      cityId: !!cityId,
    };
    setValidation(newValidation);
    return Object.values(newValidation).every(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    if (!validation.username || !validation.email || !validation.phoneNumber) {
      enqueueSnackbar("Vui lòng kiểm tra lại thông tin", { variant: "error" });
      return;
    }
    try {
      const res = await AccountEtpService.create(enterpriseForm);
      enqueueSnackbar(
        "Đăng ký thành công bạn chờ được duyệt và liên hệ trong 24h nhé",
        {
          variant: "success",
          autoHideDuration: 2000,
          onExit: () => {
            navigate("/");
          },
        }
      );
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  const handleCheckUsername = async () => {
    const { username } = enterpriseForm;
    try {
      const res = await AccountEtpService.checkUsername(username);
      setValidation((prev) => ({ ...prev, username: !res.data.isExist }));
      if (res.data.isExist) {
        enqueueSnackbar("Tên người dùng đã tồn tại", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response.data.message || "Tên người dùng đã tồn tại",
        { variant: "error", autoHideDuration: 3000 }
      );
    }
  };

  const handleCheckEmail = async () => {
    const { email } = enterpriseForm;
    try {
      const res = await AccountEtpService.checkEmail(email);
      setValidation((prev) => ({ ...prev, email: !res.data.isExist }));
      if (res.data.isExist) {
        enqueueSnackbar("Email đã tồn tại", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message || "Email đã tồn tại", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleCheckPhone = async () => {
    const { phoneNumber } = enterpriseForm;
    try {
      const res = await AccountEtpService.checkPhone(phoneNumber);
      setValidation((prev) => ({ ...prev, phoneNumber: !res.data.isExist }));
      if (res.data.isExist) {
        enqueueSnackbar("Số điện thoại đã tồn tại", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response.data.message || "Số điện thoại đã tồn tại",
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 138);
    document.title = "Đăng ký doanh nghiệp";
    fetchData();
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
          onSubmit={handleSubmit}
        >
          <h2 className="signInFormTitle">Đăng ký doanh nghiệp</h2>

          <TextField
            id="input-login"
            label="Tên người dùng * &nbsp;"
            variant="outlined"
            placeholder="Email hoặc số điện thoại"
            fullWidth
            name="username"
            value={enterpriseForm.username}
            onChange={handleChange}
            onBlur={handleCheckUsername}
            error={!validation.username}
            helperText={!validation.username && "Tên người dùng đã tồn tại"}
            required
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              id="input-email"
              label="Email"
              type="email"
              variant="outlined"
              placeholder="Nhập email của bạn"
              fullWidth
              name="email"
              value={enterpriseForm.email}
              onChange={handleChange}
              onBlur={handleCheckEmail}
              error={!validation.email}
              helperText={!validation.email && "Email đã tồn tại"}
              required
            />
            <TextField
              id="input-enterpriseName"
              label="Tên doanh nghiệp"
              variant="outlined"
              placeholder="Tên doanh nghiệp"
              fullWidth
              name="enterpriseName"
              value={enterpriseForm.enterpriseName}
              onChange={handleChange}
              required
            />
          </Box>

          <TextField
            id="input-representative"
            label="Người đại diện"
            variant="outlined"
            placeholder="Người đại diện"
            name="representative"
            value={enterpriseForm.representative}
            onChange={handleChange}
            required
          />
          <TextField
            id="input-taxCode"
            label="Mã số thuế"
            variant="outlined"
            placeholder="Mã số thuế"
            name="taxCode"
            value={enterpriseForm.taxCode}
            onChange={handleChange}
          />
          <TextField
            id="input-phoneNumber"
            label="Số điện thoại"
            type="tel"
            variant="outlined"
            placeholder="Số điện thoại"
            name="phoneNumber"
            value={enterpriseForm.phoneNumber}
            onChange={handleChange}
            onBlur={handleCheckPhone}
            error={!validation.phoneNumber}
            helperText={!validation.phoneNumber && "Số điện thoại đã tồn tại"}
            required
          />
          <TextField
            id="input-address"
            label="Địa chỉ"
            variant="outlined"
            placeholder="Địa chỉ"
            name="address"
            value={enterpriseForm.address}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth>
            <label htmlFor="typeEnterpriseDetailId">Loại doanh nghiệp</label>
            <select
              name="typeEnterpriseDetailId"
              id="typeEnterpriseDetailId"
              value={enterpriseForm.typeEnterpriseDetailId}
              onChange={handleChange}
              style={{ height: "40px", backgroundColor: "transparent" }}
              required
            >
              <option value="" disabled>
                Chọn loại doanh nghiệp
              </option>
              {type.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <label htmlFor="cityId">Tỉnh/Thành phố</label>
            <select
              name="cityId"
              id="cityId"
              value={enterpriseForm.cityId}
              onChange={handleChange}
              style={{ height: "40px", backgroundColor: "transparent" }}
              required
            >
              <option value="" disabled>
                Chọn tỉnh/thành phố
              </option>
              {cityData.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nameCity}
                </option>
              ))}
            </select>
          </FormControl>

          <Button
            className="customButton"
            variant="contained"
            sx={{ mt: 2 }}
            type="submit"
            disabled={
              !validation.username ||
              !validation.email ||
              !validation.phoneNumber
            }
          >
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
