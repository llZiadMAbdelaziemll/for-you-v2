import supabase, { supabaseUrl } from "./supabase";

export async function getDoctors() {
  const { data, error } = await supabase.from("doctors").select("*");

  if (error) {
    console.error(error);
    throw new Error("doctors could not be loaded");
  }

  return data;
}

export async function createEditDoctor(newDoctor, id) {
  const hasImagePath = newDoctor.image?.startsWith?.(supabaseUrl);

  const imageName = `${newDoctor.image.name}?t=${Math.random()}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newDoctor.image
    : `${supabaseUrl}/storage/v1/object/public/doctor-images/${imageName}`;

  // 1. Create/edit doctor
  let query = supabase.from("doctors");

  // A) CREATE
  if (!id) query = query.insert([{ ...newDoctor, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newDoctor, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("doctor could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("doctor-images")
    .upload(imageName, newDoctor.image);

  // 3. Delete the doctor IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("doctors").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "doctor image could not be uploaded and the doctor was not created"
    );
  }

  return data;
}

export async function deleteDoctor(id) {
  const { data, error } = await supabase.from("doctors").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("doctor could not be deleted");
  }

  return data;
}
