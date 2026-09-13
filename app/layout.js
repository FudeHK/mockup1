import "./globals.css";

export const metadata = {
  title: "Cafe Lumière | 予約サイト",
  description:
    "隠れ家カフェ Cafe Lumière の公式サイト。こだわりのメニューとご予約はこちらから。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
