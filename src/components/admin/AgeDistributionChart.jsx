import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AgeDistributionChart = ({ registrations }) => {
  // Группируем по возрастам
  const ageGroups = {
    '7-10 лет': 0,
    '11-14 лет': 0,
    '15-17 лет': 0
  };

  registrations.forEach(reg => {
    const age = parseInt(reg.child_age);
    if (age >= 7 && age <= 10) ageGroups['7-10 лет']++;
    else if (age >= 11 && age <= 14) ageGroups['11-14 лет']++;
    else if (age >= 15 && age <= 17) ageGroups['15-17 лет']++;
  });

  const data = Object.entries(ageGroups).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#ff6b00', '#1e3a8a', '#4caf50'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AgeDistributionChart;