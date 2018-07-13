// import libraries
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { Spinner, Content, Container, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';

// import components
import TextWrapper from '../common/TextWrapper';
import TextInputWithIcon from '../common/TextInputWithIcon';
import NameInputWithIcon from '../common/NameInputWithIcon';
import LoginFooterButtons from '../common/LoginFooterButtons';
import DropDown from '../common/DropDown'
import texts from '../../config/texts';
import colors from '../../config/colors';
const Item = Picker.Item;

class LoginMoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: ''
        }
    }    

    handleSubmit() {
        const {address1, address2, city, state, zip} = this.state
        if(this.checkValidation()){
            const userMore = {
                address1,
                address2,
                city,
                state,
                zip
            }
            this.props.saveUserMore(userMore)
            Actions.loginReview()
        }
    }

    checkValidation() {
        // const {address1, address2, city, state, zip} = this.state
        // if(address1.length < 2) {
        //     return this.showError('Address is incorrect');
        // }
        // else if(city == ''){
        //     return this.showError('Your city is incorrect');
        // }
        // else if(zip.length < 3){
        //     return this.showError('Your zipcode is incorrect');
        // }        
        return true;
    }

     showError(message) {
        this.refs.toast.show(message, DURATION.LENGTH_LONG);
        return false;
    }


    handleNextStep() {
        Actions[this.props.nextScene]();
    }

    render() {
        const { contentView, container, pickerContainer, stateText } = Styles
        const { pageText } = this.props

        return (
            <Container>
                <Content padder contentContainerStyle={contentView} >
                    <View>
                        <View style={container}>                            
                            <TextInputWithIcon
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({address1: value})}
                                icon="home"
                                size={20}
                                value={this.state.address1}
                                placeholder="Address 1"
                            />
                            <TextInputWithIcon
                                icon="none"
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({address2: value})}
                                value={this.state.address2}
                                placeholder="Address 2"
                            />
                            <TextInputWithIcon
                                icon="none"
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({city: value})}
                                value={this.state.city}
                                placeholder="City"
                            />
                            <View style={{flexDirection: 'row', paddingLeft: 40}}>
                                <View style={pickerContainer}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="State"
                                        selectedValue={this.state.state}
                                        onValueChange={(value) => this.setState({state: value})}
                                    >
                                        {
                                            texts.login.state.map(function(state, index){
                                                return(
                                                    <Item key={state.label} label={state.label} value={state.value} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={stateText}> in United State</Text>
                                </View>
                            </View>
                            {/* <TextInputWithIcon
                                icon="none"
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({state: value})}
                                value={this.state.state}
                                placeholder="State"
                            /> */}
                            <TextInputWithIcon
                                icon="none"
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({zip: value})}
                                value={this.state.zip}
                                placeholder="Zip"
                            />
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
                    
                </Content>
                <LoginFooterButtons
                    style={{padding: 20}}
                    onActionPress={() => this.handleSubmit()}
                />
            </Container>
        );
    }
}

const Styles = {
    contentView: {
        justifyContent: 'space-between'
    },
    container: {
        margin: 10,
        paddingHorizontal: 5
    },
    textMargin: {
        marginTop: 15
    },
    pickerContainer: {
        borderRadius: 4, 
        borderWidth: 1, 
        borderColor: '#aaa', 
        marginTop: 10,
        width: 120
    },
    stateText: {
        paddingLeft: 20,
        fontSize: 16,
        paddingTop: 4
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      
  }
}, mapDispatchToProps)(LoginMoreDetails);