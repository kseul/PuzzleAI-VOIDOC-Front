import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from 'styles/theme';
import completeIcon from 'assets/images/complete_icon.png';

// TODO : 목데이터 통신 후 삭제 예정
const APPOINTMENT_POST_DESC = [
  {
    id: 1,
    title: '담당의사',
    description: '홍정의(서울성모병원/코로나19상담센터)',
  },
  {
    id: 2,
    title: '신청일시',
    description: '2020-12-18(금) 오후 1:13',
  },
  {
    id: 3,
    title: '예약일시',
    description: '2020-12-21(월) 오후 3:00',
  },
  {
    id: 4,
    title: '예약내용',
    description: '지난 금요일 발목을 접지른 이후 …',
  },
];

const AppointmentPost = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexCenter}>
        <Image style={styles.marginBottom} source={completeIcon}></Image>
        <Text style={styles.description}>진료예약을 확정 하시겠습니까?</Text>
      </View>

      <View style={styles.borderDashed}></View>

      {APPOINTMENT_POST_DESC.map(({id, title, description}) => (
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
        <Pressable style={styles.submitBtn}>
          <Text style={styles.btnFont}>예약확정</Text>
        </Pressable>
        <Pressable style={styles.correctionBtn}>
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
    lineHeight: 27,
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
