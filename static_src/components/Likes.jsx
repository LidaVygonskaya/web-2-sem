import React from 'react';
import IconButton from 'material-ui/IconButton/IconButton'
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {createLike} from './../actions/createlike'
import apiUrls from './../constants/apiUrls';
import PropTypes from 'prop-types'

class Like extends React.Component {

    static propTypes = {
        content_type: PropTypes.number,
        object_id: PropTypes.number,


    };

    onClick = (e) => {
       this.props.createLike(apiUrls.likes, {content_type: this.props.content_type, object_id: this.props.object_id})
    };

    render() {
        return(

            <IconButton onClick={this.onClick} iconStyle={{color: "#F44336"}}>
                <ActionFavorite/>
            </IconButton>

        );
    }
}
const mapDispatchToProps =(dispatch) => {
    return bindActionCreators({createLike}, dispatch)

};


export default connect(() => ({}), mapDispatchToProps)(Like);