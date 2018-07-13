// import libraries
import React, { Component } from 'react';
import { Text, Alert, BackHandler, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button, Title, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
// import global styles
import colors from '../../config/colors'
import globalStyles from '../../config/globalStyles';
import QRIcon from './QRIcon';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HeaderView extends Component {
    static defaultProps = {
        showBackButton: true
    };

    constructor(props, context) {
        super(props, context);
        this.backClickHandler = this.backClickHandler.bind(this);
    }

    backClickHandler() {
        if(this.props.backClickHandler) return this.props.backClickHandler()
        else if(!this.props.isRoot) return Actions.pop();

        Alert.alert(
            'Exit',
            'Are you sure you want to exit Scoin',
            [
                { text: 'Cancel', onPress: () => {} },
                { text: 'Yes', onPress: () => BackHandler.exitApp() }
            ]
        );

        return true;
    }

    render() {
        const showBackButton = this.props.showBackButton;
        return (
            <Header
                androidStatusBarColor={globalStyles.headerBackground}
                style={{backgroundColor: colors.topNavColor, flexDirection: 'row', justifyContent: 'space-around', position: 'relative', zIndex: 10000}}
                noShadow
            >
                <Left style={{flex: 2}}>
                    {showBackButton &&<Button transparent onPress={() => this.backClickHandler()}>
                        <Icon
                            size={20}
                            name="arrow-left"
                            style={{color: globalStyles.backButton}}
                        />
                    </Button>}
                </Left>
                <Body style={{flexDirection: 'row', justifyContent: 'center', flex: 4}}>
                    <Title style={{color: '#fff', textAlign: 'center', flex: 1}}>{this.props.text || 'Title'}</Title>
                </Body>
                <Right style={{flex: 2}}>
                    {
                        this.props.showAction?
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <QRIcon
                                onPress={() => this.props.onPressQRIcon()}
                                size={30} />
                            <TouchableOpacity onPress={() => this.props.onPressProfile()} style={{marginLeft: 20, width: 30, height: 30, borderRadius: 30, backgroundColor: colors.green, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name="user" size={20} color="#fff"/>
                            </TouchableOpacity>
                        </View>
                        :null
                    }
                </Right>
            </Header>
        );
    }
}


