import React, {Component} from 'react';
import { View, Text, Animated } from 'react-native';
import colors from '../../config/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'

class AccountSaving extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        //alert(JSON.stringify(this.props.r_userDataList))
    }

    render() {
        let Amount = '0.000'
        if(this.props.r_userDataList.fundingsources == undefined){
            Amount = '...'
        }
        else if(this.props.r_userDataList.fundingsources.length == 0){
            
        }
        else{
            Amount = this.props.r_userDataList.fundingsources[0].balances[0].availableBalance
        }
        const animatedStyle = this.props.isFixed ? 'accountSavingsAbsoluteContainer' : 'accountSavingsContainer';
        const balanceStyle = this.props.isFixed ? 'accountSavingsAbsoluteBalanceStyle' : 'accountSavingsBalanceStyle';

        return (
            <Animated.View style={[Styles[animatedStyle], this.props.style, {display: this.props.display || 'flex'}]}>
                <View style={Styles.accountSavingTitleContainer}>
                    <Text style={Styles.accountSavingsTitleStyle}>ACCOUNT SAVINGS</Text>
                </View>
                <View style={Styles.accountSavingBalanceContainer}>
                    <Text style={Styles[balanceStyle]}>${Amount}</Text>
                </View>
            </Animated.View>
        );
    }
};

const Styles = {
    accountSavingsContainer: {
        backgroundColor: colors.darkGold,
        padding: 10,
        flexDirection: 'row'
    },
    accountSavingsAbsoluteContainer: {
        position: 'absolute',
        top: 56,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: colors.darkGold,
        padding: 10,
        flexDirection: 'row'
    },
    accountSavingTitleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    accountSavingsTitleStyle: {
        fontSize: 15,
        color: '#fff'
    },
    accountSavingBalanceContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    accountSavingsBalanceStyle: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 38
    },
    accountSavingsAbsoluteBalanceStyle: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 17
    },
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_userDataList: state.userDataList,
    r_foundUserInfo: state.foundUserInfo,
    r_me: state.me
  }
}, mapDispatchToProps)(AccountSaving);