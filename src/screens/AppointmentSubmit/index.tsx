import React, {useContext} from 'react';
import {
  View,
  Pressable,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import DoctorDataCard from 'components/DoctorDataCard';
import DateView from './DateView';
import SymtomView from './SymtomView';
import {AppointmentSubmitScreenProps} from 'types/type';
import ImgUploadView from './ImgUproadView';
import {SymtomInputValueContext, DoctorInfoContext} from 'AppointmentContext';

const AppointmentSubmit = ({navigation}: AppointmentSubmitScreenProps) => {
  const {symtomInputValue} = useContext(SymtomInputValueContext);
  const {doctorInfo} = useContext(DoctorInfoContext);

  const onSubmit = () => {
    // 진료예약 확정 페이지 merge 후 수정
    // navigation.navigate('진료예약 확정 페이지');
  };

  return (
    <KeyboardAvoidingView style={commonStyle.fullscreen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <DoctorDataCard item={doctorInfo} />
          <DateView />
          <SymtomView />
          <ImgUploadView />
        </ScrollView>
      </SafeAreaView>

      <View>
        <Pressable
          style={!!symtomInputValue ? commonStyle.ativeBtn : styles.submitBtn}
          onPress={onSubmit}
          disabled={!symtomInputValue}>
          <Text style={commonStyle.btnText}>진료예약</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
  },
  safeArea: {flex: 1},

  submitContainer: {
    marginBottom: 24,
  },

  title: {
    paddingBottom: 6,
    color: theme.colors.AppointmentGreen,
    fontWeight: '600',
  },

  input: {
    height: 48,
    padding: 15,
    color: theme.colors.AppointmentTimeTextGray,
    borderColor: theme.colors.userGray,
    backgroundColor: theme.colors.AppointmentTimeBgGray,
  },

  textInputArea: {
    height: 203,
    paddingHorizontal: 10,
    paddingTop: 13,
    textAlignVertical: 'top',
    color: theme.colors.AppointmentInputTextGray,
  },

  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 106,
    height: 106,
    marginRight: 6,
  },

  inputBackground: {
    backgroundColor: theme.colors.AppointmentInputBgGray,
  },

  inputText: {
    fontSize: theme.fontSizes.fontRegular,
  },

  cameraImage: {
    height: 25,
    width: 28,
  },

  submitBtn: {
    borderRadius: 8,
    backgroundColor: theme.colors.RstvtInnerLightGray,
  },

  deleteBtnWrapper: {
    zIndex: 1,
  },

  deleteBtn: {
    position: 'absolute',
    right: 8,
    top: 2,
  },
});

export default AppointmentSubmit;
