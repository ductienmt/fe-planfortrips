import { convertToVND } from "../../../../utils/FormatMoney";
import "./roomCard.css";
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const RoomCard = ({ img, roomSize, priceOneNight, onBook }) => {
  const navigate = useNavigate();
  
  // Define the openSnackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBookTicket = () => {
    // onBook();
    setOpenSnackbar(true);
    setTimeout(() => navigate('/payment'), 1500); 
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}  // Keeps the snackbar open for 3 seconds
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          width: '100%',
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4caf50', // Green color for success
            borderRadius: '8px', // Rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
            padding: '16px 32px', // Larger padding
            fontSize: '18px', // Larger font size
            color: '#fff', // White text color
            fontWeight: 'bold', // Bold text
          }
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Đặt vé thành công! Bạn sẽ được chuyển đến trang thanh toán.
        </Alert>
      </Snackbar>

      <div className="flex-container-room-card">
        <div className="card-room-type align-items-center">
          <div className="d-flex align-items-center custom-img-room-type">
            <img 
              style={{ width: "500px" }} 
              src={img ?? "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
              alt="" 
            />
            <p className="content-type ms-3">{roomSize}</p>
          </div>
          <div className="price-room-type text-end">
            <p className="amenities d-flex justify-content-center mt-3">
              <small>
                <i className="fa-solid fa-bowl-food"></i>Nước và đồ ăn
              </small>
              <small>
                <i className="fa-solid fa-wifi"></i>Wifi
              </small>
              <small>
                <i className="fa-solid fa-toilet-paper"></i>Dụng cụ vệ sinh
              </small>
            </p>
            <span>{convertToVND(priceOneNight)} / 1 đêm</span>
            <button
              type="button"
              className="book-ticket-transport"
              onClick={handleBookTicket}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
