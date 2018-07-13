// import libraries
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Content, Button, Footer } from 'native-base';

// import components
import HeaderView from '../common/HeaderView';
import FooterView from '../common/FooterView';
import TextWrapper from '../common/TextWrapper';
import MenuNav from '../common/MenuNav';
import SubHeader from '../common/SubHeader';
import Loading from '../common/Loading';

// import config
import texts from '../../config/texts';

const pageText = texts.login;

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, children, index } = this.props;

        const StepComponent = children[index].component;
        const pageKey = children[index].text;
        const { step, maxSteps } = children[index];

        return (
            <Container>
                <Loading />
                <HeaderView
                    text={title}
                />
                <SubHeader
                    text={children[index].title}
                    rightText={step > 0 ? "Step " + children[index].step + " of " + maxSteps : ""}
                />
                <StepComponent
                    pageText={pageText[pageKey]}
                    nextScene={children[index].nextScene || 'loginOTP'}
                />
            </Container>
        );
    }
}

export default Login;