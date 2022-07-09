import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList, Pressable} from 'react-native';
import {theme} from 'styles/theme';
import {DocListScreenProps, DocListProp} from 'types/type';
import DoctorDataCard from 'components/DoctorDataCard';
import {getToken} from 'AuthContext';
import API from 'config';
import {doctorInfoContext} from 'AppointmentContext';

const DocList = ({route, navigation}: DocListScreenProps) => {
  const {id, name} = route.params;
  const [doctorListData, setDoctorListData] = useState<DocListProp[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextListData, setNextListData] = useState(0);
  const {setDoctorInfo} = useContext(doctorInfoContext);

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

  const goCalendar = (doctorInfo: DocListProp) => {
    setDoctorInfo(doctorInfo);
    navigation.navigate('AppointmentCalendar');
  };

  return (
    <SafeAreaView style={styles.mainListWrapper}>
      <FlatList
        data={doctorListData}
        renderItem={({item}: {item: DocListProp}) => (
          <Pressable
            style={styles.listContainer}
            onPress={() => goCalendar(item)}>
            <DoctorDataCard item={item} />
          </Pressable>
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
