import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Typography,
  Paper,
  Divider
} from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { UserService } from "../../../../../services/apis/UserService";
import { HotelService } from "../../../../../services/apis/HotelService";
import { RoomService } from "../../../../../services/apis/RoomService";

export default function BookingHotelDetail({
  open,
  setOpen,
  selectedBookingHotel,
}) {
  const [user, setUser] = useState({});
  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedBookingHotel) return;

      try {
        const [userData, dataHotel, dataRoom] = await Promise.all([
          UserService.findUserById(selectedBookingHotel.userId),
          HotelService.findHotelByRoomId(selectedBookingHotel.roomId),
          RoomService.findRoomById(selectedBookingHotel.roomId)
        ]);

        if (userData) setUser(userData.data);
        if (dataHotel) setHotel(dataHotel);
        if (dataRoom) setRoom(dataRoom);
        
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, [selectedBookingHotel]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Chi Tiết Đặt Phòng
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {/* Thông Tin Khách Hàng */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
              }}
            >
              <Typography variant="h6" color="primary">
                <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Thông Tin Khách Hàng
              </Typography>
              <Divider />
              <Typography>
                <strong>Tên:</strong> {user.userName || 'Chưa cập nhật'}
              </Typography>
              <Typography>
                <strong>Số Điện Thoại:</strong> {user.phoneNumber || 'Chưa cập nhật'}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user.email || 'Chưa cập nhật'}
              </Typography>
            </Paper>
          </Grid>

          {/* Thông Tin Khách Sạn */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
              }}
            >
              <Typography variant="h6" color="primary">
                <HotelIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Thông Tin Khách Sạn
              </Typography>
              <Divider />
              <Typography>
                <strong>Tên Khách Sạn:</strong> {hotel?.name || 'Chưa cập nhật'}
              </Typography>
              <Typography>
                <strong>Phòng:</strong> {room?.roomName || 'Chưa cập nhật'}
              </Typography>
              <Typography>
                <strong>Loại phòng:</strong> {room?.typeOfRoom || 'Chưa cập nhật'}
              </Typography>
            </Paper>
          </Grid>

          {/* Chi Tiết Đặt Phòng */}
          <Grid item xs={12}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
              }}
            >
              <Typography variant="h6" color="primary">
                <CalendarTodayIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Chi Tiết Đặt Phòng
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Ngày Nhận Phòng:</strong> {selectedBookingHotel?.checkInTime || 'Chưa xác định'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Ngày Trả Phòng:</strong> {selectedBookingHotel?.checkOutTime || 'Chưa xác định'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Trạng Thái:</strong> {selectedBookingHotel?.status || 'Chưa xác định'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" color="error">
                    <AttachMoneyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Tổng Cộng: {selectedBookingHotel?.price ? `${selectedBookingHotel.price} VNĐ` : 'Chưa xác định'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={handleClose} 
          color="primary" 
          variant="contained"
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}