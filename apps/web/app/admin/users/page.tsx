import { AdminUsersTable } from "@/app/_components/admin-users-table";
import { adminUsers } from "@/app/_lib/mock-data";

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink/60">Admin Dashboard</p>
          <h1 className="text-3xl font-semibold">User Management</h1>
        </div>
        <button className="btn btn-primary">Xuất báo cáo</button>
      </div>

      <AdminUsersTable users={adminUsers} />
    </div>
  );
}
