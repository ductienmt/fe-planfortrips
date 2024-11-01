import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { TextField, Grid } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, date: '2023-01-15' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, date: '2023-02-20' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, date: '2023-03-25' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, date: '2023-04-10' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, date: '2023-05-30' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, date: '2023-06-05' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, date: '2023-07-15' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, date: '2023-08-20' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, date: '2023-09-25' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ExchangeAdmin() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const filteredRows = rows.filter((row) => {
    if (startDate && row.date < startDate) return false;
    if (endDate && row.date > endDate) return false;
    return true;
  });

  return (
    <Paper sx={{ height: 500, width: '100%', padding: 2 }}>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6} md={3}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </Grid>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
