import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import GetAppIcon from '@material-ui/icons/GetApp';
import TrafficIcon from '@material-ui/icons/Traffic';
import NavigationIcon from '@material-ui/icons/Navigation';
import BarChartIcon from '@material-ui/icons/BarChart';
import DriveEtaIcon from '@material-ui/icons/DriveEta';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="Main mailbox folders">
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
                <ListItem button onClick={props.onDownload}>
                    <ListItemIcon>
                        <GetAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Download Data" />
                </ListItem>
            </List>

        </div>
    );
}