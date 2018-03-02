import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text,
		 View, 
		 StyleSheet,
		 Button,
		 TextInput,
		 ScrollView,
		 ListView,
		 Dimensions,
		 Image,
     TouchableHighlight} from 'react-native';

export default class Locations extends Component {


	static navigationOptions = {
		title: 'Locations',
	};


	render() {
		const {navigate} = this.props.navigation;
		return (
			<ScrollView style={styles.scrollContainer}>

				<View style={styles.container}>
          <TouchableHighlight onPress={() => navigate('PreviewCity')}>
  					<View style={styles.box}>
  						  <Image style={{
        		  			flex: 1,
        		  			position: "absolute"
        					}}source={require('../pictures/newyork.jpg')}>
          			</Image>
          		<View style={styles.container2}>
          			<Text>New York</Text>
          		  <Text>51 Points</Text>
          		</View>
          	</View>
          </TouchableHighlight>
					<View style={styles.box}><Text>Box 2</Text></View>
					<View style={styles.box}><Text>Box 3</Text></View>
					<View style={styles.box}><Text>Box 4</Text></View>
					<View style={styles.box}><Text>Box 5</Text></View>
					<View style={styles.box}><Text>Box 6</Text></View>
					<View style={styles.box}><Text>Box 7</Text></View>
					<View style={styles.box}><Text>Box 8</Text></View>
				</View>

			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  scrollContainer:{
  	flex: 1,
  },

  container:{
  	flex:1,
  	flexDirection: "row",
  	flexWrap: "wrap",
  	padding: 2,
  },

  box:{
  	margin: 2,
  	width:Dimensions.get('window').width/3-6,
  	height: Dimensions.get('window').width/3-6,
  	justifyContent: "center",
  	alignItems: "center",
  	backgroundColor: "orange",
  },
  container2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});