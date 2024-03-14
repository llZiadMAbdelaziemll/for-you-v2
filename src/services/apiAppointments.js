import { getToday } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { useUser } from "../features/authentication/useUser";

export async function getAppointments({ filter, sortBy, page }) {
  let query = supabase
    .from("appointments")
    .select(
      "id, created_at,startDate, endDate,isPaid,status,numOfCons , doctors(id,name, email, price), patients(id,image, name, gender, mobile,reports(*))",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Appointments could not be loaded");
  }

  return { data, count };
}

export async function getAppointment(id) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "*, doctors(*), patients(id,image, name, gender, mobile,reports(*))"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("appointment not found");
  }
  console.log(data);
  return data;
}
export async function getDoctorAppointments(userName) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, created_at, startDate, endDate, isPaid, status, numOfCons, doctors(name, email, price), patients(image, name, gender, mobile,reports(*))"
    )
    .eq("doctor:name", userName);

  if (error) {
    console.error(error);
    throw new Error("appointment not found");
  }
  console.log(data);
  return data;
}

export async function getPatientAppointments(userName) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, created_at, startDate, endDate, isPaid, status, numOfCons, doctors(name, email, price), patients(image, name, gender, mobile,reports(*))"
    )
    .eq("name:name", userName);

  if (error) {
    console.error(error);
    throw new Error("appointment not found");
  }
  console.log(data);
  return data;
}

// export async function getReportAppointments(userName) {
//   const { data, error } = await supabase
//     .from("appointments")
//     .select(
//       "id, created_at, condition, startDate, endDate, isPaid, status, numOfCons, doctors(name, email, price), patients(image, name, gender, mobile)"
//     )
//     .eq("name:name", userName);

//   if (error) {
//     console.error(error);
//     throw new Error("appointment not found");
//   }
//   console.log(data);
//   return data;
// }
export async function getAppointmentsAfterDate(date) {
  const { data, error } = await supabase
    .from("appointments")
    .select("created_at, doctors(price)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("appointments could not get loaded");
  }

  return data;
}

export async function getDoctorAppointmentsAfterDate(userName, date) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, created_at, startDate, endDate, isPaid, status, numOfCons, doctors(name, email, price), patients(image, name, gender, mobile,reports(*))"
    )
    .eq("doctor:name", userName)
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("appointments could not get loaded");
  }

  return data;
}
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, patients(name)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("appointments could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, patients(name , image)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("appointments could not get loaded");
  }
  return data;
}

// export async function createEditAppointment(newAppointment, id) {
//   const hasImagePath = newAppointment.image?.startsWith?.(supabaseUrl);

//   const imageName = `${
//     newAppointment.image?.name
//   }?t=${Math.random()}`.replaceAll("/", "");
//   const imagePath = hasImagePath
//     ? newAppointment.image
//     : `${supabaseUrl}/storage/v1/object/public/patient-images/${imageName}`;

//   // 1. Create/edit appointment
//   let query = supabase.from("appointments");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newAppointment, image: imagePath }]);

//   // B) EDIT
//   if (id)
//     query = query.update({ ...newAppointment, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();
//   if (error) {
//     console.error(error);
//     throw new Error("appointment could not be created");
//   }

//   // 2. Upload image
//   if (hasImagePath) return data;

//   const { error: storageError } = await supabase.storage
//     .from("patient-images")
//     .upload(imageName, newAppointment.image);

//   // 3. Delete the doctor IF there was an error uplaoding image
//   if (storageError) {
//     await supabase.from("appointments").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "appointment image could not be uploaded and the appointment was not created"
//     );
//   }

//   return data;
// }

export async function createAppointment(newAppointment) {
  const { data, error } = await supabase
    .from("appointments")
    .insert([newAppointment]);
  if (error) console.log(error.message);
  console.log(data);
  return data;
}
export async function updateAppointment(id, obj) {
  const { data, error } = await supabase
    .from("appointments")
    .update(obj)
    .eq("id", id)
    .select()
    .single();
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("appointment could not be updated");
  }

  return data;
}

export async function deleteAppointment(id) {
  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("appointment could not be deleted");
  }
  return data;
}
