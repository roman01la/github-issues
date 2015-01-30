import React from 'react';

import DropdownItem from './dropdown-item';

let Dropdown = React.createClass({

    getDefaultProps() {

        return {

            className: ''
        };
    },

    getInitialState() {

        return {

            activeItem: 0
        };
    },

    componentWillReceiveProps (nextProps) {

        if (nextProps.enter) {

            this.setState({ activeItem: 1 });
        }
    },

    _onItemKeyDown (index, event) {

        event.preventDefault();

        switch (event.keyCode) {

            case 40:

                this.state.activeItem < this.props.repos.length &&
                this.setState({ activeItem: this.state.activeItem + 1 });

                break;

            case 38:

                this.state.activeItem &&
                this.setState({ activeItem: this.state.activeItem - 1 }, () => {

                    !this.state.activeItem && this.props.out();
                });

                break;

            case 13:

                this.props.select(index);

                break;
        }
    },

    render() {

        let list = this.props.repos.map((repo, index) => {

            return <DropdownItem key={index}
                                 focus={index + 1 === this.state.activeItem}
                                 onKeyDown={this._onItemKeyDown.bind(this, index)}>{repo}</DropdownItem>;
        });

        return (

            <div className={'dropdown ' + this.props.className}>

                <ul className='list'>{list}</ul>

            </div>
        );
    }

});

export default Dropdown;
