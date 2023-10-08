import React from 'react';
import Chart from '../../pages/Chart';
import '../../App.css';
import { ResponsiveContainer } from 'recharts';

const Graph = (props) => {
  return (
    <div className="wrapper">
      <ResponsiveContainer>
        <Chart />
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
