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
    <ListItemButton>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText>
        <Link style={{ textDecoration: "none" }} to="/home">Vezi adeverinte</Link>
      </ListItemText>
    </ListItemButton>
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );