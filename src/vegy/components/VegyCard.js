import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';

import VegyPreview from './VegyPreview'
import VegyCalendar from '../containers/VegyCalendar'
import VegySketch from './VegySketch'
import colors from '../../styleColors'

const VegyCard = ({ data, _onClose, _pressPhoto }) => {

    return (
        <View style={styles.wrapper} >
            <TouchableOpacity style={{ position: 'absolute', zIndex: 10, top: 0, left: 10 }} onPressIn={_onClose}>
                <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }} >
                    <Ionicons name="ios-close" size={60} color={"#fff"} />
                </View>
            </TouchableOpacity>
            <ScrollView style={{ flex: 1, backgroundColor: "transparent" }} alwaysBounceVertical={false} >
                <VegyPreview title={data.nomCommun ? data.nomCommun : 'elpacha'} image={data.imgs[0]} _onPress={_pressPhoto} />
                <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
                    {data.dataSpec.map((spec, index) => {
                        if (spec.content) {
                            return (
                                <View key={index} style={{ borderBottomColor: colors.blue, borderBottomWidth: 1, paddingTop: 20 }}>
                                    <Text style={{ fontFamily: "Ubuntu-B", color: colors.blue }} >{spec.item.toUpperCase()}</Text>
                                    <Text style={{ fontFamily: "Ubuntu-M", color: colors.blue }} >{spec.content}</Text>
                                </View>
                            )
                        }
                    })}
                    <View style={{flex:1, paddingTop:10,justifyContent:'center', alignItems:'center'}} >
                        <VegyCalendar data={data.month} />
                    </View>
                    <VegySketch diam={data.diametreAuSo || 'ø'} min={data.hauteurMiniTailleAdulte || 'ø'} max={data.hauteurMaxiTailleAdult || 'ø'} />
                </View>
            </ScrollView>
        </View>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    header: {
        flex: 1,
        overflow: 'hidden',
    },
    img: { flex: 1 },
    body: {
        flex: 1,
        padding: 5
    },
    title: {
        fontSize: 24,
        fontFamily: 'Ubuntu-B',
        paddingBottom: 5,
        color: '#fff',
        padding: 20,
        textShadowOffset: {
            width: 1,
            height: 1
        },
        textShadowColor: "#000"

    }

})

export default VegyCard;