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

const StyledSurvayChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function PatientSurvayChart({
  allPatients = {},
  doctorPatients = {},
  numDays,
}) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalPatients: allPatients?.filter((patient) =>
        isSameDay(date, new Date(patient.created_at))
      ).length,
      myPatients: doctorPatients?.filter((patient) =>
        isSameDay(date, new Date(patient.created_at))
      ).length,
    };
  });

  const colors = isDarkMode
    ? {
        totalPatients: { stroke: "#4f46e5", fill: "#4f46e5" },
        myPatients: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalPatients: { stroke: "#4f46e5", fill: "#c7d2fe" },
        myPatients: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSurvayChart>
      <Heading as="h2">
        Patients Survay {format(allDates.at(0), "MMM dd yyyy")} &mdash;
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart width={730} height={250} data={data}>
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
          <Area
            dataKey="totalPatients"
            type="monotone"
            stroke={colors.totalPatients.stroke}
            fill={colors.totalPatients.fill}
            strokeWidth={2}
            name="Total Patients"
            // unit="$"
          />
          <Area
            dataKey="myPatients"
            type="monotone"
            stroke={colors.myPatients.stroke}
            fill={colors.myPatients.fill}
            strokeWidth={2}
            name="My Patients"
            // unit="$"
          />
        </AreaChart>
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
    </StyledSurvayChart>
  );
}

export default PatientSurvayChart;
