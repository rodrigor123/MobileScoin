// import libraries
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { Spinner, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal'
import DeviceInfo from 'react-native-device-info';
import PhoneInput from 'react-native-phone-input'
// import components
import TextWrapper from '../common/TextWrapper';
import TextInputWithIcon from '../common/TextInputWithIcon';
import NameInputWithIcon from '../common/NameInputWithIcon';
import DOBInput from '../common/DOBInput';
import LoginFooterButtons from '../common/LoginFooterButtons';

const NORTH_AMERICA = ['CA', 'MX', 'US'];
class LoginDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            day: 1,
            month: 1,
            year: 2018,
            gender: 'male',
            cca2: 'US',
            country: 'United States of America'
        }
        
    }

    componentDidMount() {
        
    }

    handleSubmit() {
        if(this.checkValidation()) {
            const {firstName, lastName, day, month, year, gender} = this.state
            const userDetail = {
                firstName,
                lastName,
                day,
                month: month + 1,
                year,
                gender,
                country: this.state.cca2
            }
            this.props.saveUserDetail(userDetail)
            Actions.loginMoreDetails()
        }
    }

    checkValidation() {
        const { firstName, lastName } = this.state;
        if(firstName.length < 2) {
            return this.showError('Please provide your first name');
        }
        else if(lastName.length < 2) {
            return this.showError('Please provide your last name');
        }
        else if(this.state.day == null || this.state.month == null || this.state.year == null){
            return this.showError('Your birthday is invalid');
        }
        else if(this.state.gender == ''){
            return this.showError('Please select your gender');
        }        
        return true;
    }

    handleNextStep() {
        Actions[this.props.nextScene]();
    }

    showError(message) {
        this.refs.toast.show(message, DURATION.LENGTH_LONG);
        return false;
    }

    onPressFlag(){
        this.refs.countryPicker.openModal()
    }
     
    selectCountry(country){
        this.refs.phone.selectCountry(country.cca2.toLowerCase())
        this.setState({cca2: country.cca2, country: country.name})
    }

    render() {
        const { pageText, isProspect } = this.props

        return (
            <Content padder contentContainerStyle={styles.contentView} >
                <View>
                    <View style={styles.container}>                        
                        {
                            isProspect?
                            <View>
                                <TextWrapper title>
                                    {pageText.exist}
                                </TextWrapper>
                                <TextWrapper small>
                                    {pageText.subTitle}
                                </TextWrapper>
                            </View>
                            :null
                        }
                        <TextWrapper title style={{marginTop: 20}}>
                            {pageText.title}
                        </TextWrapper>
                        <NameInputWithIcon
                            style={{ marginTop: 20 }}
                            handleValueChangeFirst={(value) => this.setState({firstName: value})}
                            handleValueChangeLast={(value) => this.setState({lastName: value})}
                            icon="user"
                            value={{
                                firstName: this.state.firstName,
                                lastName: this.state.lastName
                            }}
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            icon="envelope"
                            editable={false}
                            size={20}
                            value={this.props.r_userInfo.email}
                            placeholder="Email"
                        />
                        <DOBInput
                            style={{ marginTop: 10 }}
                            size={20}
                            handleValueChangeDay={(value) => this.setState({day: value})}
                            handleValueChangeMonth={(value) => this.setState({month: value})}
                            handleValueChangeYear={(value) => this.setState({year: value})}
                            icon="birthday-cake"
                            value={{
                                day: this.state.day,
                                month: this.state.month,
                                year: this.state.year
                            }}
                        />
                        <TextInputWithIcon
                            style={{ marginTop: 10 }}
                            handleValueChange={(value) => this.setState({gender: value})}
                            icon="user"
                            styleInput={{flex: 0,width: 150}}
                            value={this.state.gender}
                            placeholder="Gender"
                            type="picker"
                            options={[
                                { label: 'Male', value: 'male'},
                                { label: 'Female', value: 'female'}
                            ]}
                        />
                        <View style={styles.countryView}>
                            <PhoneInput
                                style={{width: 30, height: 0}}
                                ref='phone'
                                onPressFlag={() => this.onPressFlag()}
                            />
                
                            <CountryPicker
                                ref='countryPicker'
                                onChange={(value)=> this.selectCountry(value)}
                                translation='eng'
                                cca2={this.state.cca2}
                                filterable={true}
                                closeable={true}
                            >
                                <View></View>
                            </CountryPicker>
                            <Text style={styles.country}>{this.state.country}</Text>
                        </View>
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
                    onActionPress={() => this.handleSubmit()}
                />
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    container: {
        margin: 10,
        paddingHorizontal: 5
    },
    countryView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 5
    },
    country: {
        paddingLeft: 10,
        fontSize: 16
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
      r_userInfo: state.userInfo,
      isProspect: state.isProspect
  }
}, mapDispatchToProps)(LoginDetails);