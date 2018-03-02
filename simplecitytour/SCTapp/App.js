import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreenComponent from './components/MainScreenComponent'
import TourLocationsComponent from './components/TourLocationsComponent'
import SignupComponent from './components/SignupComponent'
import LoginComponent from './components/LoginComponent'
import Locations from "./components/Locations";
import PreviewCity from "./components/PreviewCity";
import CityMap from "./components/CityMap";


export const SimpleCityTours = StackNavigator({
    Home: {screen: MainScreenComponent},
    // TourLocations: {screen: TourLocationsComponent},
    // Signup: {screen: SignupComponent},
    Login: {screen: LoginComponent},
    Signup: {screen: SignupComponent},
    Locations:{ screen: Locations},
    PreviewCity:{screen: PreviewCity},
    CityMap:{screen: CityMap} 
},
// {headerMode: 'screen'}
);

export default class App extends Component {
    render() {
        return (
            <SimpleCityTours/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});