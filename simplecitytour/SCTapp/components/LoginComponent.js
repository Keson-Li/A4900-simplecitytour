


// keson: how to guarantee confirm password are the same one

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text,
		 View, 
		 StyleSheet,
		 Button,
		 TextInput,
		 Image,
		 Dimensions,
		 ListView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export default class CreateAccount extends Component {
	constructor(props) {
		super(props);
    	this.state = { 
			username: "keson",
			password: "Pa$$w0rd",
			hidePass: false,
			textColor: "gray",
			screenwidth: Dimensions.get('window').width
		};

		this.login = this.login.bind(this);

	};
	  
	

	static navigationOptions = {
		title: 'LOG IN',
	};
	

	login() {
		url = "http://192.168.1.79:8000/api/login/";
		data = {"username":this.state.username,"password":this.state.password};
		// console.log(JSON.stringify(data)); 	  
		fetch(url, {
		  headers: {'Content-Type': 'application/json',},
		  body: JSON.stringify(data),
		  method: 'POST',
		}).then((response) => {
            console.log(JSON.parse(response._bodyText));
            if (typeof JSON.parse(response._bodyText)["non_field_errors"] != "undefined") {
                if (JSON.parse(response._bodyText)["non_field_errors"][0] === "Unable to log in with provided credentials."){
                    alert("Invaild username or password.")
                }
             }

             if (typeof JSON.parse(response._bodyText)["token"] != "undefined") {
                 token = JSON.parse(response._bodyText)["token"];
                 console.log(token);

                alert("Login Successfully.")
             }

			if (JSON.parse(response._bodyText)["token"] === "created"){
				alert("Successfully Signup.")
			}

			// console.log(JSON.parse(response._bodyText));
			// if (response.data["token"]):
			// 	token = response.data["token"]
			// 	console.log(token)
			// navigate('Locations');
			return
		}, (err) => { 
			console.error(err)
		});
	}

	_setPassword(password){
		this.state.textColor="black";
		this.setState({password});
		this.state.hidePass = true;
	}

	_showPassword(){
		this.state.hidePass = false;
		this.setState(this.state);
	}

	_hidePassword(){
		this.state.hidePass = true;
		this.setState(this.state);
	}	

	render() {
		const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
			 <Image  style={{
        		  flex: 1,
        		  position: "absolute"
        		}}source={require('../pictures/hiking.jpg')}> 	
				
			</Image>



				<View style={styles.container}>
					<Text>Login</Text>

					<View style={{flexDirection:"row",}}>
					<Icon style={styles.searchIcon} name="user" size={30} color="white" />
						<View style={{flex:1,}}>
							<TextInput
					        	style={{
									  justifyContent: 'flex-start', backgroundColor: "white", textAlign: "left", paddingLeft: 20, margin: 20,
									}}
					        	onChangeText={(username) => this.setState({username})}
					        	value={this.state.username}
					        	selectTextOnFocus={true}
					      	/>
				      	</View>
			      	</View>


		      	<View style={{flexDirection:"row",}}>
		      		<Icon style={styles.searchIcon} name="lock" size={35} color="white" />
			      	<View style={{flex:1}}>
					<TextInput
			        	style={styles.textboxpass}
			        	onChangeText={(password) => {this._setPassword(password);}}
			        	value={this.state.password}
			        	selectTextOnFocus={true}
			        	secureTextEntry = {this.state.hidePass}
			      	/>
			      	</View>
		      	</View>

		      	<View style={{margin: 20}}>
					<Icon.Button name="eye"  disabled={!this.state.hidePass} backgroundColor="#3b5998" onPressIn={() => {this._showPassword()}} onPressOut={() => {this._hidePassword()}}>
						Show Password
					</Icon.Button> 
				</View>

				<View style={{margin: 20}}>
				<Icon.Button name="user-plus" backgroundColor="#00ff66" onPress={() =>{this.login()}}>
					Login
				</Icon.Button> 
				</View>

		      	</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },	

  textbox:{
  	height: 30,
  	backgroundColor: "white",
  	textAlign: "right",
  	paddingRight: 20,
  	margin: 20,
  	color: "gray"
  },

  textboxpass:{
  	height: 30,
  	backgroundColor: "white",
  	textAlign: "left",
  	paddingLeft: 20,
  	margin: 20, 
  	color: "gray"
  },  

searchIcon: {
    padding: 10,
    marginTop: 10,
},
});