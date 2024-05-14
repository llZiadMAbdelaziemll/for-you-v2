import styled from "styled-components";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";
import DashboardBox from "./DashboardBox";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";

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
  isLoading,
  isLoading2,
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

      {!isLoading || !isLoading2 ? (
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
        </ResponsiveContainer>
      ) : (
        <Spinner />
      )}
    </StyledSurvayChart>
  );
}

export default PatientSurvayChart;
