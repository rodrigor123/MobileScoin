// import libraries
import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Button, Title, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import TrendView from '../common/TrendView';
import HeaderView from '../common/HeaderView';
import AccountSaving from '../common/AccountSaving';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
import {AnimatedCircularProgress} from 'react-native-circular-progress'
import MyButton from '../common/ActionButton'
import CheckBox from 'react-native-checkbox'

class FilterTransaction extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            weekly: false,
            monthly: false,
            received: false,
            transferred: false
        };
    }

    componentDidMount() {
        const {filter_option} = this.props
        this.setState({
            weekly: filter_option.weekly,
            monthly: filter_option.monthly,
            received: filter_option.received,
            transferred: filter_option.transferred,
        })
    }

    _handleWeek(checked){
        this.setState({weekly: !checked})
        if(!checked) this.setState({monthly: false})
    }

    _handleMonth(checked){
        this.setState({monthly: !checked})
        if(!checked) this.setState({weekly: false})
    }

    _handleReceive(checked){
        this.setState({received: !checked})
        if(!checked) this.setState({transferred: false})
    }

    _handleTransfer(checked){
        this.setState({transferred: !checked})
        if(!checked) this.setState({received: false})
    }

    onSaveOptions(){
        const {weekly, monthly, received, transferred} = this.state
        const param = {
            weekly,
            monthly,
            received,
            transferred
        }
        this.props.saveFilterOptions(param, () => {
            Actions.pop({refresh:{option: 'updated'}})
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>                
                <Text style={styles.title}>Filter Transactions</Text>
                <View style={styles.section}>
                    <CheckBox
                        labelStyle={styles.labelStyle}
                        checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                        label='Show funds received'
                        checked={this.state.received}
                        onChange={(checked) => this._handleReceive(checked)}
                    />
                    <CheckBox
                        labelStyle={styles.labelStyle}
                        checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                        label='Show funds transferred'
                        checked={this.state.transferred}
                        onChange={(checked) => this._handleTransfer(checked)}
                    />
                </View>
                <View style={styles.section}>
                    <CheckBox
                        labelStyle={styles.labelStyle}
                        checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                        label='Show transaction in last 7 days'
                        checked={this.state.weekly}
                        onChange={(checked) => this._handleWeek(checked)}
                    />
                    <CheckBox
                        labelStyle={styles.labelStyle}
                        checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                        label='Show transaction in last 30 days'
                        checked={this.state.monthly}
                        onChange={(checked) => this._handleMonth(checked)}
                    />
                    {/* <CheckBox
                        labelStyle={styles.labelStyle}
                        checkboxStyle={{width: 15, height: 15, borderColor: colors.gray}}
                        label='Date Range'
                        onChange={(checked) => this.setState({range: checked})}
                    /> */}
                </View>
                <View style={{flex: 1}} />
                <View style={{paddingHorizontal: 20}}>
                    <MyButton type='solid' text='Done' onPress={() => this.onSaveOptions()} style={{marginBottom: 40}}/>
                </View>
                <TouchableOpacity style={styles.closeButtonView} onPress={() => Actions.pop()}>
                    <Icon name='close' size={40} color={colors.blue} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: colors.text,
        fontSize: 22,
        padding: 20,
        paddingTop: 40
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: colors.gray,
        marginTop: 10
    },
    labelStyle: {
        fontSize: 18,
        color: colors.text
    },
    closeButtonView: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 40,
        height: 40,
        backgroundColor: 'transparent'
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    filter_option: state.filter_option
  }
}, mapDispatchToProps)(FilterTransaction);