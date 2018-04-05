// when no point info in alllocation--JSON.parse(locations)[name][2] = "undefined"->this.state.points will be undefined
// when 0 point in backend

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ScrollView,Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, Dimensions, ListView, TouchableHighlight,ActivityIndicator } from 'react-native';

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
            cityDesc:'',
            cityimg:'',
            isLogin:false,
            hasnetwork:true,
            isReady:false,
            points:null,
            isReady:false,

        };
        this.navigate = this.props.navigation.navigate;
        this.get_points = this.get_points.bind(this);
        this.renderPoints = this.renderPoints.bind(this);

    };

    static navigationOptions = {
        title: 'Points',
    };

    componentDidMount () {
        console.log('Opening point page......');
        inPointPage = true;
        this.get_points();
    }

    componentWillUnmount(){
        console.log('Leaving point page......');
        inPointPage = false;
    }

    async get_points(){
        name = this.props.navigation.state.params.cityName;
        await Storage.getItem('allPoints').then((points) =>{
            if(points){
                if(inPointPage && JSON.parse(points)[name] != "undefined"){
                    this.setState({
                        points:JSON.parse(points)[name],
                        isReady: true,
                    })
                }
            }
    
        },(err) =>{
          console.log("Get description error.")
        });
    }

    renderPoints(){
        let {points} = this.state;
        items = points.map((item) =>{
            return (
              <TouchableHighlight underlayColor="gray" key={item.name} onPress={() =>  navigate('PreviewCity', {cityName: this.props.navigation.state.params.cityName, cityDesc:this.props.navigation.state.params.cityDesc})}>
                  <View style={{flex:1,flexDirection: "row", borderColor:'black',borderWidth: 1,}}>
                      <Image style={{
                          // flex: 1,
                          height:Dimensions.get('window').width/4,
                          width:Dimensions.get('window').width/4,
                          // justifyContent: "flex-start",
                          // position: "absolute"
                        }} source={{uri:"data:image/jpg;base64,"+item.img}}>
                      </Image>
                    <View style={styles.pointName}>
                      <Text adjustsFontSizeToFit={false} style ={{fontSize:20}}>{item.name}</Text>
                    </View>
                  </View>
              </TouchableHighlight>
            )
        });


        return (
            <View style={styles.container}>
                {items}
            </View>
        );
    }

    render() {
		return (
			<ScrollView style={styles.scrollContainer}>
          { this.state.isReady &&this.renderPoints()}
          {!this.state.isReady && <View style={{alignItems:'center', top:Dimensions.get('window').height/2 - 100}}>                    
                                    <ActivityIndicator size="large"/>
                                </View>}  
			</ScrollView>
		)
	}

}

const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1,
        backgroundColor:'#E3E3E3',
      },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    pointName: {
        width:Dimensions.get('window').width/4 * 3,
        marginLeft:10,
        justifyContent: 'center',
    },
})