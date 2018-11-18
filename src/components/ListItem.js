import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, Dimensions, View } from 'react-native';

const SCREEN_WIDTH= Dimensions.get('window').width;
const SCREEN_HEIGHT=Dimensions.get('window').height;
import {CardSection} from './common'

class ListItem extends Component {
  onRowPress() {
    console.log("later....");
    const {id, topic, content} = this.props.work;
    this.props.itemNavigation.navigate('createWork', {id, topic, content});
}
  render() {
    const { id, content, topic } = this.props.work;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style = {styles.itemContainer}>
          <View style={styles.topicContainer}>
            <Text style={{color:'white'}}>
              {topic}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text>
              {content}
            </Text>
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  itemContainer:{
    width: SCREEN_WIDTH,
    marginBottom:10
  },
  topicContainer: {
    padding:20,
    backgroundColor:'#8cba99',

  },
  contentContainer:{
    backgroundColor:'#8cba99',
    opacity:.5,
    padding:20

  }
};

export default ListItem;
