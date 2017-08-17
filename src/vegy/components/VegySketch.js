/**
 * Created by antonincarlin on 14/02/2017.
 */
import React from 'react';
import Svg,{Circle, Rect, G, Text} from 'react-native-svg'
import {StyleSheet, View} from 'react-native';

const padding = 20;

const VegySketch = ({diam, min, max}) => (
        <View style={styles.GlobalWrapper}>
            {/*----- Diam√®tre -----*/}
            <View style={[{flex:1, paddingLeft:padding}, styles.Center]}>
                <Svg height="150" width="100" style={styles.Center}>
                    <G origin="90, 90">
                        <Circle cx="45" cy="65" r="45" fill="#776E57"/>

                        {/*----- Valeur du Diam√®tre -----*/}
                        <Text
                            x="45"
                            y="49"
                            fill="#fff"
                            textAnchor="middle"
                            fontWeight='bold'
                            fontSize='24'>{diam + 'm'}</Text>

                        {/*----- Label du Diam√®tre -----*/}

                        <Text
                            x="45"
                            y="120"
                            fill="#776E57"
                            textAnchor="middle"
                            fontFamily="Ubuntu-B"
                            fontSize='16'
                        >Diamétre</Text>
                    </G>
                </Svg>
            </View>

            {/*----- Tailles MIN & MAX -----*/}
            <View style={[{flex:1, paddingRight:padding}, styles.Center]}>
                <Svg height="150" width="100" style={styles.Center}>
                    <G origin="90, 90">

                        {/*----- MIN -----*/}
                        <G origin="0,45">
                            <Rect x="0" y="60" width="40" height="45" fill="#776E57"/>

                            {/*----- Valeur MIN -----*/}
                            <Text
                                x="20"
                                y="70"
                                fill="#fff"
                                textAnchor="middle"
                                fontWeight='bold'
                                fontSize='16'>{min}</Text>

                            {/*----- Label MIN -----*/}
                            <Text
                                x="20"
                                y="40"
                                fill="#776E57"
                                textAnchor="middle"
                                fontWeight='bold'
                                fontSize='22'>MIN</Text>
                        </G>

                        {/*----- MAX -----*/}
                        <G origin="40,45">
                            <Rect x="50" y="45" width="40" height="60" fill="#776E57"/>

                            {/*----- Valeur MAX -----*/}
                            <Text
                                x="71"
                                y="70"
                                fill="#fff"
                                textAnchor="middle"
                                fontWeight='bold'
                                fontSize='16'>{max}</Text>

                            {/*----- Label MAX -----*/}
                            <Text
                                x="69"
                                y="27"
                                fill="#776E57"
                                textAnchor="middle"
                                fontWeight='bold'
                                fontSize='18'>MAX</Text>
                        </G>

                        {/*----- Label Taille-----*/}
                        <Text
                            x="45"
                            y="120"
                            fill="#776E57"
                            textAnchor="middle"
                            fontFamily="Ubuntu-B"
                            fontSize='16'
                        >Tailles adulte</Text>
                    </G>
                </Svg>
            </View>
        </View>
);

const styles = StyleSheet.create({
    GlobalWrapper: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        flex: 1,
        flexDirection: 'row',
    },

    Center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default VegySketch;