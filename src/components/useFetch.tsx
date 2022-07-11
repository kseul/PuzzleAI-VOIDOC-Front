import React, {useEffect, useState} from 'react';
import {getToken} from 'AuthContext';

const useFetch = (url: string) => {
  const [fetchData, setFetchData] = useState({});

  const 임시토큰 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNiwiZXhwIjoxNjU3NTk0MTc2fQ.ClkhsMyWmudeD9NRHWMBlfUhCoVxDhASfjiI-RsvPb4';

  useEffect(() => {
    if (!url) {
      return;
    }
    const getFatchData = async (url: string) => {
      // const token = await getToken();
      // console.log(token);
      const getData = await fetch(url, {
        method: 'GET',
        headers: {
          // Authorization: token,
          Authorization: 임시토큰,
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
