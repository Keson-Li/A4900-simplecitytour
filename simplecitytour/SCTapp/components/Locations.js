import React, { Component } from 'react';
import PropTypes, { array } from 'prop-types';
import CallBackend from './CallBackend';
import Storage from './StorageControl';
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

  constructor(props) {
    super(props);
    this.state = { 
      imgURL: {},
      // cityName: "none",
      // numPoints: "none",
      allLocations:"",
      ready: false,
    };
    navigate = this.props.navigation.navigate;
  }

  componentDidMount () {
    this.get_imgs();
  }

	static navigationOptions = {
		title: 'Locations',
  };

  async get_imgs(){
    await Storage.getItem('allLocations').then((locations) =>{
      this.state.allLocations =JSON.parse(locations);

    },(err) =>{
      console.log("Get locations error.")
    })
    var allCities = this.state.allLocations;

    allUri = {};
    for (var key in allCities) {
      // this.state.cityName = key;
      
      await Storage.getItem(key).then((value) => {
        allUri[key] = value;
      },(err) =>{alert('err')})

    }
    this.setState({
      imgURL:allUri,
      ready: true
    })


  }

  format_name(name){
    if (name.includes(',')){
      index = name.indexOf(',');
      return name.substring(0,index)
    }
    return name
  }


  renderCities() {
    var allCities = this.state.allLocations;
    i = 0;
    all_name_point= []; 
    name_point_dict = {};

    for (var name in allCities) { 
      name_point_dict = {};
      name_point_dict["id"] = i++;
      name_point_dict["name"] = name;
      name_point_dict["point"] = allCities[name][0];
      all_name_point.push(name_point_dict);
    }

    items = all_name_point.map((item) =>{
      return (
        // <TouchableHighlight underlayColor="gray" key={item.id} onPress={() =>  navigate('PreviewCity', {cityName: item.name, numPoints:item.point})}>
        <TouchableHighlight underlayColor="gray" key={item.id} onPress={() =>  navigate('Points')}>
            <View style={styles.box}>
                <Image style={{
                    // flex: 1,
                    height:Dimensions.get('window').width/3,
                    width:Dimensions.get('window').width/2-6,
                    // justifyContent: "flex-start",
                    // position: "absolute"
                  }} source={{uri:"data:image/jpg;base64,"+this.state.imgURL[item.name]}}>
                </Image>
              <View style={styles.container2}>
                <Text style={{color: "black", fontSize: 20, alignSelf:'center'}}>{this.format_name(item.name)}</Text>  
                <Text><Text style={{color: 'red'}}>{item.point}</Text> POI</Text>
                {/* <Text style={{
            color: "white", fontSize: 32
            }}>{item.point}</Text> */}
              </View>
            </View>
        </TouchableHighlight>
      )
    });


    if (this.state.ready){
      return (
        <View style={styles.container}>
          
          {items}
        </View>
      ); 

    }
        
  }


	render() {
		return (
			<ScrollView style={styles.scrollContainer}>
          { this.renderCities()}  
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
    backgroundColor:'#E3E3E3',
  },

  container:{
  	flex:1,
  	flexDirection: "row",
  	flexWrap: "wrap",
  	padding: 2,
  },

  box:{
    margin: 2,
    borderColor:'black',
    borderWidth: 1,
    // marginBottom:20,
  	width:Dimensions.get('window').width/2-6,
  	height: Dimensions.get('window').width/2-6,
  	// justifyContent: "flex-start",
  	alignItems: "center",
    // backgroundColor: "black",
    overflow: "hidden"
  },
  container2: {
    // flex:1,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor:'#c9c9c9',
    width: Dimensions.get('window').width/2-6,
    height:Dimensions.get('window').width/2-6 - Dimensions.get('window').width/3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});