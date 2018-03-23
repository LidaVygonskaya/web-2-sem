import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Post from './Post.jsx'
import Section from 'grommet/components/Section'
import Box from 'grommet/components/Box';
import './../styles/base.scss'
import {connect} from 'react-redux';
import {loadPosts} from './../actions/tasks.js'


import { bindActionCreators } from 'redux'
import apiUrls from './../constants/apiUrls';


class PostList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)),
        loadPosts: PropTypes.func
    };


    //Если какие то не реквайред то можем объевить здесь деволтные значения, например для аватарки
    static defaultProps = {
        isLoading: false,
        postList: [],


    };

    componentDidMount() {
        this.props.loadPosts(apiUrls.posts);

    }


    render() {
         /*if (this.props.isLoading) {
            return <div className="post_list">...Loading</div>
         }*/
        const posts = this.props.postList.map(
            (item) => {

                return <Post key = {item} id = {item}/>;
            }
        );

        return (

            <div>
                <List>
                    { posts }
                </List>
            </div>
        );
    }
}

const mapStateToProps =({posts}) => {
    return {
        postList: posts.postList,
        isLoading: posts.isLoading
    }

};
const mapDispatchToProps =(dispatch) => {
    return bindActionCreators({loadPosts}, dispatch)

};


export default connect(mapStateToProps, mapDispatchToProps)(PostList);
