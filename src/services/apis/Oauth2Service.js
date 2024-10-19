import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/auth/google";

// Phương thức 1: Lấy URL đăng nhập Google
export const getAuthUrl = async () => {
  try {
    const response = await axios.get(`${API_URL}/url`);
    // URL đăng nhập Google
    return response.data;
  } catch (error) {
    console.error("Error fetching Google login URL", error);
    throw error;
  }
};

// Phương thức 2: Gửi mã "code" sau khi người dùng đăng nhập thành công
export const callBackUrlGoogle = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/callback`, {
      params: {
        code: code,  // Mã code được Google trả về sau khi người dùng đăng nhập
      },
    });
    // Xử lý kết quả trả về từ API sau khi login thành công
    return response.data;
  } catch (error) {
    console.error("Error handling Google callback", error);
    throw error;
  }
};
