// import libraries
import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { Spinner, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';

// import components
import LoginFooterButtons from '../common/LoginFooterButtons';
import texts from '../../config/texts';

// import scoin api methods
import scoinApi from '../../api/scoinApi';
import * as Operator from '../../config/operator'

class LoginReview extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        //alert(JSON.stringify(this.props.r_userInfo))
    }

    handleSubmit() {
        const {r_userInfo, r_userDetail, r_userMore, r_userId, r_me} = this.props
        const param = {
            firstName: r_userDetail.firstName,
            middleInitial: '',
            lastName: r_userDetail.lastName,
            ssn: r_userInfo.phone,
            dateofbirth: r_userDetail.year + '-' + r_userDetail.month + '-' + r_userDetail.day,
            gender: r_userDetail.gender,
            address: [
                {
                    label: 'Home Address',
                    line1: r_userMore.address1 + ', ' + r_userMore.address2,
                    city: r_userMore.city,
                    zip: r_userMore.zip,
                    state: r_userMore.state,
                    country: r_userDetail.country
                }
            ],
            notification: [
                {
                    label: 'Notify me on ALL account transactions',
                    email: true,
                    text: false
                }
            ]
        }
        this.props.a_updateProfile(param, 'POST', r_me, (res) => {
            if(res == 'success'){
                Actions.home()
            }
            else{
                Operator.MyAlert('Log In', res)
            }            
        })    
    }

    getBirthDate() {
        const { year, month, day } = this.props.r_userDetail;
        const date = new Date(year, month, day);
        return texts.global.months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + ".";
    }

    render() {
        const { contentView, container, textStyle, boldStyle, textMargin } = Styles;
        //const { password, pin } = this.props.r_userInfo;
        const { password, pin } = this.props.r_userInfo
        const safePinMask = pin.substr(0, 1) + '**' + pin.substr(3);
        const passwordMask = password.substr(0, 2) + '*'.repeat(password.length-4) + password.substr(password.length-2);

        const {r_userInfo, r_userDetail, r_userMore} = this.props
        return (
            <Content padder contentContainerStyle={contentView} >
                <View>
                    <View style={container}>
                        <Text style={textStyle}>
                            <Text style={{}}>Hello, </Text>
                            <Text style={boldStyle}>{r_userDetail.firstName + " " + r_userDetail.lastName + " "}</Text>
                            <Text>we are almost done. Just lets review and final check. We can call or text you on </Text>
                            <Text style={boldStyle}>{r_userInfo.phone + " "}</Text>
                            <Text>or email you at </Text>
                            <Text style={boldStyle}>{r_userInfo.email + ". "}</Text>
                            <Text>And you are a </Text>
                            <Text style={boldStyle}>{r_userDetail.gender + ", "}</Text>
                            <Text>born on </Text>
                            <Text style={boldStyle}>{this.getBirthDate()}</Text>
                        </Text>
                        <Text style={[textStyle, textMargin]}>
                            <Text>You have set your PIN </Text>
                            <Text style={boldStyle}>{safePinMask + " "}</Text>
                            <Text>and password is </Text>
                            <Text style={boldStyle}>{passwordMask + " "}</Text>
                        </Text>
                    </View>
                </View>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'red'}}
                    position='center'
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={0.9}
                    textStyle={{color:'#fff'}}
                />
                <LoginFooterButtons
                    actionText="Yes, perfect"
                    cancelText="Edit"
                    onActionPress={() => this.handleSubmit()}
                />
            </Content>
        );
    }
}

const Styles = {
    contentView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    container: {
        margin: 10,
        paddingHorizontal: 5
    },
    textMargin: {
        marginTop: 15
    },
    textStyle: {
        color: '#000',
        fontSize: 18
    },
    boldStyle: {
        fontWeight: 'bold'
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_userInfo: state.userInfo,
    r_userDetail: state.userDetail,
    r_userMore: state.userMore,
    r_userId: state.userId,
    r_me: state.me,
    r_touchID: state.touchID
  }
}, mapDispatchToProps)(LoginReview);