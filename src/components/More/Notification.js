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
import CheckBox from 'react-native-checkbox'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
// import config
import texts from '../../config/texts';
import TextInputWithIcon from '../common/TextInputWithIcon';
import DOBInput from '../common/DOBInput';
import MyButton from '../common/ActionButton'
import * as Operator from '../../config/operator'


const Width = Dimensions.get('window').width;

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tran_email: false,
            tran_text: false,
            fund_email: false,
            fund_text: false,
            bank_email: false,
            bank_text: false
        }
    }

    componentDidMount() {
        const profile = this.props.r_userData
        const notification = profile.userProfile.notifications

        this.setState({
            phone: profile.phoneNumber,
            email: profile.email
        })
        
        for(let index = 0; index < notification.length; index++){
            const value = notification[index]
            switch(value.label.toLowerCase()){
                case 'notify me on all account transactions':
                    this.setState({
                        tran_email: value.email,
                        tran_text: value.text
                    })
                    break
                case 'notify me on receiving funds':
                    this.setState({
                        fund_email: value.email,
                        fund_text: value.text
                    })
                    break
                case 'notify me about any bank transfers':
                    this.setState({
                        bank_email: value.email,
                        bank_text: value.text
                    })
                    break 
                default:
            }
        }        
    }

    onChangedCheck(key, value) {
        const data = {}
        data[key] = value
        this.setState(data)
        switch(key){
            case 'tran_email':            
                break
            case 'tran_text':
                break
            case 'fund_email':
                break
            case 'fund_text':
                break
            case 'bank_email':
                break
            case 'bank_text':
                break
            default:
        }
    }


    onPressSave() {
        let notification = []
        const {tran_email, tran_text, fund_email, fund_text, bank_email, bank_text} = this.state
        if(tran_email || tran_text){
            notification.push({
                label: 'Notify me on All account transactions',
                email: tran_email,
                text: tran_text
            })
        }
        if(fund_email || fund_text){
            notification.push({
                label: 'Notify me on receiving funds',
                email: fund_email,
                text: fund_text
            })
        }
        if(bank_email || bank_text){
            notification.push({
                label: 'Notify me about any Bank Transfers',
                email: bank_email,
                text: bank_text
            })
        }
        const param = {
            ...this.props.r_userData.userProfile,
            notifications: notification
        }
        //alert(JSON.stringify(param))
        this.props.a_updateProfile(param, 'PUT', this.props.r_me, (res) => {
            if(res == 'success'){
                Operator.MyAlert('Notification & Alerts', 'Saved successfully!')
                this.props.onPressSave()
            } 
            else Operator.MyAlert('Notification & Alerts', res)
        })
    }

    static propTypes = {
        onPressBack: PropTypes.func.isRequired,
        onPressSave: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressBack: () => undefined,
        onPressSave: () => undefined,
    }

    render() {
        const _this = this
        return (
            <Container>
                <Loading />
                <HeaderView
                    text='Notification & Alerts'
                    showAction={false}
                    showBackButton={true}
                    backClickHandler={() => this.props.onPressBack()}
                />
                <ScrollView>
                    <View style={{paddingHorizontal: 20, flex: 1}}>
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            editable={false}
                            icon="phone"
                            size={20}
                            value={this.state.phone}
                            placeholder="No phone"
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            editable={false}
                            icon="envelope"
                            size={20}
                            value={this.state.email}
                            placeholder="No email"
                        />
                        <View style={styles.mainView}>
                            <Text style={styles.title}>Notify me on All account transactions</Text>
                            <View style={styles.checkView}>
                                <CheckBox
                                    checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                                    label='Send Email'
                                    checked={this.state.tran_email}
                                    onChange={(checked) => this.onChangedCheck('tran_email', !checked)}
                                />
                                <CheckBox
                                    checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                                    label='Send Text'
                                    checked={this.state.tran_text}
                                    onChange={(checked) => this.onChangedCheck('tran_text', !checked)}
                                />
                            </View>
                            <Text style={styles.title}>Notify me on receiving funds</Text>
                            <View style={styles.checkView}>
                                <CheckBox
                                    checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                                    label='Send Email'
                                    checked={this.state.fund_email}
                                    onChange={(checked) => this.onChangedCheck('fund_email', !checked)}
                                />
                                <CheckBox
                                    checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                                    label='Send Text'
                                    checked={this.state.fund_text}
                                    onChange={(checked) => this.onChangedCheck('fund_text', !checked)}
                                />
                            </View>
                            <Text style={styles.title}>Notify me about any Bank Transfers</Text>
                            <View style={styles.checkView}>
                                <CheckBox
                                    checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                                    label='Send Email'
                                    checked={this.state.bank_email}
                                    onChange={(checked) => this.onChangedCheck('bank_email', !checked)}
                                />
                                <CheckBox
                                    checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                                    label='Send Text'
                                    checked={this.state.bank_text}
                                    onChange={(checked) => this.onChangedCheck('bank_text', !checked)}
                                />
                            </View>
                        </View>
                        <MyButton                        
                            type='solid'
                            text='Save'
                            onPress={() => this.onPressSave()}
                        />
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        borderTopWidth: 1,
        borderColor: colors.gray,
        marginHorizontal: -20,
        padding: 20,
        marginTop: 20,
        flex: 1
    },
    title: {
        backgroundColor: 'transparent',
        color: colors.text,
        fontSize: 14,
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
}, mapDispatchToProps)(Notification);