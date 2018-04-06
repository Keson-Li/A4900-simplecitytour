import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity,Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreenComponent extends Component {

    static navigationOptions = {
        title: 'Simple City Tour',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <Image
                    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height/2.5, marginBottom: 20}}
                    source={require('./img/tour.jpeg')} 
                />

                <Text style={{fontWeight: 'bold', fontSize: 25}}>
                    Welcome to Simple City Tours!
                </Text>
                <Text style={{fontSize: 15, marginBottom: 10, padding: 5}}>
                    Our goal is to make a city that is simple enough to enjoy because you will be able to explore each city just a little bit more. 
                </Text>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigate('Locations')} 
                >
                <Text style={{fontWeight: 'bold', fontSize: 20}}> TOUR LOCATIONS </Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigate('Signup')}
                >
                <Text style={{fontWeight: 'bold', fontSize: 20}}> SIGN UP </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigate('Login')}
                >
                <Text style={{fontWeight: 'bold', fontSize: 20}}> LOG IN </Text>
                </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'yellow',
        padding: 25,
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius:20,
  },
});