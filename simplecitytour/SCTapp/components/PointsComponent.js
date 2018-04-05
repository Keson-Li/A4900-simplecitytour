import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, ListView, TouchableHighlight,ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import CallBackend from './CallBackend';
import Storage from './StorageControl';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const inPointPage= false;
export default class Points extends Component {
    constructor(props) {
		super(props);
    	this.state = { 
            lastuser:null,
            isLogin:false,
            hasnetwork:true,
            isReady:false,
            points:null,

        };
        this.navigate = this.props.navigation.navigate;
        this.get_points = this.get_points.bind(this);
        this.get_points = this.get_points.bind(this);

    };

    static navigationOptions = {
        title: 'Points',
    };

    componentDidMount () {
        console.log('Opening point page');
        inLoginPage = true;
        // this.get_points();
        this.getPoints();
    }

    componentWillUnmount(){
        inLoginPage = false;
    }

    async getPoints(){
        name = this.props.navigation.state.params.cityName;
        await Storage.getItem('allLocations').then((locations) =>{
          this.state.points =JSON.parse(locations)[name][3];
    
        },(err) =>{
          console.log("Get description error.")
        });
        console.log(this.state.points);
    }

    get_points() {
        user_login = this.state.username;
		path ='/api/get_points/';
		url = IP +path;
        // data = {"location":'Vancouver'};
        data={};
        console.log('Getting points from server');
		CallBackend.post_auth(path, data).then((fetch_resp) =>{
            console.log('retrieved info');
			if (fetch_resp[0]){
                response = fetch_resp[1];
                if(response === 'No Stored Token'){
                    this.setState({
                        isLogin: false,
                        isReady: true,
                    })
                    alert('User Not Login');
                
                }else{                    
                    if (typeof JSON.parse(response._bodyText)['detail'] != "undefined") {
                        if(JSON.parse(response._bodyText)['detail'] == 'Signature has expired.'){
                            this.setState({
                                isLogin: false,
                                isReady: true,
                            })
                            console.log(JSON.parse(response._bodyText)['detail']);
                            alert('Login expired');
                        }   
                    }else{ 
                        if(typeof JSON.parse(response._bodyText) != "undefined") {
                        

                            // console.log(JSON.parse(response._bodyText));

                            // Storage.saveItem("pointSequence", JSON.parse(response._bodyText)['pointSequence']);
                            allPoints      =    JSON.parse(response._bodyText);
                            delete allPoints['pointSequence'];
                            Storage.getItem('allLocations').then((locations) => {

                                allCities = JSON.parse(locations);

                                for(var key in allCities){
                                    allCities[key].push(allPoints[key]);
                                }
                                Storage.saveItem("allLocations", JSON.stringify(allCities));
                            },(err) =>{alert('err')});
                        }
                    }
                }
                
			}else{
				err = fetch_resp[1];
				if (err.message = 'Network request failed'){
					alert('Network failed.')
				} else{
					alert("Login failed.")
				}
			}

		},(err) =>{
                console.log(err.message);
				alert("Internal error.");		
        });
    }


    render() {

         return(
            <View style={{alignItems:'center', top:Dimensions.get('window').height/2 - 100}}>
                <Text style = {{fontSize:50}}>LOADING....</Text>                      
                <ActivityIndicator size="large"/>
            </View>
        )     
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        // position:"relative",
        // left:50,
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
    },
    button: {
        top:Dimensions.get('window').width/3 + 140,
        backgroundColor: 'yellow',
        padding: 25,
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius:20,
        alignItems:'center',
  },
})