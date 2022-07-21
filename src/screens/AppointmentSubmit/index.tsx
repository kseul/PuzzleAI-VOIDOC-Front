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
import ImgUploadView from './ImgUploadView';
import {SymtomInputValueContext, DoctorInfoContext} from 'AppointmentContext';

const AppointmentSubmit = ({navigation}: AppointmentSubmitScreenProps) => {
  const {symtomInputValue} = useContext(SymtomInputValueContext);
  const {doctorInfo} = useContext(DoctorInfoContext);

  const onSubmit = () => {
    navigation.navigate('AppointmentPost');
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
  safeArea: {flex: 1},

  submitBtn: {
    borderRadius: 8,
    backgroundColor: theme.colors.RstvtInnerLightGray,
  },
});

export default AppointmentSubmit;
