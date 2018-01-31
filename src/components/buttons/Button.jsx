import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {

    render() {
        let classNamesArray = this.props.classNames ? this.props.classNames : [];
        let classNamesString = '';
        classNamesArray.map( (element) => {
            classNamesString+= ' ' + element;
        });

        return (
            <div className={"dal-button" + classNamesString} >
                <button disabled={this.props.disabled} type={this.props.buttonType} onClick={this.props.onClickFunc} >{this.props.children}</button>
            </div>
        );
    }
};

Button.propTypes = {
    buttonType: PropTypes.string.isRequired, 
    label: PropTypes.string, 
    onClickFunc: PropTypes.func, 
    disabled: PropTypes.bool
};

Button.defaultProps = {
    buttonType: 'button', 
    label: '', 
    disabled: false
};