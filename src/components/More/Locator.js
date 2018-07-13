// import libraries
import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, StyleSheet, BackHandler, ScrollView, Dimensions, TextInput } from 'react-native';
import { Header, Button, Title, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import TrendView from '../common/TrendView';
import HeaderView from '../common/HeaderView';
import AccountSaving from '../common/AccountSaving';
import Icon from 'react-native-vector-icons/FontAwesome';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors'
import {AnimatedCircularProgress} from 'react-native-circular-progress'
import MyButton from '../common/ActionButton'
import CheckBox from 'react-native-checkbox'
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const listData = [
    {
        name: 'Doughnuts Sweets',
        description: 'Doughnuts Sweets Store',
        createdTime: '',
        active: true,
        id: '',
        businessEntityId: '',
        storeType: 'sweets',
        merchantid: '',
        deviceid: '',
        addresses: [
            {
                label: '',
                line1: '',
                city: '',
                zip: '',
                state: '',
                country: '',
                phoneNumber: ''
            }
        ]
    },
    {
        key: 1,
        title: 'SanDee Carephase #120',
        location: '34 Bluewave Parkway Frisco TX 75023'
    },
    {
        key: 2,
        title: 'DesiMex Store #9856',
        location: '2378 IndiPass Creek Pkwy Frisco TX 75023'
    }
]

export class Locator extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 1.0,
            
            latLng: {
                latitude: 37.78825,
                longitude: -122.4324,
            },
            stores: [],
            isLoading: true
        };
    }

    setZoomOfMap(isExpand) {
        const value = isExpand ? 0.5 : 2
        if(this.state.region.latitudeDelta * value > 100) return
        else if(this.state.region.longitudeDelta * value > 200) return
        else if(this.state.region.latitudeDelta * value < 0.0004) return
        this.setState({
            region: {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: this.state.region.latitudeDelta * value,
                longitudeDelta: this.state.region.longitudeDelta * value
            }
        })
    }

    componentDidMount() {
        this.props.findStores('63728', (stores) => this.setState({stores, isLoading: false}))
        this.setState({
            region: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.latitudeDelta * width / height
            }
        })
        this.map.animateToCoordinate(this.state.latLng);

        this.mounted = true
        BackHandler.addEventListener("hardwareBackPress", () => {
            this.mounted && this.onClose()
        })
    }

    componentWillUnmount() {
        this.mounted = false
    }

    findStores() {
        this.setState({stores: [], isLoading: true})
        this.props.findStores(this.state.zip, (stores) => this.setState({stores, isLoading: false}))
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    onClose() {
        Actions.pop({refresh: {from: 'locator'}})
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: colors.lightGrays}}>                
                <Text style={styles.title}>Store Locator</Text>
                <Text style={styles.subTitle}></Text>
                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.zip}
                        onChangeText={(text) => this.setState({zip: text})}
                        placeholder="ZIP"
                        underlineColorAndroid="transparent"
                        onSubmitEditing={() => this.findStores()}
                    />
                    <MTIcon name='gps-fixed' size={20} color={colors.blue} style={styles.targetIcon} />
                    <Icon name='search' size={20} color={colors.lightGray} style={styles.searchIcon} />
                </View>

                <View style={{flex: 1, margin: 20, position: 'relative', borderWidth: 1, borderColor: colors.text}}>
                    <MapView
                        style={{flex: 1}}
                        ref={ref => { this.map = ref; }}
                        region={this.state.region}
                        showsMyLocationButton={ false }
                        showsPointsOfInterest={ false }
                        loadingEnabled={ true }
                        onRegionChange={ (region) => this.onRegionChange(region) }
                    >
                        <MapView.Marker
                            coordinate={this.state.latLng}
                            title='Store'
                            description='Test description'
                        >
                            <View>
                                <Icon name='map-marker' size={30} color={colors.green} />
                            </View>
                        </MapView.Marker>                    
                    </MapView>
                    <View style={styles.zoomButtonView}>
                        <TouchableOpacity style={styles.zoomButton} onPress={() => this.setZoomOfMap(true)}>
                            <Icon name='plus' size={20} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.zoomButton} onPress={() => this.setZoomOfMap(false)}>
                            <Icon name='minus' size={20} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.state.isLoading?
                    <View style={{flex: 1, paddingTop: 40}}>
                        <Text style={{textAlign: 'center', color: colors.text}}>finding stores...</Text>
                    </View>
                    :this.state.stores.length == 0?
                    <View style={{flex: 1, paddingTop: 40}}>
                        <Text style={{textAlign: 'center', color: colors.text}}>Not found</Text>
                    </View>
                    :
                    <ScrollView style={{flex: 1, paddingHorizontal: 20, marginBottom: 20}}>
                    {
                        this.state.stores.map(function(item, index){
                            const Address = item.addresses[0]
                            return(
                                <View key={index} style={styles.locatorItem}>
                                    <View style={{width: 60, alignItems: 'center'}}>
                                        <Icon name='map-marker' size={30} color={colors.green} />
                                        <Text style={styles.locatorIndex}>{index + 1}</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.itemTitle}>{item.name}</Text>
                                        <Text style={styles.itemLocation}>
                                            {Address.line1 + ' ' + Address.city + ' ' + Address.state + ' ' + Address.country + ' ' + Address.zip}
                                        </Text>
                                    </View>
                                    <View style={{width: 70, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                        <View style={styles.iconView}>
                                            <Icon name='location-arrow' size={15} color={colors.blue} />
                                        </View>
                                        <View style={styles.iconView}>
                                            <Icon name='phone' size={15} color={colors.blue} />
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                    </ScrollView>
                }                
                <TouchableOpacity style={styles.closeButtonView} onPress={() => this.onClose()}>
                    <Icon name='close' size={40} color={colors.blue} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: colors.text,
        fontSize: 22,
        padding: 20,
        paddingTop: 30
    },
    subTitle: {
        color: colors.gray,
        fontSize: 18,
        padding: 20,
        paddingTop: 20
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: colors.gray,
        marginTop: 10
    },
    labelStyle: {
        fontSize: 18,
        color: colors.text
    },
    closeButtonView: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 40,
        height: 40,
        backgroundColor: 'transparent'
    },
    input: {
        marginHorizontal: 20,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.gray,
        position: 'relative',
        backgroundColor: 'white'
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 80
    },
    targetIcon: {
        position: 'absolute',
        top: 10,
        bottom: 10,
        right: 50,
    },
    searchIcon: {
        position: 'absolute',
        top: 10,
        bottom: 10,
        right: 10,
    },
    locatorItem: {
        flexDirection: 'row',
        marginBottom: 15
    },
    itemTitle: {
        color: colors.blue,
        fontSize: 14,
        fontWeight: 'bold',
        padding: 5
    },
    itemLocation: {
        color: colors.text,
        fontSize: 12,
        padding: 5
    },
    iconView: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    locatorIndex: {
        fontSize: 10,
        position: 'absolute',
        top: 5,
        left: 25,
        right: 25,
        textAlign: 'center',
        color: colors.text,
        backgroundColor: 'transparent'
    },
    zoomButtonView: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40
    },
    zoomButton: {
        height: 40,
        marginBottom: 5,
        backgroundColor: colors.text,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      
  }
}, mapDispatchToProps)(Locator);