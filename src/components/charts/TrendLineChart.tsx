import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
interface Props { data: Record<string, unknown>[]; lines: { key: string; color: string; name?: string }[]; xKey?: string; height?: number; }
export const TrendLineChart = ({ data, lines, xKey = 'date', height = 300 }: Props) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
      <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend />
      {lines.map((l) => <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} name={l.name ?? l.key} strokeWidth={2} dot={false} />)}
    </LineChart>
  </ResponsiveContainer>
);
