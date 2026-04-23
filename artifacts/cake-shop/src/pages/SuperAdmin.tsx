import { useAuth } from "@/contexts/AuthContext";
import { useSuperAdminUsers, useSuperAdminMutations } from "../hooks/useQueries";
import { useLocation } from "wouter";
import { LoadingScreen } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldAlert, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SuperAdminPanel() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: users, isLoading: usersLoading } = useSuperAdminUsers();
  const { updateUserRole, deleteUser } = useSuperAdminMutations();

  if (authLoading || usersLoading) return <LoadingScreen />;

  if (!user || user.role !== "superadmin") {
    setLocation("/");
    return null;
  }

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await updateUserRole.mutateAsync({ id, role });
      toast({ description: "User role updated successfully" });
    } catch {
      toast({ variant: "destructive", description: "Failed to update role" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser.mutateAsync(id);
      toast({ description: "User permanently deleted" });
    } catch {
      toast({ variant: "destructive", description: "Failed to delete user" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-500/10 p-3 rounded-full text-red-500">
          <ShieldAlert size={28} />
        </div>
        <h1 className="text-4xl font-bold">Super Admin Dashboard</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-muted-foreground uppercase text-xs tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Name / Email</th>
                <th className="px-6 py-4 font-semibold">User Role</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users?.map((u: any) => (
                <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground">{u.name}</p>
                    <p className="text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Select defaultValue={u.role} onValueChange={(val) => handleRoleChange(u.id, val)} disabled={u.id === user.id}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(u.id)}
                      disabled={u.id === user.id}
                      className="px-4 shrink-0"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
