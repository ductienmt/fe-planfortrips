import { enqueueSnackbar } from "notistack";
import { PaymentService } from "../../../../services/apis/PaymentService";
import { mbBank } from "./InfoBank";

const ServiceBank = {
  // Check cho VietQr
  checkPaidVietQR: async (amount, description, randomCode) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbypcs1V21R_GxdsvjQo0mUBeZDhhDr7bTHeIejfVsKkfvQ5npazvDMyAqu0_Hd_7nJA/exec"
      );
      const res = await response.json();
      console.log(amount);

      for (let record of res.data) {
        if (
          record["Giá trị"] == amount &&
          record["Mô tả"].includes(randomCode)
        ) {
          console.log(record["Giá trị"]);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi kiểm tra thanh toán:", error);
      return false;
    }
  },

  generateVietQR: (Amount, Decription) => {
    // Begin: VietQR Payemnt
    // Hàm để tạo chuỗi ngẫu nhiên gồm 6 ký tự
    // Xây dựng URL cơ bản với mã ngân hàng và số tài khoản

    // Mã hóa mô tả và tên tài khoản để xử lý các ký tự đặc biệt
    const encodedDescription = encodeURIComponent(Decription);

    const encodedAccountName = encodeURIComponent(mbBank.AccountName);
    const baseUrlVietQr = `https://img.vietqr.io/image/${mbBank.BankId}-${mbBank.AccountNo}-compact2.jpg`;

    // Xây dựng URL cuối cùng với các tham số truy vấn
    const qrCodeUrl = `${baseUrlVietQr}?amount=${Amount}&addInfo=${encodedDescription}&accountName=${encodedAccountName}`;
    return qrCodeUrl;
  },

  VNPay: async (ticket_id, bookingid, amount) => {
    // Thanh toán VnPayment
    const vnpay = {
      ticket_id: ticket_id,
      bank_code: "NCB",
      booking_id: bookingid,
      amount: amount,
    };
    try {
      const response = await PaymentService.createPayment(vnpay);
      if (response) {
        window.location.href = response.url;
      } else {
        enqueueSnackbar("Thanh toán thất bại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      const query = `[Javascript] fix error: ${error.message}`;
      window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
    }
  },
};

export default ServiceBank;
