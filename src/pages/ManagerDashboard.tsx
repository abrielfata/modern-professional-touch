import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  CheckSquare,
  XSquare,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data
const mockReports = [
  {
    id: 1,
    host_name: "Sarah Wijaya",
    session_date: "2024-01-15T10:00:00",
    live_hours: 2.5,
    gmv_amount: 5500000,
    status: "PENDING",
    product_count: 45,
  },
  {
    id: 2,
    host_name: "Budi Santoso",
    session_date: "2024-01-14T14:00:00",
    live_hours: 3,
    gmv_amount: 8200000,
    status: "VERIFIED",
    product_count: 62,
  },
  {
    id: 3,
    host_name: "Maya Putri",
    session_date: "2024-01-13T09:00:00",
    live_hours: 2.5,
    gmv_amount: 3800000,
    status: "REJECTED",
    product_count: 28,
  },
  {
    id: 4,
    host_name: "Andi Rahman",
    session_date: "2024-01-12T16:00:00",
    live_hours: 4,
    gmv_amount: 12500000,
    status: "VERIFIED",
    product_count: 85,
  },
];

const mockHostStats = [
  { id: 1, name: "Sarah Wijaya", total_gmv: 45000000, total_hours: 32, sessions: 12 },
  { id: 2, name: "Budi Santoso", total_gmv: 38000000, total_hours: 28, sessions: 10 },
  { id: 3, name: "Maya Putri", total_gmv: 52000000, total_hours: 35, sessions: 14 },
  { id: 4, name: "Andi Rahman", total_gmv: 61000000, total_hours: 42, sessions: 16 },
];

const mockStats = {
  total_reports: 156,
  pending: 12,
  verified: 132,
  rejected: 12,
  total_gmv: 2850000000,
  avg_gmv: 18269230,
  total_hosts: 24,
};

const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return "Rp " + (amount / 1000000000).toFixed(1) + "B";
  } else if (amount >= 1000000) {
    return "Rp " + (amount / 1000000).toFixed(1) + "M";
  } else if (amount >= 1000) {
    return "Rp " + (amount / 1000).toFixed(0) + "K";
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

const getStatusBadge = (status: string) => {
  const styles = {
    PENDING: "bg-warning/10 text-warning border-warning/30",
    VERIFIED: "bg-success/10 text-success border-success/30",
    REJECTED: "bg-destructive/10 text-destructive border-destructive/30",
  };

  const labels = {
    PENDING: "Pending",
    VERIFIED: "Verified",
    REJECTED: "Rejected",
  };

  return (
    <Badge variant="outline" className={cn("font-medium", styles[status as keyof typeof styles])}>
      {labels[status as keyof typeof labels]}
    </Badge>
  );
};

export function ManagerDashboard() {
  const [filter, setFilter] = useState("ALL");
  const [selectedMonth, setSelectedMonth] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");

  const handleVerify = (id: number) => {
    console.log("Verify report:", id);
  };

  const handleReject = (id: number) => {
    console.log("Reject report:", id);
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Manager</h1>
        <p className="mt-2 text-muted-foreground">Monitor performa host dan kelola laporan sesi live</p>
      </motion.div>

      {/* Month Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4"
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Periode: <span className="text-foreground">Januari 2024</span>
          </span>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="current">Bulan Ini</SelectItem>
            <SelectItem value="1">Januari 2024</SelectItem>
            <SelectItem value="12">Desember 2023</SelectItem>
            <SelectItem value="all">Semua Waktu</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Laporan"
          value={mockStats.total_reports}
          icon={FileText}
          variant="default"
          delay={0.1}
        />
        <StatCard
          title="Menunggu Review"
          value={mockStats.pending}
          icon={Clock}
          variant="pending"
          delay={0.15}
        />
        <StatCard
          title="Terverifikasi"
          value={mockStats.verified}
          icon={CheckCircle}
          variant="verified"
          delay={0.2}
        />
        <StatCard
          title="Ditolak"
          value={mockStats.rejected}
          icon={XCircle}
          variant="rejected"
          delay={0.25}
        />
        <StatCard
          title="Total GMV"
          value={formatCurrency(mockStats.total_gmv)}
          icon={TrendingUp}
          variant="info"
          delay={0.3}
        />
        <StatCard
          title="Total Host Aktif"
          value={mockStats.total_hosts}
          icon={Users}
          variant="default"
          delay={0.35}
        />
      </div>

      {/* Two column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reports Table - 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card lg:col-span-2"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-4">
            <h2 className="text-lg font-semibold text-foreground">Laporan Terbaru</h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari host..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[180px] bg-background pl-9"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[130px] bg-background">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="ALL">Semua</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Host
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    GMV
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockReports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.05 }}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {report.host_name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{report.host_name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                      {formatDate(report.session_date)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="font-semibold text-foreground">{formatCurrency(report.gmv_amount)}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">{getStatusBadge(report.status)}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        {report.status === "PENDING" ? (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVerify(report.id)}
                              className="h-8 w-8 p-0 text-success hover:bg-success/10 hover:text-success"
                            >
                              <CheckSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(report.id)}
                              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <XSquare className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button variant="ghost" size="sm" className="gap-1.5 text-primary hover:text-primary">
                            <Eye className="h-4 w-4" />
                            Detail
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Host Performance - 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border bg-card"
        >
          <div className="border-b border-border p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" />
              Top Host Performance
            </h2>
          </div>
          <div className="divide-y divide-border">
            {mockHostStats.map((host, index) => (
              <motion.div
                key={host.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.05 }}
                className="p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{host.name}</p>
                      <p className="text-xs text-muted-foreground">{host.sessions} sesi • {host.total_hours} jam</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(host.total_gmv)}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-success">
                      <DollarSign className="h-3 w-3" />
                      Total GMV
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default ManagerDashboard;
