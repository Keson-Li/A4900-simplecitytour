import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, StyleSheet, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class TourLocationsComponent extends Component {

    static navigationOptions = {
        title: 'TOUR LOCATIONS',
    };

    constructor(props) {
    super(props);
    this.state = { text: '' };
    }
    render() {
        return (
            <View>
                <TextInput placeholder='SEARCH CITIES'
                    style={{borderColor: 'black', borderWidth: 1, height: 50, fontSize: 20, textAlign: 'center'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />

                    <FlatList
                      data={[
                        {key: 'Vancouver, BC, Canada  (65)'},
                        {key: 'Calgary, AB, Canada  (25)'},
                        {key: 'Toronto, ON, Canada  (49)'},
                        {key: 'Montréal, QC, Canada (38)'},
                        {key: 'Los Angeles, CA, USA  (61)'},
                        {key: 'New York, NY, USA  (18)'},
                        {key: 'London, UK   (50)'},
                        {key: 'Bangkok, Thailand  (55)'},
                        {key: 'Seoul, South Korea  (12)'}
                      ]}
                      renderItem={({item}) => (
                        <View style={{borderWidth: 1, borderColor: 'black'}}>
                            <Text style={{padding: 20, fontSize: 18, height: 70,}}>
                            {item.key}
                            </Text>
                        </View>
                    )}
                    />
            </View>
        );
    }
}
                        


