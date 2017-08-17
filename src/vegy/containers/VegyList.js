import React from 'react';
import { View, ListView, Text, Navigator, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRandomVegies } from '../../actions';

import { VegyPreview, VegyCard, VegyViewer } from '../';
import colors from '../../styleColors';


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class VegyList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dataSource: ds.cloneWithRows([]),
            loading: false,
        }
    }


    componentWillMount() {
        this.props.getRandomVegies()
        this.setState({ loading: true })
    }


    componentWillReceiveProps(nextprops) {
        if (nextprops.vegies.content !== this.props.vegies.content) {
            this.setState({ dataSource: ds.cloneWithRows(nextprops.vegies.content) });
            this.setState({ loading: false })
        }
    }

    _showVegyFiche(nav, data, index){
        nav.push({index,data})
    }
    

    renderScene(route, nav) {
        switch (route.index) {
            case 0:
                return (
                    <View style={{ flex: 1 }} navigator={nav} >
                        {this.setState.loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <ActivityIndicator />
                            </View>
                            : // OR
                            <ListView
                                style={{ flex: 1 }}
                                dataSource={this.state.dataSource}
                                enableEmptySections={true}
                                renderRow={(rowData) => 
                                    <VegyPreview 
                                        title={rowData.nomCommun ? rowData.nomCommun : 'ElPacha'} 
                                        image={rowData.imgs[0]} 
                                        _onPress={() => this._showVegyFiche(nav, rowData, 1)} 
                                    />
                                }
                            />
                        }
                    </View>
                )
            case 1:
                return <VegyCard 
                            data={route.data} 
                            _onClose={()=>nav.pop()}
                            _pressPhoto={()=>this._showVegyFiche(nav, route.data.imgs, 2)}
                            />
            case 2 :
                images = route.data.map((url)=> {
                    return 'https://' + url
                })
                return <VegyViewer images={images} _onClose={()=>nav.pop()} />
        }
    }

    render() {
        return (
            <Navigator
                style={{flex:1}}
                initialRoute={{ index: 0}}
                renderScene={(route, navigator) => {
                    return this.renderScene(route, navigator);
                }}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.FloatFromBottom}
            />

        )
    }
}

function mapStateToProps(state) {
    return {
        vegies: state.vegies
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getRandomVegies }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(VegyList);