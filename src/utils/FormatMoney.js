// cái file này chứa hàm để định dạng tiền tệ

/**
 * Định dạng một số thành tiền tệ (không thêm VNĐ).
 * @param {string} value - Giá trị đầu vào để định dạng.
 * @returns {string} - Chuỗi tiền tệ đã định dạng.
 */
export const formatMoney = (value) => {
    // Loại bỏ các ký tự không phải số
    const cleanedValue = value.replace(/[^\d]/g, "");

    // Định dạng giá trị đã làm sạch với dấu phẩy
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedValue || ""; // Trả về giá trị đã định dạng
};

/**
 * Xử lý thay đổi đầu vào và định dạng giá trị thành tiền tệ.
 * Đảm bảo chi phí không vượt quá 1 tỷ VNĐ.
 * @param {Event} event - Sự kiện thay đổi đầu vào.
 * @param {Function} setValue - Hàm thiết lập trạng thái để cập nhật giá trị.
 * @param {Function} setError - Hàm thiết lập trạng thái để cập nhật thông báo lỗi.
 */
export const handleInputChange = (event, setValue, setError) => {
    const inputValue = event.target.value;
    const cleanedValue = inputValue.replace(/[^\d]/g, ""); // Làm sạch giá trị đầu vào

    // Kiểm tra xem giá trị có vượt quá 1 tỷ VNĐ không
    const maxBudget = 1000000000; // 1 tỷ VNĐ
    if (cleanedValue && parseInt(cleanedValue, 10) > maxBudget) {
        setError("Chi phí không được vượt quá 1 tỷ VNĐ!"); // Gửi thông báo lỗi qua Notistack
        return; // Ngăn chặn việc cập nhật giá trị nếu vượt quá ngân sách tối đa
    }

    setError(""); // Không gửi thông báo nếu không có lỗi
    const formattedValue = formatMoney(inputValue);
    setValue(formattedValue); // Cập nhật giá trị trong trạng thái
};


