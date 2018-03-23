import PostForm from './PostForm'
import PostList from './PostList'
import React from 'react';
import {connect} from 'react-redux';
import {loadPosts} from './../actions/tasks.js'
import {createPosts} from './../actions/createpost'
import apiUrls from './../constants/apiUrls';
import PropTypes from 'prop-types'
import Post from './Post.jsx'
import { bindActionCreators } from 'redux'

class PostListAndForm extends React.Component {


    render() {

        return(
            <div>
                <PostForm/>
            <PostList/>
            </div>
        );

    }

}
export default PostListAndForm


