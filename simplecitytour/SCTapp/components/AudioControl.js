import {Audio} from 'expo';
import React, { Component } from 'react';
import CallBackend from './CallBackend';
import IP from './IPaddr';
import { Text,
    View, 
    StyleSheet,
    Button,
    TextInput,
    ScrollView,
    ListView,
    Dimensions,
    Image,
TouchableOpacity} from 'react-native';
var inAudioPage = false;
export default class AudioContorler extends Component {
    constructor(props){
        super(props);
        this.state = {
            soundFile : null,
            isPlaying : false,
            isLoaded:false,
        }
    }
     


    componentDidMount () {
        console.log('Ready to play a sound......');
        inAudioPage = true;
        this.loadsound("filename");
    }

    componentWillUnmount(){
        console.log('Stop playing a sound......');
        inAudioPage=false;
        this._onStopPressed();
    }


    // componentWillUnmount(){
    //     if (this.state.soundFile != null) {
    //         this.state.soundFile.stopAsync();
    //         this.state.isPlaying = false;
    //         this.soundFile = null;
    //     }

    // }

    async loadsound(filename){
        // var all_audio = {
        //     hi:require('../audio/hi.m4a'),
        //     hello:require('../audio/hello.mp3')

        // }
        console.log("in audio");
        audio_path = '/api/getaudio/';

        online_song = 'https://d1qg6pckcqcdk0.cloudfront.net/country/parmalee_hc201403_05_closeyoureyes.m4a' ;

        // const playbackObject = await Audio.Sound.create(
        //     { uri: online_song},
        //     // { uri: IP + audio_path },
        //     // (require('../audio/hi.m4a')),
        //     // (all_audio[filename]),
        //     { shouldPlay: true }
        //     );

        
        try{
            // await Expo.Audio.setIsEnabledAsync(true);
            this.state.soundFile = new Audio.Sound();
            await this.state.soundFile.loadAsync({ uri:  online_song});
            
            // sound from CallBackend
            // await this.state.soundFile.loadAsync({ uri:  IP+audio_path});
            
            this.state.isLoaded = true;
            this.state.soundFile.playAsync();
            this.state.isPlaying = true;
            // await this.soundFile.playAsync();
            

        }catch(err){

        }
    }

    _onPlayPausePressed = () => {
        if(inAudioPage){
            if (this.state.soundFile != null) {
                if (this.state.isPlaying) {
                  this.state.soundFile.pauseAsync();
                  this.state.isPlaying = false;
                } else {
                  this.state.soundFile.playAsync();
                  this.state.isPlaying = true;
                }
            }
        }        
    };

    _onStopPressed = () => {
        if(inAudioPage){
            if (this.state.soundFile != null) {
                this.state.soundFile.stopAsync();
                this.state.isPlaying = false;
            }   
        }   
    };

    _onPlayPressed = () => {
        if(inAudioPage){
            if (! this.state.isPlaying && this.state.isLoaded) {
                this.state.soundFile.playAsync();
                this.state.isPlaying = true;
              }
        }  
    };


    render() {
		return (
			<View style={styles.musicbox}>
            <TouchableOpacity style={styles.stop} onPress={this._onStopPressed}>
            <Image style={{
                // flex: 1,
                height:Dimensions.get('window').width/12,
                width:Dimensions.get('window').width/10,
                // position: "absolute"
            }} source={require('../pictures/musicbox/stop.png')}>
            </Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pause} onPress={this._onPlayPausePressed}>
            <Image style={{
                // flex: 1,
                height:Dimensions.get('window').width/12,
                width:Dimensions.get('window').width/10,
                // position: "absolute"
            }} source={require('../pictures/musicbox/pause.png')}>
            </Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.play} onPress={this._onPlayPressed}>
            <Image style={{
                // flex: 1,
                height:Dimensions.get('window').width/12,
                width:Dimensions.get('window').width/10,
                // position: "absolute"
            }} source={require('../pictures/musicbox/play.png')}>
            </Image>
            </TouchableOpacity>  
			</View>
		)
	}

    // static test(){
    //     fetch('https://d1qg6pckcqcdk0.cloudfront.net/country/parmalee_hc201403_05_closeyoureyes.m4a',{
    //         headers: {'Content-Type': 'application/json',},
    //         // body: JSON.stringify(data),
    //         method: 'GET',
    //     }).then((resp) =>{
    //         console.log(resp);
    //     },(err) =>{
    //         console.log(err);
    //     })
    // }




}
const styles = StyleSheet.create({
    musicbox:{
        flex: 1,
        position: "absolute",
        top:20,
        right: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(153,204,204,0.6)',
        flexDirection: 'row',
    },
  
    play:{
        // position: "absolute",
        marginTop: 2,
        alignSelf: 'flex-end'
        // flex:1,
        // flexDirection: "row",
        // flexWrap: "wrap",
        // padding: 2,
    },
  
    stop:{
        // position: "absolute",
        marginRight:20,
        alignSelf: 'flex-end',
        marginTop: 2,
        // width:Dimensions.get('window').width/3-6,
        // height: Dimensions.get('window').width/3-6,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "black",
        // overflow: "hidden"
    },
    pause: {
        // position: "absolute",
        // margin:2,
        marginRight:20,
        marginTop: 2,
        alignSelf: 'flex-end'
    //   position: 'absolute',
    //   top: 0,
    //   bottom: 0,
    //   left: 0,
    //   right: 0, 
    //   justifyContent: 'center',
    //   alignItems: 'center',
    },
  });