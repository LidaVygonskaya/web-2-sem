import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {connect} from 'react-redux'
class Event extends React.Component {

    static propTypes = {
        event: PropTypes.shape({
            id: PropTypes.number,
            author: PropTypes.number,
            text: PropTypes.string,

        })


    };


    render() {
        return (

            <div className="event">
                <ListItem
                    leftAvatar={<Avatar src=""/>}
                    primaryText={<span>{ this.props.author }</span>}
                    secondaryText={
                        <p>
                            <span>{ this.props.text}</span> --

                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={true}/>


            </div>
        );
    }
}

const mapStateToProps = ({events}, ownProps) => {
    return {
        ...events.events[ownProps.id],
    }

};

const mapDispatchToProps = (dispatch) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Event);