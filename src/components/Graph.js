import React, { Component } from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';


export default function Graph(props) {
    const { type } = props;
    return (
      <div style={{justifyContent: 'center'}}>
            {
                {
                    'line': <Line data={props.data}/>,
                    'bar': <Bar data={props.data}  height={400} options={{ maintainAspectRatio: false }}/>,
                    'radar': <Radar data={props.data} />,
                }[type]
            }  
      </div>
    );
}