import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { navItemsSecretary } from '../constants/listItems';
import PageviewIcon from '@mui/icons-material/Pageview';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SchoolIcon from '@mui/icons-material/School';
import './dashboard.css';
import logoUSV from '../../assets/images/logousv.png';
import avatarImg from '../../assets/images/avatar.jpg';
import docsImg from '../../assets/images/documents.png';
import signDefault from '../../assets/images/sign-default.jpg';
import checkImg from '../../assets/images/check.png';
import dismissImg from '../../assets/images/x-button.png';

const drawerWidth = 240;

const navItems = navItemsSecretary;
const settings = ['Deconecteaza-te'];

ValidateCertificatePaper.propTypes = {
  window: PropTypes.func,
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ValidateCertificatePaper(props) {
  const { window } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [validatePaper, setValidatePaper] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState({type: '', content: ''});

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

  const handleCloseDialogNoAction = () => {
    setValidatePaper(null);
    setOpenDialog(false);
  }

  const handleCloseDialogContinue = () => {
    setOpenDialog(false);
    const messAlert = validatePaper ? 'Adeverinta a fost validata cu succes ! Urmeaza a fi semnata.' : 'Adeverinta a fost refuzata ! Nu va mai fi valabila din acest moment.';
    setAlertType({
        type: 'success',
        content: messAlert
    })
    setOpenAlert(true);
    setValidatePaper(null);
  }

  const dialog = (
    <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialogNoAction}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ fontFamily: 'Nunito, sans-serif', color: '#0C4D5E', fontWeight: 'bold'}}>
          {`Esti sigur/a ca vrei sa ${validatePaper ? 'accepti': 'refuzi'} aceasta adeverinta?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: 'Nunito, sans-serif', color: '#415860', fontWeight: 'bold'}}>
            Aceasta actiune e ireversibila.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="dialog-button" autoFocus onClick={handleCloseDialogNoAction} style={{fontFamily: 'Righteous, cursive', color:'#fff', backgroundColor:'#9CB5BE'}}>
            Inchide
          </Button>
          <Button className="dialog-button" onClick={handleCloseDialogContinue} autoFocus style={{fontFamily: 'Righteous, cursive', color:'#fff', backgroundColor:'#9CB5BE'}}>
            Continua
          </Button>
        </DialogActions>
      </Dialog>
  );

  const acceptCertificate = () => {
    setValidatePaper(true);
    setOpenDialog(true);
  }

  const refuseCertificate = () => {
    setValidatePaper(false);
    setOpenDialog(true);
  }

  const vertical = 'top';
  const horizontal = 'center';
  const alertMessage = (
    <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openAlert} 
        autoHideDuration={5000} 
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
              <Link style={{ textDecoration: "none", textAlign: 'center' }} to={item.link}>
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
                <Link style={{ textDecoration: "none", textAlign: 'center' }} to={item.link}>
                <Button key={item.id} sx={{ color: '#fff' }}>
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
          {alertType ? alertMessage : ''}
          <div style={{display: 'flex', padding: '0.5rem', alignItems: 'center', justifyContent: 'left'}}>
          <SchoolIcon style={{fontSize: '4rem', color: 'rgba(197, 252, 238, .8)', marginLeft: '5%' }}/>
          <Typography variant="h3" style={{fontFamily: 'Righteous, cursive', color: 'rgba(197, 252, 238, .8)', marginLeft: '0.5rem', display: 'flex', flexWrap: 'wrap'}}>Popa Andrei Marian,&nbsp;
          <span style={{fontFamily: 'Righteous, cursive', textTransform: 'uppercase'}}>Calculatoare</span>
          </Typography>
          </div>
          <Divider style={{ border: '3px solid rgba(197, 252, 238, .1)', width: '90%', margin: '0 auto'}} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div style={{backgroundColor: '#fff', width: '100%', boxShadow:'2px 4px 10px rgba(74, 74, 74, .8)', padding: '18px', margin: '0 0 20px 0'}}>
                <div style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold'}}>
                UNIVERSITATEA “STEFAN CEL MARE” DIN SUCEAVA<br/>
                FACULTATEA DE INGINERIE ELECTRICA SI STIINTA CALCULATOARELOR
                </div>
                <div style={{fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', display:'flex', justifyContent: 'flex-end'}}>
                    Nr. <i>1234</i>&nbsp; / FIESC
                </div>
                <div style={{ display:'flex', justifyContent: 'center', padding:'2rem 0'}}>
                    <h4 style={{textTransform: 'uppercase' }}><b style={{fontFamily: 'Nunito, sans-serif'}}>Adeverinta</b></h4>
                </div>
                <p style={{fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', textAlign:'justify', justifyContent: 'center', padding:'0 2rem'}}>
                    Studentul (a) <i>Popa Andrei</i> este inscris (a) in anul universitar 2022 / 2023 in anul <i>1</i> de studii, program/domeniu de studii - licenta: <i style={{textTransform: 'uppercase'}}>Calculatoare</i>, 
                    forma de invatamant IF, regim: <i>fara taxa</i>.
                </p>
                <br/>
                <p style={{fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', textAlign:'justify', justifyContent: 'center', padding:'0 2rem'}}>
                    Adeverinta se elibereaza pentru a-i servi la <i>SERVICIU / LOCUL DE MUNCA etc.. </i>.
                </p>
                <div style={{ display:'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '5rem 2rem 3rem 2rem'}}>
                    <div style={{display: 'grid'}}>
                        <h6 style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Decan,</h6>
                        <h7 style={{fontFamily: 'Nunito, sans-serif'}}>Prof. univ. dr. ing. Laurentiu-Dan Milici</h7>
                        {/* <img src={signDefault} width="200" height="auto"/> */}
                    </div>
                    <div style={{display: 'grid'}}>
                        <h6 style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Secretar sef,</h6>
                        <h7 style={{fontFamily: 'Nunito, sans-serif'}}>ing. Elena CURELARU</h7>
                        {/* <img src={signDefault} width="200" height="auto"/> */}
                    </div>
                    <div style={{display: 'grid'}}>
                        <h6 style={{fontFamily: 'Nunito, sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Secretariat,</h6>
                        <h7 style={{fontFamily: 'Nunito, sans-serif'}}>ec. Laura DOSPINESCU</h7>
                        {/* <img src={signDefault} width="200" height="auto"/> */}
                    </div>
                </div>
            </div>
          <Divider style={{ border: '3px solid rgba(197, 252, 238, .1)', width: '80%', margin: '0 auto'}} />
          <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '15px', margin: '20px 0'}}>
            <Button className="accept-button" startIcon={<img src={checkImg} width="28" height="28" />} variant="contained" color="secondary" onClick={acceptCertificate} style={{ textTransform: 'uppercase', fontFamily: 'Righteous, cursive', fontSize: '20px', letterSpacing: '1px', color: '#194200', backgroundColor: '#70B400', border:'4px solid #194200', borderRadius: '40px'}}>
                Accepta
            </Button>
            <Button className="dismiss-button" startIcon={<img src={dismissImg} width="28" height="28" />} variant="contained" color="secondary" onClick={refuseCertificate} style={{ textTransform: 'uppercase', fontFamily: 'Righteous, cursive', fontSize: '20px', letterSpacing: '1px', color: '#FFF', backgroundColor: '#630000', border:'4px solid #B60000', borderRadius: '40px'}}>
                Refuza
            </Button>
          </div>
            {dialog}
          </Container>
        </Box>
      </Box>
  );
}