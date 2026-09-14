
import { Job } from "@/types/job";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const statusColors: Record<string, string> = {
  applied: "#6366F1",
  interview: "#F59E0B",
  offer: "#34D399",
  rejected: "#EF4444"
};

type DashboardAnalyticsProps = {
  jobs: Job[];
};

function getStatusData(jobs: Job[]) {
  const statusMap = { applied: 0, interview: 0, offer: 0, rejected: 0 };
  jobs.forEach(job => {
    statusMap[job.status] = (statusMap[job.status] || 0) + 1;
  });
  return Object.entries(statusMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: statusColors[name]
  }));
}

function getWeeklyAppliedData(jobs: Job[]) {
  if (!jobs.length) return [];
  const weekMap: Record<string, number> = {};
  jobs.forEach(job => {
    const d = new Date(job.dateApplied);
    const year = d.getFullYear();
    const week = Math.floor(((d.getTime() - new Date(year,0,1).getTime()) / (1000*60*60*24) + new Date(year,0,1).getDay() + 1) / 7);
    const weekLabel = `${year}-W${String(week).padStart(2,"0")}`;
    weekMap[weekLabel] = (weekMap[weekLabel] || 0) + 1;
  });
  return Object.entries(weekMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, count]) => ({
      week, count
    }));
}


const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Skip label if value is 0 or very small (less than 2% slice)
  if (value === 0 || percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {`${name}: ${value}`}
    </text>
  );
};


export function DashboardAnalytics({ jobs }: DashboardAnalyticsProps) {
  const pieData = getStatusData(jobs);
  const lineData = getWeeklyAppliedData(jobs);
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
      <Card className="flex flex-col items-center bg-white/80 dark:bg-background/80 shadow-md rounded-xl">
        <CardHeader className="flex items-center gap-2 w-full py-3 sm:py-4 px-3 sm:px-6">
          <PieChartIcon className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
          <CardTitle className="text-sm sm:text-base font-semibold">Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="w-full h-[200px] sm:h-[260px] px-2 sm:px-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={pieData} 
                cx="50%" 
                cy="50%" 
                labelLine={false} 
                // label={isMobile ? undefined : ({ name, value }) => value ? `${name}: ${value}` : ""} 
                label={isMobile ? undefined : renderCustomLabel}

                outerRadius={isMobile ? "80%" : "90%"} 
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="flex flex-col items-center bg-white/80 dark:bg-background/80 shadow-md rounded-xl">
        <CardHeader className="flex items-center gap-2 w-full py-3 sm:py-4 px-3 sm:px-6">
          <LineChartIcon className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
          <CardTitle className="text-sm sm:text-base font-semibold">Applications per Week</CardTitle>
        </CardHeader>
        <CardContent className="w-full h-[200px] sm:h-[260px] px-0 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44475a" />
              <XAxis dataKey="week" stroke="#ccc" tick={isMobile ? { fontSize: 8 } : undefined} />
              <YAxis allowDecimals={false} stroke="#ccc" width={isMobile ? 20 : 30} tick={isMobile ? { fontSize: 10 } : undefined} />
              <Tooltip />
              <Legend wrapperStyle={isMobile ? { fontSize: '10px' } : undefined} />
              <Line type="monotone" dataKey="count" stroke="#9b87f5" activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
