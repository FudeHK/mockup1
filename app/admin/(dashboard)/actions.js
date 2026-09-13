"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateReservationStatus(id, status) {
  const allowedStatuses = ["pending", "approved", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("予約ステータスの更新に失敗しました:", error.message);
  }

  revalidatePath("/admin");
}
