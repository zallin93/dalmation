import React from 'react';
import PropTypes from 'prop-types';

/**
 *  Custom textarea component
 */
export default class Textarea extends React.Component {

    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._renderIfRequired = this._renderIfRequired.bind(this);
    }

    _handleChange(e) {
        this.props.onInputChangeFunc(e);
    }

    _renderIfRequired() {
        if( this.props.isRequired ) {
            return (
                <span style={{color: "red"}} >&nbsp;*</span>
            );
        }
        return null;   
    }

    render() {
        let label = this.props.label;
        let value = this.props.value;
        let name = this.props.name;
        let isRequired = this.props.isRequired;
        let maxCharacterCount = this.props.maxCharacterCount;
        let charactersLeft = maxCharacterCount - value.length;
        let classNamesArray = this.props.classNames ? this.props.classNames : [];
        let classNamesString = '';
        classNamesArray.map( (element) => {
            classNamesString+= ' ' + element;
        });

        return (
            <div className={"dal-textarea" + classNamesString} >
                <label>{label}{this._renderIfRequired()}</label>{this.props.children}
                <textarea required={isRequired} maxLength={maxCharacterCount} rows={4} name={name} value={value} onChange={this._handleChange} />
                { 
                    this.props.showCharacterCount ?
                        <div style={{float: "right"}} >{charactersLeft}/{maxCharacterCount}</div>
                    :
                        null
                }
            </div>
        );
    }
};

Textarea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string, 
    value: PropTypes.string,  
    onInputChangeFunc: PropTypes.func.isRequired, 
    isRequired: PropTypes.bool, 
    showCharacterCount: PropTypes.bool,
    maxCharacterCount: PropTypes.number
};

Textarea.defaultProps = {
    isRequired: false, 
    showCharacterCount: false, 
    maxCharacterCount: 2000
};