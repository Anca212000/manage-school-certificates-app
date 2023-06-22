import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import PageviewIcon from '@mui/icons-material/Pageview';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export const navItemsStudent = [
  {
    id: 0,
    name: 'Acasa',
    iconNav: <DashboardIcon />,
    link: '/home-student'
  },
  {
    id: 1,
    name: 'Creeaza adeverinta',
    iconNav: <LibraryAddIcon />,
    link: '/add-certificate'
  },
  {
    id: 2,
    name: 'Vezi adeverinte',
    iconNav: <DescriptionIcon />,
    link: '/view-certificates'
  }
];

export const navItemsSecretary = [
  {
    id: 0,
    name: 'Acasa',
    iconNav: <DashboardIcon />,
    link: '/home-secretary'
  },
  {
    id: 1,
    name: 'Adeverinte studenti',
    iconNav: <PageviewIcon />,
    link: '/view-student-certificates'
  },
  // {
  //   id: 2,
  //   name: 'Semneaza',
  //   iconNav: <DriveFileRenameOutlineIcon />,
  //   link: '/sign-certificates'
  // }
];