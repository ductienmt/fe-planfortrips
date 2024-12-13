import React, { useState, useEffect, useCallback } from 'react';
import { Typography, CircularProgress, Button, Snackbar, Pagination, TextField } from '@mui/material';
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
  const [searchName, setSearchName] = useState(''); // New state for search input

  // Fetch enterprises with search term and pagination
  const fetchEnterprises = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AccountEtpService.getAll(searchName, page - 1, pageSize);
      setEnterprises(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('No data');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchName]);

  // Trigger fetch when searchName or page changes
  useEffect(() => {
    fetchEnterprises();
  }, [fetchEnterprises]);

  const toggleEnterpriseStatus = async (id) => {
    setLoading(true);
    try {
      const res = await AccountEtpService.toggleStage(id);

      if (res.status) {
        setSnackbarMessage(res.data ? 'Tắt trạng thái tài khoản Enterprise.' : 'Mở trạng thái tài khoản thành công');
        setSnackbarOpen(true);
        fetchEnterprises();
      } else {
        setSnackbarMessage('Failed to change status.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('Error occurred while updating status.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pb-3">
      {/* Header */}
      <div className="row my-4">
        <div className="col">
          <Typography variant="h4" gutterBottom>
            Quản lý Doanh nghiệp
          </Typography>
        </div>
      </div>

      {/* Search field */}
      <div className="row my-2">
        <div className="col">
          <TextField
            label="Tìm kiếm theo tên"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)} // Update searchName on input change
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setPage(1); // Reset page to 1 when search is submitted
              }
            }}
          />
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
                <th>Enterprise Name</th>
                <th>Phone Number</th>
                <th>Tax Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enterprises.map((enterprise) => (
                <tr key={enterprise.accountEnterpriseId}>
                  <td>{enterprise.cityName}</td>
                  <td>{enterprise.email}</td>
                  <td>{enterprise.enterpriseName}</td>
                  <td>{enterprise.phoneNumber}</td>
                  <td>{enterprise.taxCode || 'N/A'}</td>
                  <td>{enterprise.status ? 'Active' : 'Inactive'}</td>
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

          {/* Pagination */}
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </>
      )}

      {/* Snackbar for feedback */}
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
