import React, { useEffect, useState } from 'react';
import { TextField, Typography, CircularProgress } from '@mui/material';
import { UserService } from '../../../services/apis/UserService';

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm state loading

  // useEffect để tải dữ liệu khi component render lần đầu
  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm fetchUsers để gọi API và lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true); // Bắt đầu tải
    try {
      const response = await UserService.getAll();
      setUsers(response.data.data.userResponses); // Cập nhật danh sách người dùng
    } catch (error) {
      alert("Có lỗi xảy ra khi tải người dùng");
    } finally {
      setLoading(false); // Kết thúc tải sau khi có kết quả
    }
  };

  // Hàm thay đổi trạng thái người dùng
  const changeStage = async (userId, stageId) => {
    setLoading(true); // Bắt đầu tải khi thay đổi trạng thái
    try {
      const res = await UserService.changeStageUser(userId, stageId);
      if (res.code === 200) {
        alert("Cập nhật trạng thái thành công");
        fetchUsers(); // Tải lại danh sách người dùng sau khi thay đổi
      } else {
        alert("Thất bại");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    } finally {
      setLoading(false); // Kết thúc tải
    }
  };

  return (
    <div className="container pb-3">
      {/* Header */}
      <div className="row my-4">
        <div className="col">
          <Typography variant="h4" gutterBottom>
            Quản lý người dùng
          </Typography>
        </div>
        <div className="col d-flex justify-content-end">
          <TextField label="Tìm kiếm" variant="outlined" size="small" />
        </div>
      </div>

      {/* User Table */}
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
                <CircularProgress /> {/* Hiển thị spinner khi đang tải */}
              </td>
            </tr>
          ) : (
            users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">Không có người dùng nào</td>
              </tr>
            ) : (
              users.map((user) => (
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
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default User;
