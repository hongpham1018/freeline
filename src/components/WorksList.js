import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, StyleSheet, Dimensions} from 'react-native';
import { fetchWorksList , selectWork} from '../actions/WorkAction';
const SCREEN_WIDTH= Dimensions.get('window').width;
const SCREEN_HEIGHT=Dimensions.get('window').height;
import {Font} from 'expo';
import {Icon} from 'react-native-elements';
import ListItem from './ListItem';

class WorksList extends Component {
    static navigationOptions = ({navigation})=>{
      return  {
        title: 'My Works',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'subject': 'subject'}
            size={30}
            color={tintColor}
          />)
        }
      }

    componentWillMount(){

       this.props.fetchWorksList();
       this.createDatasource(this.props)

    }
    componentWillReceiveProps(nextProps){
      this.createDatasource(nextProps)
    }
    createDatasource({works}){
      const ds = new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1!==r2
      })
      this.dataSource = ds.cloneWithRows(works);
    }

    async componentDidMount() {
      await Font.loadAsync({
        'georgia': require('../../assets/fonts/Georgia.ttf'),
        'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'light': require('../../assets/fonts/Montserrat-Light.ttf'),
        'savoye': require('../../assets/fonts/Savoye-LET-Plain.ttf'),
        'sunshine': require('../../assets/fonts/Sunshine-Boulevard-Personal-Use.ttf')
      });

      this.setState({ fontLoaded: true });
    }
  render() {
    return (
      <View style={styles.container}>
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
        />
        </View>

    )}

  renderRow(work){
    return (<ListItem work={work} itemNavigation={this.props.navigation}/>)
  }
}
const mapStateToProps = state => {
  const works = _.map(state.works, (val, uid) => {
    return { ...val, uid };
  });
  return { works:works};
};
const styles = StyleSheet.create({
  container:{
    marginTop:50,
    display:'flex',
    flexDirection:'row',
    backgroundColor:'white',
    width:SCREEN_WIDTH,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default connect(mapStateToProps, { fetchWorksList })(WorksList);
