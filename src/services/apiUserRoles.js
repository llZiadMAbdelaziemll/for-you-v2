import { useUser } from "../features/authentication/useUser";
import supabase from "./supabase";

export async function getCurrentUserRole(user_id) {
  // console.log(user);
  const { data: roles, error: role_error } = await supabase
    .from("user_roles_view")
    .select("*")
    .eq("user_id", user_id);
  if (role_error) throw new Error(role_error.message);
  console.log(roles);
  return roles;
}
