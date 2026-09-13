import { createClient } from "@/lib/supabase/server";
import { updateReservationStatus } from "./actions";

const STATUS_LABEL = {
  pending: "受付",
  approved: "承認",
  cancelled: "キャンセル",
};

const STATUS_CLASS = {
  pending: "status-pending",
  approved: "status-approved",
  cancelled: "status-cancelled",
};

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return "-";
  return timeStr.slice(0, 5);
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
    .order("reservation_date", { ascending: true })
    .order("reservation_time", { ascending: true });

  return (
    <div className="admin-card">
      <h1 style={{ marginTop: 0 }}>予約一覧</h1>
      <p className="section-desc" style={{ textAlign: "left", marginBottom: 28 }}>
        日付順に表示しています。内容をご確認のうえ、承認またはキャンセルしてください。
      </p>

      {error && (
        <div className="alert alert-error">
          予約データの取得に失敗しました。Supabase の接続設定をご確認ください。（
          {error.message}）
        </div>
      )}

      {!error && (!reservations || reservations.length === 0) && (
        <div className="empty-state">現在、予約はありません。</div>
      )}

      {!error && reservations && reservations.length > 0 && (
        <div className="table-wrap">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>時間</th>
                <th>人数</th>
                <th>お名前</th>
                <th>連絡先</th>
                <th>備考</th>
                <th>ステータス</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => {
                const approveAction = updateReservationStatus.bind(
                  null,
                  r.id,
                  "approved"
                );
                const cancelAction = updateReservationStatus.bind(
                  null,
                  r.id,
                  "cancelled"
                );

                return (
                  <tr key={r.id}>
                    <td>{formatDate(r.reservation_date)}</td>
                    <td>{formatTime(r.reservation_time)}</td>
                    <td>{r.party_size}名</td>
                    <td>{r.name}</td>
                    <td>
                      {r.phone}
                      {r.email && (
                        <>
                          <br />
                          {r.email}
                        </>
                      )}
                    </td>
                    <td>{r.notes || "-"}</td>
                    <td>
                      <span
                        className={`status-badge ${STATUS_CLASS[r.status] ?? ""}`}
                      >
                        {STATUS_LABEL[r.status] ?? r.status}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <form action={approveAction}>
                          <button
                            type="submit"
                            className="action-btn action-btn--approve"
                            disabled={r.status === "approved"}
                          >
                            承認
                          </button>
                        </form>
                        <form action={cancelAction}>
                          <button
                            type="submit"
                            className="action-btn action-btn--cancel"
                            disabled={r.status === "cancelled"}
                          >
                            却下
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
