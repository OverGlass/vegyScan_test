import React from 'react';
import { View, ActivityIndicator, Image, Text, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { MessageBarManager } from 'react-native-message-bar';
import colors from '../styleColors';
import Input from '../input'
import {UNAUTH_USER} from '../actions/types'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginUser } from '../actions';


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            userNameInput: "",
            userNameFeedBack: false,

            passWdInput: "",
            passWdFeedBack: false,

            isLoading: false

        }
    }



    componentWillReceiveProps(nextprops) {
        if (this.props.auth !== nextprops.auth) {
            this.setState({isLoading:false})
            if (!nextprops.auth.authenticated && nextprops.auth.error !== UNAUTH_USER) {
                this.setState({ userNameFeedBack: true, passWdFeedBack: true })
                MessageBarManager.showAlert({
                    title: 'Ouups',
                    message: 'Vérifiez vos identifiants',
                    alertType: 'info',
                    stylesheetInfo: { backgroundColor: colors.orange, strokeColor: colors.orange }, // Default are blue colors
                    viewTopInset: 20, // Default is 0
                })
            }
        }
    }

    trim(value) {
        return value.replace(/^\s+|\s+$/g, "");
    }
    checkInput() {
        let input = ['passWd', 'userName'];
        let verif = [];
        input.forEach((name) => {
            content = this.trim(this.state[name + 'Input']);
            if (content.length > 1) {
                console.log(content)
                let obj = {};
                obj[name + 'Input'] = content;
                obj[name + 'FeedBack'] = false;
                this.setState(obj);
                verif.push(true)
            } else {
                let obj = {};
                obj[name + 'FeedBack'] = true;
                this.setState(obj)
                verif.push(false)
            }
        })
        return verif[0] && verif[1]
    }

    _onChangeText(text, inputName) {
        let obj = {};
        obj[inputName] = text;
        this.setState(obj);
    }

    _onSubmit() {
        this.setState({ isLoading: true });
        if (!this.checkInput()) {
            MessageBarManager.showAlert({
                title: 'Ouups',
                message: 'Veuillez remplir correctement les champs',
                alertType: 'info',
                stylesheetInfo: { backgroundColor: colors.orange, strokeColor: colors.orange }, // Default are blue colors
                viewTopInset: 20, // Default is 0
            })
            this.setState({ isLoading: false })
        } else {
            this.props.loginUser(this.state.userNameInput, this.state.passWdInput);
        }


    }

    render() {
        return (
            <Image source={require('../../assets/img/background.jpg')} style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <View style={styles.header}>
                            <Image style={{ height: 100, width: 200 }} source={require('../../assets/img/logo_vegyscan.png')} />
                            <View style={{ flexDirection: 'row' }}  >
                                <Text style={{ fontFamily: 'Ubuntu-R', fontSize: 24, color: '#fff' }} >Vegy</Text>
                                <Text style={{ fontFamily: 'Ubuntu-M', fontSize: 24, color: '#fff' }} >Scan</Text></View>
                        </View>

                        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ height: 50, marginBottom: 5 }} >
                                <Input
                                    placeholder={"Identifiant"}
                                    onChangeTextValue={(text) => { this._onChangeText(text, 'userNameInput') }}
                                    blurOnSubmit={false}
                                    returnKeyType={"next"}
                                    value={this.state.userNameInput}
                                    borderColor={this.state.userNameFeedBack ? colors.orange : "#fff"}
                                    onSubmitEditing={() => { this.refs["passwd"].focus() }}
                                />
                            </View>
                            <View style={{ height: 50 }} >
                                <Input
                                    ref="passwd"
                                    placeholder={"Mot de passe"}
                                    onChangeTextValue={(text) => { this._onChangeText(text, 'passWdInput') }}
                                    blurOnSubmit={true}
                                    returnKeyType={"done"}
                                    secureTextEntry={true}
                                    value={this.state.passWdInput}
                                    borderColor={this.state.passWdFeedBack ? colors.orange : "#fff"}
                                    onSubmitEditing={() => this._onSubmit()}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <View style={{ flexDirection: "row", flex: 1, alignItems:'flex-end' }}>
                                <TouchableOpacity style={styles.button} onPressOut={() => { this._onSubmit() }}>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: "#ffffff", fontSize: 20, fontFamily: 'Ubuntu-B' }}>LOGIN</Text>
                                    </View>
                                    {this.state.isLoading ?
                                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                            <ActivityIndicator
                                                animating={true}
                                                style={{ height: 80 }}
                                                color={"#fff"}
                                                size="large"
                                            />
                                        </View> : null}
                                </TouchableOpacity>
                            </View>

                    </View>
                </TouchableWithoutFeedback>
            </Image>
        )
    }

}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 30,
        padding: 20,
        width: null,
        height: null,
        resizeMode: 'cover',
        backgroundColor: "transparent"
    },

    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
        height: 70,
        flexDirection: 'row',
        borderColor: "#ffffff",
    }


})


function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)