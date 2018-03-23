import React from 'react';
import apiUrls from './../constants/apiUrls';


class CommentForm extends React.Component {


    state = {
        project_id: 1,
        text: '',
        status: 0,

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
}

    onClick = (e) => {
        e.preventDefault();
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        fetch(apiUrls.comments, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json',
            }
        }).then(
            body => body.json(),
        ).then(
            json => {
                this.setState({ isLoading: false });
                return this.props.onCreate(json);
            },
        )
}

    render() {
        return (
            <div className="comment_form">
                <h2>Форма добавления Коментария</h2>
                <form>
                    <div>
                        <input onChange={ this.onChange } value={ this.state.text } className="b-form-field" type="text" name="text" placeholder="Текст" />
                    </div>

                    <div>
                        <button onClick={ this.onClick }>Создать</button>
                    </div>
                </form>
            </div>
        );

    }
}

export default CommentForm;
