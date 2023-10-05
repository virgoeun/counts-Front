import React from 'react';
import Chart from '../../pages/Chart';
import classes from './graph.module.css';
import { ResponsiveContainer } from 'recharts';

const Graph = (props) => {
  return (
    <div className={classes.wrapper}>
      <ResponsiveContainer>
        <Chart />
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
