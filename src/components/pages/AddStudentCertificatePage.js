import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { navItemsStudent } from '../constants/listItems';
import './dashboard.css';
import logoUSV from '../../assets/images/logousv.png';
import avatarImg from '../../assets/images/avatar.jpg';
import addImage from '../../assets/images/add.png';

const drawerWidth = 240;

const navItems = navItemsStudent;
const settings = ['Deconecteaza-te'];

AddStudentCertificate.propTypes = {
  window: PropTypes.func,
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddStudentCertificate(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [purposeAdv, setPurposeAdv] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [emailUser, setEmailUser] = React.useState('');

  const idUser = props.match.params.id;

  const defaultAlert = { 
    type: 'success', 
    content: 'Adeverinta a fost creata cu succes! Asteapta confirmarea de la secretariat penntru validitatea ei.'
    }
  const [alertType, setAlertType] = React.useState(defaultAlert);

  const getEmailByUserId = (id) => {
    fetch('http://localhost:8080/users/' + id, { method: "GET" })
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            setEmailUser(result.email);
        })
        .catch((error) => console.log("error", error));
  };

  const createStudentCertificate = (sendData) => {
    fetch("http://localhost:8080/adeverinte/", { method: "POST", body: JSON.stringify(sendData), headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
          })
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            setPurposeAdv('')
            setOpenAlert(true)
            setAlertType(defaultAlert)
        })
        .catch((error) => {
          console.log("error", error)
          setOpenAlert(true)
          setAlertType({
            type: "error",
            content: error
          })
        });
  };

  useEffect(() => {
      getEmailByUserId(idUser);
  }, [emailUser]);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Data: ' + purposeAdv);
    const newCertificate = {
      email: emailUser,
      motiv: purposeAdv,
      semnaturaSecSef: false,
      semnaturaSec: false,
      semnaturaDecan: false
    }

    createStudentCertificate(newCertificate);
  }

  const vertical = 'top';
  const horizontal = 'center';
  const alertMessage = (
    <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openAlert} 
        autoHideDuration={8000} 
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType.type} sx={{ width: '100%' }}>
            {alertType.content}
        </Alert>
    </Snackbar>
  );

  const drawer = (
    <>
    <Typography variant="h6" sx={{ textAlign: 'center', my: 2 }}>
        <img src={logoUSV} width="150" height="auto" />
      </Typography>
      <Divider />
    <Box sx={{ textAlign: 'center', my : 2 }}>
         <Avatar alt="Profile Image" src={avatarImg} sx={{ margin: '0 auto' }} style={{ width: '80px', height: 'auto'}} />
     </Box>
     <Typography variant="h7" sx={{ textAlign: 'center', fontFamily: 'Nunito, sans-serif', color: '#c5fcee' }}>Hello !</Typography>
     <Divider />
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map(item => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link style={{ textDecoration: "none", textAlign: 'center' }} to={item.link + '/' + idUser}>
                <ListItemText primary={item.iconNav} secondary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
     </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <img src={logoUSV} width="150" height="auto" />
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Link style={{ textDecoration: "none", textAlign: 'center'}} to={item.link + '/' + idUser}>
                <Button key={item.id} sx={{ color: '#fff' }} >
                  {item.name}
                </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ pl: 2 }}>
            <Tooltip title="Setari">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile Image" src={avatarImg} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </Box>
          </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {alertMessage}
          <div style={{display: 'flex', padding: '0.5rem', alignItems: 'center', justifyContent: 'left'}}>
          <LibraryAddIcon style={{fontSize: '4rem', color: 'rgba(197, 252, 238, .8)', marginLeft: '5%' }}/>
          <Typography variant="h3" style={{fontFamily: 'Righteous, cursive', color: 'rgba(197, 252, 238, .8)', marginLeft: '0.5rem'}}>Creeaza adeverinta</Typography>
          </div>
          <Divider style={{ border: '3px solid rgba(197, 252, 238, .1)', width: '90%', margin: '0 auto'}} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" style={{fontFamily: 'Nunito, sans-serif', letterSpacing:'1px', textTransform:'uppercase'}}>
                <img src={addImage} />
                COMPLETEAZA MAI JOS SCOPUL PENTRU CARE DORESTI SA ELIBEREZI ADEVERINTA
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <TextField 
                fullWidth 
                required 
                label="Scrie motivul" 
                id="purpose-text" 
                onChange={e => setPurposeAdv(e.target.value)}
                value={purposeAdv}
                autoComplete='off'
                sx={{
                    my: 5,
                }}
                />
                <Button variant="contained" color="secondary" type="submit" style={{ textTransform: 'uppercase', fontFamily: 'Righteous, cursive', fontSize: '20px', letterSpacing: '1px', color: '#C5FCEE', backgroundColor: '#000174', border:'4px solid #00E2C0'}}>
                    Salveaza
                    <ChevronRightIcon />
                </Button>
            </form>
          </Container>
        </Box>
      </Box>
  );
}