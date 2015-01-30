import React from 'react';

import marked from 'marked';

let Markdown = React.createClass({

    getDefaultProps() {

        return {

            md: ''
        };
    },

    render() {

        let html = { __html:marked(this.props.md) };

        return <div className='markdown-html' dangerouslySetInnerHTML={html} />;
    }
});

export default Markdown;
