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
     ActivityIndicator,
     TouchableOpacity} from 'react-native';

import Storage from './StorageControl';

export default class PreviewCity extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      imgURL: null,
      imgDescription: null,
      cityName: "none",
      numPoints: "none",
      imgReady:false,
  };
  navigate = this.props.navigation.navigate;
}

  componentDidMount(){
    this.get_img_desc();    
  }

  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `${state.params.cityName}`,
    };
  };

  async get_img_desc(){
    name = this.props.navigation.state.params.cityName;
    await Storage.getItem('allLocations').then((locations) =>{
      this.state.imgDescription =JSON.parse(locations)[name][1];

    },(err) =>{
      console.log("Get description error.")
    })

    await Storage.getItem(name).then((value) => {
      this.setState({
        imgURL:value,
        imgReady:true,
      })
    },(err) =>{
      console(err);
      alert('Error!');
    })
  }


	render() {
    const {navigate} = this.props.navigation;
    if (this.state.imgReady){
      return (
        <View>
          <View>
            <Image style={{
                        flex: 1,
                        position: "absolute",
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height/3
                      }} source={{uri:"data:image/jpg;base64,"+this.state.imgURL}} />
          </View>
          <View style = {{
                      flex:1,
                      position: "absolute",
                      top: Dimensions.get('window').height/3,
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height/3,
                      marginTop:5,
          }}>
            <Text style = {{
                          fontSize:20,
                          fontWeight: 'bold',
                          justifyContent: "center",
            }}>{this.state.imgDescription}</Text>
          </View>
  
          <View style={styles.buttonview}>
            <TouchableOpacity style={{
                                    backgroundColor: 'blue',
                                    borderRadius:20,
                                    padding: 25,
            }} onPress={() => navigate('CityMap')}>
              <Text style={{fontWeight: 'bold', fontSize: 50}}> START TOUR </Text>
            </TouchableOpacity>  
          </View>
        </View>
      )

    }else{
      return (
        <View style={{flex:1}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

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
  buttonview:{
    position: "absolute",
    top: Dimensions.get('window').height/3*2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/5,
    justifyContent: "center",
    alignItems: "center",
  },
});