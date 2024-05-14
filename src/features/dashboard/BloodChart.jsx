import styled from "styled-components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
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

const startDataLight = [
  {
    duration: "A+",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "A-",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "B+",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "B-",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "AB+",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "AB-",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "O+",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "O-",
    value: 0,
    color: "#456dd1",
  },
];

const startDataDark = [
  {
    duration: "A+",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "A-",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "B+",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "B-",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "AB+",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "AB-",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "O+",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "O-",
    value: 0,
    color: "#456dd7",
  },
];

function prepareData(startData, groups) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = groups
    .reduce((arr, cur) => {
      const group = cur.bloodGroup;
      if (group === "A+") return incArrayValue(arr, "A+");
      if (group === "A-") return incArrayValue(arr, "A-");
      if (group === "B+") return incArrayValue(arr, "B+");
      if (group === "B-") return incArrayValue(arr, "B-");
      if (group === "AB+") return incArrayValue(arr, "AB+");
      if (group === "AB-") return incArrayValue(arr, "AB-");
      if (group === "O+") return incArrayValue(arr, "O+");
      if (group === "O-") return incArrayValue(arr, "O-");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function BloodChart({ recentPatients }) {
  console.log(recentPatients);
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, recentPatients);

  console.log(data);

  return (
    <ChartBox>
      <Heading as="h2">Blood-group summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
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
    </ChartBox>
  );
}

export default BloodChart;
