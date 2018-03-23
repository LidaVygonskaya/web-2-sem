import React from 'react';
import FollowingList from './follow/FollowingList.jsx';
import apiUrls from './../constants/apiUrls';


class FollowingsPageComponent extends React.Component{

    state = {
        followings:[],
        isLoading: false
    };

    componentDidMount() {
        this.setState({ isLoading:true });

        fetch(apiUrls.following, {
            credentials: 'include',
        }).then(
            body => body.json()

        ).then(

            (json) => this.setState({ followings: json.results, isLoading: false})
        );

    }

    render() {
        return (

            <div className="b-wrapper">

                <FollowingList followings= { this.state.followings } isLoading={this.state.isLoading} />

            </div>
        );

    }

}

export default FollowingsPageComponent;