import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  const token = await AsyncStorage.getItem(
    'access_token',
    (err, result) => result,
  );
  return token;
};

const useFetch = (url, method) => {
  const [fetchData, setFetchDate] = useState('');

  const postData = false;

  useEffect(() => {
    const getFatchData = async (url, method) => {
      const getData = await fetch(url, {
        method,
        headers: {
          Authorization: await getToken(),
        },
        body: postData ? JSON.stringify(postData) : '',
      });
      const res = await getData.json();
      const data = res;
      setFetchDate(data);
      //   console.log('res' + res);
      //   console.log('data', data);
    };
    getFatchData(url, method);
  }, []);

  return (
    <View>
      <Text>useFetch</Text>
    </View>
  );
};

export default useFetch;
