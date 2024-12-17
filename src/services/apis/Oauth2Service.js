import Http from "../Http";

// Phương thức 1: Lấy URL đăng nhập Google
export const getAuthUrl = async () => {
  try {
    const response = await Http.get(`/auth/google/url`);
    // URL đăng nhập Google
    return response.data;
  } catch (error) {
    console.error("Error fetching Google login URL", error);
    throw error;
  }
};

export const callBackUrlGoogle = async (code) => {
  try {
    const response = await Http.get(`/auth/google/callback`, {
      params: {
        code: code, 
      },
    });
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error handling Google callback", error);
    throw error;
  }
};
