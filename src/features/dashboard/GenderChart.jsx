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

const StyledGenderChart = styled(DashboardBox)`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function PatientSurvayChart({ doctorPatients = {}, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      male: doctorPatients
        ?.filter((patient) => isSameDay(date, new Date(patient.created_at)))
        .filter((patient) => patient.gender === "male").length,
      female: doctorPatients
        ?.filter((patient) => isSameDay(date, new Date(patient.created_at)))
        .filter((patient) => patient.gender === "female").length,
    };
  });

  const colors = isDarkMode
    ? {
        male: { stroke: "#4f46e5", fill: "#4f46e5" },
        female: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        male: { stroke: "#4f46e5", fill: "#c7d2fe" },
        female: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledGenderChart>
      <Heading as="h2">Patients Gender</Heading>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* <Legend /> */}
          <Bar
            dataKey="male"
            type="monotone"
            stroke={colors.male.stroke}
            fill={colors.male.fill}
            strokeWidth={2}
            name="Male"
            // unit="$"
          />
          <Bar
            dataKey="female"
            type="monotone"
            stroke={colors.female.stroke}
            fill={colors.female.fill}
            strokeWidth={2}
            name="Female"
            // unit="$"
          />
        </BarChart>
      </ResponsiveContainer>
    </StyledGenderChart>
  );
}

export default PatientSurvayChart;
