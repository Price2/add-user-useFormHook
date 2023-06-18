import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NestedList from './List';
import image from '../images/reno.png'
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";
import DataGridTable from './Table';
import ModalForm from './Modal';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const menuId = 'primary-search-account-menu';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [openForm, setOpenForm] = React.useState(false);
  const [formData, setFormData] = React.useState([]);
  const [selectedUser, setSelectedUsers] = React.useState([]);
  const [editToggle, setEditToggle] = React.useState(false)
  const [filteredusers, setFilteredUsers] = React.useState([])
  const open_dropdown = Boolean(anchorEl);


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleAddUserModal = () => {
    setOpenForm(!openForm);

  }

  const handleFilter = ({ search, username, status, dateFrom, dateTo }) => {
    if ( (dateFrom && dateTo) && formData.length ) {
      const usersFiltered = formData.filter((user) => {
        if (user.date >= dateFrom && user.date <= dateTo) {
          return true
        }
        return false
      })
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
    }
    setFilteredUsers(usersFiltered)
  }
    if ( (search && username && dateFrom && dateTo && status) && formData.length) {

      const usersFiltered = formData.filter((user) => {

        if ((user.full_name.toLowerCase() === search.toLowerCase() || user.user_name.toLowerCase() === username.toLowerCase()) &&
          (user.group_user === status) &&
          (user.date >= dateFrom && user.date <= dateTo)
        ) {
          return true
        }
        else {
          return false
        }

      })
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
      setFilteredUsers(usersFiltered)

    }
    else if ( (search && status && username) && formData.length) {
      const usersFiltered = formData.filter((user) => (user.user_name.toLowerCase() === username.toLowerCase()) && (user.group_user === status) && (user.full_name.toLowerCase() === search.toLowerCase()))
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
      setFilteredUsers(usersFiltered)
    }

    else if ( (search && dateFrom && dateTo) && formData.length) {
      const usersFiltered = formData.filter((user) => {

        if ((user.full_name.toLowerCase() === search.toLowerCase() && (user.date === dateFrom && user.date === dateTo))) {
          return true
        }
        else {
          return false
        }

      })
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
      setFilteredUsers(usersFiltered)
    }

    else if ( (search && username) && formData.length) {
      const usersFiltered = formData.filter((user) => {
        if ((user.full_name.toLowerCase() === search.toLowerCase() && user.user_name.toLowerCase() === username.toLowerCase())) {
          return true
        }
        else {
          return false
        }

      })
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
      setFilteredUsers(usersFiltered)
    }

    else if ( (search && status) && formData.length) {
      const usersFiltered = formData.filter((user) => (user.full_name.toLowerCase() === search.toLowerCase()) && (user.group_user === status))
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
      setFilteredUsers(usersFiltered)
    }
    else if ( (username && status) && formData.length) {
      const usersFiltered = formData.filter((user) => (user.user_name.toLowerCase() === username.toLowerCase()) && (user.group_user === status))
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
    }
    else if (username && formData.length) {
      const usersFiltered = formData.filter((user) => user.user_name.toLowerCase() === username.toLowerCase())
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
      setFilteredUsers(usersFiltered)
    }
    else if (search && formData.length) {
      const usersFiltered = formData.filter((user) => user.full_name.toLowerCase() === search.toLowerCase())
      if (!usersFiltered.length) {
        setFilteredUsers([])
        return
      }
      setFilteredUsers(usersFiltered)
    }
    else {
      setFilteredUsers([])
    }
  }

  const submitModal = (user) => {
    const formData_copy = [...formData]
    if (formData.length) {
      const indexOfUser = formData.findIndex(i => i.id === user.id);
      if (indexOfUser !== -1) {
        formData_copy[indexOfUser] = user
        setFormData(formData_copy)
        return
      }
      setFormData(current => [...current, user])
      return;
    }
    setFormData(current => [...current, user])
  }

  const deleteUsers = (user) => {
    const formData_copy = [...formData]
    if (formData.length && selectedUser.length) {
      while (selectedUser.length) {
        const userIndex = formData_copy.findIndex(item => selectedUser.some(entry => entry.id === item.id));
        if (userIndex !== -1) {
          formData_copy.splice(userIndex, 1);
        }
        else {
          break;

        }
      }
      setFormData(formData_copy)
      return;
    }
  }


  const selectedUsers = (usersSelected) => {
    const usersSel = formData.filter(({ id }) => usersSelected.includes(id));
    setSelectedUsers(usersSel)

  }

  const handleEdit = () => {
    if (selectedUser.length && selectedUser.length == 1) {
      setOpenForm(true)
      handleEditToggle(true)
      return
    }
    return
  }
  const handleEditToggle = (toggle) => {
    if(toggle == 'false')
      setEditToggle(false)
    else
      setEditToggle(true)
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "white", textAlign: 'center' }}>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ mr: 2, color: 'black', fontWeight: 'bold' }} variant="p" noWrap component="div">
            Good Morning!
          </Typography>
          <Typography sx={{ color: "black" }} variant="span" noWrap component="div">
            Tue Jan 12, 2021 9:39 AM
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, color: 'gray' }}>
            <IconButton sx={{ padding: 0 }} size="larger" color="inherit">
              <Badge color="error">
                <HelpOutlineIcon sx={{ fontSize: '28px', color: 'gray' }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >

              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
            </IconButton>
            <Divider sx={{ mr: 2 }} orientation="vertical" flexItem />
            <Typography sx={{ fontWeight: 'bold', color: '#050e2d', mr: 1, alignSelf: 'center' }}>
              Nader Amer
            </Typography>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: 'lightBlue', width: 40, height: 40, color: '#050e2d', fontWeight: 'bold', alignSelf: 'center' }}>NA</Avatar>
            </Stack>


            <Button
              id="demo-positioned-button"
              aria-controls={open_dropdown ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open_dropdown ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color: 'gray' }}
            >
              {open_dropdown ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open_dropdown}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>

          </Box>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#050e2d'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton sx={{ color: 'white' }} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <img src={image} style={{ width: '60%', alignSelf: 'center' }} alt="Logo" />


        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: '230px', backgroundColor: "white", borderRadius: '20px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Divider />
        <List sx={{ color: 'gray' }}>

          <NestedList />

        </List>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
            User Management
          </Typography>
          {/* <Button variant="contained" sx={{ backgroundColor: '#22a565' }}>
            <AddIcon />Add User
          </Button> */}


          <ModalForm toggleForm={toggleAddUserModal} submit={submitModal} formState={openForm} selectedUsers={selectedUser[0]} editState={editToggle} toggleEdit={handleEditToggle} />
        </Box>
        <DataGridTable data={formData} selectedUser={selectedUsers} handleEdit={handleEdit} handledeleteUser={deleteUsers} filters={handleFilter} filteredUsers={filteredusers} />
      </Main>
    </Box>
  );
}

