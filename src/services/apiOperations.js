import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
export async function getOperations({ filter, sortBy, page }) {
  let query = supabase
    .from("operations")
    .select(
      "id, created_at ,date,  report , diseases , doctors(name), patients(image, name), appointments(startDate,numOfCons)",
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
    throw new Error("Operations could not be loaded");
  }

  return { data, count };
}

export async function getOperation(id) {
  const { data, error } = await supabase
    .from("operations")
    .select("*, doctors(*), patients(*),appointments(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("operation not found");
  }

  return data;
}

export async function getOperationsAfterDate(date) {
  const { data, error } = await supabase
    .from("operations")
    .select("created_at,date, appointments(startDate,numOfCons)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Operations could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("operations")
    .select("*, patients(name)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("operations could not get loaded");
  }

  return data;
}

// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("operations")
//     .select("*, patients(name , image),doctors(name)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   if (error) {
//     console.error(error);
//     throw new Error("appointments could not get loaded");
//   }
//   return data;
// }

export async function updateOperation(id, obj) {
  const { data, error } = await supabase
    .from("operations")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("operations could not be updated");
  }
  return data;
}

export async function deleteOperation(id) {
  const { data, error } = await supabase
    .from("operations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("operations could not be deleted");
  }
  return data;
}
