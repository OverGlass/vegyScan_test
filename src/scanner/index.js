import React from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight, Vibration, Navigator } from 'react-native';
import { Components, Permissions, BarCodeScanner } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { INFO_VEGY, EVAL_VEGY } from '../actions/types'
import VegyCard from '../vegy';
import VegyViewer from '../vegy';
// import EvalForm from '../components/EvalForm';
import _ from 'lodash'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { vegyFetch, sendEval } from '../actions';

class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            ficheOpen: false,
            evalOpen: false,
            data: []
        };
    }


    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.data != nextProps.vegy && nextProps.vegy) {
            if (nextProps.vegy.type === INFO_VEGY) {
                Vibration.vibrate();
                this._showVegyFiche(this.props.navigator, nextProps.vegy.content[0], 1);
                this.setState({
                    ficheOpen: true,
                    evalOpen: false
                })
            } else if (nextProps.vegy.type === EVAL_VEGY) {
                Vibration.vibrate();
                this.setState({
                    data: nextProps.vegy.content,
                    evalOpen: true,
                    ficheOpen: false,
                })
            }
        } else if (nextProps.evalInfo) {
            this.setState({
                evalOpen: false
            })
        }

    }

    _showVegyFiche(nav, data, index) {
        nav.push({ index, data })
    }

    renderScene(route, nav) {
        switch (route.index) {
            case 0:
                const { hasCameraPermission } = this.state;
                if (typeof hasCameraPermission === 'null') {
                    return <View />;
                } else if (hasCameraPermission === false) {
                    return <Text>No access to camera</Text>;
                } else {
                    return (
                        <View style={{ flex: 1 }}>
                            <BarCodeScanner
                                onBarCodeRead={_.debounce(this._handleBarCodeRead, 500)}
                                style={{ flex: 1 }}
                            />
                            <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignItems: 'center', backgroundColor: 'transparent', flex: 5, justifyContent: 'center' }}>
                                        <Ionicons name="ios-qr-scanner-outline" size={300} color="white" />
                                    </View>
                                    {/*{evalInfo()}*/}
                                    <View style={[Styles.footer, { flex: 2 }]}>
                                        <Text><Text style={Styles.title}>Vegy</Text><Text style={Styles.title2}>Scan</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    )
                }
            case 1:
                return <VegyCard
                    data={route.data}
                    _onClose={() => nav.pop()}
                    _pressPhoto={() => this._showVegyFiche(nav, route.data.imgs, 2)}
                />
            case 2:
                images = route.data.map((url) => {
                    return 'https://' + url
                })
                return <VegyViewer images={images} _onClose={() => nav.pop()} />
        }
    }

    render() {
        return (
            <Navigator
                style={{ flex: 1 }}
                initialRoute={{ index: 0 }}
                renderScene={(route, navigator) => {
                    return this.renderScene(route, navigator);
                }}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.FloatFromBottom}
            />

        )
    }



    _handleBarCodeRead = (data) => {
        if (!this.state.ficheOpen && !this.state.evalOpen) {
            this.props.vegyFetch(data.data)

        }
    }



}

const Styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'

    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Ubuntu-R'
    },
    title2: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Ubuntu-B',
    }

});

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    // Inside a book list
    return {
        vegy: state.scan,
        evalInfo: state.evalInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ vegyFetch, sendEval }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Scanner);