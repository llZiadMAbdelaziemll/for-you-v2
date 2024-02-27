import { getToday } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";

export async function getPatients() {
  const { data, error } = await supabase.from("patients").select("*");

  if (error) {
    console.error(error);
    throw new Error("patients could not be loaded");
  }

  return data;
}

export async function getPatientsAfterDate(date) {
  const { data, error } = await supabase
    .from("patients")
    .select("created_at")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("patients could not get loaded");
  }

  return data;
}

export async function getTodayPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select("created_at , name")
    .gte("created_at", getToday())
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("patients could not get loaded");
  }
  console.log(data);
  return data;
}

export async function createEditPatient(newPatient, id) {
  const hasImagePath = newPatient.image?.startsWith?.(supabaseUrl);

  const imageName = `${newPatient.image.name}?t=${Math.random()}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newPatient.image
    : `${supabaseUrl}/storage/v1/object/public/patient-images/${imageName}`;

  // 1. Create/edit patient
  let query = supabase.from("patients");

  // A) CREATE
  if (!id) query = query.insert([{ ...newPatient, image: imagePath }]);

  // B) EDIT
  if (id)
    query = query.update({ ...newPatient, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("patient could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("patient-images")
    .upload(imageName, newPatient.image);

  // 3. Delete the patient IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("patients").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "patient image could not be uploaded and the doctor was not created"
    );
  }

  return data;
}

export async function deletePatient(id) {
  const { data, error } = await supabase.from("patients").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("patient could not be deleted");
  }

  return data;
}
