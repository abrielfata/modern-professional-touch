import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Edit,
  User,
  Mail,
  Phone,
  Calendar,
  ToggleLeft,
  ToggleRight,
  X,
  Save,
  Users,
  UserCheck,
  UserX,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Mock data
const mockHosts = [
  {
    id: 1,
    full_name: "Sarah Wijaya",
    username: "@sarah_wijaya",
    email: "sarah@example.com",
    telegram_user_id: "123456789",
    is_active: true,
    is_approved: true,
    total_gmv: 45000000,
    total_hours: 32,
    created_at: "2023-11-15T10:00:00",
  },
  {
    id: 2,
    full_name: "Budi Santoso",
    username: "@budi_santoso",
    email: "budi@example.com",
    telegram_user_id: "234567890",
    is_active: true,
    is_approved: true,
    total_gmv: 38000000,
    total_hours: 28,
    created_at: "2023-10-20T14:00:00",
  },
  {
    id: 3,
    full_name: "Maya Putri",
    username: "@maya_putri",
    email: "maya@example.com",
    telegram_user_id: "345678901",
    is_active: false,
    is_approved: true,
    total_gmv: 52000000,
    total_hours: 35,
    created_at: "2023-09-10T09:00:00",
  },
];

const mockStats = {
  total: 24,
  active: 18,
  inactive: 6,
};

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return "Rp " + (amount / 1000000).toFixed(1) + "M";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export function HostManagement() {
  const [statusFilter, setStatusFilter] = useState("approved");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedHost, setSelectedHost] = useState<typeof mockHosts[0] | null>(null);
  const [formData, setFormData] = useState({
    telegram_user_id: "",
    username: "",
    full_name: "",
    email: "",
    password: "",
    is_active: true,
    is_approved: true,
  });

  const handleEdit = (host: typeof mockHosts[0]) => {
    setSelectedHost(host);
    setFormData({
      telegram_user_id: host.telegram_user_id,
      username: host.username,
      full_name: host.full_name,
      email: host.email,
      password: "",
      is_active: host.is_active,
      is_approved: host.is_approved,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log("Save host:", formData);
    setShowModal(false);
  };

  const filteredHosts = mockHosts.filter((host) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      host.full_name.toLowerCase().includes(searchLower) ||
      host.username.toLowerCase().includes(searchLower)
    );
  });

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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Manajemen Host</h1>
        <p className="mt-2 text-muted-foreground">Kelola akun host dan pantau performa mereka</p>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex gap-4 rounded-xl border border-success/30 bg-success/5 p-4"
      >
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
        <div>
          <p className="font-medium text-foreground">Cara Pendaftaran Host</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Host mendaftar melalui Telegram Bot dengan mengirim command{" "}
            <code className="rounded bg-card px-2 py-0.5 font-mono text-xs text-primary">/daftar</code>.
            Akun baru akan muncul di menu User Approvals untuk disetujui.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Host"
          value={mockStats.total}
          icon={Users}
          variant="default"
          delay={0.15}
        />
        <StatCard
          title="Host Aktif"
          value={mockStats.active}
          icon={UserCheck}
          variant="verified"
          delay={0.2}
        />
        <StatCard
          title="Host Nonaktif"
          value={mockStats.inactive}
          icon={UserX}
          variant="rejected"
          delay={0.25}
        />
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex flex-wrap items-center gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-card pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-card">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="all">Semua</SelectItem>
          </SelectContent>
        </Select>
        <Select value={activeFilter} onValueChange={setActiveFilter}>
          <SelectTrigger className="w-[140px] bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="true">Aktif</SelectItem>
            <SelectItem value="false">Nonaktif</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Host Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredHosts.map((host, index) => (
          <motion.div
            key={host.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + index * 0.05 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
          >
            {/* Status indicator */}
            <div className={cn(
              "absolute left-0 top-0 h-full w-1",
              host.is_active ? "bg-success" : "bg-muted-foreground"
            )} />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-lg font-bold text-primary-foreground">
                    {host.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{host.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{host.username}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-medium",
                    host.is_active
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-muted-foreground/30 bg-muted text-muted-foreground"
                  )}
                >
                  {host.is_active ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Total GMV</p>
                  <p className="mt-1 font-semibold text-foreground">{formatCurrency(host.total_gmv)}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Jam Live</p>
                  <p className="mt-1 font-semibold text-foreground">{host.total_hours} jam</p>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{host.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Bergabung {formatDate(host.created_at)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(host)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md bg-card">
          <DialogHeader>
            <DialogTitle>Edit Host</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label>Password (opsional)</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Biarkan kosong jika tidak diubah"
                  className="bg-background pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <Label className="cursor-pointer">Status Aktif</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                Batal
              </Button>
              <Button onClick={handleSave} className="flex-1 gradient-primary text-primary-foreground">
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default HostManagement;
