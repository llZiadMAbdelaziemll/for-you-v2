import supabase from "./supabase";

export async function getReports() {
  const { data, error } = await supabase.from("reports").select("*");

  if (error) {
    console.error(error);
    throw new Error("reports could not be loaded");
  }

  return data;
}
export async function getReport(id) {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("report not found");
  }
  console.log(data);
  return data;
}
export async function createEditReport(newReport, id) {
  // 1. Create/edit doctor
  console.log(newReport);
  let query = supabase.from("reports");

  // A) CREATE
  if (!id) query = query.insert([newReport]);

  // B) EDIT
  if (id) query = query.update(newReport).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Report could not be created");
  }

  return data;
}

export async function getReportsIds() {
  const { data: reportsIds, error } = await supabase
    .from("reports")
    .select("id")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("reports could not be loaded");
  }

  return reportsIds;
}
