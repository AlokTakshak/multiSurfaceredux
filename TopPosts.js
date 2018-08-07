import * as React from 'react';
import {Image, StyleSheet, Text, View, VrButton} from 'react-360';
import {connect} from 'react-redux';

class PostButton extends React.Component {
  state = {
    hover: false,
  };

  render() {
    return (
      <VrButton
        style={styles.postButton}
        onEnter={() => this.setState({hover: true})}
        onExit={() => this.setState({hover: false})}
        onClick={() => this.props.Myonclick(this.props.index)}>
        <Image style={styles.postButtonPreview} source={{uri: this.props.preview}} />
        <View style={[styles.postButtonInfo, this.state.hover ? styles.postButtonInfoHover : null]}>
          <View style={styles.postButtonLabel}>
            <Text style={styles.postButtonName}>{this.props.name}</Text>
          </View>
          <View style={styles.postButtonLabel}>
            <Text style={styles.postButtonAuthor}>{this.props.author}</Text>
          </View>
        </View>
      </VrButton>
    );
  }
}

const TopPosts = props => {
  if (!props.posts) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.lodingStyle}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {props.posts.map((post, i) => (
        <PostButton
          key={post.id}
          index={i}
          name={post.name}
          author={post.author}
          preview={post.preview}
          Myonclick={props.Myonclick}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 600,
    backgroundColor: '#BDF6FF',
    borderColor: '#303050',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  postButton: {
    height: 120,
    backgroundColor: '#DD330F',
    overflow: 'hidden',
  },
  postButtonInfo: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'column',
  },
  postButtonPreview: {
    width: '100%',
    height: 225,
  },
  postButtonInfoHover: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  postButtonLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  postButtonName: {
    fontSize: 22,
    color:'red',
  },
  postButtonAuthor: {
    fontSize: 14,
  },
  lodingStyle:
  {
    fontSize:30,
    color:'red',
  }
});

function mapStatetoProps(state)
{
  return state;
}
function mapDispatchToProps(dispatch)
{
  return {
    Myonclick: (id)=>{dispatch({type: 'setCurrent',value:id});},
  };
}

const ConnectedTopPosts = connect(mapStatetoProps, mapDispatchToProps)(TopPosts);

export default ConnectedTopPosts;
