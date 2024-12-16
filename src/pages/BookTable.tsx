import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { BOOK_DATA } from '../data';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'published', label: 'Published Date', minWidth: 150 },
  { id: 'year', label: 'Year', minWidth: 100, align: 'right' },
  { id: 'borrowed_by', label: 'Borrowed By', minWidth: 100, align: 'right' },
  { id: 'date_borrowed', label: 'Date Borrowed', minWidth: 150 },
  { id: 'expected_return_date', label: 'Expected Return Date', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 100, align: 'right' }
];

export default function BookDataTable() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [filteredRows, setFilteredRows] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const loadCSV = async () => {
      setRows(BOOK_DATA);
      setFilteredRows(BOOK_DATA);
    };
    loadCSV();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredRows(rows.filter(row => row.title.toLowerCase().includes(value) ||
    row.status.toLowerCase().includes(value) ||
    row.date_borrowed.toLowerCase().includes(value) ||
    row.year.toString().toLowerCase().includes(value) ||
    row.borrowed_by.toString().toLowerCase().includes(value)
  ));
  };

  return (
    <div>
      <h2>Book Data</h2>
      <TextField
        label="Search by title"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
