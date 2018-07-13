import React, {Component} from 'react';
import { View, Text,TouchableOpacity, Platform, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors';

class ProfileLogo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            profileIconContainer,
            profileContainer,
            welcomeTextStyle,
            profileIconContainerData,
            profileContainerData,
            welcomeTextStyleData,
            qrIconStyle
        } = Styles;
        let hasData = true
        let title = ''
        if(this.props.r_userData.userProfile !== undefined){
            title = 'Hello, ' + this.props.r_userData.userProfile.firstName
        }
        return (
            <View style={[profileContainer, hasData ? profileContainerData : {}]}>
                <Image source={require('../../resources/image/app_icon.png')} style={Styles.image}/>
                <Text style={[welcomeTextStyle, hasData ? welcomeTextStyleData : {}]}>{title}</Text>
            </View>
        );
    }   
    
};

const Styles = {
    profileContainer: {
        height: 220,
        backgroundColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'relative'
    },
    profileIconContainer: {
        width: 120,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileContainerData: {
        backgroundColor: colors.lightGreen
    },
    profileIconContainerData: {
        backgroundColor: '#233917'
    },
    welcomeTextStyle: {
        fontSize: 18,
        marginTop: 8,
        color: '#000'
    },
    welcomeTextStyleData: {
        color: colors.green
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: Platform.OS == 'ios' ? 75 : 150
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_userData: state.userDataList,
  }
}, mapDispatchToProps)(ProfileLogo);