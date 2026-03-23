// app/admin/page.tsx
import { cookies } from "next/headers";
import { getAdminData } from "@/app/actions/admin.action";
import AdminDashboardClient from "./AdminDashboardClient";
import AdminLoginClient from "./AdminLoginClient";

export const dynamic = "force-dynamic"; // Garante que o painel mostre dados em tempo real

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("admin_session");

  // Se não tem o cookie, renderiza só a tela de login
  if (!isAuthenticated) {
    return <AdminLoginClient />;
  }

  // Se tem o cookie, busca os dados confidenciais
  const data = await getAdminData();

  return <AdminDashboardClient initialData={data} />;
}
