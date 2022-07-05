import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {theme} from 'styles/theme';
import calendarImg from 'assets/images/calendar_icon_active.png';

const MainList = () => {
  return (
    <SafeAreaView style={styles.mainListWrapper}>
      <FlatList
        data={dataTest}
        renderItem={({item}) => (
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

            <View style={[styles.listContents, styles.flexStyle]}>
              <Image
                source={{uri: item.doctor_profile_img}}
                style={styles.doctorImg}
              />
              <View>
                <Text style={styles.doctorName}>{item.doctor_name} 선생님</Text>
                <View style={styles.flexStyle}>
                  <Text style={styles.departments}>
                    {item.doctor_department} 전문의
                  </Text>
                  <Text style={styles.hospital}>{item.doctor_hospital}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.appointment_id.toString()}
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

const dataTest = [
  {
    appointment_id: 1,
    appointment_date: '2022-07-01(금) 오후 12:00',
    state_name: '진료대기',
    doctor_name: '홍정의',
    doctor_hospital: '퍼즐AI병원',
    doctor_department: 'COVID-19',
    doctor_profile_img: 'https://reactjs.org/logo-og.png',
  },
  {
    appointment_id: 6,
    appointment_date: '2022-07-03(일) 오후 12:00',
    state_name: '진료취소',
    doctor_name: '황지욱',
    doctor_hospital: '퍼즐AI병원',
    doctor_department: 'COVID-19',
    doctor_profile_img: 'https://reactjs.org/logo-og.png',
  },
  {
    appointment_id: 50,
    appointment_date: '2022-07-03(일) 오후 6:00',
    state_name: '진료취소',
    doctor_name: '김태웅',
    doctor_hospital: '퍼즐AI병원',
    doctor_department: 'COVID-19',
    doctor_profile_img: 'https://reactjs.org/logo-og.png',
  },
  {
    appointment_id: 7,
    appointment_date: '2022-07-04(월) 오후 1:00',
    state_name: '진료완료',
    doctor_name: '테스트',
    doctor_hospital: '퍼즐AI병원',
    doctor_department: 'COVID-19',
    doctor_profile_img: 'https://reactjs.org/logo-og.png',
  },
];

export default MainList;
