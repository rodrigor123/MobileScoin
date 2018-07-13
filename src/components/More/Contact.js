// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Platform, Dimensions, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Container, Content, Button, Footer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
// import components
import HeaderView from '../common/HeaderView';
import Loading from '../common/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox'
// import config
import texts from '../../config/texts';
import TextInputWithIcon from '../common/TextInputWithIcon';
import DOBInput from '../common/DOBInput';
import MyButton from '../common/ActionButton'
import * as Operator from '../../config/operator'


const Width = Dimensions.get('window').width;

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            subject: ''
        }
    }

    static propTypes = {
        onPressBack: PropTypes.func.isRequired,
        onPressSend: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressBack: () => undefined,
        onPressSend: () => undefined,
    }

    componentDidMount() {
        const {r_userData} = this.props
        if(r_userData.email == undefined) return
        this.setState({
            email: r_userData.email,
            name: r_userData.userProfile.firstName
        })
    }

    onPressSend() {
        const {name, email, subject} = this.state
        const {r_userData} = this.props
        if(this.checkValidation()){
            const param = {
                subject,
                text: JSON.stringify({
                    email,
                    name,
                    phone: r_userData.phoneNumber
                })
            }
            this.props.emailSupport(param, (status) => {
                if(status == 'success'){
                    this.props.onPressSend()
                    if(r_userData.email == undefined) Actions.pop()
                } 
                else Operator.MyAlert('Contact Us', status)
            })
        }        
    }

    checkValidation() {
        const {name, email, subject} = this.state
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(name.length < 2) {
            Operator.MyAlert('Contact US', 'Name is invalid')
            return false
        }
        else if(!emailReg.test(email.replace(/ /g, ''))) {
            Operator.MyAlert('Contact US', 'Email is invalid')
            return false
        }
        else if(subject.replace(/ /g, '').length == 0){
            Operator.MyAlert('Contact US', 'Subject is empty')
            return false
        }
        return true;
    }

    render() {
        const _this = this
        return (
            <Container>
                <Loading />
                <HeaderView
                    text='Contact Us'
                    showAction={false}
                    showBackButton={true}
                    backClickHandler={() => {
                        if(this.props.r_userData.email == undefined) Actions.pop()
                        else this.props.onPressBack()
                    }}
                />
                <Content contentContainerStyle={{padding: 20}}>
                    <View>
                        <Text style={styles.title}>Call <Text style={{color: colors.text}}>1-800-652-6325</Text></Text>
                        <Text style={[styles.title, {paddingTop: 15}]}>Email us</Text>
                        <TextInputWithIcon
                            style={{ marginTop: 20 }}
                            handleValueChange={(value) => this.setState({name: value})}
                            text='Name'
                            value={this.state.name}
                            placeholder="Your name"
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 20 }}
                            handleValueChange={(value) => this.setState({email: value})}
                            text='Email'
                            value={this.state.email}
                            placeholder="Your email"
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 20}}
                            height={120}
                            multiline={true}
                            handleValueChange={(value) => this.setState({subject: value})}
                            text='Subject'
                            value={this.state.subject}
                        />  
                    </View>                                   
                </Content>
                <MyButton
                    style={{marginHorizontal: 20}}
                    type='solid'
                    text='Send'
                    onPress={() => this.onPressSend()}
                />       
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: 'transparent',
        color: colors.orange,
        fontSize: 16,
        paddingTop: 10,
        fontWeight: 'bold'
    },
    checkView: {
        paddingLeft: 10,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    saveButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        left: 20
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
}, mapDispatchToProps)(Contact);