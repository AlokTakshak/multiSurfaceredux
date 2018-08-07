import {AppRegistry} from 'react-360';
import TopPosts from './TopPosts';
import CurrentPost from './CurrentPost';
import ModelView from './ModelView';
import * as Store from './Store';
import {Provider} from 'react-redux';
import * as React from 'react';
//Store.initialize('AIzaSyBZv1Xde_EjsTdJxwXce3QDi6g_YlPm8nY');

Store.store.dispatch(Store.initialize('AIzaSyBZv1Xde_EjsTdJxwXce3QDi6g_YlPm8nY'));

class WrappedTopPosts extends React.Component{
   render (){
  return (
      <Provider store={Store.store}>
      <TopPosts/>
      </Provider>
  );
}
}
class WrappedCurrentPost extends React.Component{
  render(){
    return (
        <Provider store={Store.store}>
        <CurrentPost/>
        </Provider>
    );
  }
}
class WrappedModelView extends React.Component{
  render (){
      return (
          <Provider store={Store.store}>
          <ModelView/>
          </Provider>
      );
}
}

AppRegistry.registerComponent('TopPosts', () => WrappedTopPosts);
AppRegistry.registerComponent('CurrentPost', () => WrappedCurrentPost);
AppRegistry.registerComponent('ModelView', () => WrappedModelView);
