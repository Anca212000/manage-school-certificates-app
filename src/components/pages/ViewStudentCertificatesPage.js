import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import MuiAlert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';

import CardCertifcate from "../cards/CardCertificate";
import { navItemsStudent } from '../constants/listItems';
import './dashboard.css';

import logoUSV from '../../assets/images/logousv.png';
import avatarImg from '../../assets/images/avatar.jpg';
import waitImage from '../../assets/images/waiting-list.png';
import checkImage from '../../assets/images/check.png';

const drawerWidth = 240;

const navItems = navItemsStudent;
const settings = ['Deconecteaza-te'];

ViewStudentCertificates.propTypes = {
  windowView: PropTypes.func,
};

export default function ViewStudentCertificates(props) {
  const { windowView } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [emailUser, setEmailUser] = useState('');
  const [certificatesWait, setCertificatesWait] = useState([]); //array [] for multiple data
  const [certificatesFinished, setCertificatesFinished] = useState([]);
  // const [certificate, setCertificate] = useState('');

  const idUser = props.match.params.id;
  // const idCertificate = props.match.params.idAdv;

  const getUserById = (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/users/" + id, requestOptions)
      .then((response) => response.status === 404 ? window.location.replace('/page-not-found') : response.json())
      .then((result) => {
        console.log(result)
        setEmailUser(result.email)
      })
      .catch((error) => console.log("error", error));
  };

  const getCertificateByUserEmail = (email) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:8080/adeverinte?email=${email}`, requestOptions)
      .then((response) => response.status === 404 ? window.location.replace('/page-not-found') : response.json())
      .then((result) => {
        // setCertificate(result);
        console.log(result)
        result.map((adv) => {
        //   // console.log(adv)
        if (adv.semnaturaSecSef && adv.semnaturaSec && adv.semnaturaDecan) {
          setCertificatesFinished(current => [...current, adv]);
          // setCertificatesFinished(result);
        }
        else {
          setCertificatesWait(current => [...current, adv]);
          // setCertificatesWait(result);
        }
        })
        // console.log(certificatesWait)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getUserById(idUser);
    getCertificateByUserEmail(emailUser);
  }, [emailUser]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
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

  const container = windowView !== undefined ? () => window().document.body : undefined;

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
          <div style={{display: 'flex', padding: '0.5rem', alignItems: 'center', justifyContent: 'left'}}>
          <DescriptionIcon style={{fontSize: '4rem', color: 'rgba(197, 252, 238, .8)', marginLeft: '5%' }}/>
          <Typography variant="h3" style={{fontFamily: 'Righteous, cursive', color: 'rgba(197, 252, 238, .8)', marginLeft: '0.5rem'}}>Vezi adeverinte</Typography>
          </div>
          <Divider style={{ border: '3px solid rgba(197, 252, 238, .1)', width: '90%', margin: '0 auto'}} />
          {/* {!certificatesWait.length && !certificatesFinished.length && (
            <Typography variant="h5" style={{fontFamily: 'Nunito, sans-serif', letterSpacing:'1px', textTransform:'uppercase', margin: '5%'}}>
              Nu exista adeverinte adaugate pana in acest moment.
            </Typography>
          )} */}
          {certificatesWait.length && ( // certificatesWait.length
            <>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h5" style={{fontFamily: 'Nunito, sans-serif', letterSpacing:'1px', textTransform:'uppercase', marginBottom: '1rem'}}>
                    <img src={waitImage} width="50" height="auto" style={{marginRight: '1rem' }}/>
                    In asteptare
                </Typography>
                <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                    {certificatesWait.map((adeverinta) => 
                      <Card style={{backgroundColor: '#004A90', width: '350px'}}>
                        <CardCertifcate wait={true} dataAdeverinta={adeverinta} />
                      </Card>
                    )}
                </div>
              </Container>
              <Divider style={{ border: '2px solid rgba(197, 252, 238, .1)', width: '60%', margin: '0 auto'}} />
            </>
          )}
          {certificatesFinished.length && (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" style={{fontFamily: 'Nunito, sans-serif', letterSpacing:'1px', textTransform:'uppercase', marginBottom: '1rem'}}>
                <img src={checkImage} width="50" height="auto" style={{marginRight: '1rem' }}/>
                Validate
            </Typography>
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {certificatesFinished.map((adeverinta) => 
                  <Card style={{backgroundColor: '#1A3A00', width: '350px'}}>
                    <CardCertifcate wait={false} dataAdeverinta={adeverinta} />
                  </Card>
                )}
            </div>
          </Container>
          )}
        </Box>
      </Box>
  );
}