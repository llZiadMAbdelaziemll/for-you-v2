import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledHeartChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function HeartChart({ report = {}, numDays }) {
  const reportFollowup = report?.followupDate?.split(",");

  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      standardTemperature: 37,
      myTemperature:
        reportFollowup?.filter((singleDate) =>
          isSameDay(date, new Date(singleDate))
        ) && report.temperature,
      // isSameDay(date, new Date(report.followupDate)) && report.temperature,
    };
  });

  const colors = isDarkMode
    ? {
        standardTemperature: { stroke: "#4f46e5", fill: "#4f46e5" },
        myTemperature: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        standardTemperature: { stroke: "#4f46e5", fill: "#c7d2fe" },
        myTemperature: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledHeartChart>
      <Heading as="h2">Body Temperature;</Heading>

      <ResponsiveContainer height={300} width="100%">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            // unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* <Legend /> */}
          <Bar
            dataKey="standardTemperature"
            type="monotone"
            stroke={colors.standardTemperature.stroke}
            fill={colors.standardTemperature.fill}
            strokeWidth={2}
            name="Standard Temperature"
            // unit="$"
          />
          <Bar
            dataKey="myTemperature"
            type="monotone"
            stroke={colors.myTemperature.stroke}
            fill={colors.myTemperature.fill}
            strokeWidth={2}
            name="My Temperature"
            // unit="$"
          />
        </BarChart>
        {/* <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart> */}
      </ResponsiveContainer>
    </StyledHeartChart>
  );
}

export default HeartChart;
