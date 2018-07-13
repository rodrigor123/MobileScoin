// import libraries
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

class Loading extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const styleView = this.props.loading ? 2 : -1;
        if(this.props.loading){
            return (
                <View style={{position: 'absolute', top:0, left:0,right:0,bottom:0, alignItems: 'center', zIndex: styleView, justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
                    <Spinner color='#5195FF'/>
                </View>
            );
        }
        else{
            return null
        }
        
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(Loading);