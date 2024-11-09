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
  Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { CouponService } from "../../../services/apis/CouponService";
import { AreaService } from "../../../services/apis/AreaService";
import { CityService } from "../../../services/apis/CityService";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { CheckinService } from "../../../services/apis/CheckinService";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function PlaceDialog({
  open,
  setOpen,
  editMode,
  setEditMode,
  setRows,
  selectedCouponId,
  viewMode,
}) {
  const [formData, setFormData] = useState({
    cityId: "",
    name: "",
    address: "",
    latitude: Math.random(10000),
    longitude: Math.random(10000),
    payFee: 0,
  });
  const [errors, setErrors] = useState({});
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState({});
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const areaData = await AreaService.getAll();
      if (areaData) {
        setAreas(areaData);
      }
    };
    fetchData();
  }, []);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      cityId: "",
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      payFee: 0,
    });
    setErrors({});
  };
  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setFiles(fileList);
    const previews = [];

    for (let i = 0; i < fileList.length; i++) {
      previews.push(URL.createObjectURL(fileList[i]));
    }

    setImage(previews);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFormData = () => {
    const newErrors = {};
    const { cityId, name, address, latitude, longitude, payFee } = formData;

    if (!cityId) newErrors.cityId = "City ID is required.";
    if (!name) newErrors.name = "Name is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!latitude || isNaN(latitude))
      newErrors.latitude = "Valid latitude is required.";
    if (!longitude || isNaN(longitude))
      newErrors.longitude = "Valid longitude is required.";
    if (payFee < 0) newErrors.payFee = "Pay fee cannot be negative.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFormData()) return;
    try {
      const response = await CheckinService.createCheckIn(formData);

      if (response) {
        console.log(response);

        const newFormData = { ...formData, id: response.data.id };
        if (files) {
          const formDataUpload = new FormData();

          for (let i = 0; i < files.length; i++) {
            formDataUpload.append("files", files[i]);
          }
          const responseUpload = await CheckinService.uploadImage(
            response.data.id,
            formDataUpload
          );
          console.log(responseUpload);
        }

        toast("Successfully created");
        setRows((prevRows) => [...prevRows, newFormData]);
        handleClose();
      }
    } catch (error) {
      toast("Error");
      console.error(error.message);
    }
  };

  const handleUpdate = async (id) => {
    if (!validateFormData()) return;
    try {
      const response = await CheckinService.updateCheckIn(id, formData);

      if (response) {
        console.log(response);

        const newFormData = { ...formData, id: response.data.id };
        if (files) {
          const formDataUpload = new FormData();

          for (let i = 0; i < files.length; i++) {
            formDataUpload.append("files", files[i]);
          }
          const responseUpload = await CheckinService.uploadImage(
            response.data.id,
            formDataUpload
          );
          console.log(responseUpload);
        }

        toast("Successfully created");
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.coupon_id === response.coupon_id
              ? { ...row, ...newFormData }
              : row
          )
        );
        handleClose();
      }
    } catch (error) {
      toast("Error");
      console.error(error.message);
    }
  };
  const handleChange = (e) => {
    const areaId = e.target.value;
    setSelectedArea(areaId);
    getCities(areaId);
  };

  const getCities = async (id) => {
    try {
      const response = await CityService.getAllByAreaId(id);
      if (response) {
        console.log(response);

        setCities(response);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{ width: "1000px" }}
      className="w-100 m-auto m-5"
    >
      <DialogTitle>{editMode ? "Edit Place" : "Add Place"}</DialogTitle>
      <DialogContent>
        <div className="row w-100">
          <InputLabel id="demo-simple-select-label">Khu vực</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Khu vực"
            value={selectedArea}
            onChange={handleChange}
            fullWidth
          >
            {areas.map((area) => (
              <MenuItem key={area.id} value={area.id}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
          {cities && cities.length > 0 && (
            <>
              <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Thành phố"
                fullWidth
                name="cityId"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    cityId: e.target.value,
                  }));
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.nameCity}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: viewMode,
            }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            id="address"
            name="address"
            label="Address"
            variant="outlined"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: viewMode,
            }}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            id="payFee"
            name="payFee"
            label="Pay Fee"
            type="number"
            variant="outlined"
            value={formData.payFee}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: viewMode,
            }}
            error={!!errors.payFee}
            helperText={errors.payFee}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
          <div className="image-previews">
            {image &&
              image.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`preview-${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    margin: "10px",
                  }}
                />
              ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            editMode ? handleUpdate(selectedCouponId) : handleSave();
            console.log(editMode);
          }}
          color="primary"
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
