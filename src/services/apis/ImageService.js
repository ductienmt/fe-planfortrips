import axios from 'axios';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
      data: formData,
      headers: { 
        'Content-Type': 'multipart/form-data',
        // Thêm các headers để xử lý CORS
        'Access-Control-Allow-Origin': '*',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error.response ? error.response.data : error.message);
    throw error;
  }
};