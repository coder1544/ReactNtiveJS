/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  TextInput,
  Dimensions,
} from 'react-native';

var request_url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json"

class HelloWorld extends Component {

  constructor() {
        super();
        this.state = {
          loaded: false,
          dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 })
        };
  }

  componentDidMount() {
    fetch(request_url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true
        });
      })
      .done()
  }

  render() {
    if (this.state.loaded) {
      return this.renderList();
    }else {
      return this.renderLoading();
    }
  }

   renderList(movie) {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem.bind(this)}
      />
    );
  }

   renderItem(movie) {
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputText} placeholder="Please input the price!" numberOfLines={1}></TextInput>
        <View style={styles.content}>
          <Text style={styles.welcome}>
            {movie.title}
          </Text>
          <TouchableHighlight
            style={styles.touchable}
            onLongPress={this.alertImage.bind(this, movie.title)}
            onPressIn={this.alertImage.bind(this, "in")}
            onPressOut={this.alertImage.bind(this, "out")}
            onPress={this.alertImage.bind(this, movie.posters.thumbnail)}>
            <Image
              source={{uri: movie.posters.thumbnail}}
              style={styles.imageShow} >
            </Image>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  alertImage(url){
    alert(url);
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Loading...
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  welcome: {
    width: Dimensions.get('window').width - 150,
    fontSize: 10,
    textAlign: 'left',
  },
  imageShow: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  inputText: {
    width: 200,
    textAlign: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  touchable: {
    borderRadius: 100
  },
});


AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
