import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DescriptionIcon from '@mui/icons-material/Description';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText>
        <Link style={{ textDecoration: "none" }} to="/home">Acasa</Link>
      </ListItemText>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LibraryAddIcon />
      </ListItemIcon>
      <ListItemText>
        <Link style={{ textDecoration: "none" }} to="/add-certificate">Creeaza adeverinta</Link>
      </ListItemText>
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText>
        <Link style={{ textDecoration: "none" }} to="/home">Vezi adeverinte</Link>
      </ListItemText>
    </ListItemButton> */}
  </React.Fragment>
);
