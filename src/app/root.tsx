import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl gap-4 p-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
