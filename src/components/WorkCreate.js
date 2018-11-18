import React, { Component } from 'react';
import {View, Text, Image, Dimensions, Button, ImageBackground} from 'react-native'
import {CardSection,Card, TextEditor} from './common';
import {connect} from 'react-redux';
import {Font} from 'expo';

import { Input, Icon} from 'react-native-elements';
import {createWorkSave, createWorkTextChanged} from '../actions/WorkAction';
const BG_IMAGE = require('../../assets/images/createWork_bg.png');
//const DIVIDER = require('../../assets/images/divider.png');
const SCREEN_WIDTH= Dimensions.get('window').width;
const SCREEN_HEIGHT=Dimensions.get('window').height;

class WorkCreate extends Component {
  constructor(props) {
      super(props);
      console.log("---constructor:")
  }
  componentWillMount(){
    console.log("=============componentWillMount")
    console.log(this.props.navigation.state)
  }
  componentDidMount(){

    console.log("=============componentDidMount")
    console.log(this.props.navigation.state)
  }

  static navigationOptions = ({navigation}) => {
    console.log("=============navigation option")
    console.log(navigation.state)
    return {

      headerStyle: {
         backgroundColor: '#fff',
       },
      // headerTintColor: 'black',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
        headerTitle: "Create",
      //  headerRight:(<Button title="Save"  onPress={this.onSave}/>),
        tabBarVisible:true,

      }
 }

  onChangeText(text){
    this.props.createWorkTextChanged(text)

  }

  onSave(){
    const {content, navigation} = this.props;
    const topic = this.state.topic//navigation.getParam('topic');
    const id = this.state.id//navigation.getParam('id')
    this.props.createWorkSave({topic, content, id},()=>{this.props.navigation.navigate('works')})
  }

  render() {
  //  console.log(JSON.stringify(this.props.navigation.state.topic))
    //  const {content, navigation} = this.props;
      console.log("---rendering:")
      let topic = "";
      const { params } = this.props.navigation.state;
      if(params == undefined){
        topic = this.props.navigation.getParam("topic", "id")
      } else topic = params.topic;


    return (
      <View  style={styles.container}>
          <View><Image source={{uri:topic}} style={styles.topicImage}></Image>
          </View>
          <View>
            <TextEditor
              onChangeText={this.onChangeText.bind(this)}
              value = {"content"}/>
          </View>
        </View>
    );
  }
}
const styles = {
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },

  topicImage:{
    padding:4,
    marginLeft:20,
    minWidth:200,
    height:200,
  }

}
mapStateToProps = (state)=>{
  console.log("---mapping")
    return {content:state.works.content};
}
export default connect(mapStateToProps, {createWorkTextChanged, createWorkSave})(WorkCreate)
