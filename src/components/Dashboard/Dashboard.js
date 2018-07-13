// import libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
import { View, Text, Animated, Modal, StyleSheet, ListView, Image, Platform, ScrollView, RefreshControl } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
// import components
import HeaderView from '../common/HeaderView';
import Loading from '../common/Loading';
import FooterView from '../common/FooterView';
import MenuNav from '../common/MenuNav';
import TrendView from '../common/TrendView';
import TransactionsList from '../Transaction/TransactionsList';
import AccountSaving from '../common/AccountSaving';
import ProfileLogo from './ProfileLogo';
import TransactionsEmpty from '../Transaction/TransactionsEmpty';
import QRCodeView from '../More/QRCodeView';
import QRIcon from '../common/QRIcon';
import colors from '../../config/colors';
import * as Operator from '../../config/operator'
const transactions = [
    {
        title: 'Transaction 1',
        subtitle: 'transaction 1 details',
        date: '5/12',
        status: 'completed',
        value: 0.86
    },
    {
        title: 'Transaction 2',
        subtitle: 'transaction 2 details',
        date: '5/14',
        status: 'completed',
        value: -2.13
    },
    {
        title: 'Transaction 3',
        subtitle: 'transaction 3 details',
        date: '5/17',
        status: 'failed',
        value: -1.89
    },
    {
        title: 'Transaction 4',
        subtitle: 'transaction 4 details',
        date: '5/18',
        status: 'completed',
        value: -0.07
    },
    {
        title: 'Transaction 5',
        subtitle: 'transaction 5 details',
        date: '5/18',
        status: 'failed',
        value: 1.55
    },
    {
        title: 'Transaction 6',
        subtitle: 'transaction 6 details',
        date: '5/22',
        status: 'pending',
        value: 3.09
    },
    {
        title: 'Transaction 7',
        subtitle: 'transaction 7 details',
        date: '5/27',
        status: 'completed',
        value: -1.18
    },
    {
        title: 'Transaction 8',
        subtitle: 'transaction 8 details',
        date: '5/28',
        status: 'failed',
        value: 4.88
    },
    {
        title: 'Transaction 9',
        subtitle: 'transaction 9 details',
        date: '5/31',
        status: 'pending',
        value: -0.05
    },
    {
        title: 'Transaction 10',
        subtitle: 'transaction 10 details',
        date: '6/1',
        status: 'completed',
        value: 1.17
    },
    {
        title: 'Transaction 11',
        subtitle: 'transaction 11 details',
        date: '6/2',
        status: 'pending',
        value: 0.86
    },
]
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showAccountView: true,
            showQRIcon: true,
            loading: true,
            refreshing: false
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    static propTypes = {
        onPressQRIcon: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressQRIcon: () => undefined,
    }

    componentDidMount(){
        this.mounted = true
    }

    componentWillUnmount() {
        this.mounted = false
    }

    componentWillReceiveProps(props){
        switch(props.action){
            case 'scan_success':
                Operator.MyAlert('Dashboard', props.result.data)
                break
        }
    }

    _onRefresh() {
        const _this = this
        this.setState({refreshing: true})
        this.props.a_getTransaction(this.props.r_me, this.props.r_history, 1)
        setTimeout(() => {
            _this.setState({refreshing: false})
        }, 1000)
    }

    handleScroll(event) {
        if(event.nativeEvent.contentOffset.y >= 150 && this.state.showQRIcon) this.setState({showQRIcon: false})
        else if(event.nativeEvent.contentOffset.y < 150 && !this.state.showQRIcon) this.setState({showQRIcon: true})
        else if(event.nativeEvent.contentOffset.y >= 220 && this.state.showAccountView) this.setState({showAccountView: false})
        else if(event.nativeEvent.contentOffset.y < 200 && !this.state.showAccountView) this.setState({showAccountView: true})
    }

    filterHistory(data){
        const _this = this
        let temp = []
        data.map(function(item, index){
            if(item.transfertype !== 'STORE-TO-SCOIN' && item.metadata.fromuserid != _this.props.r_me.userId) return
            const isDeposite = (item.transfertype == 'STORE-TO-SCOIN' || item.metadata.fundtype == 'deposit') ? true : false
            if(!isDeposite) return
            temp.push(item)
        })
        return temp
    }

    renderRow(transaction, sectionID, rowID, rowMap) {
        const { container, dateContainer, dateText, detailsContainer, detailsTitleText, detailsSubtitleText, trendContainer, trendStatusText } = styles;
        return (
            <View style={container}>
                <View style={dateContainer}>
                    <Text style={dateText}>{Operator.convertTransferDate(transaction.updatedTime)}</Text>
                </View>
                <View style={detailsContainer}>
                    <Text style={detailsTitleText}>{transaction.description}</Text>
                </View>
                <View style={trendContainer}>
                    <TrendView value={transaction.amount[0].value} />
                    <Text style={trendStatusText}>{transaction.status}</Text>
                </View>
            </View>
        )
    }

    render() {

        const user = this.props.user,
            hasData = true;

        return (
            <Container style={{backgroundColor: colors.lightGreen}}>
                <Loading />
                <HeaderView
                    showBackButton={false}
                    text='Dashboard'
                />
                {
                    this.state.showQRIcon == 1?
                    <QRIcon
                        onPress={() => {
                            this.props.onPressQRIcon()
                            Actions.qrcode()
                        }}
                        color='blue'
                        style={styles.qrIconStyle} />
                    :null
                }
                {
                    !this.state.showAccountView?
                    <AccountSaving
                        style={{zIndex: 1}}
                        isFixed={true}
                    />
                    :null
                }
                
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                            title='loading more history...'
                        />
                    }
                    onScroll={(e) => this.mounted && this.handleScroll(e)} scrollEventThrottle={16}
                >
                    <View style={styles.content}>
                        <ProfileLogo />
                        {
                            this.state.showAccountView?
                            <AccountSaving
                                isFixed={false}
                            />
                            :null
                        }
                        <Animated.View style={styles.transactionsContainer}>
                        {
                            this.props.loading && this.props.r_history.length == 0?
                            <View style={styles.loadingView}>
                                <View><Text style={styles.loadingText}>Loading transaction history...</Text></View>
                            </View>
                            :this.props.r_history.length == 0?
                            <ScrollView style={{flex: 1}}>
                                <Text style={styles.welcomeText}>Welcome to Scoin</Text>
                                <Text style={styles.description}>
                                
                                </Text>
                            </ScrollView>
                            :
                            <View>
                                <Text>RECENT ACTIVITY</Text>
                                <ListView                                    
                                    dataSource={ds.cloneWithRows(this.filterHistory(this.props.r_history))}
                                    renderRow={this.renderRow}
                                    enableEmptySections={true}
                                />
                            </View>
                        }
                            
                        </Animated.View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        transactionsContainer: {
            paddingTop: 15,
            paddingHorizontal: 10,
            zIndex: 0,
            backgroundColor: 'white'
        },
        qrIconStyle: {
            position: 'absolute',
            top: 70,
            left: 12,
            zIndex: 2,
            backgroundColor: 'transparent',
        },
        content: {
            backgroundColor: colors.lightGreen
        },
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
        loadingView: {
            flex: 1,
            paddingTop: 20,
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
    }
);

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    r_userData: state.userDataList,
    r_me: state.me,
    loading: state.trans_history_loading,
    r_history: state.trans_history
  }
}, mapDispatchToProps)(Dashboard);