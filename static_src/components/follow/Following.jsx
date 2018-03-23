import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {connect} from 'react-redux'

class Following extends React.Component {

     static propTypes = {
         following: PropTypes.shape({
             id: PropTypes.number,
             to_user: PropTypes.string,

         })


    };


    render() {
        return(
            <div className="following">
                <ListItem
                    leftAvatar={<Avatar src={this.props.to_user.avatar} />}
                    primaryText={ this.props.to_user.username }

                    secondaryTextLines={2}

                />
                <Divider inset={true}/>

            </div>
        );
    }
}

const mapStateToProps = ({followings}, ownProps) => {
    return {
        ...followings.followings[ownProps.id],
    }

};

const mapDispatchToProps = (dispatch) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Following);