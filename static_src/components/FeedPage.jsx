import React from 'react';
import EventList from './EventList.jsx';
import apiUrls from './../constants/apiUrls';
import './../styles/base.scss'


class FeedPageComponent extends React.Component{


    state = {
        events:[],
        isLoading: false
    };



    render() {
        return (
            console.log(this.state.events),
            <div className="b-wrapper">
                <EventList events = {this.state.events} isLoading={this.state.isLoading} />

            </div>
        );

    }

}

export default FeedPageComponent;