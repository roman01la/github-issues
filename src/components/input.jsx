import React from 'react';

let Input = React.createClass({

    getDefaultProps() {

        return {

            wrapperClassName: 'field',
            labelClassName: 'label',
            type: 'text',
            min: '',
            value: '',
            placeholder: '',
            required: false,
            disabled: false
        };
    },

    getValue() {

        return this.refs.input.getDOMNode().value;
    },

    render() {

        return (

            <div className={this.props.wrapperClassName}>

                <label className={this.props.labelClassName}>{this.props.label}</label>

                <input ref='input'
                       placeholder={this.props.placeholder}
                       type={this.props.type}
                       min={this.props.min}
                       value={this.props.value}
                       onChange={this.props.onChange}
                       onKeyDown={this.props.onKeyDown}
                       onFocus={this.props.onFocus}
                       onBlur={this.props.onBlur}
                       required={this.props.required}
                       disabled={this.props.disabled} />

                {this.props.children}

            </div>
        );
    }

});

export default Input;
