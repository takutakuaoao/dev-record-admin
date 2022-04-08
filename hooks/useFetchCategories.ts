import { useEffect, useState } from "react";
import { getApi } from "../api/api";

interface Category {
  id: string;
  name: string;
  slug: string;
}

/**
 * カテゴリーのリストをAPI経由で取得する
 */
export const useFetchCategories = (): Category[] => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getApi(process.env.NEXT_PUBLIC_API_CATEGORY_INDEX!, false).then(
      ({ state }) => {
        setCategories(state.data.items);
      }
    );
  }, []);

  return categories;
};
