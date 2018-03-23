import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {connect} from 'react-redux'
class Follower extends React.Component {

    static propTypes = {
        follower: PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            avatar: PropTypes.string

        })


    };


    render() {
        return (

            <div>
                <ListItem
                    leftAvatar={<Avatar src={this.props.avatar} />}
                    primaryText={ this.props.username }

                    secondaryTextLines={2}

                />
                <Divider inset={true}/>
            </div>
        );
    }
}

const mapStateToProps = ({followers}, ownProps) => {
    return {
        ...followers.followers[ownProps.id],
    }

};

const mapDispatchToProps = (dispatch) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Follower);