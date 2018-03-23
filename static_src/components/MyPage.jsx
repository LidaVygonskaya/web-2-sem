import React from 'react';
import PostList from './PostList.jsx';
import EventList from './EventList.jsx';
import PostForm from './PostForm.jsx'
import FollowerList from './follow/FollowerList.jsx'
import apiUrls from './../constants/apiUrls';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar'
import FollowingList from './follow/FollowingList.jsx'
import './../styles/base.scss'
import { Switch, Route, Link } from 'react-router-dom';
import PostListAndForm from './PostListAndForm'
import {Tabs, Tab} from 'material-ui/Tabs';

class MyPageComponent extends React.Component{

    state = {

        isLoading: false,


    };


    onPostCreate = (post) => {

        this.setState({
            posts: [post, ...this.state.posts],
        });
        console.log(post)
    };


    render() {
        return (
            <div>
                <Tabs>
                    <Tab label="My Page">
                    </Tab>
                     <Tab label="Feed">
                    </Tab>
                     <Tab label="Followers">
                    </Tab>
                     <Tab label="Followings">
                    </Tab>

                </Tabs>

            <div className="b-wrapper">

            <Link to="/postList/">My Page </Link>
                <Link to="/create/">Create Post </Link>
                 <Link to="/feed/">Feed </Link>
                <Link to="/followers/">Followers </Link>
                <Link to="/followings/">Followings </Link>


            <Switch>
                <Route exact path="/" component={ () => <h2>Welcome to Shitter!</h2> } />
                <Route exact path="/postList/" component={ PostListAndForm } />
                <Route exact path="/followers/" component={ FollowerList } />
                <Route exact path="/followings/" component={ FollowingList } />
                <Route exact path="/feed/" component={ EventList } />
                <Route exact path="/create/" render={ props => <PostForm onCreate = { this.onPostCreate } isLoading={ this.state.isLoading }/>} />
            </Switch>
                </div>
            </div>
        );

    }

}

export default MyPageComponent;