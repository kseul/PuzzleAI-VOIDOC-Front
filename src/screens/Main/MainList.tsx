import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {theme} from 'styles/theme';
import DoctorDataCard from 'components/DoctorDataCard';
import calendarImg from 'assets/images/calendar_icon_active.png';
import API from 'config';
import {getToken} from 'AuthContext';
import {DocListProp} from 'types/type';
import {appointmentsDataProp} from 'types/type';

const MainList = () => {
  const [appointmentsData, setAppointmentsData] = useState<
    appointmentsDataProp[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [nextData, setNextData] = useState(true);

  const dataListFetch = async () => {
    const token = await getToken();
    const mainData = await fetch(`${API.appointments}?page=${currentPage}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    const res = await mainData.json();
    const data = res.result;

    if (!data) {
      setNextData(false);
      return;
    }
    setAppointmentsData([...appointmentsData, ...data]);
  };

  useEffect(() => {
    dataListFetch();
  }, [currentPage]);

  const loadMoreList = () => {
    if (!nextData) return;
    setCurrentPage(prev => prev + 1);
  };

  const renderItem = ({item}: {item: DocListProp}) => {
    return (
      <View style={styles.listContainer}>
        <View style={[styles.listHeader, styles.flexStyle]}>
          <View style={[styles.dateBox, styles.flexStyle]}>
            <Image style={styles.calendarIcon} source={calendarImg} />
            <Text style={styles.date}>{item.appointment_date}</Text>
          </View>
          <Text
            style={[
              styles.stateBox,
              item.state_name === '진료대기' ? styles.waiting : '',
              item.state_name === '진료취소' ? styles.cancel : '',
              item.state_name === '진료완료' ? styles.completion : '',
            ]}>
            {item.state_name}
          </Text>
        </View>
        <DoctorDataCard item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainListWrapper}>
      <FlatList
        data={appointmentsData}
        renderItem={renderItem}
        keyExtractor={item => item.appointment_id.toString()}
        onEndReached={loadMoreList}
        onEndReachedThreshold={0.6}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainListWrapper: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: 'white',
  },

  flexStyle: {flexDirection: 'row', alignItems: 'center'},

  listContainer: {
    marginTop: 28,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mainBorderGray,
  },

  listHeader: {
    justifyContent: 'space-between',
  },

  dateBox: {
    justifyContent: 'center',
  },

  calendarIcon: {
    marginRight: 10,
  },

  date: {
    color: theme.colors.mainTextGray,
    fontSize: theme.fontSizes.fontRegular,
  },

  stateBox: {
    width: 74,
    height: 20,
    textAlign: 'center',
    lineHeight: 19,
  },

  waiting: {
    color: '#4AA5D9',
    backgroundColor: '#DBF2FF',
    borderWidth: 0.5,
    borderColor: '#4AA5D9',
  },

  cancel: {
    color: '#E0901B',
    backgroundColor: '#FFE5BF',
    borderWidth: 0.5,
    borderColor: '#E0901B',
  },

  completion: {
    color: '#909090',
    backgroundColor: '#EBEBEB',
    borderWidth: 0.5,
    borderColor: '#909090',
  },

  listContents: {
    marginVertical: 32,
  },

  doctorImg: {width: 50, height: 50, borderRadius: 50, marginRight: 20},

  doctorName: {
    color: theme.colors.docGray,
    marginBottom: 8,
    fontSize: theme.fontSizes.fontRegular,
  },

  departments: {
    marginRight: 8,
    color: theme.colors.docGray,
    fontSize: theme.fontSizes.fontSmall,
  },

  hospital: {
    color: theme.colors.docHospGray,
    fontSize: theme.fontSizes.fontSmall,
  },
});

export default MainList;
