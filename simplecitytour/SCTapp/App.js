import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreenComponent from './components/MainScreenComponent'
import TourLocationsComponent from './components/TourLocationsComponent'
import SignupComponent from './components/SignupComponent'

import LoginComponent from './LoginComponent'

import Locations from "./components/Locations";
import PreviewCity from "./components/PreviewCity";
import CityMap from "./components/CityMap";
import PreDownload from "./components/PreDownload";
import Storage  from "./components/StorageControl";
import PreCkeck from './components/PreCheck';
import AudioControl from './components/AudioControl';



export const SimpleCityTours = StackNavigator({
    Home: {screen: MainScreenComponent},
    Login: {screen: LoginComponent},
    Signup: {screen: SignupComponent},
    Locations:{ screen: Locations},
    PreviewCity:{screen: PreviewCity},
    CityMap:{screen: CityMap} ,
},

);

export default class App extends Component {
    componentDidMount(){
        PreCkeck.checkUpdate();
        Storage.getallkey();
        this.updatecheck();
    }

    async updatecheck(){
        await Storage.getItem('citySequence').then((value) => {
            if (value === null){
                console.log('No location ifno, downing from remote server....');
                PreDownload.getLocations();
            }
        });

        await Storage.getItem('imageSequence').then((value) => {
            if (value === null){
                console.log('No local image info, downing from remote server....');
                PreDownload.getImgs();
            }
        });

        await Storage.compare('citySequence', 'serverCitySequence').then((result) =>{
            if(result){
                console.log("Locations Already the latest version.");
            }else{
                console.log('Update location info, downloading from remote server....');
                PreDownload.getLocations();
            }
            
        },(err) =>{
            console.log('Comparing citySequence.....Error!')
        });


        Storage.compare('imageSequence', 'serverImageSequence').then((result) =>{
            if(result){
                console.log("Images Already the latest version.")
            }else{
                console.log('Update image ifno, downloading from remote server....');
                PreDownload.getImgs();
            }
            
        },(err) =>{
            console.log('Comparing imageSequence.....Error!')
        });





        
    }


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