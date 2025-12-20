export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-pink-50 min-h-screen">
      <header className="bg-pink-500 text-white p-4 font-semibold">User Area 💗</header>
      <main className="p-6">{children}</main>
    </div>
  );
}
