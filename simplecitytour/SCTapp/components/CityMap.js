import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { AnimatedRegion, Marker, Polygon } from 'react-native-maps';
import AudioContorler from './AudioControl';
    
    
export default class CityMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 40.730610,
                latitudeDelta: 0.2729186541296684,
                longitude: 	-73.935242	,
                longitudeDelta: 0.26148553937673924,
            },
            position: {
                latitude: 40.730610,
                latitudeDelta: 0.2729186541296684,
                longitude:  -73.935242  ,
                longitudeDelta: 0.26148553937673924,
            }
        };
        this.onRegionChange = this.onRegionChange.bind(this);
        console.log(this.props);
    }
    
    componentDidMount () {
        // AudioContorler.play("hi");
      }
    

    onRegionChange(region){
        console.log(region);
        this.setState({
            region
        });
    }

    render() {
        return (
            <View style = {{flex:1}}>
                <View style = {{flex:1}}>
                    <MapView
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}
                        style={styles.map}
                    >
                    <Marker.Animated
                        ref={marker => { this.marker = marker }}
                        coordinate={this.state.position}
                    />
                    </MapView>
                </View>
                <View>
                    <AudioContorler/>
                </View>
            </View>
        );
    }
}   
    
const styles = StyleSheet.create({
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute"
    },
})  