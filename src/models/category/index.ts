import {isNumber} from "@tiptap/vue-3";

export interface ICategoryField {
  category_id: number,
  locale: string,
  value: string
}

export interface ICategory {
  Name?: number,
  Image?: number,
  isLast?: boolean
  parent_id?: number
  goods: []
}

export interface IProduct {
  goodsItems?: IVariant[],
  picture?: string,
  title_ru: string,
  title_ua: string,
  desc_ru: string,
  desc_ua: string,
}

export interface IVariant {
  id: 1,
  item: number,
  title_ru: string,
  title_ua: string,
  weight: string | null,
  weightKind: string | null,
  price: number,
  desc_ua: string | null,
  desc_ru: string | null,
  slug: string | null,
  show: number,
  order: number,
  created_at: string,
  updated_at: string,
  title: string,
  desc: string
}