import React from 'react';
import PropTypes from 'prop-types';

/**
 *  Custom radio button component
 */
export default class Radio extends React.Component {

    constructor(props) {
        super(props);
        this._handleOnClick = this._handleOnClick.bind(this);
    }


    _handleOnClick() {
        this.props.onClickFunc(this.props.value);
    }

    render() {

        return (
            <div className="dal-radio">
                <input type="radio" name={this.props.name} checked={this.props.checked} onChange={this._handleOnClick} />
                <label >{this.props.label}</label>
            </div>
        );
    }
};

Radio.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired, 
    checked: PropTypes.bool, 
    onClickFunc: PropTypes.func
};