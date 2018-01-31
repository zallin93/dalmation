import React from 'react';

/**
 *  Custom tooltip component
 */
export default class SubhubTooltip extends React.Component {

    constructor(props) {
        super(props);

        this._handleHover = this._handleHover.bind(this);
        this._closeHover = this._closeHover.bind(this);
        this._renderTooltip = this._renderTooltip.bind(this);

        this.state = {
            showTooltip: false
        };
    }

    _handleHover() {
        this.setState({
            showTooltip: true
        });
    }

    _closeHover() {
        this.setState({
            showTooltip: false
        })
    }

    _renderTooltip() {
        let text = this.props.text;
        return (
            <div className="tooltip" >
                {this.props.children}
            </div>
        );
    }

    render() {

        return (
            <div className="dal-tooltip" >
                <span className="fa fa-info-circle">
                </span>
                { this._renderTooltip() }
            </div>
        );
    }
}

SubhubTooltip.defaultProps = {
    text: ''
};