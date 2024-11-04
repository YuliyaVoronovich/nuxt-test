export interface ILocale {
  id: number;
  cg_name: string;
  cg_description: string;
  cg_title: string;
  cg_slug: string;
  meta_description: string;
  meta_keywords: string;
  link: string;
}

export interface ITreeNode {
  id: number;
  depth: number;
  numchild: number;
  category_image?: string;
  logo_image?: string;
  menu_image?: string;
  separate_menu: boolean;
  c_images: number;
  product_rep_1_id?: number;
  product_rep_2_id?: number;
  c_views: number;
  locale: {
    en: ILocale;
    ru: ILocale;
    fr: ILocale;
  };
  path_to_top: number[];
  childs?: ITreeNode[];
}
