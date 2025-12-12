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
    session_date: "2024-01-15T10:00:00",
    live_start_time: "10:00",
    live_end_time: "12:30",
    live_hours: 2.5,
    gmv_amount: 5500000,
    status: "VERIFIED",
    product_count: 45,
  },
  {
    id: 2,
    session_date: "2024-01-14T14:00:00",
    live_start_time: "14:00",
    live_end_time: "17:00",
    live_hours: 3,
    gmv_amount: 8200000,
    status: "PENDING",
    product_count: 62,
  },
  {
    id: 3,
    session_date: "2024-01-13T09:00:00",
    live_start_time: "09:00",
    live_end_time: "11:30",
    live_hours: 2.5,
    gmv_amount: 3800000,
    status: "REJECTED",
    product_count: 28,
    reject_reason: "Screenshot tidak valid",
  },
];

const mockStats = {
  total_reports: 24,
  pending: 3,
  verified: 18,
  rejected: 3,
  total_gmv: 125500000,
  total_hours: 62.5,
};

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
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

export function HostDashboard() {
  const [filter, setFilter] = useState("ALL");
  const [selectedMonth, setSelectedMonth] = useState("current");

  return (
    <DashboardLayout
      userRole="HOST"
      userName="Host Demo"
      onLogout={() => console.log("logout")}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Host</h1>
        <p className="mt-2 text-muted-foreground">Lihat ringkasan performa dan laporan sesi live Anda</p>
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
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
          subtitle={`${mockStats.total_hours} jam live`}
        />
      </div>

      {/* Reports Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-xl border border-border bg-card"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Laporan Saya</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari laporan..."
                className="w-[200px] bg-background pl-9"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px] bg-background">
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
                  Tanggal
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Waktu Live
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Durasi
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
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="font-medium text-foreground">{formatDate(report.session_date)}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                    {report.live_start_time} - {report.live_end_time}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="font-medium text-foreground">{report.live_hours} jam</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="font-semibold text-foreground">{formatCurrency(report.gmv_amount)}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">{getStatusBadge(report.status)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-primary hover:text-primary">
                      <Eye className="h-4 w-4" />
                      Detail
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {mockReports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">Belum ada laporan</p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

export default HostDashboard;
