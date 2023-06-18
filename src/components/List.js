import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function NestedList() {
    const [atm, setATMOpen] = React.useState(false);
    const [business, setBusinessOpen] = React.useState(false);
    const [user, setUserOpen] = React.useState(true);
    const [license, setLicenseOpen] = React.useState(false);

    const handleATM = () => {
        setATMOpen(!atm);
    };

    const handleBusiness = () => {
        setBusinessOpen(!business);
    };
    const handleUser = () => {
        setUserOpen(!user);
    };
    const handleLicense = () => {
        setLicenseOpen(!license);
    };
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: '#050e2d' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <>
                <ListSubheader sx={{color:'gray',bgcolor:'#050e2d', display: "flex", alignItems: "center"}} component="div" id="nested-list-subheader">
                <DashboardIcon sx={{mr:1}}/><p style={{fontSize: '18px'}}>Dashboard</p>
                </ListSubheader>
                <ListSubheader sx={{color:'gray',bgcolor:'#050e2d'}} component="div" id="nested-list-subheader">
                    SETTINGS
                </ListSubheader>
                </>
            }
        >


            <ListItemButton onClick={handleATM}>
                <ListItemText primary="ATM Settings" />
                {atm ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={atm} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 1" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 2" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 3" />
                    </ListItemButton>
                </List>
            </Collapse>


            <ListItemButton onClick={handleBusiness}>
                <ListItemText primary="Business Setup" />
                {business ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={business} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 1" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 2" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 3" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={handleUser}>
                <ListItemText primary="User Management" />
                {user ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={user} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Profiles" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Groups" />
                    </ListItemButton>
                </List>
            </Collapse>


            <ListItemButton onClick={handleLicense}>
                <ListItemText primary="License Management" />
                {license ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={license} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 1" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 2" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Action 3" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}