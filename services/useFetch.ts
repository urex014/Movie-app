import { useEffect, useState } from 'react';

const useFetch = <T>(fetchFunction:()=>Promise<T>, autoFetch=true )=>{
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null)
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      //@ts-ignore
      setError(err instanceof Error?err:new Error('An error occured'));
    } finally {
      setLoading(false);
    }
  };
  const reset = ()=>{
    setData(null);
    setError(null);
    setLoading(true);
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchFunction, autoFetch]);

  return { data, error, loading, refetch: fetchData };

}
export default useFetch