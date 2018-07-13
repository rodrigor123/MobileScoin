// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { Spinner, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

// import components
import TextWrapper from '../../common/TextWrapper';
import LabeledTextInputWithIcon from '../../common/LabeledTextInputWithIcon';
import SmallActionText from '../../common/SmallActionText';
import LoginFooterButtons from '../../common/LoginFooterButtons';

class BankStep1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            note: ''
        }
    }

    static propTypes = {
        onPressNext: PropTypes.func.isRequired,
        onPressAddBank: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressNext: () => undefined,
        onPressAddBank: () => undefined
    }

    render() {
        const { contentView, container } = Styles,
            { pageText } = this.props;

        return (
            <Container>
                <Content contentContainerStyle={contentView}>
                    <View style={{flex: 1}}>
                        <SmallActionText
                            text="Add new bank account"
                            handleAction={() => this.props.onPressAddBank()}
                            />
                        <LabeledTextInputWithIcon
                            style={{ marginTop: 30 }}
                            handleValueChange={(value) => console.log(value)}
                            icon="university"
                            label="Select account"
                            size={12}
                            value={"wells2"}
                            placeholder="Select Account"
                            type="picker"
                            options={[
                                { label: 'Wells Fargo xxx9632', value: 'wells'},
                                { label: 'Wells Frago xxx1185', value: 'wells2'}
                            ]}
                        />
                        <LabeledTextInputWithIcon
                            label="Amount"
                            icon="dollar"
                            size={12}
                            style={{ marginTop: 25 }}
                            handleValueChange={(value) => console.log(value)}
                            value={this.state.amount}
                            placeholder="00.00" />
                        <LabeledTextInputWithIcon
                            label="Note"
                            icon="comment"
                            size={12}
                            style={{ marginTop: 25 }}
                            handleValueChange={(value) => console.log(value)}
                            value={this.state.note}
                            placeholder="" />
                    </View>                    
                </Content>
                <LoginFooterButtons
                    style={{marginHorizontal: 20}}
                    actionText="Slide to Transfer"
                    onActionPress={() => this.props.onPressNext()}
                    hideCancel={true} />
            </Container>
        );
    }
}

const Styles = {
    contentView: {
        paddingHorizontal: 15,
        paddingTop: 10,
        justifyContent: 'space-between',
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   

  }
}, mapDispatchToProps)(BankStep1);