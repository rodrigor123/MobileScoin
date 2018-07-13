// import libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView  } from 'react-native';
import { Container, Content } from 'native-base';
import TextInputWithIcon from '../../common/TextInputWithIcon';
import LoginFooterButtons from '../../common/LoginFooterButtons';
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../../../config/colors'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import PinCodeWithIcon from '../../common/PinCodeWithIcon'
import * as Operator from '../../../config/operator'

class ScoinStep4 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            safepin: ''
        };
    }

    static propTypes = {
        onPressDone: PropTypes.func.isRequired,
        onPressCancel: PropTypes.func.isRequired,
        where: PropTypes.string.isRequired
    }

    static defaultProps = {
        onPressDone: () => undefined,
        onPressCancel: () => undefined
    }

    onPressDone() {
        const {r_userDataList, r_foundUserInfo, r_transfer_amount, r_transfer_msg, r_me} = this.props
        const srcfundingsrc = r_userDataList.fundingsources[0].id
        const touserid = r_foundUserInfo.id
        const tofundingsrc = r_foundUserInfo.fundingsources[0].id
        let param = {
            phonenumber: r_userDataList.phoneNumber,
            pin: this.state.safepin
        }
        this.props.verifyPin(param, r_me, (status) => {
            if(status == 'success'){
                param = {
                    srcfundingsrc,
                    touserid,
                    tofundingsrc,
                    amount: Number(r_transfer_amount),
                    description: r_transfer_msg
                }
                this.props.userTransfer(param, r_me, (status) => {
                    if(status == 'success'){
                        this.props.setUserDataList(r_me.userId, r_me.token)
                        this.props.onPressDone()
                    }
                    else{
                        Operator.MyAlert('Fund Transfer', status)
                    }
                })
            }
            else{
                Operator.MyAlert('Fund Transfer', 'The PIN code is incorrect')
            }
        })
        
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Enter Transaction PIN</Text>
                <Text style={styles.subTitle}>
              
                </Text>
                <Text style={styles.subTitle}>
              
                </Text>
                <View style={styles.pinContainer}>
                    <PinCodeWithIcon
                        style={{marginTop: 10, flex: 5}}
                        length={6}
                        icon="key"
                        size={20}
                        isPassword={!this.state.showPin}
                        value={this.state.safepin}
                        handleValueChange={(value) => this.setState({safepin: value})}
                    />
                </View>
                <LoginFooterButtons
                    style={styles.DoneButton}
                    actionText="Done"
                    onActionPress={() => this.props.where == 'Bank' ? this.props.onPressDone() : this.onPressDone()}
                    onCancelPress={() => this.props.onPressCancel()}
                />
                <TouchableOpacity style={styles.closeButtonView} onPress={() => this.props.onPressCancel()}>
                    <Icon name='close' size={40} color={colors.blue} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1, 
            position: 'absolute', 
            top: 0, 
            bottom: 0, 
            right: 0, 
            left: 0, 
            backgroundColor: colors.lightGray,
            padding: 30
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
            backgroundColor: 'transparent'
        },
        subTitle: {
            fontSize: 18,
            color: colors.gray,
            backgroundColor: 'transparent',
            marginTop: 20
        },
        pinContainer: {
            flexDirection: 'row',
            paddingHorizontal: 40,
            paddingVertical: 25,
            flex: 1
        },
        DoneButton: {
        },
        closeButtonView: {
            position: 'absolute',
            top: 20,
            right: 20,
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
        }

    }
)

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_userDataList: state.userDataList,
    r_foundUserInfo: state.foundUserInfo,
    r_me: state.me,
    r_transfer_amount: state.transfer_amount,
    r_transfer_msg: state.transfer_msg
  }
}, mapDispatchToProps)(ScoinStep4);
