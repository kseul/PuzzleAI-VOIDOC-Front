import React, {useEffect, useState} from 'react';
import {getToken} from 'AuthContext';

const useFetch = url => {
  const [fetchData, setFetchDate] = useState([]);
  useEffect(() => {
    const getFatchData = async url => {
      const token = await getToken();
      const getData = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const res = await getData.json();
      const data = res;
      setFetchDate(data);
    };

    getFatchData(url);
  }, [url]);

  return fetchData;
};

export default useFetch;
