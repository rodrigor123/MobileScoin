// import libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView  } from 'react-native';
import { Container, Content } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextInputWithIcon from '../../common/TextInputWithIcon';
import LoginFooterButtons from '../../common/LoginFooterButtons';
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../../../config/colors'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import MyButton from '../../common/ActionButton'
import * as Operator from '../../../config/operator'

class ScoinStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.r_transfer_amount,
            msg: this.props.r_transfer_msg
        };
    }

    static propTypes = {
        onPressConfirm: PropTypes.func.isRequired,
        onPressChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressConfirm: () => undefined,
        onPressChange: () => undefined
    }

    componentDidMount() {

    }

    onPressConfirm() {        
        if(!this.checkValidate()) return
        this.props.setTransferAmount(this.state.value)
        this.props.setTransferMsg(this.state.msg)
        this.props.onPressConfirm()
    }

    checkValidate() {
        const myAmount = Number(this.props.r_userDataList.fundingsources[0].balances[0].amount)
        const t_Amount = Number(this.state.value)
        if(myAmount < t_Amount || t_Amount == 0){
            Operator.MyAlert('Fund Transfer', '0 transfer or not enough balance to transfer!')
            return false
        }
        else if(this.state.msg.replace(/ /g, '').length == 0){
            Operator.MyAlert('Fund Transfer', 'You must input your message!')
            return false
        }
        return true
    }

    render() {
        return(
            <Container>
                <Content>
                    <KeyboardAwareScrollView style={{padding: 20}} extraScrollHeight={100}>
                        <Text style={styles.Title}>Transfer to Scoin User</Text>
                        <View style={styles.stateView}>
                            <View style={styles.stateTopView}>
                                <Icon name='check' size={25} color='green' />
                                <Text style={{paddingHorizontal: 20}}>Good news - we could verify {Operator.convertPhoneNumber(this.props.r_foundUserInfo.phoneNumber)}</Text>
                            </View>
                            <View style={styles.stateBottomView}>
                                <TouchableOpacity  onPress={() => this.props.onPressChange()}>
                                    <Text style={styles.buttonText}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.subTitle}>Amount of transfer</Text>
                        <TextInputWithIcon
                            icon='dollar'
                            style={{ marginVertical: 10 }}
                            handleValueChange={(value) => this.setState({value})}
                            value={this.state.value}
                            placeholder="00.00"
                            keyboardType='numeric'
                        />
                        <Text style={styles.subTitle}>Message for the receiver</Text>
                        <TextInputWithIcon
                            icon='none'
                            style={{ marginVertical: 10 }}
                            handleValueChange={(msg) => this.setState({msg})}
                            value={this.state.msg}
                        />
                        <MyButton
                            style={{marginVertical: 25}}
                            type='solid'
                            text="Confirm"
                            onPress={() => this.onPressConfirm()} />
                    </KeyboardAwareScrollView>
                </Content>
                
            </Container>
        )
    }
}

const styles = StyleSheet.create(
    {
        Title: {
            fontSize: 24,
            paddingVertical: 15,
            backgroundColor: 'transparent'
        },
        subTitle: {
            fontSize: 18,
            paddingVertical: 15,
            backgroundColor: 'transparent'
        },
        nextButton: {
            marginBottom: 30,
            height: 50
        },
        stateView: {
            backgroundColor: colors.lightGreen,
            padding: 15,
            borderRadius: 12,
            borderWidth: 0
        },
        stateTopView: {
            flexDirection: 'row'
        },
        stateBottomView: {
            alignItems: 'flex-end'
        },
        buttonText: {
            padding: 10,
            color: colors.blue,
            fontSize: 16
        },
         textInputView: {
            marginBottom: 15,
            height: 50,
            width: 200,
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: '#222',
            textAlign: 'center'
        },
    }
)

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_foundUserInfo: state.foundUserInfo,
    r_userDataList: state.userDataList,
    r_transfer_amount: state.transfer_amount,
    r_transfer_msg: state.transfer_msg
  }
}, mapDispatchToProps)(ScoinStep2);
