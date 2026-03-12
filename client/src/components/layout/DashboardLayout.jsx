import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      {/* Añadimos margin top y left para compensar el header y sidebar fixed */}
      <main className="ml-64 mt-20 p-8">{children}</main>
    </div>
  );
}
