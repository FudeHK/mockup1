"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

const initialState = { status: "idle", message: "" };

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
      {pending ? "ログイン中..." : "ログイン"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>管理者ログイン</h1>
        <p className="section-desc">
          Cafe Lumière 予約管理システムにログインしてください。
        </p>

        {state.status === "error" && (
          <div className="alert alert-error" role="alert">
            {state.message}
          </div>
        )}

        <form action={formAction}>
          <div className="form-field" style={{ marginBottom: 18 }}>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="form-field" style={{ marginBottom: 24 }}>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
}
