import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';

const Permissions = require('react-native-permissions');

export default class GPSComponent extends Component {
    constructor (){
        super();
        this.state = {
            locationPermission: 'unknown',
            position: 'unknown'
        }
    }

    _requestPermission(){
        Permissions.request('location')
            .then(response => {
                this.setState({
                    locationPermission: response
                })
                console.log("Response: " + response);
            });
    }

    componentDidMount(){
        console.log('Start');
        this._requestPermission();
        console.log('Check position');
        navigator.geolocation.getCurrentPosition((position) => {
            let myPosition = JSON.stringify(position);

            console.log('My position:' + myPosition);
            this.setState({
                position: myPosition
            })
        },

        (error) => alert(JSON.stringify(error)));
    }

    render(){
        return(
        <View style={styles.container}>
            <Text style={styles.paragraph}>POSITION: {this.state.position}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center'
    }
})