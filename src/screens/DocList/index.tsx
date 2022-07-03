import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {DocListScreenProps} from 'types/type';

const DocList = ({route, navigation}: DocListScreenProps) => {
  const {id, name, thumbnails} = route.params;

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default DocList;
