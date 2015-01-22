import React from 'react';

var Button = React.createClass({

    getDefaultProps() {

        return {

            type: 'button',
            className: ''
        };
    },

    render() {

        return (
            <button type={this.props.type}
                    className={'btn ' + this.props.className}
                    onClick={this.props.onClick}>{this.props.children}</button>
        );
    }

});

export default Button;
