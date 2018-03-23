import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Event from './Event.jsx'
import {connect} from 'react-redux';
import {loadEvents} from './../actions/events.js'
import { bindActionCreators } from 'redux'
import apiUrls from './../constants/apiUrls';

class EventList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        events: PropTypes.arrayOf(PropTypes.shape(Event.propTypes)),
        loadEvents: PropTypes.func

    };


    //Если какие то не реквайред то можем объевить здесь деволтные значения, например для аватарки
    static defaultProps = {

        isLoading:false,
        eventList:[]

    };

     componentDidMount() {
        this.props.loadEvents(apiUrls.events);

    }


    render() {
     /*   if (this.props.isLoading) {
            return <div className="post_list">...Loading</div>
        }*/
        console.log(this.props.events)
        const events = this.props.eventList.map(
            (item) => {

                return <Event key={item} id ={item}/>;
            }
        );
        console.log(events)
        return(
            <div className="event_list">
                <List>
                { events }
                </List>
            </div>
        );
    }
}
const mapStateToProps =({events}) => {
    return {
        eventList: events.eventList,
        isLoading: events.isLoading
    }

};
const mapDispatchToProps =(dispatch) => {
    return bindActionCreators({loadEvents}, dispatch)

};


export default connect(mapStateToProps, mapDispatchToProps)(EventList);