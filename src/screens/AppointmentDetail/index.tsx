import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import DoctorDataCard from 'components/DoctorDataCard';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import {AppointmentDetailScreenProps} from 'types/type';

const AppointmentDetail = ({navigation}: AppointmentDetailScreenProps) => {
  const goCalendar = () => {
    navigation.navigate('AppointmentCalendar');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={commonStyle.fullscreen}>
        <DoctorDataCard item={dataTest} />
        <View style={styles.listLine} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>예약 날짜 및 시간</Text>
          <Text style={styles.innerText}>2020-07-24(금) 오후 3:00</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>환부 사진</Text>
          <Text style={styles.innerText}>사진/사진</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>환자 증상</Text>
          <Text style={styles.innerText}>증상 입력 가져오기</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>의사 소견</Text>
          <Text style={styles.innerText}>의사 소견 가져오기</Text>
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <Pressable
          onPress={goCalendar}
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
});

export default AppointmentDetail;

const dataTest = {
  appointment_id: 1,
  doctor_name: '홍정의',
  doctor_hospital: '퍼즐AI병원',
  doctor_department: 'COVID-19',
  doctor_profile_img: 'https://reactjs.org/logo-og.png',
};
