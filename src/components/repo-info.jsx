import React from 'react/addons';

let RepoInfo = React.createClass({

    mixins: [React.addons.PureRenderMixin],

    getDefaultProps() {

        return {

            repo: {}
        };
    },

    render() {

        let repo = this.props.repo;

        let component = (

            <div className='repo-info'>

                <h2 className='repo-name'><a href={repo.html_url} target='blank_'>{repo.name}</a></h2>
                <h3><small><em>{repo.description}</em></small></h3>

                <div className='stats'>
                    <span>{repo.language}</span>
                    <span className='fa fa-star'><strong>{repo.stargazers_count}</strong></span>
                    <span className='fa fa-code-fork'><strong>{repo.forks_count}</strong></span>
                </div>

            </div>
        );

        component = !Object.keys(repo).length ? null : component;

        return component;
    }
});

export default RepoInfo;
