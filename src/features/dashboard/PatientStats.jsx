import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiUserGroup,
  HiFaceSmile,
} from "react-icons/hi2";
import { FaUserInjured } from "react-icons/fa";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import { useUser } from "../authentication/useUser";

const StyledStats = styled.div`
  /* Box */

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  column-gap: 2rem;
  row-gap: 2rem;
`;

function PatientStats({ report = {} }) {
  // 1.

  return (
    <>
      <Stat
        title="Heart Rate"
        color="red"
        icon={<HiFaceSmile />}
        value={report?.heartRate}
      />
      <Stat
        title="Blood Pressure"
        color="red"
        icon={<HiFaceSmile />}
        value={`${report?.systolicPressure}/${report?.diastolicPressure} mmHg`}
      />
      <Stat
        title="Diagnosis"
        color="blue"
        icon={<HiFaceSmile />}
        value={report?.diagnosis}
      />
      <Stat
        title="Temperature"
        color="red"
        icon={<HiFaceSmile />}
        value={report?.temperature}
      />
      <Stat
        title="Weight"
        color="red"
        icon={<HiFaceSmile />}
        value={report?.weight}
      />
    </>
  );
}

export default PatientStats;
