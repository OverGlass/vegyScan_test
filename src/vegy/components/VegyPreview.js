import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import colors from '../../styleColors'

const VegyPreview = ({title, image, _onPress}) => (
    <TouchableOpacity onPress={_onPress} style={{flex:1}}>
        <View style={styles.wrapper} >
            <View style={styles.header} >
                <Image style={styles.img} source={{ uri: 'https://' + image }} >
                    <Text style={styles.title}>{title}</Text>
                </Image>
            </View>
        </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    wrapper : {
        flex: 0,
        height : 180,
        backgroundColor: 'rgba(255,255,255,0.9)',
    }, 
    header : {
        flex:1,
        overflow : 'hidden',
    },
    img : {flex:1},
    body : {
        flex:1,
        padding: 5
    },
    title : {
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 24,
        fontFamily:'Ubuntu-B',
        paddingBottom:5,
        color : '#fff',
        padding:20,
        textShadowOffset : {
            width : 1,
            height :1
        },
        textShadowColor : "#000"

    }
    
})

export default VegyPreview;