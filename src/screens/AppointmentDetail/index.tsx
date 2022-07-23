import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import DoctorDataCard from 'components/DoctorDataCard';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import {AppointmentDetailScreenProps} from 'types/type';
import API from 'config';
import useFetch from 'components/useFetch';
import Splash from 'screens/Splash';
import {DoctorInfoContext} from 'AppointmentContext';
import {FlatList} from 'react-native-gesture-handler';

const AppointmentDetail = ({
  navigation,
  route,
}: AppointmentDetailScreenProps) => {
  const {appointment_id} = route.params;
  const {doctorInfo} = useContext(DoctorInfoContext);

  const appointmentDetailUrl = `${API.appointmentDetail}${appointment_id}`;
  const appointmentDetailData = useFetch(appointmentDetailUrl).result;

  const isDataEmpty = appointmentDetailData === undefined;

  const goCalendar = doctorInfo => {
    navigation.navigate('AppointmentCalendar', doctorInfo);
  };

  if (isDataEmpty) {
    return <Splash />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fullscreen}>
        <DoctorDataCard item={doctorInfo} />
        <View style={styles.listLine} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>예약 날짜 및 시간</Text>
          <Text style={styles.innerText}>
            {appointmentDetailData.appointment_date}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>환부 사진</Text>
          <FlatList
            data={appointmentDetailData.Wound_img}
            keyExtractor={index => index.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <Image
                style={styles.innerImg}
                source={{
                  uri: item,
                }}
              />
            )}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>환자 증상</Text>
          <Text style={styles.innerText}>
            {appointmentDetailData.patient_symptom}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>의사 소견</Text>
          <Text style={styles.innerText}>
            {appointmentDetailData.doctor_opinion}
          </Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Pressable
          onPress={() => {
            goCalendar(doctorInfo);
          }}
          style={[commonStyle.ativeBtn, styles.leftBtn]}>
          <Text style={commonStyle.btnText}>다시 예약하기</Text>
        </Pressable>
        <Pressable style={styles.cancelBtn}>
          <Text style={commonStyle.btnText}>예약 취소</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: 'white'},
  fullscreen: {
    flex: 1,
    width: '100%',
    paddingRight: 18,
    paddingBottom: 60,
    paddingLeft: 18,
    backgroundColor: 'white',
  },

  listLine: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mainBorderGray,
  },

  textContainer: {
    marginBottom: 24,
  },

  title: {
    paddingBottom: 6,
    color: theme.colors.AppointmentGreen,
    fontWeight: '600',
  },

  innerText: {
    fontSize: theme.fontSizes.fontRegular,
    color: theme.colors.AppointmentInputTextGray,
  },

  btnContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },

  leftBtn: {
    flex: 2,
    marginRight: 8,
  },

  cancelBtn: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: theme.colors.RstvtInnerLightGray,
  },

  innerImg: {
    height: 106,
    width: 106,
    marginRight: 3,
    backgroundColor: 'red',
  },
});

export default AppointmentDetail;
