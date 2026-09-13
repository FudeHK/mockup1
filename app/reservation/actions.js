"use server";

import { createClient } from "@/lib/supabase/server";

export async function createReservation(prevState, formData) {
  const reservationDate = formData.get("reservation_date");
  const reservationTime = formData.get("reservation_time");
  const partySizeRaw = formData.get("party_size");
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const notes = formData.get("notes")?.toString().trim();

  if (!reservationDate || !reservationTime || !partySizeRaw || !name || !phone) {
    return {
      status: "error",
      message: "必須項目が未入力です。ご確認の上、再度お送りください。",
    };
  }

  const partySize = Number(partySizeRaw);
  if (!Number.isFinite(partySize) || partySize <= 0) {
    return {
      status: "error",
      message: "人数の指定が正しくありません。",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reservations").insert({
    reservation_date: reservationDate,
    reservation_time: reservationTime,
    party_size: partySize,
    name,
    phone,
    email: email || null,
    notes: notes || null,
  });

  if (error) {
    console.error("予約の作成に失敗しました:", error.message);
    return {
      status: "error",
      message:
        "予約の送信に失敗しました。時間をおいて再度お試しいただくか、お電話にてご連絡ください。",
    };
  }

  return {
    status: "success",
    message: "ご予約を受け付けました。担当より確認のご連絡をお待ちください。",
  };
}
