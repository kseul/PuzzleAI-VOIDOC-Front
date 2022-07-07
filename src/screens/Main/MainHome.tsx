import React, {useEffect, useState} from 'react';
import {Text, View, Image, Pressable, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {MainHomeScreenProps} from 'types/type';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import API from 'config';
import useFetch from 'components/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHome = ({navigation}: MainHomeScreenProps) => {
  const {width} = useWindowDimensions();
  const [name, setName] = useState();

  const departmentListUrl = `${API.departmentList}`;
  const departmentListData = useFetch(departmentListUrl).result;

  useEffect(() => {
    const getUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem('user_name');
        setName(userName);
      } catch (error) {
        throw new Error('userName 가져오기 실패');
      }
    };
    getUserName();
  }, []);

  return (
    <SafeAreaView style={[commonStyle.fullscreen, styles.safeArea]}>
      <View style={styles.headerContainer}>
        <View style={[styles.headerText, styles.flexStyle]}>
          <Text style={[styles.nameStyle, styles.textSpace, styles.textColr]}>
            {name}
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
          data={departmentListData}
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
