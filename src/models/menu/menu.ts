import type {IBlock} from "@/models/blocks/blocks";

export interface ICategory {
  id?: number,
  parent_id?: number,
  title_ru?: string,
  title_ua?: string,
  title_bg?: string,
  title_en?: string,
  description_bg?: string,
  description_ru?: string,
  description_ua?: string,
  description_en?: string,
  picture?: string,
  slug?: string,
  show?: number,
  order?: number,
  created_at?: string,
  updated_at?: string,
  goods?: []
}

export interface IMenu {
  menu: ICategory[],
}