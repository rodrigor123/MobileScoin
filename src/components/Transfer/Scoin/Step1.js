// import libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import TextInputWithIcon from '../../common/TextInputWithIcon';
import LoginFooterButtons from '../../common/LoginFooterButtons';
import MyButton from '../../common/ActionButton'
import * as Operator from '../../../config/operator'

class ScoinStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isloading: false
        };
    }

    static propTypes = {
        onPressNext: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressNext: () => undefined,
    }

    onClickNext() {
        this.props.findScoinUser(this.state.value, this.props.r_me, (status) => {
            if(status == 'success') this.props.onPressNext()
            else Operator.MyAlert('Fund Transfer', status)
        })
    }

    render() {
        return(
            <Container style={{padding: 20}}>
                <Content contentContainerStyle={styles.content}>
                <View style={{flex: 1}}>
                    <Text style={styles.Title}>Transfer to Scoin User</Text>
                    <Text style={styles.subTitle}>Enter phone number or email address</Text>
                    <TextInputWithIcon
                        style={{ marginVertical: 30 }}
                        handleValueChange={(value) => this.setState({value})}
                        value={this.state.value}
                        placeholder="Phone number"
                        keyboardType='phone-pad'
                    />   
                </View>                
                </Content>
                <MyButton
                    style={{marginTop: 20}}
                    text="Next"
                    type='solid'
                    isLoading={this.state.isloading}
                    onPress={() => this.onClickNext()}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create(
    {
        content: {
            justifyContent: 'space-between'
        },
        Title: {
            fontSize: 24,
            paddingVertical: 15
        },
        subTitle: {
            fontSize: 18,
            paddingVertical: 15
        },
        nextButton: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            height: 50
        }
    }
)

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_me: state.me
  }
}, mapDispatchToProps)(ScoinStep1);
