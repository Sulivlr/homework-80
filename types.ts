export interface Item {
  id: number;
  category_id: number;
  location_id: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface ItemMutation {
  category_id: number;
  location_id: number;
  title: string;
  description: string;
  image: string | null;
}