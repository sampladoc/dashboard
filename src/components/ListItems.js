import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GetAppIcon from '@material-ui/icons/GetApp';
import TrafficIcon from '@material-ui/icons/Traffic';
import PeopleIcon from '@material-ui/icons/People';
import NavigationIcon from '@material-ui/icons/Navigation';
import BarChartIcon from '@material-ui/icons/BarChart';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DriveEtaIcon />
      </ListItemIcon>
      <ListItemText primary="Speed" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TrafficIcon />
      </ListItemIcon>
      <ListItemText primary="Incident" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NavigationIcon />
      </ListItemIcon>
      <ListItemText primary="Location" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GetAppIcon />
      </ListItemIcon>
      <ListItemText primary="Download Data" />
    </ListItem>
  </div>
);
