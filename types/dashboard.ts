export interface DashboardType {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface PutDashboardTitleType {
  title: string | undefined;
  color: string | undefined;
}
