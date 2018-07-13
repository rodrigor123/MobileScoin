// import libraries
import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, StyleSheet, WebView, Image, Platform, Dimensions, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Container, Content, Button, Footer } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions'
// import components
import HeaderView from '../common/HeaderView';
import Loading from '../common/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox'
import HTMLView from 'react-native-htmlview';
// import config
import texts from '../../config/texts';
import TextInputWithIcon from '../common/TextInputWithIcon';
import DOBInput from '../common/DOBInput';
import MyButton from '../common/ActionButton'
import * as ACTIONS from '../../config/actions';


const Width = Dimensions.get('window').width;

class HELP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props.category
        }
    }

    componentDidMount() {
        //this.props.loadTermsHTML(this.state.category)
        let title = 'FAQ'
        if(this.state.category == 'legal') title = 'Legal / Privacy'
        else if(this.state.category == 'terms') title = 'Terms of Services'
        this.setState({title})
    }

    static propTypes = {
        onPressBack: PropTypes.func.isRequired,
        onPressSend: PropTypes.func.isRequired,
        category: PropTypes.string.isRequired
    }

    static defaultProps = {
        onPressBack: () => undefined,
        onPressSend: () => undefined,
    }

    render() {
        const _this = this
        const {category} = this.state
        let URL = ''
        if(category == 'faq') URL = ACTIONS.URL_FAQ
        else if(category == 'terms') URL = ACTIONS.URL_TERMS_OF_SERVICE
        else if(category == 'legal') URL = ACTIONS.URL_LEGAL_PRIVACY
        return (
            <Container>
                <Loading />
                <HeaderView
                    text={this.state.title}
                    showAction={false}
                    showBackButton={true}
                    backClickHandler={() => {
                        if(this.props.r_me.token == undefined) Actions.pop()
                        else this.props.onPressBack()
                    }}
                />
                <WebView
                    source={{uri: URL}}
                    style={{marginTop: 20}}
                />
            </Container>
        );
    }
}


const css = StyleSheet.create({
    h2: {
      color: colors.orange,
      fontWeight: 'bold',
      fontSize: 16
    },
    p: {
      color: '#a9a9a9',
      lineHeight: 20
    },
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
});

const styles = StyleSheet.create({
    mainView: {
        borderTopWidth: 1,
        borderColor: colors.gray,
        marginHorizontal: -20,
        padding: 20,
        marginTop: 20,
        flex: 1
    },
    title: {
        color: colors.orange,
        fontSize: 16,
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
    termsScrollView: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {   
    termsHTML: state.termsHTML,
    r_me: state.me
  }
}, mapDispatchToProps)(HELP);