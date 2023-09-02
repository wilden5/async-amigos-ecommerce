export interface BreadcrumbItem {
  label: string;
  url?: string;

  level?: number;
}

export interface CategoryNames {
  [categoryId: string]: string;
}
