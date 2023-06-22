import * as React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { navItemsSecretary } from '../constants/listItems';
import PageviewIcon from '@mui/icons-material/Pageview';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './dashboard.css';
import logoUSV from '../../assets/images/logousv.png';
import avatarImg from '../../assets/images/avatar.jpg';

const drawerWidth = 240;

const navItems = navItemsSecretary;
const settings = [
  <Link to="/" style={{textDecoration: 'none', fontFamily: 'Nunito, sans-serif', color: 'orange'}}>Deconecteaza-te</Link>
];

DashboardSecretary.propTypes = {
  windowDash: PropTypes.func,
};

export default function DashboardSecretary(props) {
  const { windowDash } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const id = props.match.params.id;

  const getUserById = (id) => {
    fetch('http://localhost:8080/users/' + id, { method: "GET"})
        .then((response) => response.status === 404 ? window.location.replace('/page-not-found') : response.json())
        .then((result) => {
            console.log(result);
            setUser(result);
            setLoading(false);
        })
        .catch((error) => console.log("error", error));
  }

  React.useEffect(() => {
    getUserById(id);
  }, [])

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
     <Typography variant="h7" sx={{ textAlign: 'center', fontFamily: 'Nunito, sans-serif', color: '#c5fcee' }}>Buna, {user && user.nume + ' ' + user.prenume} !</Typography>
     <Typography variant="h7" sx={{ textAlign: 'center', textTransform: 'uppercase', fontFamily: 'Nunito, sans-serif', color: '#c5fcee' }}>{user && user.facultate}</Typography>
     <Divider />
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map(item => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link style={{ textDecoration: "none", textAlign: 'center' }} to={item.link + '/' + id}>
                <ListItemText primary={item.iconNav} secondary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
     </>
  );

  const container = windowDash !== undefined ? () => window().document.body : undefined;
  
  if(loading) {
    return (
      <h1 style={{
        margin:'0 auto', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        height: '100vh', 
        paddingTop: '16%', 
        fontFamily:'Righteous, cursive', 
        color: 'white'}}
      >Se incarca pagina ...
      </h1>
    );
  } else {
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
                <Link style={{ textDecoration: "none", textAlign: 'center' }} to={item.link + '/' + id}>
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
              <Typography textAlign="center">{user && user.nume + ' ' + user.prenume}</Typography>
              <Typography textAlign="center" style={{textTransform: 'uppercase'}}>{user && user.facultate}</Typography>
              <br/>
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
          <DashboardIcon style={{fontSize: '4rem', color: 'rgba(197, 252, 238, .8)', marginLeft: '5%' }}/>
          <Typography variant="h3" style={{fontFamily: 'Righteous, cursive', color: 'rgba(197, 252, 238, .8)', marginLeft: '0.5rem'}}>Meniul principal</Typography>
          </div>
          <Divider style={{ border: '3px solid rgba(197, 252, 238, .1)', width: '90%', margin: '0 auto'}} />
          <Typography variant="h5" style={{fontFamily: 'Righteous, cursive', textTransform:'capitalize', letterSpacing:'1px', color: 'rgba(197, 252, 238, .8)', marginLeft: '5%'}}>
            Bine ai venit, Dna/Dl {user && user.rol + ' ' + user.prenume} !
          </Typography>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={12}>
              <Link className="dashboard-view-student-certificates" style={{ textDecoration: "none" }} to={`/view-student-certificates/${id}`}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#415860',
                      textAlign: 'center',
                      height: 240,
                    }}
                    style={{backgroundColor: '#FFF7D6'}}
                  >
                    <PageviewIcon style={{fontSize: '4rem'}} />
                    <h1>Vezi adeverintele studentilor</h1>
                  </Paper>
                </Link>
              </Grid>
              {/* <Grid item xs={12} md={8} lg={6}>
                <Link className="dashboard-sign-certificates" style={{ textDecoration: "none" }} to={`/sign-certificates/${id}`}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF7D6',
                      textAlign: 'center',
                      height: 240,
                    }}
                    style={{backgroundColor: '#36897A'}}
                  >
                    <DriveFileRenameOutlineIcon style={{fontSize: '4rem'}} />
                      <h1>Semneaza adeverintele</h1>
                  </Paper>
                </Link>
              </Grid> */}
            </Grid>
          </Container>
        </Box>
      </Box>
    );
  }
}