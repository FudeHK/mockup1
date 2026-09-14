"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createReservation } from "@/app/reservation/actions";

const initialState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block form-submit"
      disabled={pending}
    >
      {pending ? "送信中..." : "予約を確定する"}
    </button>
  );
}

export default function ReservationForm() {
  const [state, formAction] = useActionState(createReservation, initialState);
  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservation" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">ご予約</h2>
          <p className="section-desc">
            下記フォームよりご希望の日時をお送りください。折り返しご連絡いたします。
          </p>
        </div>

        <div className="reservation-panel">
          {state.status === "success" && (
            <div className="alert alert-success" role="status">
              {state.message}
            </div>
          )}
          {state.status === "error" && (
            <div className="alert alert-error" role="alert">
              {state.message}
            </div>
          )}

          <form action={formAction}>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="reservation_date">
                  ご希望日<span className="required">必須</span>
                </label>
                <input
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  min={today}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="reservation_time">
                  ご希望時間<span className="required">必須</span>
                </label>
                <input
                  type="time"
                  id="reservation_time"
                  name="reservation_time"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="party_size">
                  人数<span className="required">必須</span>
                </label>
                <select id="party_size" name="party_size" defaultValue="2" required>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n}名
                    </option>
                  ))}
                  <option value="9">9名以上（備考欄にご記入ください）</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="name">
                  お名前<span className="required">必須</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="山田 太郎"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">
                  お電話番号<span className="required">必須</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="090-1234-5678"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">メールアドレス</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="notes">備考</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="アレルギーやお祝い事など、ご要望があればご記入ください。"
                />
              </div>
            </div>

            <SubmitButton />

            <p className="form-note">
              ご予約はまだ確定ではありません。内容確認後、担当より折り返しご連絡させていただく場合がございます。
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
