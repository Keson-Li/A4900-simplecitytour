import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreenComponent extends Component {

    static navigationOptions = {
        title: 'Simple City Tour',
    };


    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.search_post = this.search_post.bind(this);
    }

    search() {
        console.log('searching from django49');
    
        fetch('http://192.168.1.75:8000/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'credentials': 'same-origin',
          },
          // body: JSON.stringify({'id':'0216','title':'bcit','code':'react-client','linenos':'n/a','language':'javascript','style':'test'}),
            // body: {'original':'from react native'},
          method: 'GET',
            // credentials: 'include'
          credentials: 'same-origin',
        }).then((response) => {
            console.log(response);
            // console.log(JSON.parse(response._bodyText).hello);
            return
        }, (err) => { 
            console.error(err)
        });
    }

    
    
    search_post() {
      console.log('searching from django49');
    
      fetch('http://192.168.137.1:8000/a/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'credentials': 'same-origin',
        },
        body: JSON.stringify({'id':'0216','title':'bcit','code':'react-client','linenos':'n/a','language':'javascript','style':'test'}),
          // body: {'original':'from react native'},
        method: 'POST',
          // credentials: 'include'
        credentials: 'same-origin',
      }).then((response) => {
          console.log(response);
          // console.log(JSON.parse(response._bodyText).hello);
          return
      }, (err) => { 
          console.error(err)
      });
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <Image
                    style={{width: 500, height: 300, marginBottom: 20}}
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

                {/* <TouchableOpacity 
                style={styles.button}
                onPress={this.search}
                >
                <Text style={{fontWeight: 'bold', fontSize: 20}}> GET TEST </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button}
                onPress={this.search_post}
                >
                <Text style={{fontWeight: 'bold', fontSize: 20}}> POST TEST </Text>
                </TouchableOpacity> */}
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