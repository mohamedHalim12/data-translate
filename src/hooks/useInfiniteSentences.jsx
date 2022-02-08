import axios from 'axios';
import useSWRInfinite from 'swr/infinite';

/** @param {string} url */
export const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useInfiniteSentences({
  limit = 10,
  startCursor = 1,
  meta = false,
}) {
  /** @type {import('swr/infinite').SWRInfiniteResponse<ResponseSentences>} */
  const resul = useSWRInfinite((next, prevPageData) => {
    if (prevPageData && !prevPageData.data?.length) return undefined;
    const start = !next ? startCursor : prevPageData?.next || 1;
    return `/api/sentences?limit=${limit}&start=${start}&meta=${meta}`;
  }, fetcher);

  const { data, error, mutate, size, setSize, isValidating } = resul;
  const isLoading = !data && !error;
  const isLoadingInitialData = !data && !error;

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
