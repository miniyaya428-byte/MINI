export enum AppTab {
  HOME = 'home',
  VISUALIZER = 'visualizer',
  CONCEPT = 'concept',
  BUDGET = 'budget',
}

export interface BudgetItem {
  name: string;
  value: number;
  color: string;
}

export interface MaterialItem {
  category: string;
  items: { name: string; priceRange: string; note?: string }[];
}
