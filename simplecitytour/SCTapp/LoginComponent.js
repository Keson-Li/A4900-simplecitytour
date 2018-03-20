import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, ListView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';


export default class LoginComponent extends Component {

    static navigationOptions = {
        title: 'LOGIN',
    };
    render() {
        return (
            <View style={styles.container}>
<TextInput  style = {styles.input}
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next"
            placeholder='Account'
            placeholderTextColor='black'/>


<TextInput  style = {styles.input}
            returnKeyType="go"
            placeholder='Password'
            placeholderTextColor='black'
            secureTextEntry/>


<Text style= {styles.fgpw}>Forget Password?</Text>

<TouchableOpacity style={styles.buttonContainer}>
             <Text  style={styles.buttonText}>GO > </Text>
</TouchableOpacity> 

 </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        margin: 10,
        paddingLeft: 20,
        padding: 10,
        color: 'grey'

    },
    fgpw: {
        padding: 10,
        textAlign: 'right',

    },
    buttonContainer: {
        backgroundColor: 'grey',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
})