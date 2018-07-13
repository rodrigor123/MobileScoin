// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Footer, Picker } from 'native-base';

//redux
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'

// custom components
import texts from '../../config/texts';
import TextInputWithIcon from '../common/TextInputWithIcon';
import DOBInput from '../common/DOBInput';
import MyButton from '../common/ActionButton'
import HeaderView from '../common/HeaderView';
import Loading from '../common/Loading';
import colors from '../../config/colors'
import * as Operator from '../../config/operator'
const Item = Picker.Item;
var ImagePicker = require('react-native-image-picker');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 1991,
            month: 8,
            day: 23,
            gender: 'male',
            //avatarSource: require('../../resources/image/person.png')
        }
    }

    componentDidMount() {
        const profile = this.props.r_userData.userProfile
        if(profile == undefined) return
        let has_address = (profile.addresses == undefined || profile.addresses.length == 0) ? false : true
        this.setState({
            firstName: profile.firstName,
            lastName: profile.lastName,
            year: Number(profile.dateofbirth.split('-')[0]),
            month: Number(profile.dateofbirth.split('-')[1]) - 1,
            day: Number(profile.dateofbirth.split('-')[2].substr(0, 2)),
            address1: has_address ? profile.addresses[0].line1 : '',
            address2: has_address ? profile.addresses[0].line2 : '',
            city: has_address ? profile.addresses[0].city : '',
            state: has_address ? profile.addresses[0].state : '',
            zip: has_address ? profile.addresses[0].zip : '',
            gender: profile.gender
        })
    }

    static propTypes = {
        onPressBack: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressBack: () => undefined
    }

    onBackProfile() {
        this.props.gotoProfilePage(false)
        this.props.onPressBack()
    }

    onEditPhoto() {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
           
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
           
              this.setState({
                avatarSource: source
              });
            }
        });
    }

    onPressSave() {
        const {firstName, lastName, year, month, day, gender, address1, address2, city, state, zip} = this.state
        const {r_userData} = this.props
        const profile = r_userData.userProfile
        const param = {
            firstName,
            middleInitial: '',
            lastName,
            ssn: profile.ssn,
            dateofbirth: year + '-' + (month + 1) + '-' + day,
            addresses: [
                {
                    label: 'Home Address',
                    line1: address1,
                    line2: address2,
                    city,
                    zip,
                    state,
                    country: r_userData.userProfile.addresses[0].country
                }
            ],
            notifications: profile.notifications,
            gender: gender
        }
        //alert(JSON.stringify(param))
        this.props.a_updateProfile(param, 'PUT', this.props.r_me, (res) => {
            if(res == 'success'){
                Operator.MyAlert('Profile', 'Saved successfully!')
                this.props.onPressBack()
            } 
            else Operator.MyAlert('Profile', res)
        })
    }

    render() {
        const _this = this
        const {r_profile} = this.props
        return (
            <Container>
                <Loading />
                <HeaderView
                    text='Profile'
                    showAction={false}
                    showBackButton={true}
                    backClickHandler={() => this.onBackProfile()}
                />
                <Content contentContainerStyle={{padding: 20}}>
                    <View style={styles.topMainView}>
                        <View style={styles.nameView}>
                            <Text style={styles.title}>Personal Info</Text>
                            <TextInputWithIcon
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({firstName: value})}
                                icon="user"
                                size={20}
                                value={this.state.firstName}
                                placeholder="First Name"
                            />
                            <TextInputWithIcon
                                style={{ marginTop: 10 }}
                                handleValueChange={(value) => this.setState({lastName: value})}
                                icon="none"
                                value={this.state.lastName}
                                placeholder="Last Name"
                            />
                        </View>
                        {/* <View style={styles.photoView}>
                            <Image source={this.state.avatarSource} style={styles.avatar}/>
                            <TouchableOpacity onPress={() => this.onEditPhoto()}>
                                <Text style={styles.editPhotoText}>Edit</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
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
                        icon="none"
                        type='picker'
                        value={this.state.gender}
                        placeholder="gender"
                        options={[
                            { label: 'Male', value: 'male'},
                            { label: 'Female', value: 'female'}
                        ]}
                    />
                    <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        handleValueChange={(value) => this.setState({address1: value})}
                        icon="none"
                        value={this.state.address1}
                        placeholder="Address 1"
                    />
                    {/* <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        handleValueChange={(value) => this.setState({address2: value})}
                        icon="none"
                        value={this.state.address2}
                        placeholder="Address 2"
                    /> */}
                    <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        handleValueChange={(value) => this.setState({city: value})}
                        icon="none"
                        value={this.state.city}
                        placeholder="City"
                    />
                    <View style={{flexDirection: 'row', paddingLeft: 40}}>
                        <View style={styles.pickerContainer}>
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
                            <Text style={styles.stateText}> in United States</Text>
                        </View>
                    </View>
                    <TextInputWithIcon
                        style={{ marginTop: 10 }}
                        handleValueChange={(value) => this.setState({zip: value})}
                        icon="none"
                        value={this.state.zip}
                        placeholder="Zip"
                    />
                    <MyButton
                        style={{marginHorizontal: 20, marginBottom: 10}}
                        type='solid'
                        text='Save'
                        onPress={() => this.onPressSave()}
                    />       
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: colors.orange,
        fontSize: 16,
        padding: 5
    },
    topMainView: {
        flexDirection: 'row'
    },
    nameView: {
        flex: 0.6
    },
    photoView: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: Platform.OS == 'ios' ? 40 : 80,
        overflow: 'hidden'
    },
    editPhotoText: {
        fontSize: 14,
        color: colors.blue
    },
    stateText: {
        paddingLeft: 20,
        fontSize: 16,
        paddingTop: 4
    },
    pickerContainer: {
        borderRadius: 4, 
        borderWidth: 1, 
        borderColor: '#aaa', 
        marginTop: 10,
        width: 120
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        b_profile: state.b_profile,
        r_me: state.me,
        r_userData: state.userDataList
    }
}, mapDispatchToProps)(Profile);