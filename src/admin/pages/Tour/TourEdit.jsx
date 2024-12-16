import React, { useEffect, useState } from "react";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import { HotelService } from "../../../services/apis/HotelService";
import { CarService } from "../../../services/apis/CarCompanyService";
import { TagService } from "../../../services/apis/TagService";
import { TourService } from "../../../services/apis/TourService";
import { toast } from "react-toastify";
import { CheckinService } from "../../../services/apis/CheckinService";
import TagIcon from "@mui/icons-material/Tag";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { enqueueSnackbar } from "notistack";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Combobox } from "react-widgets";
import { useAuth } from "../../../context/AuthContext/AuthProvider";
import { RouteService } from "../../../services/apis/RouteService";
import { uploadImage } from "../../../services/apis/ImageService";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function TourFormUpdate({ setRows, selectedTourId }) {
  const { username } = useAuth();
  const [hidden, setHidden] = useState(false);
  const [hotel, setHotel] = useState([]);
  const [car, setCar] = useState([]);
  const [checkin, setCheckin] = useState([]);
  const [topic, setTopic] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagNew, setTagNew] = useState([]);
  const [errors, setErrors] = useState({});
  const [tagErrors, setTagErrors] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [route, setRoute] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    route_id: "",
    number_people: 0,
    total_price: 0,
    day: 0,
    night: 0,
    is_active: true,
    tagNames: [],
    note: "",
    hotel_id: "",
    hotel: {},
    description: "",
    car_company_id: "",
    car_company: {},
    checkin_id: [],
    checkin: [],
    admin_username: username,
  });
  useEffect(() => {
    const fetchData = async () => {
      if (selectedTourId) {
        const data = await TourService.findTourById(selectedTourId);
        if (data) {
          setFormData({
            ...data,
            tagNames: data.tags.map((tag) => tag.name),
            hotel_id: data.hotel.id,
            car_company_id: data.car_company.id,
            checkin: data.checkin,
            checkin_id: data.checkin.map((c) => c.id),
            route_id: data.route.id
          });
          const formattedImages = data.images.map((image, index) => ({
            uid: `rc-upload-${Date.now()}-${index}`,
            lastModified: new Date().getTime(),
            lastModifiedDate: new Date(),
            name: `image-${index}.jpg`,
            size: 0,
            type: "image/jpeg",
            percent: 0,
            originFileObj: new File(
              [""], // Nội dung file giả lập
              `image-${index}.jpg`,
              {
                type: image.type || "image/jpeg",
                lastModified: new Date().getTime(),
                uid: `rc-upload-${Date.now()}-${index}`,
              }
            ),
            status: "done",
            thumbUrl: image.url,
          }));

          setFileList(formattedImages);
        }
      } else {
        setFormData([]);
      }
    };
    fetchData();
  }, [selectedTourId]);
  const urlToFile = async (url, fileName, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  };
  console.log(formData);

  const handleSelectTags = (tagNames) => {
    setFormData((prevData) => ({
      ...prevData,
      tagNames,
    }));
  };
  const handleSelectCheckins = (checkIns) => {
    console.log(checkIns);

    const checkin_id = checkIns.map((c) => c.id);
    setFormData((prevData) => ({
      ...prevData,
      checkin: checkIns,
    }));
    setFormData((prevData) => ({
      ...prevData,
      checkin_id: checkin_id,
    }));
    console.log(formData);
  };
  const handleComboChange = (n, selected) => {
    console.log(selected);
    var selectedId = "";
    if (n == "id") {
      n = "checkin_id";
      selectedId = selected.id;
    } else {
      selectedId = selected[n] || "";
    }
    setFormData((prevData) => ({
      ...prevData,
      [n]: selectedId,
    }));
    console.log(formData);
  };
  useEffect(() => {
    fetchDataInit();
  }, []);

  const fetchDataInit = async () => {
    try {
      const routeData = await RouteService.getAll(0, 100);
      setRoute(routeData.listResponse);
      const hotelData = await HotelService.getHotels(0, 100, "");
      setHotel(hotelData.hotelResponseList);
      const carData = await CarService.getcars(0, 100);
      setCar(carData.listResponse);
      const checkinData = await CheckinService.getCheckins();
      setCheckin(checkinData.data.checkinResponses);
      const tag = await TagService.getTags(0, 100);
      setTags(tag.listResponse);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khu vực:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdate = async () => {
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("Validation errors:", errors);
      return;
    }
    const data = {
      title: formData.title,
      route_id: formData.route_id,
      number_people: formData.number_people,
      total_price: formData.total_price,
      day: formData.day,
      night: formData.night,
      is_active: formData.is_active,
      tagNames: formData.tagNames,
      description: formData.description,
      hotel_id: formData.hotel_id,
      car_company_id: formData.car_company_id,
      checkin_id: formData.checkin_id,
      admin_username: username,
    };
    console.log(data);
    const response = await TourService.updateTour(selectedTourId, data);
    if (response) {
      if (fileList.length > 0) {
        console.log(fileList);
        await uploadEncodedImage(response.tour_id, fileList);
      }
      setHidden(false);
      toast.success("Tạo mới thành công");
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.tour_id === selectedTourId ? { ...row, ...formData } : row
        )
      );
      document.getElementById("closeModalButton").click();
    }
  };
  const addTag = async (tagNew) => {
    const tagArray = tagNew.split(",").map((tag) => tag.trim());
    const validTags = [];
    const invalidTags = [];

    tagArray.forEach((tag) => {
      if (tag.startsWith("#")) {
        validTags.push(tag);
      } else if (tag !== "") {
        invalidTags.push(tag);
      }
    });
    if (invalidTags.length > 0) {
      setTagErrors(`Các tag không hợp lệ: ${invalidTags.join(", ")}`);
    } else {
      tagArray.map(async (tag) => {
        tag = tag.replace(/^#/, "");
        const tagDto = {
          name: tag,
          description: tag,
        };
        const response = await TagService.createTag(tagDto);
        if (response.success !== false) {
          setTags((prevTags) => [...prevTags, response]);
          enqueueSnackbar(
            "Thêm tag mới thành công, vui lòng chọn tag vừa tạo!",
            { variant: "success" }
          );
        } else {
          enqueueSnackbar(response.message, { variant: "error" });
        }
      });
    }
  };
  useEffect(() => {
    let price = 0;
    if (formData.hotel_id) {
      price += 400000;
    }
    if (formData.car_company_id) {
      price += 500000;
    }
    setFormData((prevState) => ({
      ...prevState,
      total_price: price,
    }));
  }, [formData.hotel_id, formData.car_company_id]);
  const validateFormData = (data) => {
    const errors = {};
    if (!data.title.trim()) {
      errors.title = "Bắt buộc nhập tiêu đề.";
    }
    if (!data.route_id) {
      errors.route_id = "Bắt buộc chọn chuyển đi.";
    }
    if (data.number_people <= 0) {
      errors.number_people = "Số người phải lớn hơn 0.";
    }
    if (data.day <= 0) {
      errors.day = "Số ngày phải lớn hơn 0.";
    }
    if (data.night < 0) {
      errors.night = "Số đêm phải lớn hơn 0.";
    }
    if (!data.hotel_id) {
      errors.hotel_id = "Bắt buộc chọn khách sạn.";
    }
    if (!data.car_company_id) {
      errors.car_company_id = "Bắt buộc chọn nhà xe.";
    }
    if (!data.checkin_id) {
      errors.checkin_id = "Bắt buộc chọn điểm tham quan.";
    }
    return errors;
  };
  const handleDelteImage = async (file) => {
    console.log("file", file);
    const updatedFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(updatedFileList);
    setDeleteImages((prevDeleteImages) => [...prevDeleteImages, file]);
    console.log("file list", updatedFileList);
    console.log("delete list", [...deleteImages, file]);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList);
  };
  const uploadEncodedImage = async (id, fileList) => {
    try {
      const formData = new FormData();

      const filesToUpload = await Promise.all(
        fileList.map(async (file) => {
          if (file.originFileObj) {
            return file.originFileObj;
          } else if (file.thumbUrl) {
            return await urlToFile(file.thumbUrl, file.name, file.type);
          }
          return null; // Bỏ qua file không hợp lệ
        })
      );

      filesToUpload.forEach((file) => {
        if (file) {
          formData.append("files", file);
        }
      });
      const uploadResponse = await TourService.uploadImage(id, formData);
      console.log("Upload successful:", uploadResponse);
      return uploadResponse.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Thêm ảnh
      </div>
    </button>
  );
  return (
    <>
      {/* Modal */}
      <div
        className="modal"
        id="exampleModaledit"
        tabIndex={-1}
        aria-labelledby="exampleModalLabeledit"
        aria-hidden={hidden}
        style={{ zIndex: 1051, marginTop: "50px" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="exampleModalLabeledit">
                Chỉnh sửa Chuyến Tour
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                {/* Tiêu đề */}
                <div className="col-12">
                  <label htmlFor="tourTitle" className="form-label">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    id="tourTitle"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nhập tiêu đề tour"
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title}</p>
                  )}
                </div>

                {/* Điểm bắt đầu + Điểm đến */}
                <div className="col-md-12">
                  <label htmlFor="route_id" className="form-label">
                    Tuyến đi
                  </label>
                  <select
                    id="route_id"
                    className="form-select"
                    name="route_id"
                    value={formData.route_id || ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        route_id: selectedId,
                      }));
                    }}
                  >
                    <option value="" disabled>
                      Chọn tuyến
                    </option>
                    {route &&
                      route.map((r) => (
                        <option key={r.route_id} value={r.route_id}>
                          {r.origin_station_id.name} --{" "}
                          {r.destination_station_id.name}
                        </option>
                      ))}
                  </select>

                  {errors.route_id && (
                    <p className="text-danger">{errors.route_id}</p>
                  )}
                </div>

                {/* Số người, số ngày, số đêm */}
                <div className="col-md-4">
                  <label htmlFor="peopleCount" className="form-label">
                    Số người
                  </label>
                  <input
                    type="number"
                    id="peopleCount"
                    name="number_people"
                    className="form-control"
                    placeholder="Nhập số người"
                    value={formData.number_people}
                    onChange={handleChange}
                  />
                  {errors.number_people && (
                    <p className="text-danger">{errors.number_people}</p>
                  )}
                </div>
                <div className="col-md-4">
                  <label htmlFor="dayCount" className="form-label">
                    Số ngày
                  </label>
                  <input
                    type="number"
                    id="dayCount"
                    name="day"
                    className="form-control"
                    placeholder="Nhập số ngày"
                    value={formData.day}
                    onChange={handleChange}
                  />
                  {errors.day && <p className="text-danger">{errors.day}</p>}
                </div>
                <div className="col-md-4">
                  <label htmlFor="nightCount" className="form-label">
                    Số đêm
                  </label>
                  <input
                    type="number"
                    id="nightCount"
                    name="night"
                    className="form-control"
                    placeholder="Nhập số đêm"
                    value={formData.night}
                    onChange={handleChange}
                  />
                  {errors.night && (
                    <p className="text-danger">{errors.night}</p>
                  )}
                </div>

                {/* Dịch vụ */}
                <div className="col-12">
                  <h6 className="text-primary mt-3">Dịch vụ</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="transport" className="form-label">
                        Nhà xe
                      </label>
                      <Combobox
                        data={car}
                        dataKey="id"
                        textField="name"
                        name="car_company_id"
                        value={formData?.car_company?.name}
                        onChange={(selected) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            car_company_id: selected.car_company_id,
                            car_company: selected,
                          }))
                        }
                      />
                      {errors.car_company_id && (
                        <p className="text-danger">{errors.car_company_id}</p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="accommodation" className="form-label">
                        Khách sạn
                      </label>
                      <Combobox
                        data={hotel}
                        dataKey="id"
                        textField="name"
                        name="hotel_id"
                        value={formData?.hotel?.name}
                        onChange={(selected) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            hotel_id: selected.hotel_id,
                            hotel: selected,
                          }))
                        }
                      />
                      {errors.hotel_id && (
                        <p className="text-danger">{errors.hotel_id}</p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="checkin" className="form-label">
                        Điểm tham quan
                      </label>
                      {formData.checkin && (
                        <Multiselect
                          data={checkin}
                          value={formData.checkin}
                          dataKey="id"
                          textField="name"
                          onChange={handleSelectCheckins}
                          placeholder="Chọn các điểm tham quan"
                        />
                      )}
                      {errors.checkin_id && (
                        <p className="text-danger">{errors.checkin_id}</p>
                      )}
                    </div>
                  </div>
                </div>
                <FormControl className="m-2">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Chủ đề
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="true"
                    onChange={(e) => setTopic(e.target.value === "true")}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Chọn chủ đề"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Thêm chủ đề mới"
                    />
                  </RadioGroup>
                </FormControl>

                {topic ? (
                  <div className="col-12">
                    {tags && tags.length > 0 ? (
                      <Multiselect
                        data={tags.map((tag) => tag.name)}
                        value={formData.tagNames}
                        onChange={handleSelectTags}
                        placeholder="Chọn các chủ đề"
                      />
                    ) : (
                      <p>Không có chủ đề nào để hiển thị</p>
                    )}
                  </div>
                ) : (
                  <div className="col-12">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <TagIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        id="input-with-sx"
                        label="# Thêm Tags mới"
                        variant="standard"
                        placeholder="#abc, #xyz"
                        fullWidth
                        sx={{
                          marginRight: 2,
                          width: "calc(100% - 130px)",
                        }}
                        value={tagNew}
                        onChange={(e) => setTagNew(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        onClick={() => addTag(tagNew)}
                      >
                        Thêm tag
                      </Button>
                    </Box>
                    {tagErrors && (
                      <p className="text-danger" style={{ marginTop: "8px" }}>
                        (*) {JSON.stringify(tagErrors)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <>
              <FormLabel className="m-3" id="demo-radio-buttons-group-label">
                Ảnh
              </FormLabel>
              <Upload
                customRequest={({ file, onSuccess, onError }) => {
                  uploadImage(file)
                    .then((response) => {
                      onSuccess(response);
                    })
                    .catch((error) => {
                      onError(error);
                    });
                }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChangeImage}
                onRemove={handleDelteImage}
                className="m-3 w-100"
                style={{ width: "300px" }}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                    zIndex: 999999,
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              <FormLabel className="m-3" id="demo-radio-buttons-group-label">
                Mô tả
              </FormLabel>
              <TextArea
                rows={4}
                className="m-3"
                style={{ width: "95%" }}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </>
            <div className="modal-footer" style={{ marginBottom: "50px" }}>
              <h3>
                {" "}
                <span>Tổng tiền: {formData.total_price}</span>{" "}
              </h3>
              <button
                type="button"
                className="btn btn-secondary close"
                data-bs-dismiss="modal"
                id="closeModalButton"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourFormUpdate;
