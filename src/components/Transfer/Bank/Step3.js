// import libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Platform  } from 'react-native';
import { Container, Content } from 'native-base';
import TextInputWithIcon from '../../common/TextInputWithIcon';
import LoginFooterButtons from '../../common/LoginFooterButtons';
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../../../config/colors'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'


class BankStep3 extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static propTypes = {
        onPressDone: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressDone: () => undefined,
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Transfer Completed</Text>
                <Text style={styles.subTitle}>
             
                </Text>
                <Text style={styles.subTitle}>
             
                </Text>
                
                <View style={styles.priceContainer}>
                    <View style={styles.centerView}>
                        <Text style={styles.bigText}>Wells Fargo</Text>
                        <Text style={styles.bigText}>XXXX 9632</Text>
                        <Text style={[styles.bigText, {marginTop: 20}]}>$ 20.00</Text>
                    </View>
                    <View style={styles.centerView}>
                        <View style={styles.checkIcon}>
                            <Icon name='check' size={60} color={colors.green} />
                        </View>  
                    </View>                  
                </View>
                <LoginFooterButtons
                    style={styles.DoneButton}
                    actionText="Done"
                    hideCancel={true}
                    onActionPress={() => this.props.onPressDone()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1, 
            backgroundColor: 'white',
            padding: 30
        },
        title: {
            fontSize: 28,
            color: colors.text,
            backgroundColor: 'transparent'
        },
        subTitle: {
            fontSize: 12,
            color: colors.text,
            backgroundColor: 'transparent',
            marginTop: 20
        },
        centerView: {
            justifyContent: 'center'
        },
        bigText: {
            fontSize: 26,
            padding: 5
        },
        priceContainer: {
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1
        },
        priceText: {
            fontSize: 25,
            fontWeight: 'bold',
        },
        DoneButton: {
        },
        checkIcon: {
            width: 100,
            height: 100,
            padding: 20,
            backgroundColor: colors.lightGreen,
            borderRadius: Platform.OS == 'ios' ? 50 : 100
        }

    }
)

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   

  }
}, mapDispatchToProps)(BankStep3);
