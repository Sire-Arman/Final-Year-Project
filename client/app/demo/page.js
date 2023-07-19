"use client";

import React from "react";
import { LineChart, Line, YAxis, Tooltip } from "recharts";

const Chart = () => {
  const data = [{ name: "Sentiment", value: 0.12 }];

  return (
    <LineChart width={400} height={300} data={data} margin={{ left: -20 }}>
      <YAxis type="number" domain={[-1, 1]} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        strokeWidth={2}
        dot={{ r: 4 }}
      />
    </LineChart>
  );
};

export default Chart;
