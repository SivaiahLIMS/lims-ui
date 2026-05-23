import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
interface Props { data: { name: string; value: number; color: string }[]; innerRadius?: number; height?: number; }
export const PieDonutChart = ({ data, innerRadius = 60, height = 300 }: Props) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={innerRadius}>
        {data.map((e, i) => <Cell key={i} fill={e.color} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);
