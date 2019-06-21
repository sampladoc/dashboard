/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  summaryContext: {
    flex: 1,
    height: '100px',
  },
  pad: {
    marginBottom: '10px',
  }
});

export default function Summary(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Data Summary</Title>
      <Typography color="textSecondary" className={classes.summaryContext}>
        Data Collection date
        <h4 className={classes.pad}>{props.state.localDate}</h4>
        Data Collection time
        <h4 className={classes.pad}>{props.state.localTime}</h4>
        Total Number of Detectors
        <h4 className={classes.pad}>{props.state.detectors}</h4>
        Number of Detectors Operational
        <h4 className={classes.pad}>{props.state.operational}</h4>
        Average Lane 1 Speed
        <h4 className={classes.pad}>{props.state.aveSpeed1}</h4>
        Average Lane 2 Speed
        <h4 className={classes.pad}>{props.state.aveSpeed2}</h4>
        Average Lane 1 Occupancy
        <h4 className={classes.pad}>{props.state.aveOcup1}</h4>
        Average Lane 2 Occupancy
        <h4 className={classes.pad}>{props.state.aveOcup2}</h4>
      </Typography>
      
      <div>
        {props.children}
      </div>
    </React.Fragment>
  );
}