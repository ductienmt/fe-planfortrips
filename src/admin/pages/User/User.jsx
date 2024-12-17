import React, { useEffect, useState } from 'react';
import { TextField, Typography, CircularProgress } from '@mui/material';
import { UserService } from '../../../services/apis/UserService';
import { StatisticalService } from '../../../services/apis/StatisticalService';
import * as XLSX from 'xlsx';

function User() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userNameQuery, setUserNameQuery] = useState("");   
  const [emailQuery, setEmailQuery] = useState("");        
  const [phoneQuery, setPhoneQuery] = useState("");         
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getAll();
      const userList = response.data.data.userResponses;
      setUsers(userList);
      setFilteredUsers(userList);
    } catch (error) {
      alert("Có lỗi xảy ra khi tải người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleUserNameSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setUserNameQuery(query);
    filterUsers(query, emailQuery, phoneQuery);
  };

  const handleEmailSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setEmailQuery(query);
    filterUsers(userNameQuery, query, phoneQuery);
  };

  const handlePhoneSearch = (event) => {
    const query = event.target.value;
    setPhoneQuery(query);
    filterUsers(userNameQuery, emailQuery, query);
  };

  const filterUsers = (userName, email, phone) => {
    const filtered = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(userName) &&
        user.email.toLowerCase().includes(email) &&
        user.phoneNumber.includes(phone)
    );
    setFilteredUsers(filtered);
  };

  const changeStage = async (userId, stageId) => {
    setLoading(true);
    try {
      const res = await UserService.changeStageUser(userId, stageId);
      if (res.code === 200) {
        alert("Cập nhật trạng thái thành công");
        fetchUsers();
      } else {
        alert("Thất bại");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    } finally {
      setLoading(false);
    }
  };

  const exportExecl = async () => {
    // Giả sử bạn đã có data từ API (StatisticalService.allUser())
    const resExccel = await StatisticalService.allUser();
    console.log(resExccel);
    const users = resExccel.data;

    // Chuyển đổi dữ liệu thành cấu trúc bạn muốn xuất
    const formattedData = users.map(user => ({
      "Id": user.id,
      "Số điện thoại": user.phoneNumber,
      "Email": user.email,
      "Giới tính": user.gender,
      "Địa chỉ": user.address || 'N/A', 
      "Trạng thái": user.isActive ? 'Hoạt động' : 'Ngừng hoạt động',
      "Ngày sinh": user.birthdate,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    // Lấy ngày hiện tại để đặt tên file
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    // Đặt tên file theo định dạng: PTTrip_user_ngày-tháng-năm.xlsx
    const fileName = `PTTrip_user_${day}-${month}-${year}.xlsx`;

    // Xuất file Excel với tên đã được định dạng
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="container pb-3">
      <div className="row my-4">
        <div className="col">
          <Typography variant="h4" gutterBottom>
            Quản lý người dùng
          </Typography>
          <button className='btn btn-secondary text-nowrap me-2 py-1' onClick={() => exportExecl()}>Xuất file</button>
        </div>
        <div className="col d-flex justify-content-end">
          <TextField
            label="Tìm kiếm tên người dùng"
            variant="outlined"
            size="small"
            value={userNameQuery}
            onChange={handleUserNameSearch}
          />
          <TextField
            label="Tìm kiếm email"
            variant="outlined"
            size="small"
            value={emailQuery}
            onChange={handleEmailSearch}
            style={{ marginLeft: '10px' }}
          />
          <TextField
            label="Tìm kiếm số điện thoại"
            variant="outlined"
            size="small"
            value={phoneQuery}
            onChange={handlePhoneSearch}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Số điện thoại</th>
            <th>Giới tính</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                <CircularProgress />
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">Không tìm thấy người dùng nào</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.gender}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  {user.active ? (
                    <button
                      className="btn btn-success"
                      onClick={() => changeStage(user.id, 0)}
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => changeStage(user.id, 1)}
                    >
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default User;
