import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SimpleList from '../components/List';

import Summary from '../components/Summary';
import Title from '../components/Title';

import MapWithAMarkerClusterer from '../components/MapWithAMarkerClusterer';

import ErrorBoundary from '../components/ErrorBoundary';
import SimpleSelect from '../components/Select';
import Graph from '../components/Graph';
import Data from '../data/Data';
import Csv from '../data/Csv';
import Data1 from '../data/Data1';
import Data2 from '../data/Data2';
import InitialData from '../data/InitialData';


let convert = require('xml-js');

const data = InitialData.data[0]
const data2 = InitialData.data[1]
const data3 = InitialData.data[2]

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built by the Lorenzo Olliver'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 700,
    },
}));

const DashGrid = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <SimpleList onDownload={props.onDownload}></SimpleList>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Today</Title>
                                <h2>Number of detectors by location</h2>
                                {props.locationData && (
                                    <MapWithAMarkerClusterer markers={props.locationData} />
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Summary state={props.state} />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2>Number of Cars vs Lane Speeds</h2>
                                <SimpleSelect
                                    onChange={props.onChangeLanes}
                                    data={{ names: ['Lane 1', 'Lane 2', 'Both Lanes', 'Lanes 1 & 2', 'All'], values: [1, 2, 3, 4, 5], title: 'Lane Filter', dataType: 'speed' }}
                                >
                                </SimpleSelect>
                                <SimpleSelect
                                    onChange={props.onChangeGraphs}
                                    data={{ names: ['Line', 'Bar', 'Radar'], values: ['line', 'bar', 'radar'], title: 'Graph Type', dataType: 'speed' }}
                                >
                                </SimpleSelect>
                                {props.data && (
                                    <ErrorBoundary>
                                        <Graph type={props.type1} data={props.data} />
                                    </ErrorBoundary>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2>Number of Cars by Occupancy</h2>
                                <SimpleSelect
                                    onChange={props.onChangeLanes}
                                    data={{ names: ['Lane 1', 'Lane 2', 'Both Lanes', 'Lanes 1 & 2', 'All'], values: [1, 2, 3, 4, 5], title: 'Lane Filter', dataType: 'occupancy' }}
                                >
                                </SimpleSelect>
                                <SimpleSelect
                                    onChange={props.onChangeGraphs}
                                    data={{ names: ['Line', 'Bar', 'Radar'], values: ['line', 'bar', 'radar'], title: 'Graph Type', dataType: 'occupancy' }}
                                >
                                </SimpleSelect>
                                {props.data2 && (
                                    <ErrorBoundary>
                                        <Graph type={props.type2} data={props.data2} />
                                    </ErrorBoundary>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2>Number of Cars by Count</h2>
                                <SimpleSelect
                                    onChange={props.onChangeLanes}
                                    data={{ names: ['Lane 1', 'Lane 2', 'Both Lanes', 'Lanes 1 & 2', 'All'], values: [1, 2, 3, 4, 5], title: 'Lane Filter', dataType: 'count' }}
                                >
                                </SimpleSelect>
                                <SimpleSelect
                                    onChange={props.onChangeGraphs}
                                    data={{ names: ['Line', 'Bar', 'Radar'], values: ['line', 'bar', 'radar'], title: 'Graph Type', dataType: 'count' }}
                                >
                                </SimpleSelect>
                                {props.data3 && (
                                    <ErrorBoundary>
                                        <Graph type={props.type3} data={props.data3} />
                                    </ErrorBoundary>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <MadeWithLove />
            </main>
        </div>
    );
}
export default class Dashboard extends Component {
    state = {
        dataSets1: [],
        dataLabels1: [],
        dataSets2: [],
        dataLabels2: [],
        dataSets3: [],
        dataLabels3: [],
        data: null,
        data2: null,
        data3: null,
        data4: null,
        locationData: null,
        localDate: null,
        localTime: null,
        operational: null,
        detectors: null,
        aveSpeed1: null,
        avespeed2: null,
        aveOcup1: null,
        aveOcup2: null,
        markers: null,
        type1: 'line',
        type2: 'line',
        type3: 'line',
        speedData: [],
        incidentData: [],
        locationData: [],
        fileName: null
    };
    constructor(props) {
        super(props);
    }

    onChangeLanes = (e, t) => {

        if (t === 'speed') {
            if (e === 1) {
                Data.data[0].labels = this.state.dataLabels1[0]
                Data.data[0].datasets[0].data = this.state.dataSets1[0]
                this.setState({ data: Data.data[0] });
            }
            if (e === 2) {
                Data.data[1].labels = this.state.dataLabels1[1];
                Data.data[1].datasets[0].data = this.state.dataSets1[1];
                this.setState({ data: Data.data[1] });
            }
            if (e === 3) {
                Data.data[2].labels = this.state.dataLabels1[2];
                Data.data[2].datasets[0].data = this.state.dataSets1[2];
                this.setState({ data: Data.data[2] });
            }
            if (e === 4) {
                Data.data[3].labels = this.state.dataLabels1[0]
                Data.data[3].datasets[0].data = this.state.dataSets1[0]
                Data.data[3].datasets[1].data = this.state.dataSets1[1]
                this.setState({ data: Data.data[3] });
            }
            if (e === 5) {
                Data.data[4].labels = this.state.dataLabels1[0]
                Data.data[4].datasets[0].data = this.state.dataSets1[0]
                Data.data[4].datasets[1].data = this.state.dataSets1[1]
                Data.data[4].datasets[2].data = this.state.dataSets1[2]
                this.setState({ data: Data.data[4] });
            }
        }

        if (t === 'occupancy') {
            if (e === 1) {

                Data1.data[0].labels = this.state.dataLabels2[0]
                Data1.data[0].datasets[0].data = this.state.dataSets2[0]
                this.setState({ data2: Data1.data[0] });
            }
            if (e === 2) {
                Data1.data[1].labels = this.state.dataLabels2[1];
                Data1.data[1].datasets[0].data = this.state.dataSets2[1];
                this.setState({ data2: Data1.data[1] });
            }
            if (e === 3) {
                Data1.data[2].labels = this.state.dataLabels2[2];
                Data1.data[2].datasets[0].data = this.state.dataSets2[2];
                this.setState({ data2: Data1.data[2] });
            }
            if (e === 4) {
                Data1.data[3].labels = this.state.dataLabels2[0]
                Data1.data[3].datasets[0].data = this.state.dataSets2[0]
                Data1.data[3].datasets[1].data = this.state.dataSets2[1]
                this.setState({ data2: Data1.data[3] });
            }
            if (e === 5) {
                Data1.data[4].labels = this.state.dataLabels2[0]
                Data1.data[4].datasets[0].data = this.state.dataSets2[0]
                Data1.data[4].datasets[1].data = this.state.dataSets2[1]
                Data1.data[4].datasets[2].data = this.state.dataSets2[2]
                this.setState({ data2: Data1.data[4] });
            }
        }

        if (t === 'count') {
            if (e === 1) {

                Data2.data[0].labels = this.state.dataLabels3[0]
                Data2.data[0].datasets[0].data = this.state.dataSets3[0]
                this.setState({ data3: Data2.data[0] });
            }
            if (e === 2) {
                Data2.data[1].labels = this.state.dataLabels3[1];
                Data2.data[1].datasets[0].data = this.state.dataSets3[1];
                this.setState({ data3: Data2.data[1] });
            }
            if (e === 3) {
                Data2.data[2].labels = this.state.dataLabels3[2];
                Data2.data[2].datasets[0].data = this.state.dataSets3[2];
                this.setState({ data3: Data2.data[2] });
            }
            if (e === 4) {
                Data2.data[3].labels = this.state.dataLabels3[0]
                Data2.data[3].datasets[0].data = this.state.dataSets3[0]
                Data2.data[3].datasets[1].data = this.state.dataSets3[1]
                this.setState({ data3: Data2.data[3] });
            }
            if (e === 5) {
                Data2.data[4].labels = this.state.dataLabels3[0]
                Data2.data[4].datasets[0].data = this.state.dataSets3[0]
                Data2.data[4].datasets[1].data = this.state.dataSets3[1]
                Data2.data[4].datasets[2].data = this.state.dataSets3[2]
                this.setState({ data3: Data2.data[4] });
            }
        }
    }

    onChangeGraphs = (e, t) => {

        if (t === 'speed') {
            this.setState({ type1: e });
        }
        if (t === 'occupancy') {
            this.setState({ type2: e });
        }
        if (t === 'count') {
            this.setState({ type3: e });
        }
    }

    loadSpeeds = () => {
        const rawFile = new XMLHttpRequest();
        rawFile.onreadystatechange = () => {

            if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
                let xml = rawFile.response
                let result1 = convert.xml2json(xml, { compact: true, spaces: 4 });


                let resultObject = JSON.parse(result1)

                let trafficData = resultObject.trafficDetectorData['collection-periods']['collection-period']
                let localDate = trafficData['detection-time-stamp']['local-date']._text
                let localTime = trafficData['detection-time-stamp']['local-time']._text
                let reports = trafficData['detector-reports']['detector-report']
                this.setState({ speedData: [resultObject], fileName: 'SpeedData' + localDate + localTime })
                let operational = reports.filter(s => s.status._text === 'operational')
                let noLaneOneOccupancy = operational.filter(l => l.lanes.lane.length > 0 && l.lanes.lane[0].occupancy === undefined)
                let noLaneTwoOccupancy = operational.filter(l => l.lanes.lane.length > 1 && l.lanes.lane[1].occupancy === undefined)
                let lane = operational.filter(l => l.lanes.lane.length > 0)
                let laneOne = operational.filter(l => l.lanes.lane.length > 0 && l.lanes.lane[0])
                let laneTwo = operational.filter(l => l.lanes.lane.length > 1 && l.lanes.lane[1])

                let speedone = {}
                let speedtwo = {}
                let occupyone = {}
                let occupytwo = {}
                let countone = {}
                let counttwo = {}
                let totalSpeed1 = 0
                let totalSpeed2 = 0
                let aveSpeed1 = 0
                let aveSpeed2 = 0

                let totalOcup1 = 0
                let totalOcup2 = 0
                let aveOcup1 = 0
                let aveOcup2 = 0


                let laneSpeedTotals = lane.map((item) => {
                    if (item.lanes.lane[0].speed) {
                        if (speedone[item.lanes.lane[0].speed._text]) {
                            speedone[item.lanes.lane[0].speed._text]++
                        } else {
                            speedone[item.lanes.lane[0].speed._text] = 1
                        }
                    }
                    if (item.lanes.lane[0].occupancy) {
                        if (occupyone[item.lanes.lane[0].occupancy._text]) {
                            occupyone[item.lanes.lane[0].occupancy._text]++
                        } else {
                            occupyone[item.lanes.lane[0].occupancy._text] = 1
                        }
                    }
                    if (item.lanes.lane[0].count) {
                        if (countone[item.lanes.lane[0].count._text]) {
                            countone[item.lanes.lane[0].count._text]++
                        } else {
                            countone[item.lanes.lane[0].count._text] = 1
                        }
                    }
                    if (item.lanes.lane[1].speed) {
                        if (speedtwo[item.lanes.lane[1].speed._text]) {
                            speedtwo[item.lanes.lane[1].speed._text]++
                        } else {
                            speedtwo[item.lanes.lane[1].speed._text] = 1
                        }
                    }
                    if (item.lanes.lane[1].occupancy) {
                        if (occupytwo[item.lanes.lane[1].occupancy._text]) {
                            occupytwo[item.lanes.lane[1].occupancy._text]++
                        } else {
                            occupytwo[item.lanes.lane[1].occupancy._text] = 1
                        }
                    }
                    if (item.lanes.lane[1].count) {
                        if (counttwo[item.lanes.lane[1].count._text]) {
                            counttwo[item.lanes.lane[1].count._text]++
                        } else {
                            counttwo[item.lanes.lane[1].count._text] = 1
                        }
                    }

                })
                let speedDataTotal1 = 0
                let speedDataTotal2 = 0
                let occupyDataTotal1 = 0
                let occupyDataTotal2 = 0
                data.labels = Object.keys(speedone)
                data.datasets[0].data = Object.values(speedone)
                data.datasets[1].data = Object.values(speedtwo)
                data.datasets[0].data.forEach((element, index) => {
                    speedDataTotal1 = speedDataTotal1 + element
                    totalSpeed1 = totalSpeed1 + (element * (data.labels[index] && parseInt(data.labels[index], 10)))
                    data.datasets[2].data.push(data.datasets[0].data[index] + data.datasets[1].data[index])
                })
                data.datasets[1].data.forEach((element, index) => {
                    speedDataTotal2 = speedDataTotal2 + element
                    totalSpeed2 = totalSpeed2 + (element * (data.labels[index] && parseInt(data.labels[index], 10)))
                })
                aveSpeed1 = Math.round((totalSpeed1 / speedDataTotal1), 2)
                aveSpeed2 = Math.round((totalSpeed2 / speedDataTotal2), 2)

                data2.labels = Object.keys(occupyone)
                data2.datasets[0].data = Object.values(occupyone)
                data2.datasets[1].data = Object.values(occupytwo)
                data2.datasets[0].data.forEach((element, index) => {
                    occupyDataTotal1 = occupyDataTotal1 + element
                    totalOcup1 = totalOcup1 + (element * (data2.labels[index] && parseInt(data2.labels[index], 10)))
                    data2.datasets[2].data.push(data2.datasets[0].data[index] + data2.datasets[1].data[index])
                })
                data2.datasets[1].data.forEach((element, index) => {
                    occupyDataTotal2 = occupyDataTotal2 + element
                    totalOcup2 = totalOcup2 + (element * (data2.labels[index] && parseInt(data2.labels[index], 10)))
                })
                aveOcup1 = Math.round((totalOcup1 / occupyDataTotal1), 2)
                aveOcup2 = Math.round((totalOcup2 / occupyDataTotal2), 2)

                data3.labels = Object.keys(countone)
                data3.datasets[0].data = Object.values(countone)
                data3.datasets[1].data = Object.values(counttwo)
                data3.datasets[0].data.forEach((element, index) => {
                    data3.datasets[2].data.push(data3.datasets[0].data[index] + data3.datasets[1].data[index])
                })


                this.setState({ data: data, dataSets1: [data.datasets[0].data, data.datasets[1].data, data.datasets[2].data], dataLabels1: [data.labels, data.labels, data.labels] });
                this.setState({ data2: data2, dataSets2: [data2.datasets[0].data, data2.datasets[1].data, data2.datasets[2].data], dataLabels2: [data2.labels, data2.labels, data2.labels] });
                this.setState({ data3: data3, dataSets3: [data3.datasets[0].data, data3.datasets[1].data, data3.datasets[2].data], dataLabels3: [data3.labels, data3.labels, data3.labels] });

                let year = localDate[0] + localDate[1] + localDate[2] + localDate[3]
                let month = localDate[4] + localDate[5]
                let day = localDate[6] + localDate[7]
                let hour = localTime[0] + localTime[1]
                let min = localTime[2] + localTime[3]
                let sec = localTime[4] + localTime[5]
                //
                let date = month + '/' + day + '/' + year
                let time = hour + ':' + min + ':' + sec + trafficData['detection-time-stamp']['utc-offset']._text

                this.setState({ localDate: date, localTime: time, operational: operational.length, aveSpeed1: aveSpeed1, aveSpeed2: aveSpeed2, aveOcup1: aveOcup1, aveOcup2: aveOcup2 });

            }
        };

        rawFile.open('GET', 'https://mcomp.etalyc.com/api/downloads/getrealtimefeed/ia/speed', false);
        rawFile.send();
    }

    loadLocations = () => {
        const rawFile2 = new XMLHttpRequest();
        rawFile2.onreadystatechange = () => {
            if (rawFile2.readyState === 4 && (rawFile2.status === 200 || rawFile2.status === 0)) {
                let xml = rawFile2.response
                let result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
                let resultObject = JSON.parse(result1)
                let detectorD = resultObject['detectorInventory'] && resultObject['detectorInventory']['detector-list']['detector']
                let detectorData = detectorD.filter(l => l['detector-location'])
                let detectorDataSouth = detectorD.filter(l => l['detector-location'] && l['detector-approaches'] && l['detector-approaches']['detector-approach'][0] && l['detector-approaches']['detector-approach'][0]['approach-direction']._text === 's');
                let detectorDataNorth = detectorD.filter(l => l['detector-location'] && l['detector-approaches'] && l['detector-approaches']['detector-approach'][0] && l['detector-approaches']['detector-approach'][0]['approach-direction']._text === 'n');
                let detectorDataWest = detectorD.filter(l => l['detector-location'] && l['detector-approaches'] && l['detector-approaches']['detector-approach'][0] && l['detector-approaches']['detector-approach'][0]['approach-direction']._text === 'w');
                let detectorDataEast = detectorD.filter(l => l['detector-location'] && l['detector-approaches'] && l['detector-approaches']['detector-approach'][0] && l['detector-approaches']['detector-approach'][0]['approach-direction']._text === 'e');
                let detectorLocation = []
                let laneSpeedTotals = detectorData.map((item) => {
                    detectorLocation.push(item['detector-location'])
                })

                this.setState({ locationData: detectorLocation, detectors: detectorLocation.length });

            }
        }


        rawFile2.open('GET', 'https://mcomp.etalyc.com/api/downloads/getrealtimefeed/ia/location ', false);
        rawFile2.send();
    }

    onDownload = () => {
        Csv({ jsonFile: this.state.speedData, name: this.state.fileName });
    }
    componentDidMount = () => {
        this.loadSpeeds();
        this.loadLocations();
    }


    render() {
        return (
            <div>
                <DashGrid
                    type1={this.state.type1}
                    data={this.state.data}
                    type2={this.state.type2}
                    data2={this.state.data2}
                    type3={this.state.type3}
                    data3={this.state.data3}
                    onChangeGraphs={this.onChangeGraphs}
                    onChangeLanes={this.onChangeLanes}
                    locationData={this.state.locationData}
                    state={this.state}
                    onDownload={this.onDownload}
                >
                </DashGrid>
            </div>
        )
    }

}