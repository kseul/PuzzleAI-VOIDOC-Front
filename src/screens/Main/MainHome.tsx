import React from 'react';
import {Text, View, Image, Pressable, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {MainHomeScreenProps} from 'types/type';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import API from 'config';

const MainHome = ({navigation}: MainHomeScreenProps) => {
  const {width} = useWindowDimensions();

  // const signInUrl = `${API.signIn}`;
  // const userData = useFetch(signInUrl); // import해오기
  // console.log('userData => ', userData.result[0].name);

  // const departmentListUrl = `${API.departmentList}`;
  // const dePartmentListData = useFetch(departmentListUrl); // import해오기
  // console.log('dePartmentListData => ', dePartmentListData);

  return (
    <SafeAreaView style={[commonStyle.fullscreen, styles.safeArea]}>
      <View style={styles.headerContainer}>
        <View style={[styles.headerText, styles.flexStyle]}>
          <Text style={[styles.nameStyle, styles.textSpace, styles.textColr]}>
            TEST
            {/* TODO */}
            {/* 기능 브랜치 생성 - useFetch 데이터 작성 후 -> fetch result.name 으로 받기 */}
          </Text>
          <Text style={styles.nameText}>님 반갑습니다.</Text>
        </View>
        <View style={[styles.headerText, styles.flexStyle, styles.alignStyle]}>
          <Text style={[styles.comment, styles.textSpace, styles.textColr]}>
            어디가
          </Text>
          <Text style={[styles.nameStyle, styles.textColr]}>불편하신가요?</Text>
        </View>
      </View>

      <View>
        <FlatList
          // TODO
          // 기능 브랜치 생성 - useFetch 데이터 작성 후 -> fetch result 데이터 받기
          data={dataTest}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 55,
          }}
          renderItem={({item}) => (
            <Pressable
              style={[
                styles.alignStyle,
                styles.iconBox,
                {width: width / 5, height: width / 5},
              ]}
              onPress={() => {
                navigation.navigate('DocList', item);
              }}>
              <Image
                source={{
                  uri: item.thumbnails,
                }}
                style={styles.iconImg}
              />
              <Text style={[styles.iconTitle, styles.nameText]}>
                {item.name.replace(' ', `${'\n'}`)}
              </Text>
            </Pressable>
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingBottom: 0,
  },

  headerContainer: {
    top: 50,
    marginBottom: 75,
  },

  headerText: {
    paddingBottom: 10,
    alignItems: 'flex-end',
    color: theme.colors.puzzleGreen,
  },

  flexStyle: {
    flexDirection: 'row',
  },

  nameStyle: {
    fontSize: theme.fontSizes.fontLarge,
    fontWeight: '700',
  },

  textSpace: {
    marginRight: 5,
  },

  textColr: {
    color: theme.colors.puzzleGreen,
  },

  nameText: {
    color: theme.colors.mainTextGray,
    fontSize: theme.fontSizes.fontRegular,
  },

  alignStyle: {
    alignItems: 'center',
  },

  iconBox: {
    marginBottom: 10,
  },

  comment: {
    fontSize: theme.fontSizes.fontLarge,
  },

  iconImg: {
    width: '100%',
    height: '100%',
  },

  iconTitle: {
    marginTop: 6,
    lineHeight: 18,
    textAlign: 'center',
  },
});

export default MainHome;

const dataTest = [
  {
    id: 1,
    name: 'COVID-19',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 2,
    name: '가정의학과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 3,
    name: '감염내과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 4,
    name: '류마티스 내과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 5,
    name: '산부인과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 6,
    name: '소아 청소년과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 7,
    name: '소화기내과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 8,
    name: '정신건강 의학과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 9,
    name: '피부과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
];
