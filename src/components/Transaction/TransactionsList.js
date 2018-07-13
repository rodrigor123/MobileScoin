// import libraries
import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, RefreshControl } from 'react-native';
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
import * as Operator from '../../config/operator'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TransactionsList extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            dataSource: ds.cloneWithRows([]),
            toggle: false,
            fill: 83,
            refreshing: false
        };
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {

    }

    _onRefresh() {
        const _this = this
        this.setState({refreshing: true})
        this.props.a_getTransaction(this.props.r_me, this.props.r_history, 1)
        setTimeout(() => {
            _this.setState({refreshing: false})
        }, 1000)
    }

    renderRow(transaction, sectionID, rowID, rowMap) {
        const { container, dateContainer, dateText, detailsContainer, detailsTitleText, detailsSubtitleText, trendContainer, trendStatusText } = styles;
        return (
            <View style={container}>
                <View style={dateContainer}>
                    <Text style={dateText}>{Operator.convertTransferDate(transaction.updatedTime)}</Text>
                </View>
                <View style={detailsContainer}>
                    {/* <Text style={detailsTitleText}>Transaction {Number(rowID) + 1}</Text> */}
                    <Text style={detailsTitleText}>{transaction.description}</Text>
                </View>
                <View style={trendContainer}>
                    <TrendView value={transaction.amount[0].value} />
                    <Text style={trendStatusText}>{transaction.status}</Text>
                </View>
            </View>
        )
    }

    getDateOffset(time){
        const CT = new Date().getTime()
        const PT = new Date(time).getTime()
        return CT - PT
    }

    filterHistory(data){
        const _this = this
        const {filter_option, r_me} = this.props
        const week_ts = 7*86400*1000
        const month_ts = 30*86400*1000
        let temp = []
        data.map(function(item, index){
            if(filter_option.received && item.transfertype !== 'STORE-TO-SCOIN' && item.metadata.fromuserid != r_me.userId) return
            if(filter_option.transferred && item.transfertype !== 'STORE-TO-SCOIN' && item.metadata.touserid != r_me.userId) return
            const isDeposite = (item.transfertype == 'STORE-TO-SCOIN' || item.metadata.fundtype == 'deposit') ? true : false
            const isWithdraw = (item.transfertype == 'SCOIN-TO-STORE' || item.metadata.fundtype == 'withdraw') ? true : false
            if(filter_option.weekly && _this.getDateOffset(item.updatedTime) > week_ts) return
            else if(filter_option.monthly && _this.getDateOffset(item.updatedTime) > month_ts) return
            else if(filter_option.received && !isDeposite) return
            else if(filter_option.transferred && !isWithdraw) return
            temp.push(item)
        })
        return temp
    }

    render() {
        const {buttonView, button, blue_points, chartView, chart, gold_points} = styles
        return (
            <View style={{flex: 1}}>
                <HeaderView
                    showAction={true}
                    showBackButton={false}
                    text='Transactions'
                    onPressQRIcon = {() => this.props.onPressQRIcon()}
                    onPressProfile={() => this.props.onPressProfile()}
                />
                <AccountSaving
                    style={{ opacity: this.state.accountAbsoluteOpacity, zIndex: 1 }}
                    value="23.12"
                    isFixed={false}
                />
                <View style={buttonView}>
                    {/* <TouchableOpacity style={button} onPress={() => this.setState({toggle: !this.state.toggle})}>
                        <Icon name={this.state.toggle ? 'list' : 'pie-chart'} size={25} color={colors.blue} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={button} onPress={() => Actions.filterTransaction()}>
                        <Icon name='search' size={25} color={colors.blue} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.toggle?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={chartView}>
                            <AnimatedCircularProgress
                                style={chart}
                                size={150}
                                width={20}
                                fill={83}
                                tintColor={colors.blue}
                                backgroundColor='#FFF'
                                rotation={0}
                                children={(fill) => console.log('Progress:', fill)}
                            />
                            <Text style={blue_points}>83%</Text>
                        </View>
                        <View style={chartView}>
                            <AnimatedCircularProgress
                                style={chart}
                                size={150}
                                width={20}
                                fill={74}
                                tintColor={colors.darkGold}
                                backgroundColor='#FFF'
                                rotation={0}
                                children={(fill) => console.log('Progress:', fill)}
                            />
                            <Text style={gold_points}>74%</Text>
                        </View>
                    </View>
                    :
                    <View style={{flex: 1, padding: 10}}>
                        {
                            this.props.loading && this.props.r_history.length == 0?
                            <View style={styles.loadingView}>
                                <View><Text style={styles.loadingText}>Loading transaction history...</Text></View>
                            </View>
                            :this.props.r_history.length == 0?
                            <View style={styles.loadingView}>
                                <View><Text style={styles.loadingText}>No history</Text></View>
                            </View>
                            :
                            <View>
                                <Text>RECENT ACTIVITY</Text>
                                <ListView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this._onRefresh()}
                                            title='loading more history...'
                                        />
                                    }
                                    dataSource={ds.cloneWithRows(this.filterHistory(this.props.r_history))}
                                    renderRow={this.renderRow}
                                    enableEmptySections={true}
                                />
                            </View>
                        }
                    </View>
                }                
            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    dateContainer: {
        justifyContent: 'flex-start',
        paddingTop: 1,
        paddingLeft: 5,
        minWidth: 50
    },
    dateText: {
        color: '#8B8B8B',
        fontSize: 15
    },
    detailsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        paddingHorizontal: 10
    },
    detailsTitleText: {
        color: '#8B8B8B',
        fontSize: 16
    },
    detailsSubtitleText: {
        color: '#aaa',
        fontSize: 13
    },
    trendContainer: {
        alignItems: 'flex-end',
        paddingTop: 1,
        paddingRight: 2
    },
    trendStatusText: {
        color: '#aaa',
        fontSize: 12
    },
    buttonView: {
        height: 50,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        paddingHorizontal: 15
    },
    blue_points: {
        color: colors.blue,
        fontSize: 24
    },
    chartView: {
        margin: 20,
        width: 150,
        height: 150,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chart: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    gold_points: {
        color: colors.darkGold,
        fontSize: 24
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 28,
        color: colors.text,
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'transparent'
    },
    description: {
        color: colors.gray,
        textAlign: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'transparent'
    },
    loadingText: {
        backgroundColor: 'transparent',

    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_me: state.me,
    loading: state.trans_history_loading,
    r_history: state.trans_history,
    filter_option: state.filter_option
  }
}, mapDispatchToProps)(TransactionsList);