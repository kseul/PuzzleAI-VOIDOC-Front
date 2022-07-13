import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import DoctorDataCard from 'components/DoctorDataCard';
import DateView from './DateView';
import SymtomView from './SymtomView';
import {
  AppointmentSubmitScreenProps,
  ImageLibraryOptions,
  AssetObj,
} from 'types/type';
import cameraLogo from 'assets/images/reservation-photo-icon.png';
import deleteBtn from 'assets/images/delet-btn.png';

const AppointmentSubmit = ({}: AppointmentSubmitScreenProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectImage, setSelectImage] = useState([]);

  const onSubmit = () => {};

  const handleInputValue = (input: string) => {
    setInputValue(input);
  };

  const option: ImageLibraryOptions = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    includeBase64: Platform.OS === 'android',
  };

  const onSelectImage = (): void => {
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else {
        const selectedImgData = res.assets;
        setSelectImage([...selectImage, ...selectedImgData]);
      }
    });
  };
  const deleteImg = (img: string): void => {
    setSelectImage(
      selectImage.filter((imgs: AssetObj) => imgs.fileName !== img),
    );
  };

  return (
    // TODO : 캘린더 구현 후 doctorInfo, date를 useContext로 받아와서 렌더링 & 컴포넌트 분리
    <KeyboardAvoidingView style={commonStyle.fullscreen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <DoctorDataCard item={dataTest} />

          <DateView />
          <SymtomView />

          <View style={styles.submitContainer}>
            <Text style={styles.title}>환부 사진 업로드 (선택)</Text>
            <View style={styles.imageContainer}>
              <ScrollView horizontal>
                {selectImage.map((item: AssetObj) => (
                  <View key={item.fileName}>
                    <Pressable
                      style={styles.deleteBtnWrapper}
                      onPress={() => deleteImg(item.fileName)}>
                      <Image source={deleteBtn} style={styles.deleteBtn} />
                    </Pressable>
                    <Pressable>
                      <Image source={item} style={styles.imageWrapper} />
                    </Pressable>
                  </View>
                ))}
                <Pressable
                  onPress={onSelectImage}
                  style={[styles.imageWrapper, styles.inputBackground]}>
                  <Image style={styles.cameraImage} source={cameraLogo} />
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View>
        <Pressable
          style={!!inputValue ? commonStyle.ativeBtn : styles.submitBtn}
          onPress={onSubmit}
          disabled={!inputValue}>
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

const dataTest = {
  appointment_id: 1,
  doctor_name: '홍정의',
  doctor_hospital: '퍼즐AI병원',
  doctor_department: 'COVID-19',
  doctor_profile_img: 'https://reactjs.org/logo-og.png',
};
