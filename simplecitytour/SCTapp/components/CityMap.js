// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Text, View, StyleSheet } from 'react-native';
// import MapView, { AnimatedRegion, Marker, Polygon } from 'react-native-maps';
// import AudioContorler from './AudioControl';
    
    
// export default class CityMap extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             region: {
//                 latitude: 40.730610,
//                 latitudeDelta: 0.2729186541296684,
//                 longitude: 	-73.935242	,
//                 longitudeDelta: 0.26148553937673924,
//             },
//             position: {
//                 latitude: 40.730610,
//                 latitudeDelta: 0.2729186541296684,
//                 longitude:  -73.935242  ,
//                 longitudeDelta: 0.26148553937673924,
//             }
//         };
//         this.onRegionChange = this.onRegionChange.bind(this);
//         console.log(this.props);
//     }
    
//     componentDidMount () {
//         // AudioContorler.play("hi");
//       }
    

//     onRegionChange(region){
//         console.log(region);
//         this.setState({
//             region
//         });
//     }

//     render() {
//         return (
//             <View style = {{flex:1}}>
//                 <View style = {{flex:1}}>
//                     <MapView
//                         region={this.state.region}
//                         onRegionChange={this.onRegionChange}
//                         style={styles.map}
//                     >
//                     <Marker.Animated
//                         ref={marker => { this.marker = marker }}
//                         coordinate={this.state.position}
//                     />
//                     </MapView>
//                 </View>
//                 <View>
//                     <AudioContorler/>
//                 </View>
//             </View>
//         );
//     }
// }   
    
// const styles = StyleSheet.create({
//     map: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         position: "absolute"
//     },
// })  




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

import { Components } from 'expo';
import MapView from "react-native-maps";

const Images = [
  { uri: "https://i.imgur.com/e7NQgvC.jpg" },
  { uri: "https://i.imgur.com/dRk5pzD.jpg" },
  { uri: "https://i.imgur.com/egT3oY3.jpg" },
  { uri: "https://i.imgur.com/Xp8xlyr.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 49.2734,
          longitude: -123.1038,
        },
        title: "Scince World",
        description: "Point of Interest #1",
        image: Images[0],
      },
      {
        coordinate: {
          latitude: 49.2828,
          longitude: -123.1067,
        },
        title: "Gastown",
        description: "Point of Interest #2",
        image: Images[1],
      },
      {
        coordinate: {
          latitude: 49.2888,
          longitude: -123.1111,
        },
        title: "Canada Place",
        description: "Point of Interest #3",
        image: Images[2],
      },
      {
        coordinate: {
          latitude: 49.2699,
          longitude: -123.1248,
        },
        title: "False Creek",
        description: "Point of Interest #4",
        image: Images[3],
      },
    ],
    region: {
      latitude: 49.2827,
      longitude: -123.1207,
      latitudeDelta: 0.1,
      longitudeDelta: 0.040142817690068,
    },
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
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
        if (this.index !== index) {
          this.index = index;
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
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
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
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
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