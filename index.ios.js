 import React, {
   Component,
 } from 'react';
 import {
   AppRegistry,
   TouchableHighlight,
   ListView,
   Image,
   StyleSheet,
   Text,
   View,
 } from 'react-native';

 var REQUEST_URL = 'https://notarycouncil.org/wp-json/wp/v2/posts';

 // The Main class for the application, keep all components inside.
 class dkLegends extends Component {
   // The costructor, add info for section...
   constructor(props) {
     super(props);
     this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       loaded: false,
     };
   }
  // Calls the fetchData() function once the component has loaded.
  componentDidMount() {
    this.fetchData();
  }
  // Fetch the Data From REQUEST_URL and set the state
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }
  // If has posts render it, or show loading screen while getting posts.
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost}
        style={styles.listView}
      />
    );
  }
  // The Loading Screen.
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://d13yacurqjgara.cloudfront.net/users/82092/screenshots/1073359/spinner.gif'}} style={{width: 80, height: 80,}} />
      </View>
    );
  }
  // The Rendered Post.
  renderPost(dkPost) {
    return (
      <View style={styles.container}>
        <Image source={{uri: dkPost.better_featured_image.source_url}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{dkPost.title.rendered}</Text>
          {/* <Text style={styles.text}>{dkPost.content.plaintext}</Text> */}
        </View>
      </View>
    );
  }
}
// The Stylesheet.
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  containerBlue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#344557',
  },
  rightContainer: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  text: {
  },
  thumbnail: {
    width: 95,
    height: 95,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('dkLegends', () => dkLegends);
