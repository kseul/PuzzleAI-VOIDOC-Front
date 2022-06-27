import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '~/src/styles/theme'

export const commonStyle = StyleSheet.create({
    fullscreen: {
        flex: 1,
        width: '100%',
        paddingTop: 20,
        paddingRight: 27,
        paddingBottom: 60,
        paddingLeft: 33,
        backgroundColor: 'white',
    },

    ativeBtn:{
        height: 52,
        backgroundColor: theme.colors.puzzleGreen,
        borderRadius: 8,
    },

    emptyBtn: {
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor: theme.colors.puzzleGreen,
    },

    btn:{
        height: 52,
        backgroundColor: theme.colors.userGray,
        borderRadius: 8,
    },

    btnText:{
        color:'#fff',
        textAlign:'center',
        lineHeight: 52,
        fontSize: 18,
        fontWeight: '400',
    },

})




