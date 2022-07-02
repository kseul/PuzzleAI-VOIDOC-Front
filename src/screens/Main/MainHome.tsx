import React from 'react';
import {Text, View, Image, Pressable, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import {useWindowDimensions} from 'react-native';

const MainHome = () => {
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView style={[commonStyle.fullscreen, styles.safeArea]}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={[styles.headerText, styles.flexStyle]}>
            <Text style={[styles.nameStyle, styles.textSpace, styles.textColr]}>
              테스트
            </Text>
            <Text style={styles.nameText}>님 반갑습니다.</Text>
          </View>
          <View
            style={[styles.headerText, styles.flexStyle, styles.alignStyle]}>
            <Text style={[styles.comment, styles.textSpace, styles.textColr]}>
              어디가
            </Text>
            <Text style={[styles.nameStyle, styles.textColr]}>
              불편하신가요?
            </Text>
          </View>
        </View>

        <View>
          <FlatList
            data={dataTest}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 55,
            }}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.alignStyle,
                  {width: width / 5, height: width / 5},
                ]}>
                <Image
                  source={{
                    uri: item.thumbnails,
                  }}
                  style={styles.iconImg}
                />
                <Text style={[styles.iconTitle, styles.nameText]}>
                  {item.name}
                </Text>
              </Pressable>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
          />
        </View>
      </ScrollView>
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
    fontWeight: theme.fontSizes.weightBold,
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

  comment: {
    fontSize: theme.fontSizes.fontLarge,
  },

  iconImg: {
    width: '100%',
    height: '100%',
  },

  iconTitle: {
    marginTop: 9,
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
    name: 'COVID-19',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 4,
    name: '가정의학과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 5,
    name: 'COVID-19',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 6,
    name: '가정의학과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 7,
    name: 'COVID-19',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 8,
    name: '가정의학과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
  {
    id: 9,
    name: '가정의학과',
    thumbnails: 'https://reactjs.org/logo-og.png',
  },
];
