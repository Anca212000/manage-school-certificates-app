import React, { useEffect } from 'react';
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
import { navItemsSecretary } from '../constants/listItems';
import PageviewIcon from '@mui/icons-material/Pageview';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import './dashboard.css';
import logoUSV from '../../assets/images/logousv.png';
import avatarImg from '../../assets/images/avatar.jpg';
import docsImg from '../../assets/images/documents.png';

const drawerWidth = 240;

const navItems = navItemsSecretary;
const settings = ['Deconecteaza-te'];

ListStudentCertificates.propTypes = {
  window: PropTypes.func,
};

export default function ListStudentCertificates(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [certificates, setCertificates] = React.useState(null);

  const id = props.match.params.id;

  const getAllStudentsCertificates = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch('http://localhost:8080/adeverinte/', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCertificates(result);
        console.log(result)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllStudentsCertificates();
  }, []);

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
          <PageviewIcon style={{fontSize: '4rem', color: 'rgba(197, 252, 238, .8)', marginLeft: '5%' }}/>
          <Typography variant="h3" style={{fontFamily: 'Righteous, cursive', color: 'rgba(197, 252, 238, .8)', marginLeft: '0.5rem'}}>Adeverinte studenti</Typography>
          </div>
          <Divider style={{ border: '3px solid rgba(197, 252, 238, .1)', width: '90%', margin: '0 auto'}} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" style={{fontFamily: 'Nunito, sans-serif', letterSpacing:'1px', textTransform:'uppercase'}}>
                <img src={docsImg} /> VEZI LISTA ADEVERINTELOR CREATE PANA ACUM DE STUDENTI:
            </Typography>
            <Grid item xs={12} md={6} sx = {{ mt : 2 }}>
                <List>
                  {certificates && certificates.map((item) => 
                    <ListItem
                    secondaryAction={
                        <Link to={`/validate-certificate/${id}/${item.id}`}>
                            <IconButton edge="end" aria-label="delete" size="small" style={{
                                backgroundColor: '#8A7260',
                                borderRadius:'5px',
                                color: '#FFF',
                            }}>
                                <Typography style={{fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', letterSpacing:'1px', textTransform:'uppercase'}}>
                                    Vezi detalii
                                </Typography>
                                <ChevronRightIcon />
                            </IconButton>
                        </Link>
                    }
                    style={{
                        backgroundColor: '#584232',
                        border: '3px solid #8A7260',
                        borderRadius: '10px',
                        boxShadow: '3px 4px 8px #1A3139',
                    }}
                    sx={{ my: '10px' }}
                    >
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: '#8A7260'}}>
                        <TextSnippetIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <div className="list-content">
                        <ListItemText
                            className="list-item-certificates"
                            primary={"Motiv: " + item.motiv}
                            // secondary={item.email}
                            sx = {{ pr : 2 }}
                        />
                        <ListItemText
                            className="list-item-certificates"
                            // primary="Calculatoare"
                            secondary={item.email}
                            sx = {{ pr : 2 }}
                        />
                    </div>
                    </ListItem>
                    )}
                </List>
            </Grid>
          </Container>
        </Box>
      </Box>
  );
}