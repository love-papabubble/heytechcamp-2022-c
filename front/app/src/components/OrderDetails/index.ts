import { Item } from "@/components/Items/index";
export interface OrderDetail {
  id: number;
  item: Item;
  amount: number;
}
