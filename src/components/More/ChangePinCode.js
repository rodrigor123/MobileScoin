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
import PinCodeWithIcon from '../common/PinCodeWithIcon';
import TextListWithIcon from '../common/TextListWithIcon'
import SmallActionText from '../common/SmallActionText'
import DOBInput from '../common/DOBInput';
import MyButton from '../common/ActionButton'
import * as Operator from '../../config/operator'

const Width = Dimensions.get('window').width;


class ChangePinCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPin: '',
            retype: '',
            showPin: false
        }
    }

    static propTypes = {
        onPressBack: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressBack: () => undefined,
    }

    componentDidMount() {
        this.handlePinValueChange(this.state.newPin)
    }

    onSavePassword() {
        //check validation
        if(this.state.newPin == this.state.retype){
            this.setState({isLoading: true})
            const param = {
                phonenumber: this.props.r_userData.phoneNumber,
                pin: this.state.newPin
            }
            this.props.a_changePin(param, this.props.r_me, (res) => {
                if(res == 'success') this.props.onPressBack()
                else Operator.MyAlert('Profile', res)
            })            
        }
        else{
            Operator.MyAlert('Profile', "Pincode don't match")
        }
    }

    handlePinValueChange(value) {
        this.setState({
            newPin: value
        });
    }
    render() {
        const _this = this
        return (
            <Container>
                <Loading />
                <Content style={{paddingHorizontal: 20, paddingTop: 40}}>
                    <Text style={styles.title}>Create new</Text>
                    <Text style={[styles.title, {fontSize: 24}]}>PIN</Text>
                    
                    <View style={styles.inputView}>
                        <SmallActionText
                            text={this.state.showPin ? "Hide PIN" : "Show PIN"}
                            handleAction={() => this.setState({ showPin: !this.state.showPin })}
                        />
                        <PinCodeWithIcon
                            style={{ marginTop: 10 }}
                            handleValueChange={(value) => this.handlePinValueChange(value)}
                            length={6}
                            isPassword={!this.state.showPin}
                            value={this.state.newPin}
                        />
                        <PinCodeWithIcon
                            style={{ marginTop: 10 }}
                            handleValueChange={(value) => this.setState({retype: value})}
                            value={this.state.retype}
                            isPassword={!this.state.showPin}
                            length={6}
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
      r_userData: state.userDataList
  }
}, mapDispatchToProps)(ChangePinCode);