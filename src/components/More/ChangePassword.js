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
import TextListWithIcon from '../common/TextListWithIcon'
import SmallActionText from '../common/SmallActionText'
import DOBInput from '../common/DOBInput';
import MyButton from '../common/ActionButton'
import * as Operator from '../../config/operator'

const Width = Dimensions.get('window').width;
const rules = [
    {name: 'length', text: '8 or more char long'},
    {name: 'lowercase', text: 'Lower case alphabet'},
    {name: 'uppercase', text: 'Upper case alphabet'},
    {name: 'numbers', text: 'Numbers'},
    {name: 'special', text: 'Special characters'}
]


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            rules: {
                length: false,
                lowercase: false,
                uppercase: false,
                numbers: false,
                special: false
            }
        }
    }

    static propTypes = {
        onPressBack: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressBack: () => undefined,
    }

    componentDidMount() {
        this.handlePasswordValueChange(this.state.password)
    }

    onSavePassword() {
        //check validation
        if(this.state.password == this.state.retype){
            this.setState({isLoading: true})
            const param = {
                email: this.props.r_userDataList.email,
                password: this.state.password
            }
            this.props.a_changePassword(param, this.props.r_me, (res) => {
                if(res == 'success') this.props.onPressBack()
                else Operator.MyAlert('Profile', res)
            })            
        }
        else{
            Operator.MyAlert('Profile', "Password don't match")
        }
    }

    handlePasswordValueChange(value) {
        this.setState({
            rules: {
                length: this.validLength(value),
                numbers: this.validNumbers(value),
                lowercase: this.validLowerCase(value),
                uppercase: this.validUpperCase(value),
                special: this.validSpecial(value)
            },
            password: value
        });
    }

    validLength(value) {
        return value.length >= 8;
    }

    validNumbers(value) {
        return /\d/.test(value);
    }

    validLowerCase(value) {
        return /[a-z]/.test(value);
    }

    validUpperCase(value) {
        return /[A-Z]/.test(value);
    }

    validSpecial(value) {
        return /[@#$%!^&+=-]/.test(value)
    }

    render() {
        const _this = this
        return (
            <Container>
                <Loading />
                <Content style={{paddingHorizontal: 20, paddingTop: 40}}>
                    <Text style={styles.title}>Create new</Text>
                    <Text style={[styles.title, {fontSize: 24}]}>Password</Text>
                    <Text style={[styles.title, {paddingTop: 20, color: colors.gray}]}>Password should be or have</Text>
                    <TextListWithIcon
                        list={rules}
                        size={15}
                        rules={this.state.rules}
                        textStyle={{color: '#aaa'}}
                    />
                    <View style={styles.inputView}>
                        <SmallActionText
                            text={this.state.showPassword ? "Hide password" : "Show password"}
                            handleAction={() => this.setState({ showPassword: !this.state.showPassword })}
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            handleValueChange={(value) => this.handlePasswordValueChange(value)}
                            isPassword={!this.state.showPassword}
                            size={20}
                            value={this.state.password}
                            placeholder="New Password"
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            isPassword={!this.state.showPassword}
                            handleValueChange={(value) => this.setState({ retype: value })}
                            value={this.state.retype}
                            placeholder="Retype password"
                        />
                        <MyButton
                            isLoading={this.state.isLoading}
                            type='solid'
                            text='Save'
                            onPress={() => this.onSavePassword()}
                        />
                    </View>
                    <TouchableOpacity style={styles.closeButtonView} onPress={() => this.props.onPressBack()}>
                        <Icon name='close' size={40} color={colors.blue} />
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: colors.text,
        fontSize: 14,
        paddingTop: 10,
        fontWeight: 'bold'
    },
    closeButtonView: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        backgroundColor: 'transparent'
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
    },
    inputView: {
        borderTopWidth: 1,
        borderColor: colors.gray,
        marginHorizontal: -20,
        padding: 20,
        marginTop: 40
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      r_me: state.me,
      r_userDataList: state.userDataList
  }
}, mapDispatchToProps)(ChangePassword);