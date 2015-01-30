import React from 'react';

let DropdownItem = React.createClass({

    getDefaultProps() {

        return {

            className: 'item',
            focus: false
        };
    },

    componentDidUpdate() {

        if (this.props.focus) { this.getDOMNode().focus(); }
    },

    render() {

        return (

            <li className={this.props.className}
                tabIndex='-1'
                onKeyDown={this.props.onKeyDown}>{this.props.children}</li>
        );
    }

});

export default DropdownItem;
