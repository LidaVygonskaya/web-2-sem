import React from 'react';
import PropTypes from 'prop-types'

class Comment extends React.Component {

     static propTypes = {
        author: PropTypes.number,
        text: PropTypes.string,
         likes: PropTypes.shape({
             author: PropTypes.number
         })

    }


    render() {
        return(
            <div className="comment">
                <div className="user_name">{ this.props.author }</div>
                <div className="post_conent">{ this.props.text}</div>
                <div className="likes">{ this.props.likes.author}</div>
            </div>
        );
    }
}



export default Comment;