// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions'
import { Spinner, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

// import components
import TextWrapper from '../../common/TextWrapper';
import LabeledTextInputWithIcon from '../../common/LabeledTextInputWithIcon';
import SmallActionText from '../../common/SmallActionText';
import LoginFooterButtons from '../../common/LoginFooterButtons';
import MyButton from '../../common/ActionButton'


class BankStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
        onPressEdit: PropTypes.func.isRequired,
        onPressConfirm: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onPressEdit: () => undefined,
        onPressConfirm: () => undefined
    }

    render() {

        return (
            <Content contentContainerStyle={styles.contentView}>
                <ScrollView style={{flex: 1}}>
                    <Text style={styles.labelText}>Transferring</Text>
                    <Text style={[styles.bigText, {fontWeight: 'bold', marginTop: 10}]}>Wells Fargo</Text>
                    <Text style={styles.bigText}>XXXX 9632</Text>
                    <Text style={[styles.bigText, {marginVertical: 20, fontWeight: 'bold'}]}>$ 20.00</Text>
                    <View style={styles.aboutView}>
                        <Text style={styles.aboutText}>
                            Copyrights 2017
                        </Text>
                    </View>
                    <MyButton text='Edit' type='border' onPress={() => this.props.onPressEdit()} />
                    <MyButton text='Confirm' type='solid' onPress={() => this.props.onPressConfirm()} />
                </ScrollView>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    labelText: {
        marginTop: 20,
        color: colors.text,
        fontSize: 16,
        paddingHorizontal: 10
    },
    bigText: {
        fontSize: 28,
        color: colors.darkGray,
        paddingLeft: 20,
        paddingVertical: 5
    },
    aboutView: {
        borderTopWidth: 1,
        borderColor: colors.gray,
        marginHorizontal: -15,
    },
    aboutText: {        
        fontSize: 12,
        color: colors.gray,
        padding: 20,        
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   

  }
}, mapDispatchToProps)(BankStep2);