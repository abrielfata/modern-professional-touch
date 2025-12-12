import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Check,
  X,
  Mail,
  User,
  Calendar,
  Shield,
  Clock,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data
const mockPendingUsers = [
  {
    id: 1,
    full_name: "Dewi Lestari",
    username: "@dewi_lestari",
    email: "dewi@example.com",
    telegram_user_id: "456789012",
    role: "HOST",
    created_at: "2024-01-15T08:30:00",
  },
  {
    id: 2,
    full_name: "Rizki Pratama",
    username: "@rizki_pratama",
    email: "rizki@example.com",
    telegram_user_id: "567890123",
    role: "HOST",
    created_at: "2024-01-14T14:20:00",
  },
  {
    id: 3,
    full_name: "Siti Nurhaliza",
    username: "@siti_nur",
    email: "siti@example.com",
    telegram_user_id: "678901234",
    role: "HOST",
    created_at: "2024-01-13T11:45:00",
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Baru saja";
  if (diffInHours < 24) return `${diffInHours} jam lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} hari lalu`;
};

export function UserManagement() {
  const [pendingUsers, setPendingUsers] = useState(mockPendingUsers);
  const [loading, setLoading] = useState<number | null>(null);

  const handleApprove = async (userId: number, userName: string) => {
    if (!window.confirm(`Setujui user "${userName}"?`)) return;
    
    setLoading(userId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPendingUsers(pendingUsers.filter((u) => u.id !== userId));
    setLoading(null);
  };

  const handleReject = async (userId: number, userName: string) => {
    if (!window.confirm(`Tolak dan hapus user "${userName}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    
    setLoading(userId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPendingUsers(pendingUsers.filter((u) => u.id !== userId));
    setLoading(null);
  };

  return (
    <DashboardLayout
      userRole="MANAGER"
      userName="Manager Demo"
      onLogout={() => console.log("logout")}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Persetujuan User</h1>
        <p className="mt-2 text-muted-foreground">Review dan setujui pendaftaran user baru</p>
      </motion.div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex items-center justify-between"
      >
        <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground">
          <Clock className="h-5 w-5 text-warning" />
          Menunggu Persetujuan
        </h2>
        {pendingUsers.length > 0 && (
          <Badge className="bg-warning/10 text-warning border-warning/30" variant="outline">
            {pendingUsers.length} pending
          </Badge>
        )}
      </motion.div>

      {/* Empty State */}
      {pendingUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-foreground">Semua User Sudah Diproses</h3>
          <p className="mt-2 text-sm text-muted-foreground">Tidak ada pendaftaran yang menunggu persetujuan</p>
        </motion.div>
      )}

      {/* User Cards */}
      <div className="space-y-4">
        {pendingUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            className={cn(
              "overflow-hidden rounded-xl border border-warning/30 bg-card transition-all duration-300",
              loading === user.id && "opacity-50"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-warning/20 bg-warning/5 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 font-bold text-warning">
                  {user.full_name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.full_name}</h3>
                  <p className="text-sm text-muted-foreground">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
                <span className="text-xs text-muted-foreground">{getTimeAgo(user.created_at)}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Telegram ID</p>
                    <p className="text-sm font-medium text-foreground">{user.telegram_user_id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="text-sm font-medium text-foreground">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Waktu Daftar</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(user.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleReject(user.id, user.full_name)}
                  disabled={loading === user.id}
                  className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                  Tolak
                </Button>
                <Button
                  onClick={() => handleApprove(user.id, user.full_name)}
                  disabled={loading === user.id}
                  className="gap-2 bg-success text-success-foreground hover:bg-success/90"
                >
                  {loading === user.id ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-success-foreground border-t-transparent" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Setujui
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default UserManagement;
