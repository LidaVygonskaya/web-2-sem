import React from 'react';
import ReactDom from 'react-dom';


//Реакт элемент
const element = React.createElement(
    'div',
    //Набор атрибутов пропс
    {className: 'greeting'},
    'Hello!'
);



const name = <h1>'Artur'</h1>;

//В пропс засовывем дикт. Функци компоненты
const MaName = (props) => {
    return element1 = (
        <div className="greeting">
            Hello
            <div>{ props.name }</div>
            !
        </div>
    );
};

//Это все одно и то же
const a = MaName({name: "Lida"});
const b = <MaName name = "Sasha"/>;


class MaComponent extends React.Component {
    render() {
        return <div>REACT COMPONENT {this.props.title}</div>;
    }

}


ReactDom.render(
    <MaComponent title="bebe"/>,
    element1,
    a,
    document.getElementById("root")
);
