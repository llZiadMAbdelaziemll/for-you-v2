import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { appointments } from "./data-appointments";
import { doctors } from "./data-doctors";
import { patients } from "./data-patients";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deletePatients() {
  const { error } = await supabase.from("patients").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteDoctors() {
  const { error } = await supabase.from("doctors").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteAppointments() {
  const { error } = await supabase.from("appointments").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createPatients() {
  const { error } = await supabase.from("patients").insert(patients);
  if (error) console.log(error.message);
}

async function createDoctors() {
  const { error } = await supabase.from("doctors").insert(doctors);
  if (error) console.log(error.message);
}

async function createAppointments() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: patientsIds } = await supabase
    .from("patients")
    .select("id")
    .order("id");
  const allPatientIds = patientsIds.map((doctor) => doctor.id);
  const { data: doctorsIds } = await supabase
    .from("doctors")
    .select("id")
    .order("id");
  const allDoctorIds = doctorsIds.map((doctor) => doctor.id);

  const finalAppointments = appointments.map((appointment) => {
    const doctorName = doctors.at(appointment.doctorId - 1).name;
    const patientName = patients.at(appointment.patientId - 2).name;
    const numOfCons = subtractDates(appointment.endDate, appointment.startDate);
    // const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    // const extrasPrice = appointment.hasBreakfast
    //   ? numNights * 15 * appointment.numGuests
    //   : 0;
    // const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(appointment.endDate)) &&
      !isToday(new Date(appointment.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(appointment.startDate)) ||
      isToday(new Date(appointment.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(appointment.endDate)) ||
        isToday(new Date(appointment.endDate))) &&
      isPast(new Date(appointment.startDate)) &&
      !isToday(new Date(appointment.startDate))
    )
      status = "checked-in";

    return {
      ...appointment,
      name: patientName,
      doctor: doctorName,
      numOfCons,

      patientId: allPatientIds.at(appointment.patientId - 2),
      doctorId: allDoctorIds.at(appointment.doctorId - 1),
      status,
    };
  });

  console.log(finalAppointments);

  const { error } = await supabase
    .from("appointments")
    .insert(finalAppointments);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteAppointments();
    await deletePatients();
    await deleteDoctors();

    // Bookings need to be created LAST
    await createPatients();
    await createDoctors();
    await createAppointments();

    setIsLoading(false);
  }

  async function uploadAppointments() {
    setIsLoading(true);
    await deleteAppointments();
    await createAppointments();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadAppointments} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
