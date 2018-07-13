// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Container, Content, Button, Footer } from 'native-base';

// import components
import HeaderView from '../common/HeaderView';
import Loading from '../common/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
import { Actions } from 'react-native-router-flux';
// import config
import texts from '../../config/texts';

const Width = Dimensions.get('window').width;
const pageText = texts.login;
const actionButtons = [
    {
        icon: 'qrcode',
        text: 'Scan QR Code'
    },
    {
        icon: 'map-marker',
        text: 'Store Locator'
    },
    {
        icon: 'user-circle',
        text: 'Profile'
    },
    {
        icon: 'lock',
        text: 'Account'
    },
    {
        icon: 'bell',
        text: 'Notification'
    },
    {
        icon: 'phone',
        text: 'Contact Us'
    },
    {
        icon: 'question-circle',
        text: 'FAQ'
    },
    {
        icon: 'check-square-o',
        text: 'Preference'
    },
]

class MoreMain extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        onSignOut: PropTypes.func.isRequired,
        onPressAction: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onSignOut: () => undefined,
        onPressAction: (action) => undefined
    }

    render() {
        const _this = this
        return (
            <Container>
                <HeaderView
                    text='More actions'
                    showAction={false}
                    showBackButton={false}
                />
                <View style={styles.actionView}>
                    <TouchableOpacity style={styles.signOutButton} onPress={() => this.props.onSignOut()}>
                        <Text style={styles.signOutText}>Sign out</Text>
                    </TouchableOpacity>
                    <ScrollView>
                    <View style={styles.wrapView}>
                    {
                        actionButtons.map(function(action, index){
                            return(
                                <TouchableOpacity onPress={() => _this.props.onPressAction(action)} key={action.text} style={styles.actionItem}>
                                    <Icon name={action.icon} size={40} color={colors.darkGray}/>
                                    <Text style={styles.actionText}>{action.text}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    actionView: {
        flex: 1,
        position: 'relative'
    },
    wrapView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15
    },
    actionItem: {
        width: Width / 3 - 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    actionText: {
        color: colors.gray,
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 5
    },
    signOutText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    signOutButton: {
        backgroundColor: colors.red,
        height: 40,
        justifyContent: 'center',
        borderRadius: 8,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    }
})

export default MoreMain;