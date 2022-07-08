import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {theme} from 'styles/theme';
import {DocListScreenProps, DocListProp} from 'types/type';
import DoctorDataCard from 'components/DoctorDataCard';
import {getToken} from 'AuthContext';
import API from 'config';

const DocList = ({route, navigation}: DocListScreenProps) => {
  const {id, name} = route.params;
  const [doctorListData, setDoctorListData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  useEffect(() => {
    const dataListFetch = async () => {
      const token = await getToken();
      const mainData = await fetch(
        `${API.departmentList}/${id}?page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        },
      );
      const res = await mainData.json();
      const data = res.result;
      setDoctorListData(data);
    };
    dataListFetch();
  }, []);

  return (
    <SafeAreaView style={styles.mainListWrapper}>
      <FlatList
        data={doctorListData}
        renderItem={({item}: {item: DocListProp}) => (
          <View style={styles.listContainer}>
            <DoctorDataCard item={item} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainListWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },

  listContainer: {
    marginHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mainBorderGray,
  },
});

export default DocList;
