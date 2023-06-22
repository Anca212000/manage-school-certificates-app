import React, {useEffect} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
import { navItemsStudent } from '../constants/listItems';
import './dashboard.css';
import logoUSV from '../../assets/images/logousv.png';
import avatarImg from '../../assets/images/avatar.jpg';
import checkImage from '../../assets/images/check.png';
import signDefault from '../../assets/images/sign-default.jpg';

const drawerWidth = 240;

const navItems = navItemsStudent;
const settings = ['Deconecteaza-te'];

StudentCertificatePaper.propTypes = {
  window: PropTypes.func,
};

export default function StudentCertificatePaper(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState('');
  const [purposeAdv, setPurposeAdv] = React.useState('');

  const idPaper = props.match.params.idAdv;

  const getCertificateById = (idPaper) => {
    fetch("http://localhost:8080/adeverinte/" + idPaper, { method: "GET"})
        .then((response) => response.json())
        .then((result) => {
            // console.log(result)
            setPurposeAdv(result);
        })
        .catch((error) => console.log("error", error));
  };

  const getUserByEmail = (email) => {
    fetch(`http://localhost:8080/users?email=${email}`, { method: "GET"})
        .then((response) => response.json())
        .then((result) => {
            // console.log(result)
            if (result.length) {
                setUser(result[0]);
            }
        })
        .catch((error) => console.log("error", error));
  };

  useEffect(() => {
      getCertificateById(idPaper);
      getUserByEmail(purposeAdv.email);
  }, [purposeAdv]);

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
              <Link style={{ textDecoration: "none", textAlign: 'center' }} to={item.link + '/' + user.id}>
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
                <Link style={{ textDecoration: "none", textAlign: 'center'}} to={item.link + '/' + user.id}>
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
          {/* <img src={checkImage} width="50" height="auto" style={{marginRight: '1rem', marginLeft: '5%' }}/> */}
          <Typography variant="h3" style={{fontFamily: 'Righteous, cursive', color: 'rgba(197, 252, 238, .8)', marginLeft: '5%'}}>Detalii adeverinta:</Typography>
          </div>
          <Divider style={{ border: '3px solid rgba(197, 252, 238, .1)', width: '90%', margin: '0 auto'}} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div style={{backgroundColor: '#fff', width: '100%', boxShadow:'2px 4px 10px rgba(74, 74, 74, .8)', padding: '18px'}}>
                <div style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold'}}>
                UNIVERSITATEA “STEFAN CEL MARE” DIN SUCEAVA<br/>
                FACULTATEA DE INGINERIE ELECTRICA SI STIINTA CALCULATOARELOR
                </div>
                <div style={{fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', display:'flex', justifyContent: 'flex-end'}}>
                    Nr. <i>{user && user.nrMatricol}</i>&nbsp; / {user && user.facultate.toUpperCase()}
                </div>
                <div style={{ display:'flex', justifyContent: 'center', padding:'2rem 0'}}>
                    <h4 style={{textTransform: 'uppercase' }}><b style={{fontFamily: 'Nunito, sans-serif'}}>Adeverinta</b></h4>
                </div>
                <p style={{fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', textAlign:'justify', justifyContent: 'center', padding:'0 2rem'}}>
                    Studentul (a) <i>{user && user.nume + ' ' + user.prenume}</i> este inscris (a) in anul universitar 2022 / 2023 in anul <i>{user && user.anStudiu}</i> de studii, program/domeniu de studii - {user && user.tipProgramStudiu}: <i style={{textTransform: 'uppercase'}}>{user && user.domeniuStudiu}</i>, 
                    forma de invatamant {user && user.formaInvatamant}, regim: <i>{user && user.regim}</i>.
                </p>
                <br/>
                <p style={{fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', textAlign:'justify', justifyContent: 'center', padding:'0 2rem'}}>
                    Adeverinta se elibereaza pentru a-i servi la <i style={{textTransform: 'uppercase'}}>{purposeAdv && purposeAdv.motiv}</i>.
                </p>
                <div style={{ display:'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '5rem 2rem 3rem 2rem'}}>
                    <div style={{display: 'grid'}}>
                        <h6 style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Decan,</h6>
                        <h7 style={{fontFamily: 'Nunito, sans-serif'}}>Prof. univ. dr. ing. Laurentiu-Dan Milici</h7>
                        {purposeAdv && purposeAdv.semnaturaDecan && <img src={signDefault} width="200" height="auto"/> }
                    </div>
                    <div style={{display: 'grid'}}>
                        <h6 style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Secretar sef,</h6>
                        <h7 style={{fontFamily: 'Nunito, sans-serif'}}>ing. Elena CURELARU</h7>
                        {purposeAdv && purposeAdv.semnaturaSecSef && <img src={signDefault} width="200" height="auto"/>}
                    </div>
                    <div style={{display: 'grid'}}>
                        <h6 style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Secretariat,</h6>
                        <h7 style={{fontFamily: 'Nunito, sans-serif'}}>ec. Laura DOSPINESCU</h7>
                        {purposeAdv && purposeAdv.semnaturaSec && <img src={signDefault} width="200" height="auto"/>}
                    </div>
                </div>
            </div>
          </Container>
        </Box>
      </Box>
  );
}