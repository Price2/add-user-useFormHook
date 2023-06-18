import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { format } from 'date-fns';
import { useForm, Controller } from "react-hook-form"
import { DevTool } from '@hookform/devtools';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: 500,
    maxWidth: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



export default function ModalForm({ toggleForm, formState, submit, selectedUsers, editState, toggleEdit }) {
  const form = useForm({
    defaultValues: {
      full_name: "",
      user_name: "",
      e_mail: "",
      group_user: '',
      user_profile: '',
      date: ""
    }
  });
  const { register, control, handleSubmit, reset } = form;


  const handleClose = () => {
    resetState()
    toggleEdit('false')
    toggleForm()
  };




  const onSubmitHandler = (userForm) => {
    if (userForm.id) {
      const form_obj = {
        id: userForm.id,
        full_name: userForm.full_name,
        user_name: userForm.user_name,
        e_mail: userForm.e_mail,
        group_user: userForm.group_user,
        user_profile: userForm.user_profile,
        date: format(new Date(), 'yyyy/MM/dd')
      }
      reset(form_obj)
      toggleForm()
      submit(form_obj)
      toggleEdit('false')
      resetState()


    }
    else {
      const unique_id = uuid().slice(0, 8);
      const form_obj = {
        id: unique_id,
        full_name: userForm.full_name,
        user_name: userForm.user_name,
        e_mail: userForm.e_mail,
        group_user: userForm.group_user,
        user_profile: userForm.user_profile,
        date: format(new Date(), 'yyyy/MM/dd')
      }
      reset(form_obj)
      toggleForm()
      submit(form_obj)
      resetState()
    }
  }

  const resetState = () => {
    reset({
      full_name: "",
      user_name: "",
      e_mail: "",
      group_user: '',
      user_profile: '',
      date: ""
    })
  }
  
  const toggleAddNew = () => {
    toggleForm()
  }

  React.useEffect(() => {
    if (editState === true && selectedUsers?.id) {
      reset(selectedUsers)
    }
  }, [editState]);

  return (
    <div>
      <Button sx={{ backgroundColor: '#22a565', color: 'white' }} variant="outlined" onClick={toggleAddNew}>
        <AddIcon />Add New
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={formState}
      >
        <BootstrapDialogTitle sx={{ backgroundColor: "#050e2d", color: "white" }} id="customized-dialog-title" onClose={handleClose}>
          Add New User
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>


          <DialogContent dividers>
            <InputLabel shrink htmlFor="bootstrap-input">
              Full Name
            </InputLabel>


            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <BootstrapInput
                  placeholder="Enter full name"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error
                  label="Error" id="fullname-input"
                  helpertext="Incorrect entry."
                  required
                />
              )}
              name="full_name"
            />



            <InputLabel shrink htmlFor="userName-input">
              User Name
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <BootstrapInput
                  placeholder='Enter Username'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error
                  label="Error"
                  id="userName-input"
                  helpertext="Incorrect entry."
                  required
                />
              )}
              name="user_name"
            />




            <InputLabel shrink htmlFor="email-input">
              Email Address
            </InputLabel>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <BootstrapInput
                  placeholder='Enter user email address'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error
                  label="Error"
                  id="email-input"
                  helpertext="Incorrect entry."
                  required
                />
              )}
              name="e_mail"
            />



            <InputLabel shrink htmlFor="user-group">
              User Group
            </InputLabel>
            <Controller
              control={control}

              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl required sx={{ mt: 0, minWidth: 525 }}>
                  <InputLabel id="user-group-label">Group User</InputLabel>
                  <Select
                    labelId="user-group-required-label"
                    id="user-group-required"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="User Group *"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Active'}>Active</MenuItem>
                    <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    <MenuItem value={'Locked'}>Locked</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>

              )}
              name="group_user"
            />


            <InputLabel sx={{ mt: 2 }} shrink htmlFor="assign-profile">
              Assign Profile
            </InputLabel>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl required sx={{ mt: 0, minWidth: 525 }}>
                  <InputLabel id="assign-profile">Assign Profile</InputLabel>
                  <Select
                    labelId="assign-profile-required-label"
                    id="assign-profile-required"
                    label="User Profile *"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'profile1'}>profile1</MenuItem>
                    <MenuItem value={'profile2'}>profile2</MenuItem>
                    <MenuItem value={'profile3'}>profile3</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>

              )}
              name="user_profile"
            />

          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus>
              Save changes
            </Button>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      <DevTool control={control} />
    </div>
  );
}