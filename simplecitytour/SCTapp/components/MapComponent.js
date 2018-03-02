import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignupComponent extends Component {

    static navigationOptions = {
        title: 'SIGN UP',
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 53.726669,
                        longitude: -127.647621,
                        latitudeDelta: 0.0000,
                        longitudeDelta: 0.0000,
                    }}>
                      <MapView.Marker 
                        coordinate={{
                            latitude: 49.2827,
                            longitude: -123.1207
                        }}>

                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    map:{
        width: 500, 
        height: 300, 
        bottom: 100,
    }
});

