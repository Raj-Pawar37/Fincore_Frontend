export interface NavigationItem {
  label: string;
  icon: string;
  description?: string;
  route?: string;
  children?: NavigationItem[];
}