import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import AudioContorler from './AudioControl';
import Storage from './StorageControl';
import { Components } from 'expo';
import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
var inMapPage=false;
export default class screens extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      imgURL: {},
      cityName: "none",
      points: "none",
      isPointReady: false,
      allLocations:"",
      isReady: false,
      // region:{},
      region:{
        latitude: 49.2827,
        longitude: -123.1207,
        latitudeDelta: 0.1,
        longitudeDelta: 0.040142817690068,
      },
      isReginReady:false,
      markers:[],

      currentIndex:0,
    };
    this.animation = new Animated.Value(0);

    navigate = this.props.navigation.navigate;
    this.animation_config = this.animation_config.bind(this);
    this.get_points = this.get_points.bind(this);

  }
    
  componentDidMount() {
    console.log('Opening map page......');
    inMapPage=true;
    this.animation_config();
    this.get_points();
  }
  componentWillUnmount(){
    console.log('Leaving map page......');
    inMapPage = false;
    
}

  async get_points(){
    name = this.props.navigation.state.params.cityName;
    console.log('city name is : ' + name);
    await Storage.getItem('allLocations').then((locations) =>{
      // not going into this block before updating backend
      if(locations){
        if(inMapPage){
          lat=JSON.parse(locations)[name][1];
          lng=JSON.parse(locations)[name][2];
          // console.log('the region is ');
          // console.log(JSON.parse(locations)[name][1]);
          // console.log(typeof JSON.parse(locations)[name]);
          this.setState({
            region:{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.1,
              longitudeDelta: 0.040142817690068,
            },
            isReginReady:true,
          })
        }
      }

    },(err) =>{
      console.log("Get city GPS location... error.")
    })

    await Storage.getItem('allPoints').then((points) =>{
        if(points){
            if(inMapPage && JSON.parse(points)[name] != "undefined"){
              allPoints= JSON.parse(points)[name];
              allMarks=[];
              allPoints.map((item) =>{
                oneMark={
                  coordinate: {
                    latitude: item.lat,
                    longitude: item.lng,
                  },
                  title: item.name,
                  description: item.description,
                  image: item.img,
                  radius:item.radius,
                }

                allMarks.push(oneMark);

              })

              this.setState({
                markers:allMarks,
                isPointReady: true,
              })
            }
        }

    },(err) =>{
      console.log("Get description error.")
    });
}

  animation_config(){
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.state.currentIndex !== index) {
          this.state.currentIndex = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

  }


  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [{ scale: interpolations[index].scale,},],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [{ nativeEvent: {contentOffset: {x: this.animation}}}],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}>

            {this.state.markers.map((marker, index) => (
              <View style={styles.card} key={index}>
                <Image
                  // source={marker.image}
                  source={{uri:"data:image/jpg;base64,"+marker.image}}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                </View>
              </View>
            ))}

        </Animated.ScrollView>
        <AudioContorler/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});