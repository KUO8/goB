import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const PopularityChart = ({ registrations, schedule }) => {
  // Подсчитываем популярность каждой тренировки
  const trainingPopularity = schedule.map(training => {
    const count = registrations.filter(r => r.schedule_id == training.id).length;
    return {
      name: `${training.group_name} (${training.day})`,
      Записалось: count,
      Мест: training.max_participants
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={trainingPopularity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Записалось" fill="#ff6b00" />
        <Bar dataKey="Мест" fill="#1e3a8a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PopularityChart;