import React, {useEffect, useState} from 'react';
import {getToken} from 'AuthContext';

const useFetch = (url: string) => {
  const [fetchData, setFetchData] = useState({});

  useEffect(() => {
    const getFatchData = async (url: string) => {
      const token = await getToken();
      const getData = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const res = await getData.json();
      setFetchData(res);
    };

    getFatchData(url);
  }, [url]);

  return fetchData;
};

export default useFetch;
