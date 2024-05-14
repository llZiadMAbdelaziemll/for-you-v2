import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import Spinner from "../../ui/Spinner";

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
  @media (max-width: 480px) {
    grid-column: 1 / span 2;
    padding: 2.4rem 0 2.4rem 3.2rem;
  }
`;
// const startDataLight = [
//   {
//     gender: "male",
//     value: 0,
//     color: "#c7d2fe",
//   },
//   {
//     gender: "female",
//     value: 0,
//     color: "#dcfce7",
//   },
// ];

// const startDataDark = [
//   {
//     gender: "male",
//     value: 5,
//     color: "#4f46e5",
//   },
//   {
//     gender: "female",
//     value: 3,
//     color: "#22c55e",
//   },
// ];
function preparData(males, females, isDarkMode) {
  return [
    {
      gender: "male",
      value: males,
      color: `${isDarkMode ? "#4f46e5" : "#3b82f6"}`,
    },
    {
      gender: "female",
      value: females,
      color: `${isDarkMode ? "#22c55e" : "#14b8a6"}`,
    },
  ];
}
function GenderChart({ doctorPatients = {}, isLoading }) {
  const { isDarkMode } = useDarkMode();

  const males = doctorPatients?.filter(
    (patient) => patient.gender === "male"
  ).length;
  const females = doctorPatients?.filter(
    (patient) => patient.gender === "female"
  ).length;

  const data = preparData(males, females, isDarkMode);

  return (
    <StyledGenderChart>
      <Heading as="h2">Patients Gender</Heading>

      {!isLoading ? (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              nameKey="gender"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {data?.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.gender}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Spinner />
      )}
    </StyledGenderChart>
  );
}

export default GenderChart;
