import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { TextField, Grid, Switch, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIưcon from "@mui/icons-material/Edit";
import { CouponService } from "../../../services/apis/CouponService";
const columns = [
  { field: "code", headerName: "Mã", width: 70 },
  { field: "discountType", headerName: "Thể loại giảm giá", width: 150 },
  { field: "discountValue", headerName: "Giá trị giảm", width: 90 },
  { field: "startDate", headerName: "Ngày bắt đầu", type: "Date", width: 130 },
  { field: "endDate", headerName: "Ngày kết thúc", type: "Date", width: 130 },
  { field: "useLimit", headerName: "Giới hạn", type: "number", width: 90 },
  { field: "useCount", headerName: "Lượt dùng", type: "number", width: 90 },
  {
    field: "isActive",
    headerName: "Trạng thái",
    renderCell: () => <IOSSwitch />,
    width: 90,
  },
  {
    field: "action",
    headerName: "Hành động",
    renderCell: (params) => (
      <span className="d-flex">
        <IconButton aria-label="view">
          <VisibilityIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </span>
    ),
    width: 150,
  },
];
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const paginationModel = { page: 0, pageSize: 5 };

export default function CouponAdmin() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [coupons, setConpons] = React.useState([
    {
      id: "",
      code: "",
      discountType: "",
      discountValue: 0,
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      useLimit: 0,
      useCount: 0,
      isActive: true,
    },
  ]);
  const filteredRows = coupons.filter((row) => {
    const rowStartDate = new Date(row.startDate);
    const rowEndDate = new Date(row.endDate);
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);

    if (startDate && rowStartDate < filterStartDate) return false;
    if (endDate && rowEndDate > filterEndDate) return false;
    return true;
  });
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelData = await CouponService.getCoupons(
          paginationModel.page, paginationModel.pageSize, null
        );
        setConpons(hotelData.hotelResponseList);
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
      }
    };
    fetchHotel();
  }, [])
  return (
    <Paper sx={{ height: 500, width: "100%", padding: 2 }}>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6} md={3}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </Grid>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
