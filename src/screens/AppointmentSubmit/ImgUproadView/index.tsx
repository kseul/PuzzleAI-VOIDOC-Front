import React, {useContext} from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImageLibraryOptions, AssetObj} from 'types/type';
import {theme} from 'styles/theme';
import cameraLogo from 'assets/images/reservation-photo-icon.png';
import deleteBtn from 'assets/images/delet-btn.png';
import {SelectImageContext} from 'AppointmentContext';

const ImgUploadView = () => {
  const {selectImage, setSelectImage} = useContext(SelectImageContext);

  const option: ImageLibraryOptions = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    includeBase64: Platform.OS === 'android',
  };

  const onSelectImage = (): void => {
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        return;
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
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
  },

  submitContainer: {
    marginBottom: 24,
  },

  title: {
    paddingBottom: 6,
    color: theme.colors.AppointmentGreen,
    fontWeight: '600',
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

  cameraImage: {
    height: 25,
    width: 28,
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

export default ImgUploadView;
