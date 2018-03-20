import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignupComponent extends Component {

    static navigationOptions = {
        title: 'SIGN UP',
    };
    render() {
        return (
            <View>
            	<TextInput style = {styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next"
            placeholder='Email or Mobile Num'
            placeholderTextColor='rgba(225,225,225,0.7)'/>

<TextInput style = {styles.input}
            returnKeyType="go"
            placeholder='Password'
            placeholderTextColor='rgba(225,225,225,0.7)'
            secureTextEntry/>

<TouchableOpacity style={styles.buttonContainer}
            onPress={onButtonPress}>
             <Text  style={styles.buttonText}>LOGIN</Text>
</TouchableOpacity> 


            </View>
        );
    }
}