import React from 'react';
import apiUrls from './../constants/apiUrls';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import {createPosts} from './../actions/createpost'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import './../styles/base.scss'

class PostForm extends React.Component {


    state = {

        text: 'blabla',

    };

    onChange = (e) => {
        this.setState({text: e.target.value});
    };

    onClick = (e) => {
        e.preventDefault();
        console.log(this.state);
       this.props.createPosts(apiUrls.posts, this.state)
    };

    render() {
        return (
            <div className="b-form-field">
                <h2>Форма добавления</h2>
                <form>
                    <div>


                        <TextField
                            id="text-field-controlled"
                            value={this.state.text}
                            onChange={this.onChange}

                        />
                        <RaisedButton label="Primary" primary={true} onClick={ this.onClick }/>


                    </div>


                </form>
            </div>
        );

    }
}

const mapDispatchToProps =(dispatch) => {
    return bindActionCreators({createPosts}, dispatch)

};


export default connect(() => ({}), mapDispatchToProps)(PostForm);
