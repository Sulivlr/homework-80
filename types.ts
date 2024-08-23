export interface Item {
  id: number;
  category_id: number;
  location_id: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface CategoryMutation {
  title: string;
  description: string;
}

export interface ItemMutation {
  category_id: number;
  location_id: number;
  title: string;
  description: string;
  image: string | null;
}