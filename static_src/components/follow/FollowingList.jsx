import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Following from './Following.jsx'
import {connect} from 'react-redux';
import {loadFollowings} from './../../actions/followings.js'
import { bindActionCreators } from 'redux'
import apiUrls from './../../constants/apiUrls';


class FollowingList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        followings: PropTypes.arrayOf(PropTypes.shape(Following.propTypes)),
        loadFollowings: PropTypes.func

    };


    //Если какие то не реквайред то можем объевить здесь деволтные значения, например для аватарки
    static defaultProps = {

        isLoading:false,
        followingList:[]

    };

    componentDidMount() {
        this.props.loadFollowings(apiUrls.following);

    }



    render() {
     /*   if (this.props.isLoading) {
            return <div className="post_list">...Loading</div>
        }*/

        console.log(this.props.followings);

        const followings = this.props.followingList.map(
            (item) => {


                return <Following key={item} id={item}/>;
            }
        );

        return(
            <List>
            <div className="followings_list">
                { followings }
            </div>
            </List>
        );
    }
}
const mapStateToProps =({followings}) => {
    return {
        followingList: followings.followingList,
        isLoading: followings.isLoading
    }

};
const mapDispatchToProps =(dispatch) => {
    return bindActionCreators({loadFollowings}, dispatch)

};


export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);