import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider';
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import apiUrls from './../constants/apiUrls';
import IconButton from 'material-ui/IconButton/IconButton'
import {connect} from 'react-redux'
import User from './User';
import Like from './Likes'
class Post extends React.Component {

    static propTypes = {
        post: PropTypes.shape({
            id: PropTypes.number,
            author: PropTypes.number,
            text: PropTypes.string,
            likes_count: PropTypes.number
        }),
    };

    render() {
        console.log(this.props);
        return (


            <div>

                <ListItem

                    primaryText={<span style={{color: darkBlack}}><User id = {this.props.post.author}/></span>}
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>{ this.props.post.text}</span>

                        </p>
                    }
                    secondaryTextLines={2}



                />
                <div>

  </div>

                <div><Like content_type = {9} object_id = {this.props.post.id} />{this.props.post.likes_count}</div>


                <Divider inset={true}/>


            </div>
        );
    }
}
const mapStateToProps = ({posts}, ownProps) => {
    return {
        post: posts.posts[ownProps.id],
    }

};

const mapDispatchToProps = (dispatch) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);