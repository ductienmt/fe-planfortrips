import React, { useState, useEffect, useCallback } from 'react';
import { Typography, CircularProgress, Button, Snackbar, Pagination } from '@mui/material';
import AccountEtpService from '../../../services/apis/AccountEnterprise';

function Enterprise() {
  const [enterprises, setEnterprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  const fetchEnterprises = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AccountEtpService.getAll();
      setEnterprises(response.data);
      console.log(response);
      
    } catch (err) {
      setError('Failed to load enterprises');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnterprises();
  }, [fetchEnterprises]);

  const toggleEnterpriseStatus = async (id) => {
    setLoading(true);
    try {
      const res = await AccountEtpService.toggleStage(id);
      console.log(res);
      
      if (res.status) {
        setSnackbarMessage(res.data ? 'Tắt trạng thái tài khoản Enterprise.' : 'Mở trạng thái tài khoản thành công');
        setSnackbarOpen(true);
        fetchEnterprises();
      } else {
        setSnackbarMessage('Failed to change status.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log(error);
      
      setSnackbarMessage('Error occurred while updating status.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const paginatedEnterprises = enterprises.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
              {paginatedEnterprises?.map((enterprise) => (
                <tr key={enterprise.accountEnterpriseId}>
                  <td>{enterprise.cityName}</td>
                  <td>{enterprise.email}</td>
                  <td>{enterprise.enterpriseName}</td>
                  <td>{enterprise.phoneNumber}</td>
                  <td>{enterprise.taxCode}</td>
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

          <Pagination
            count={Math.ceil(enterprises.length / itemsPerPage)}
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
