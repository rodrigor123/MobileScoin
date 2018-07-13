// import libraries
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import colors from '../../config/colors'
import { View, Text, TouchableOpacity, BackHandler, Animated, Platform, Dimensions } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import MyButton from '../common/ActionButton'
// import components
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Operator from '../../config/operator'
const Width = Dimensions.get('window').width;

class QRCodeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSuccess: false,
        };
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount() {
        this.mounted = true
        BackHandler.addEventListener("hardwareBackPress", () => {
            this.mounted && this.onClose()
        })
    }

    componentWillUnmount() {
        this.mounted = false
    }

    onSuccess(e) {
        this.setState({
            showSuccess: true,
            result: e.data
        });        
    }

    onClose() {
        Actions.pop({refresh: {from: 'scan'}})
    }

    onScanned() {
        this.setState({isloading: true})
        const param = {
            qrcodetoken: this.state.result
        }
        this.props.storeQRCode(param, this.props.r_me, (status) => {
            this.setState({isloading: false})
            if(status == 'success') Actions.pop()
            else Operator.MyAlert('Scan QRCode',status)
        })        
    }    

    render() {
        return (
            <Container style={Styles.container}>
                <View style={Styles.titleContainer}>
                    <Text style={Styles.titleText}>Scan QR Code</Text>
                    <TouchableOpacity onPress={() => this.onClose()}>
                        <Text style={Styles.closeButton}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.textContainer}>
                    <Text style={Styles.textContainerText}>Scan the QR code on a Store POS Device to automatically login to complete a Scoin Transaction.</Text>
                </View>
                {
                    this.state.showSuccess &&
                    <View style={Styles.successView}>
                        <View style={Styles.successContainer}>
                            <Icon size={80} name="check" color={colors.green} />
                        </View>
                    </View>
                }
                {
                    !this.state.showSuccess &&
                    <View style={Styles.qrContainer}>
                        <QRCodeScanner
                            title="Scan Code"
                            onRead={this.onSuccess}
                            cameraStyle={{width: Width - 30}}
                        />
                    </View>
                }
                {
                    this.state.showSuccess && 
                    <MyButton text='Scan Again' type='solid' onPress={() => this.setState({showSuccess: false})}/>
                }
                {
                    this.state.showSuccess && 
                    <MyButton isLoading={this.state.isloading} text='Device Login' type='solid' onPress={() => this.onScanned()}/>
                }
            </Container>
        );
    }
}

const Styles = {
    container: {
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'flex-start'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8
    },
    titleText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left'
    },
    closeButton: {
        color:'#5195FF',
        fontSize: 28
    },
    textContainer: {
        marginTop: 20
    },
    textContainerText: {
        fontSize: 16,
        textAlign: 'left',
        color: '#aaa'
    },
    qrContainer: {
        flex: 1,
        marginBottom: 50,
        marginTop: -80,
    },
    doneButton: {
        padding: 10,
        width: 200,
        marginBottom: 30,
        backgroundColor: '#5195FF',
        borderRadius: 5,
        alignSelf: 'center'
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    successView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 180,
        borderRadius: Platform.OS == 'ios' ? 90 : 180,
        backgroundColor: colors.lightGreen,
        opacity: 0.8
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_me: state.me
  }
}, mapDispatchToProps)(QRCodeView);