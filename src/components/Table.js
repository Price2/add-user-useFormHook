import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import BlockIcon from '@mui/icons-material/Block';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from '@mui/material/Link';
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import Avatar from '@mui/joy/Avatar';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'full_name',
    headerName: 'Name',
    width: 200,
    editable: false,
    renderCell: (params) => {
      console.log("params ", params.row.full_name.slice(0, 2))
      return (
        <>
          <Avatar sx={{ display: 'flex', mr: 1 }}>
            {params.row.full_name.slice(0, 2).toUpperCase()}
          </Avatar>
          {params.row.full_name}
        </>
      )
    },
  },
  {
    field: 'user_name',
    headerName: 'User Name',
    width: 130,
    editable: false,
  },
  {
    field: 'e_mail',
    headerName: 'Email Address',
    type: 'email',
    width: 140,
    editable: false,
  },
  {
    field: 'group_user',
    headerName: 'Group name',
    type: 'string',
    sortable: false,
    width: 130,
  },
  {
    field: 'user_profile',
    headerName: 'Status',
    type: 'string',
    width: 110,
    editable: false,
  },
  {
    field: 'date',
    headerName: 'Created On',
    type: 'string',
    width: 220,
    editable: false,
  },
];







export default function DataGridTable({ data, edit, selectedUser, handleEdit, handledeleteUser, filters, filteredUsers }) {
  // const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [filter, setFilter] = React.useState(
    {
      search: '',
      username: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    }

  )
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleFilter = (e, isdate) => {
    if (isdate === 'dateFrom') {

      setFilter({ ...filter, dateFrom: format(new Date(e), 'yyyy/MM/dd') })

    }
    else if (isdate === 'dateTo') {
      setFilter({ ...filter, dateTo: format(new Date(e), 'yyyy/MM/dd') })
    }
    else {
      setFilter({ ...filter, [e.target.name]: e.target.value })
    }

  }

  React.useEffect(() => {
    filters(filter)
  }, [filter])

  const { search, username, status, dateFrom, dateTo } = filter
  return (
    <>
      <Paper sx={{
        display: 'flex', flexDirection: "column", alignItems: "space-between", boxShadow: '0', borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(224, 224, 224, 1)',
        borderRadius: 'var(--unstable_DataGrid-radius)',
        borderBottom: 0
      }}>
        <Box sx={{ display: 'flex', gap: '15px', margin: "10px" }}>
          <TextField
            placeholder="Search..."
            type="search"
            name="search"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleFilter}
            InputProps={{
              style: {
                width: 300
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField name="username" value={username} onChange={handleFilter} placeholder="User Name" size="small" id="outlined-basic" variant="outlined" label="User Name" />

          <FormControl size="small" sx={{ m: 0, minWidth: 120 }}>
            <InputLabel size="small" id="demo-select-small-label">Any</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="status"
              value={status}
              onChange={handleFilter}
              label="Any"
            >
              <MenuItem value="" >
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Active'}>Active</MenuItem>
              <MenuItem value={'Inactive'}>Inactive</MenuItem>
              <MenuItem value={'Locked'}>Locked</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ padding: 0 }} components={['DatePicker', 'DatePicker']}>
              <DatePicker
                labelId="demo-select-small-label"
                name="dateFrom"
                value={dateFrom}
                onChange={(date) => handleFilter(date, 'dateFrom')}
                slotProps={{ textField: { size: 'small', padding: 0, } }}
                style
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ padding: 0 }} size="small" components={['DatePicker', 'DatePicker']}>
              <DatePicker
                name="dateTo"
                value={dateTo}
                inputFormat="yyyy/MM/dd"
                onChange={(date) => handleFilter(date, 'dateTo')}
                slotProps={{ textField: { size: 'small' } }}

              />
            </DemoContainer>
          </LocalizationProvider>
          <Link href="#" underline="hover" sx={{ alignSelf: 'center' }}>
            All Filters
          </Link>
        </Box>
        <Box sx={{ m: 1, display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
          <Box sx={{ display: 'flex', gap: "15px", alignItems: "center" }}>
            <Button onClick={handledeleteUser} sx={{ backgroundColor: "lightgray", minWidth: "10px", color: "#51576d" }} size="larger" color="inherit">
              <BlockIcon />
            </Button>
            <Button onClick={handleEdit} sx={{ backgroundColor: "lightgray", color: "#51576d", minWidth: "10px" }} size="larger" color="inherit">
              <EditIcon />
            </Button>

            <Button sx={{ backgroundColor: "lightgray", color: "#51576d", minWidth: "10px" }} size="larger" color="inherit">
              <LockIcon />
            </Button>

            <Button variant="contained" sx={{ backgroundColor: "lightgray", color: "#51576d" }}>Assign To Profile</Button>
            <Button variant="contained" sx={{ backgroundColor: "lightgray", color: "#51576d" }}>Assign To Group</Button>

            <Button sx={{ backgroundColor: "lightgray", color: "#51576d", minWidth: "10px" }} size="larger" color="inherit">
              <MoreVertIcon />
            </Button>
            <Link fontWeight='bold' color='#51576d'>
              Unselect All
            </Link>
          </Box>
          <Box>
            <Button sx={{ backgroundColor: "lightgray", color: "#51576d", minWidth: "10px", mr: 3 }} size="larger" color="inherit">
              <DownloadIcon />
            </Button>

          </Box>
        </Box>
      </Paper >


      <Box sx={{ height: 'fit-content' }}>

        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          rows={filteredUsers.length ? filteredUsers : data}
          columns={columns}
          getRowId={row => row.id}
          pageSizeOptions={[100]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            selectedUser(newRowSelectionModel);
            setRowSelectionModel(newRowSelectionModel)
          }}
          rowSelectionModel={rowSelectionModel}

          onRowClick={edit}

        />

      </Box>
    </>
  );
}