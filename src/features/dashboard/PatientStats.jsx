import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiUserGroup,
  HiFaceSmile,
} from "react-icons/hi2";
import {
  FaUserInjured,
  FaTemperatureHigh,
  FaDiagnoses,
  FaWeight,
} from "react-icons/fa";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { MdBloodtype } from "react-icons/md";
import { BsEmojiDizzy } from "react-icons/bs";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import Row from "../../ui/Row";
import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import Capsule from "./Capsule";

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
        icon={<MdBloodtype />}
        value={report?.heartRate}
      />
      <Stat
        title="Blood Pressure"
        color="red"
        icon={<BsFillHeartPulseFill />}
        value={`${report?.systolicPressure}/${report?.diastolicPressure}`}
      />

      <Stat
        title="Temperature"
        color="red"
        icon={<FaTemperatureHigh />}
        value={report?.temperature}
      />
      <Stat
        title="Weight"
        color="red"
        icon={<FaWeight />}
        value={report?.weight}
      />

      <Capsule title="Medications" value={report?.medications} />
      <Capsule title="Symptoms" value={report?.symptoms} />
      <Capsule title="Notes" value={report?.notes} />
      <Capsule title="Diagnosis" value={report?.diagnosis} />
    </>
  );
}

export default PatientStats;
