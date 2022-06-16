import {useCallback, useState} from 'react';

// Default Headers containing headers to be set by default to any request unless it overwritten
const defaultHeaders = {Accept: 'application/json', 'Content-Type': 'application/json'};

type methodsType = 'GET' | 'POST' | 'PUT' | 'DELETE';
type executeType = {
  url: string;
  body?: Record<string, any>;
  method?: methodsType;
  headers?: Record<string, string>;
};
type useFetchType = [loading: boolean, execute: (data: executeType) => Promise<any>, data: any, error: any];

function useFetch(): useFetchType {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const execute = useCallback(async (d: executeType): Promise<any> => {
    const {url, body, headers, method = 'GET'} = d;
    setLoading(true);
    setData(undefined);
    setError(undefined);

    const finalHeaders: any = {...defaultHeaders, ...headers};

    return new Promise((resolve, reject) => {
      fetchData(url, body, method, finalHeaders)
        .then((res: any) => {
          setData(res);
          resolve(res);
          setLoading(false);
          return;
        })
        .catch(err => {
          setError(err);
          reject(err);
          setLoading(false);
          return;
        });
    });
  }, []);

  return [loading, execute, data, error];
}

export function fetchData(
  url: string,
  body?: Record<string, any>,
  method: methodsType = 'GET',
  headers: Record<string, string> = {},
): Promise<any> {
  const stringifyBody = body ? JSON.stringify(body) : undefined;

  return new Promise((resolve, reject) => {
    fetch(url, {method, headers, body: stringifyBody})
      .then(res => res.json())
      .then(res => resolve(res))
      .then(err => reject(err));
  });
}

export default useFetch;
