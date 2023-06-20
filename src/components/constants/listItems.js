import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DescriptionIcon from '@mui/icons-material/Description';

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