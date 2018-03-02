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

export default class PreviewCity extends Component {


	static navigationOptions = {
		title: 'New York, New York, USA ',
	};


	render() {
		const {navigate} = this.props.navigation;
		return (
      <TouchableHighlight onPress={() => navigate('CityMap')}>
      <View style={styles.box}>
      <Image style={{
                    flex: 1,
                    position: "absolute",
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height/3
                  }}source={require('../pictures/newyork.jpg')}>
      </Image>
      </View>
      </TouchableHighlight>

		)
	}
}

const styles = StyleSheet.create({
  box:{
    margin: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
    justifyContent: "center",
    alignItems: "center",
  },
});