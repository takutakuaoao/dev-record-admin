import { useFormValue } from "./useFormValue";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Article {
  id: string;
  type: number;
  category?: Category;
  title?: string;
  content?: string;
  slug?: string;
  main_img_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleState {
    id: string;
    title?: string;
    content?: string;
    slug?: string;
    categoryId?: string;
    mainImgUrl?: string;
}

/**
 * 記事の編集時に必要な値を返す
 *
 * 1. 記事の情報
 * 2. 入力情報を変更した際に1の情報を更新するハンドラー
 *  a. input用
 *  b. textarea用
 *  c. selectBox用
 */
export const useArticleFormValue = (article: Article) => {
  return useFormValue({
    id: article.id,
    title: article.title,
    content: article.content,
    slug: article.slug,
    categoryId: article.category?.id,
    mainImgUrl: article.main_img_url,
  });
};
