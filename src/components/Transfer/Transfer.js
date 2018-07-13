// import libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { View, Text, Modal, KeyboardAvoidingView, BackHandler, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import HeaderView from '../common/HeaderView';
import AccountSaving from '../common/AccountSaving';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import components

import Loading from '../common/Loading';
import QRCodeView from '../More/QRCodeView';
import TransferMethod from './TransferMethod'
import ScoinStep1 from './Scoin/Step1'
import ScoinStep2 from './Scoin/Step2'
import ScoinStep3 from './Scoin/Step3'
import ScoinStep4 from './Scoin/Step4'
import ScoinStep5 from './Scoin/Step5'
import BankStep1 from './Bank/Step1'
import BankStep2 from './Bank/Step2'
import BankStep3 from './Bank/Step3'
import BankStepA1 from './Bank/StepA1'
import BankStepA2 from './Bank/StepA2'


const pageText = texts.transfer;
const titles = {
    0: 'Fund Transfer',
    11: 'Fund Transfer',
    12: 'Fund Transfer',
    13: 'Review',
    14: 'Transfer',
    15: 'Transfer',
    21: 'Fund Transfer',
    22: 'Review',
    23: 'Transfer',
    24: 'Transfer',
    31: 'Add Bank',
    32: 'Review'
}
class Transfer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            stack: []
        };
    }

    static propTypes = {
        onCompleteStep: PropTypes.func.isRequired,
        onPressProfile: PropTypes.func.isRequired
    }

    static defaultProps = {
        onCompleteStep: () => undefined,
        onPressProfile: () => undefined,
    }

    componentDidMount() {
        this.props.handler.TransHandle = this
    }

    onChangeStep(index) {
        let stack = this.state.stack
        stack.push(index)
        this.setState({step: index, stack})
    }

    onBackStep() {
        let stack = this.state.stack
        stack.splice(-1, 1)
        if(stack.length == 0) this.setState({step: 0, stack})
        else this.setState({step: stack[stack.length - 1], stack})
    }

    onCompleteStep() {
        //Init Step History
        this.setState({step: 0, stack: []})
        //go to Dashboard
        this.props.onCompleteStep()
    }

    onCompleteAddBank() {
        this.setState({step: 0, stack: []})
    }

    render() {
        const { step } = this.state

        return (
            <Container style={{flex: 1}}>
                <Loading />
                
                {
                    step == 14?
                    null:
                    <HeaderView
                        showAction={true}
                        text={titles[step]}
                        showBackButton={step !== 0}
                        backClickHandler={() => this.onBackStep()}
                        onPressQRIcon = {() => this.props.onPressQRIcon()}
                        onPressProfile={() => this.props.onPressProfile()}
                    />
                }       
                {
                    //Showing ACCOUNT SAVING
                    step == 13 || step == 14 || step == 15 || step == 22 || step == 24?
                    null
                    :
                    <AccountSaving
                        value="23.12"
                        isFixed={false}
                    />
                }
                {
                    //Showing Contents
                    step == 0?
                    <TransferMethod
                        onPressScoin={() => this.onChangeStep(11)}
                        onPressBank={() => this.onChangeStep(21)}
                    />
                    :step == 11?
                    <ScoinStep1 
                        onPressNext={() => this.onChangeStep(12)}
                    />
                    :step == 12?
                    <ScoinStep2
                        onPressConfirm={() => this.onChangeStep(13)}
                        onPressChange={() => this.onBackStep()}
                    />
                    :step == 13?
                    <ScoinStep3
                        onPressEdit={() => this.onBackStep()}
                        onPressConfirm={() => this.onChangeStep(14)}
                    />
                    :step == 14?
                    <ScoinStep4
                        where='Scoin'
                        onPressDone={() => this.onChangeStep(15)}
                        onPressCancel={() => this.onBackStep()}
                    />
                    :step == 15?
                    <ScoinStep5
                        onPressDone={() => this.onCompleteStep()}
                    />
                    :step == 21?
                    <BankStep1
                        onPressNext={() => this.onChangeStep(22)}
                        onPressAddBank={() => this.onChangeStep(31)}
                    />
                    :step == 22?
                    <BankStep2
                        onPressEdit={() => this.onBackStep()}
                        onPressConfirm={() => this.onChangeStep(23)}
                    />
                    :step == 23?
                    <ScoinStep4
                        where='Bank'
                        onPressDone={() => this.onChangeStep(24)}
                        onPressCancel={() => this.onBackStep()}
                    />
                    :step == 24?
                    <BankStep3
                        onPressDone={() => this.onCompleteStep()}
                    />
                    :step == 31?
                    <BankStepA1
                        onPressNext={() => this.onChangeStep(32)}
                    />
                    :step == 32?
                    <BankStepA2
                        onPressEdit={() => this.onBackStep()}
                        onPressConfirm={() => this.onCompleteAddBank()}
                    />
                    :null
                }
            </Container>
        );
    }
}

const Styles = {

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   

  }
}, mapDispatchToProps)(Transfer);