import React from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Follower from './Follower.jsx'
import {connect} from 'react-redux';
import {loadFollowers} from './../../actions/followers.js'
import { bindActionCreators } from 'redux'
import apiUrls from './../../constants/apiUrls';

class FollowerList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        followers: PropTypes.arrayOf(PropTypes.shape(Follower.propTypes)),
        loadFollowers: PropTypes.func
    };


    //Если какие то не реквайред то можем объевить здесь деволтные значения, например для аватарки
    static defaultProps = {

        isLoading:false,
        followerList:[]

    };

     componentDidMount() {
        this.props.loadFollowers(apiUrls.followers);

    }



    render() {
     /*   if (this.props.isLoading) {
            return <div className="post_list">...Loading</div>
        }*/

        console.log("dkjhsd", this.props);
        const followers = this.props.followerList.map(
            (item) => {


                return <Follower key={item} id={item}/>;
            }
        );

        return(

            <div>
                <List>
                { followers }
                </List>
            </div>
        );
    }
}
const mapStateToProps =({followers}) => {
    return {
        followerList: followers.followersList,
        isLoading: followers.isLoading
    }

};
const mapDispatchToProps =(dispatch) => {
    return bindActionCreators({loadFollowers}, dispatch)

};


export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);