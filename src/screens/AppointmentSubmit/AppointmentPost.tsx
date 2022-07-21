import React, {useContext, useState, useEffect} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from 'styles/theme';
import completeIcon from 'assets/images/complete_icon.png';
import {AppointmentPostScreenProps} from 'types/type';
import {
  DoctorInfoContext,
  SelectContext,
  SelectImageContext,
  SymtomInputValueContext,
} from 'AppointmentContext';
import API from 'config';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {getToken} from 'AuthContext';

const AppointmentPost = ({navigation}: AppointmentPostScreenProps) => {
  const {doctorInfo} = useContext(DoctorInfoContext);
  const {selectDate} = useContext(SelectContext);
  const {symtomInputValue, setSymtomInputValue} = useContext(
    SymtomInputValueContext,
  );
  const {setSelectImage} = useContext(SelectImageContext);

  const [currentTime, setCurrentTime] = useState('');
  const [currentM, setCurrentM] = useState('');

  const TODAY_DATE = dayjs();
  dayjs.locale('ko');
  const today = TODAY_DATE.format('YYYY-MM-DD(dd)');
  const getCurrentMonth = TODAY_DATE.get('m');

  useEffect(() => {
    const getCurrentTime = TODAY_DATE.get('h');

    if (getCurrentTime > 12) {
      setCurrentTime(
        `오후 ${Math.abs(12 - getCurrentTime)}:${getCurrentMonth}`,
      );
    } else {
      setCurrentTime(`오전 ${getCurrentTime}:${getCurrentMonth}`);
    }
  }, []);

  const postAppointmentData = async () => {
    const formData = new FormData();
    formData.append('year', `${selectDate.year}`);
    formData.append('month', `${selectDate.month}`);
    formData.append('day', `${selectDate.selectedDate}`);
    formData.append('time', `${selectDate.selectedPostTime}`);
    formData.append('symptom', `${symtomInputValue}`);
    formData.append('doctor_id', `${doctorInfo.id}`);
    formData.append(
      'image',
      'image=@"/Users/hwangjaeseung/Desktop/스크린샷 2022-06-29 오후 5.13.15.png"',
    );

    const res = await fetch(`${API.appointmentPost}`, {
      method: 'POST',
      headers: {
        Authorization: await getToken(),
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    const data = res.json();

    if (res.status === 201) {
      Alert.alert('예약이 확정되었습니다.');
      navigation.navigate('Main');
      setSymtomInputValue('');
      setSelectImage([]);
    }
  };

  const submitData = [
    {
      id: 1,
      title: '담당의사',
      description: `${doctorInfo.doctor_name}(서울성모병원/코로나19상담센터)`,
    },
    {
      id: 2,
      title: '예약일시',
      description: `${selectDate.year}-${selectDate.month}-${selectDate.selectedDate}(${selectDate.selectedDay}) ${selectDate.selectTime}`,
    },
    {
      id: 3,
      title: '신청일시',
      description: `${today} ${currentTime}`,
    },
    {
      id: 4,
      title: '예약내용',
      description: `${symtomInputValue}`,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexCenter}>
        <Image style={styles.marginBottom} source={completeIcon}></Image>
        <Text style={styles.description}>진료예약을 확정 하시겠습니까?</Text>
      </View>

      <View style={styles.borderDashed}></View>

      {submitData.map(({id, title, description}) => (
        <View key={id} style={styles.flexRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.descriptionStyle}>{description}</Text>
        </View>
      ))}

      <View style={styles.flexEnd}>
        <Text style={styles.notification}>
          승인 완료 후 신청한 예약시간에 진료가 진행됩니다.{'\n'}진료 1시간 전의
          예약은 취소가 불가합니다.
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={postAppointmentData} style={styles.submitBtn}>
          <Text style={styles.btnFont}>예약확정</Text>
        </Pressable>
        <Pressable
          style={styles.correctionBtn}
          onPress={() => {
            navigation.navigate('AppointmentSubmit');
          }}>
          <Text style={styles.btnFont}>예약수정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentPost;

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingTop: 104,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexCenter: {
    alignItems: 'center',
  },

  marginBottom: {
    marginBottom: 28,
  },

  description: {
    marginBottom: 36,
    fontSize: theme.fontSizes.fontMedium,
    fontWeight: '400',
    color: theme.colors.RstvtInnerTitle,
  },

  borderDashed: {
    marginBottom: 40,
    borderColor: theme.colors.RstvtdottBorder,
    borderWidth: 1,
    borderStyle: 'dashed',
  },

  title: {
    marginRight: 12,
    marginBottom: 10,
    lineHeight: 22,
    fontSize: theme.fontSizes.fontRegular,
    fontWeight: '400',
    color: theme.colors.RstvtInnerTitle,
  },

  descriptionStyle: {
    fontSize: theme.fontSizes.fontRegular,
    lineHeight: 22,
    color: theme.colors.RstvtInnerLightGray,
  },

  flexEnd: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  notification: {
    marginBottom: 26,
    fontSize: 14,
    color: theme.colors.RstvtInnerDesc,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnFont: {
    paddingVertical: 15,
    lineHeight: 27,
    fontSize: theme.fontSizes.fontMedium,
    textAlign: 'center',
    color: '#ffffff',
  },

  submitBtn: {
    flexGrow: 3,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: theme.colors.puzzleGreen,
  },

  correctionBtn: {
    flexGrow: 1,
    borderRadius: 5,
    backgroundColor: theme.colors.RstvtDsblBtn,
  },
});
