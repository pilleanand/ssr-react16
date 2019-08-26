import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchAboutData } from '../actions/aboutActions';

class AboutComponent extends Component {

  getAllPosts = () => {
    const postView = this.props.posts.map(post =>
      <li>{post.title}</li>
    );
    return postView;
  }

  render() {
    return (
      <Fragment>
        <div style={{ fontWeight: 'bold', fontSize: "24px" }}>
          this is about component with API call and printing all the posts as list below
          </div>
        {this.getAllPosts()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.about.posts
  };
}

AboutComponent.fetchData = fetchAboutData;

export default connect(mapStateToProps, null)(AboutComponent);
