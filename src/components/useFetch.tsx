import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from 'AuthContext';

const useFetch = url => {
  const {getToken} = useContext(AuthContext);
  const [fetchData, setFetchDate] = useState([]);
  console.log(getToken);

  useEffect(() => {
    const getFatchData = async url => {
      const getData = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: getToken,
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
