// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Platform, Dimensions, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Container, Content, Button, Footer } from 'native-base';

// import components
import HeaderView from '../common/HeaderView';
import Loading from '../common/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
// import config
import texts from '../../config/texts';
import TextInputWithIcon from '../common/TextInputWithIcon';
import DOBInput from '../common/DOBInput';
import MyButton from '../common/ActionButton'

const Width = Dimensions.get('window').width;

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '******',
            pin: '******',
            phone: '456789456'
        }
    }

    componentDidMount() {
        const profile = this.props.r_userData
        this.setState({
            phone: profile.phoneNumber,
            email: profile.email,            
        })
    }

    static propTypes = {
        onPressBack: PropTypes.func.isRequired,
        onChangePassword: PropTypes.func.isRequired,
        onChangePinCode: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressBack: () => undefined,
        onChangePassword: () => undefined,
        onChangePinCode: () => undefined
    }

    render() {
        const _this = this
        return (
            <Container>
                <Loading />
                <HeaderView
                    text='Account'
                    showAction={false}
                    showBackButton={true}
                    backClickHandler={() => this.props.onPressBack()}
                />
                <Content style={{paddingHorizontal: 20}}>
                    <Text style={styles.title}>Account Key</Text>
                    <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        editable={false}
                        icon="phone"
                        size={20}
                        value={this.state.phone}
                        placeholder="phone number"
                    />
                    <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        editable={false}
                        icon="envelope"
                        size={20}
                        value={this.state.email}
                        placeholder="email"
                    />
                    <Text style={styles.title}>Password</Text>
                    <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        editable={false}
                        isPassword={true}
                        icon="lock"
                        size={20}
                        value={this.state.password}
                        placeholder="email"
                    />
                    <MyButton
                        type='solid'
                        text='Change password'
                        onPress={() => this.props.onChangePassword()}
                    />
                    <Text style={styles.title}>PIN</Text>
                    <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        editable={false}
                        isPassword={true}
                        icon="key"
                        size={20}
                        value={this.state.pin}
                        placeholder="Pin code"
                    />
                    <MyButton
                        type='solid'
                        text='Transaction PIN'
                        onPress={() => this.props.onChangePinCode()}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: colors.orange,
        fontSize: 16,
        paddingTop: 20
    },
    topMainView: {
        flexDirection: 'row'
    },
    nameView: {
        flex: 0.6
    },
    photoView: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: Platform.OS == 'ios' ? 40 : 80,
        overflow: 'hidden'
    },
    editPhotoText: {
        fontSize: 14,
        color: colors.blue
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        r_me: state.me,
        r_userData: state.userDataList
    }
}, mapDispatchToProps)(Account);