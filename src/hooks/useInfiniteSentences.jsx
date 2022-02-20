import axios from 'axios';
import useSWRInfinite from 'swr/infinite';

/** @param {string} url */
export const fetcher = (url) => axios.get(url).then((res) => res.data);

/**
 * @typedef {{
 *   startId: string,
 *   limit: number,
 *   meta: boolean,
 *   startCount: number,
 *   meta: boolean,
 *   variant: "translated" | "untranslated" | "both"
 * }} InfiniteSentencesProps
 *
 * @param {InfiniteSentencesProps} props
 */

export default function useInfiniteSentences({
  startId = undefined,
  limit = 10,
  startCursor = 1,
  meta = false,
  variant = 'both',
}) {
  /** @type {import("swr/infinite").SWRInfiniteResponse<ResponseSentences>} */
  const resul = useSWRInfinite(
    /**
     * @param {number} next
     * @param {ResponseSentences} prevPageData
     * */
    (next, prevPageData) => {
      if (prevPageData && !prevPageData.data?.length) return undefined;
      const start =
        next === 0 ? Number(startCursor) || 1 : Number(prevPageData?.next) || 1;
      const startQuery = startId ? `startId=${startId}` : `start=${start}`;
      const queries = {
        both: `/api/sentences?${startQuery}&limit=${limit}&meta=${meta}`,
        translated: `/api/translated/sentences?${startQuery}&limit=${limit}&meta=${meta}`,
        untranslated: `/api/untranslated/sentences?${startQuery}&limit=${limit}&meta=${meta}`,
      };
      const q = queries[variant] || queries.both;
      return q;
    },
    fetcher,
  );

  const { data, error, mutate, size, setSize, isValidating } = resul;
  const isLoading = !data && !error;
  const isLoadingInitialData = !data && !error;
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('size')) localStorage?.setItem('size', size);
    const sizeStored = Number(localStorage.getItem('size')) || 0;
    if (sizeStored > size) setSize(sizeStored);
  }

  const hasMore =
    isLoading || (size > 0 && data && typeof data[size - 1] !== 'undefined');

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const isRefreshing = isValidating && data && data.length === size;
  const handleRefresh = () => mutate();

  return {
    data,
    error,
    mutate,
    hasMore,
    isLoading,
    isRefreshing,
    isEmpty,
    isReachingEnd,
    size,
    setSize,
    handleRefresh,
    isLoadingInitialData,
  };
}
