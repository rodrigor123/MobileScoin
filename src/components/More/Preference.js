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
import * as Storage from '../../config/storage'
import * as Operator from '../../config/operator'


const Width = Dimensions.get('window').width;

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '972-563-6325'
        }
    }

    componentDidMount() {
        Storage.getFromStroage('setting', (data) => {
            this.setState({
                touch: data.touch,
                remember: data.remember,
                auto: data.auto,
                email: data.email,
                password: data.password,
                phone: this.props.r_userData.phoneNumber
            })
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

    onPressSave() {
        Storage.setToStorage('setting', {
            touch: this.state.touch,
            remember: this.state.remember,
            auto: this.state.auto,
            email: this.state.email,
            password: this.state.password
        }, (res) => {
            this.props.onPressSave()
        })
    }


    render() {
        const _this = this
        return (
            <Container>
                <Loading />
                <HeaderView
                    text='Preference'
                    showAction={false}
                    showBackButton={true}
                    backClickHandler={() => this.props.onPressBack()}
                />
                <View style={{paddingHorizontal: 20, flex: 1}}>
                    <View style={styles.phoneView}>
                        <Text style={styles.phoneTitle}>Primary phone</Text>
                        <Text style={styles.phoneText}>{Operator.convertPhoneNumber(this.state.phone)}</Text>
                    </View>
                    <View style={styles.mainView}>
                        <CheckBox
                            labelStyle={{fontWeight: 'bold'}}
                            checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                            label='Remember this phone'
                            checked={this.state.remember}
                            onChange={(checked) => this.setState({remember: !checked})}
                        />
                        <Text style={styles.explain}>Trust this phone when I sign in</Text>
                        <CheckBox
                            labelStyle={{fontWeight: 'bold'}}
                            checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                            label='Auto signout in 3 mins'
                            checked={this.state.auto}
                            onChange={(checked) => this.setState({auto: !checked})}
                        />
                    </View>
                    <MyButton                        
                        type='solid'
                        text='Save'
                        onPress={() => this.onPressSave()}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        borderTopWidth: 1,
        borderColor: colors.lightGray,
        marginHorizontal: -20,
        paddingHorizontal: 30,
        paddingVertical: 50,
        flex: 1
    },
    title: {
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
    },
    phoneView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    explain: {
        color: colors.gray, 
        paddingLeft: 25, 
        paddingBottom: 20, 
        backgroundColor: 'transparent'
    },
    phoneTitle: {
        color: colors.gray,
        backgroundColor: 'transparent',
        marginRight: 30
    },
    phoneText: {
        fontSize: 20,
        color: colors.text,
        fontWeight: 'bold'
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
    return {   
        r_userData: state.userDataList,
        
    }
}, mapDispatchToProps)(Preference);