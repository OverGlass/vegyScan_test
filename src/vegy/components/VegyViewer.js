import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Gallery from 'react-native-gallery';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../styleColors'

const VegyViewer = ({ images, _onClose }) => (
    <View style={{flex:1}}  >
        <TouchableOpacity style={{ position: 'absolute', zIndex: 10, top: 0, left: 10 }} onPressIn={_onClose}>
            <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Ionicons name="ios-close" size={60} color={"#fff"} />
            </View>
        </TouchableOpacity>
        <ImageViewer imageUrls={images.map((url) => {
            return { url }
        })} />
    </View>
);

export default VegyViewer;