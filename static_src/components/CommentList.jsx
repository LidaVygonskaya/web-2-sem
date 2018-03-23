import React from 'react';
import PropTypes from 'prop-types'
import Comment from './Comment.jsx'


class CommentList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        comments: PropTypes.arrayOf(PropTypes.shape(Event.propTypes))

    }


    //Если какие то не реквайред то можем объевить здесь деволтные значения, например для аватарки
    static defaultProps = {
        comments: [],
        isLoading:false,

    }



    render() {
        if (this.props.isLoading) {
            return <div className="comment_list">...Loading</div>
        }


        const comments = this.props.events.map(
            (item) => {
                return <Comment key={item.id} author={item.author} text={item.text}/>;
            }
        );
        return(
            <div className="comment_list">
                { comments }
            </div>
        );
    }
}

export default CommentList;