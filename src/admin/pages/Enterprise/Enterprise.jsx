import React, { useState, useEffect, useCallback } from 'react';
import { Typography, CircularProgress, Button, Snackbar, Pagination, TextField, Modal, Box, Divider, Grid } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import AccountEtpService from '../../../services/apis/AccountEnterprise';

function Enterprise() {
  const [enterprises, setEnterprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(8);
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [enterpriseDetails, setEnterpriseDetails] = useState(null);

  // Fetch data for the table
  const fetchEnterprises = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AccountEtpService.getAll(searchName, page - 1, pageSize);
      setEnterprises(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Không có dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchName]);

  useEffect(() => {
    fetchEnterprises();
  }, [fetchEnterprises]);

  const handleSearchByPhone = async () => {
    setLoading(true);
    try {
      const response = await AccountEtpService.getByPhoneNumber(searchPhone);
      setEnterpriseDetails(response.data);
      setModalOpen(true);
    } catch (err) {
      setSnackbarMessage('Không tìm thấy doanh nghiệp với số điện thoại này.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleEnterpriseStatus = async (id) => {
    setLoading(true);
    try {
      await AccountEtpService.toggleStage(id);
      fetchEnterprises();
      setSnackbarMessage('Thay đổi trạng thái thành công.');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Có lỗi xảy ra khi thay đổi trạng thái.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleEnterpriseStatusForModal = async (id) => {
    setLoading(true);
    try {
      await AccountEtpService.toggleStage(id);
      setEnterpriseDetails((prevDetails) => ({
        ...prevDetails,
        status: !prevDetails.status,
      }));
      setSnackbarMessage('Thay đổi trạng thái thành công.');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Có lỗi xảy ra khi thay đổi trạng thái.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pb-3">
      <div className="row my-4">
        <div className="col">
          <Typography variant="h4" gutterBottom>
            Quản lý Doanh nghiệp
          </Typography>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-5">
          <TextField
            label="Tìm kiếm theo tên"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setPage(1);
              }
            }}
          />
        </div>
        <div className="col-5">
          <TextField
            label="Tìm kiếm theo số điện thoại"
            variant="outlined"
            fullWidth
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
        </div>
        <div className="col-2">
          <Button variant="contained" color="primary" onClick={handleSearchByPhone}>
            Tìm kiếm
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error" variant="body1" align="center">
          {error}
        </Typography>
      ) : (
        <>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>City</th>
                <th>Email</th>
                <th>Tên doanh nghiệp</th>
                <th>Số điện thoại</th>
                <th>Mã số thuế</th>
                <th>Trạng thái</th>
                <th>Điều chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {enterprises.map((enterprise) => (
                <tr key={enterprise.accountEnterpriseId}>
                  <td>{enterprise.cityName}</td>
                  <td>{enterprise.email}</td>
                  <td>{enterprise.enterpriseName}</td>
                  <td>{enterprise.phoneNumber}</td>
                  <td>{enterprise.taxCode || 'Không có'}</td>
                  <td>
                    {enterprise.status ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Cancel color="error" />
                    )}
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      color={enterprise.status ? 'secondary' : 'primary'}
                      onClick={() => toggleEnterpriseStatus(enterprise.accountEnterpriseId)}
                      disabled={loading}
                    >
                      {enterprise.status ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            width: 500,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            mx: 'auto',
            mt: '10%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Thông tin Doanh nghiệp
          </Typography>

          <Divider />

          {enterpriseDetails ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                {/* Thêm hình ảnh */}
                <img
                  src={enterpriseDetails.urlImage || 'default-image-url.jpg'}  
                  alt="Enterprise"
                  style={{ width: '100%', borderRadius: 8, height: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography><strong>Tên:</strong> {enterpriseDetails.enterpriseName}</Typography>
                <Typography><strong>Email:</strong> {enterpriseDetails.email}</Typography>
                <Typography><strong>Số điện thoại:</strong> {enterpriseDetails.phoneNumber}</Typography>
                <Typography><strong>Địa chỉ:</strong> {enterpriseDetails.address}</Typography>
                <Typography><strong>Mã số thuế:</strong> {enterpriseDetails.taxCode || 'Không có'}</Typography>
                <Typography>
                  <strong>Trạng thái:</strong>{' '}
                  {enterpriseDetails.status ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Cancel color="error" />
                  )}
                </Typography>
                <Button
                  variant="contained"
                  color={enterpriseDetails.status ? 'secondary' : 'primary'}
                  onClick={() => toggleEnterpriseStatusForModal(enterpriseDetails.accountEnterpriseId)}
                >
                  {enterpriseDetails.status ? 'Deactivate' : 'Activate'}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Typography>Không có dữ liệu.</Typography>
          )}

          <Divider />

          <Button
            variant="contained"
            color="primary"
            sx={{ alignSelf: 'center', mt: 2 }}
            onClick={() => setModalOpen(false)}
          >
            Đóng
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
}

export default Enterprise;
