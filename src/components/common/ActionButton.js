//import libraries
import React, { Component, PropTypes } from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import colors from '../../config/colors'
import Button from 'apsl-react-native-button';

class MyButton extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        style: PropTypes.object,
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isLoading: PropTypes.bool,
        onPress: PropTypes.func.isRequired
    }

    static defaultProps = {
        onPress: () => undefined
    }

    render() {
        let buttonStyle, textStyle
        switch(this.props.type){
            case 'border':
                buttonStyle = {
                    borderWidth: 2,
                    borderColor: colors.blue,
                    backgroundColor: 'white',
                }
                textStyle= {
                    textAlign: 'center',
                    color: colors.blue,
                    fontSize: 18,
                    padding: 10
                }
                break
            case 'solid':
                buttonStyle = {
                    borderWidth: 0,
                    backgroundColor: colors.blue,
                }
                textStyle= {
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 18,
                    padding: 10
                }
                break
            case 'transparent':
                buttonStyle = {
                    backgroundColor: 'transparent',
                }
                textStyle= {
                    textAlign: 'center',
                    color: colors.blue,
                    fontSize: 18,
                    padding: 10
                }
                break
        }
        return (
            <View style={[styles.defaultStyle, buttonStyle, this.props.style]}>
                <Button 
                    style={styles.button}
                    isDisabled = {this.props.isLoading}
                    isLoading = {this.props.isLoading}
                    activityIndicatorColor = 'white'
                    onPress={() => this.props.onPress()}>
                    <Text style={textStyle}>{this.props.text}</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        width: null,
        height: 45,
        borderRadius: 6, 
        marginVertical: 10, 
    },
    button: {
        borderWidth: 0,
        flex: 1,
        marginBottom: 0,
    }
})



export default MyButton;