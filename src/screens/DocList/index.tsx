import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {theme} from 'styles/theme';
import {DocListScreenProps, DocListProp} from 'types/type';
import DoctorDataCard from 'components/DoctorDataCard';
import {getToken} from 'AuthContext';
import API from 'config';

const DocList = ({route, navigation}: DocListScreenProps) => {
  const {id, name} = route.params;
  const [doctorListData, setDoctorListData] = useState<DocListProp[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextListData, setNextListData] = useState(0);

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  const dataListFetch = async () => {
    const token = await getToken();
    const doctorData = await fetch(
      `${API.departmentList}/${id}?page=${currentPage}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );
    const res = await doctorData.json();
    const data = res.result;
    setNextListData(data.length);
    setDoctorListData([...doctorListData, ...data]);
  };

  useEffect(() => {
    dataListFetch();
  }, [currentPage]);

  const loadMoreList = () => {
    const DATA_SIZE_MAX = 6;
    if (nextListData < DATA_SIZE_MAX) {
      return;
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

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
        onEndReached={loadMoreList}
        onEndReachedThreshold={0.6}
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
