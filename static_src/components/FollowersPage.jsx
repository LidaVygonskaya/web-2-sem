import React from 'react';
import FollowerList from './follow/FollowerList.jsx';
import apiUrls from './../constants/apiUrls';


class FollowersPageComponent extends React.Component{

    state = {
        followers:[],
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading:true });

        fetch(apiUrls.followers, {
            credentials: 'include',
        }).then(
            body => body.json()

        ).then(

            (json) => this.setState({ followers: json.results, isLoading: false})
        );

    }

    render() {
        return (

            <div className="b-wrapper">

                <FollowerList followers= { this.state.followers } isLoading={this.state.isLoading} />

            </div>
        );

    }

}

export default FollowersPageComponent;