import React from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator, Text, LayoutAnimation, UIManager} from 'react-native';
import { MessageBar, MessageBarManager} from 'react-native-message-bar';
import {Font} from 'expo';
import colors from './styleColors';

import Swiper from 'react-native-swiper';

import Scanner from './scanner'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkAuth } from './actions';

import Login from './login';
import {VegyList} from './vegy'


class Base extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            fontLoaded : false,
            auth : null,
            eval : false
         };
  }


  componentWillMount(){
      this.props.checkAuth();
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
  }

    async componentDidMount() {
        await Font.loadAsync({
            'Ubuntu-B': require('../assets/fonts/Ubuntu-B.ttf'),
            'Ubuntu-M': require('../assets/fonts/Ubuntu-M.ttf'),
            'Ubuntu-R': require('../assets/fonts/Ubuntu-R.ttf'),
        });
         MessageBarManager.registerMessageBar(this.refs.alert);

        this.setState({ fontLoaded: true });
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    componentWillReceiveProps(nextprops){
        //AUTHENTIFICATION
        this.setState({ auth: nextprops.auth.authenticated })
    }

    renderAuth(){
        if(this.state.fontLoaded && this.state.auth !== null ) {
            if (this.state.auth){
                return (
                    <Swiper
                        style={{flex:1}}
                        ref={component => this.swiper = component}
                        loop={false}
                        index={0} >
                        <View style={{flex:1}} ><Text>orhgoi"hg'"hg"'hgjéehgéhgéjh'gkljéh'kjgl"</Text></View>
                        <View style={{flex:1}} ><Text>orhgoi"hg'"hg"'hgjéehgéhgéjh'gkljéh'kjgl"</Text></View>
                
                        <View style={{flex:1}} ><VegyList /></View>

                        <Scanner />


                     </Swiper>
                )
            } else {
                return (
                    <Login />
                )
            }
        } else {
            return (
                    <View style={{flex:1, justifyContent : 'center', alignItems : 'center'}} >
                        <ActivityIndicator />
                    </View>
            )
        }

    }


    render(){
        return (
            <View style={styles.wrapper} >
                <View style={{flex:0, height:25, borderBottomColor:"#fff", borderBottomWidth:1}} >
                    <StatusBar barStyle="light-content" />
                </View>
                    {this.renderAuth()}                        
                <MessageBar ref="alert" />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper : {
        flex : 1,
        backgroundColor : colors.blue,
    }
})

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ checkAuth }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Base)