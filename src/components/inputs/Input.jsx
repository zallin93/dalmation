import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this._renderIfRequired = this._renderIfRequired.bind(this);
    }

    handleChange(e) {
        this.props.onInputChange(e);
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
        let disabled = this.props.disabled;
        let maxCharacterCount = this.props.maxCharacterCount;
        let charactersLeft = maxCharacterCount - value.length;
        let classNamesArray = this.props.classNames ? this.props.classNames : [];
        let classNamesString = '';
        classNamesArray.map( (element) => {
            classNamesString+= ' ' + element;
        });
        
        return (
            <div className={"dal-input" + classNamesString} >
                <label >{label}{this._renderIfRequired()}</label>{this.props.children}
                <input type="text" data-lpignore={true} disabled={disabled} maxLength={maxCharacterCount} required={isRequired} name={name} value={value} onChange={this.handleChange} />
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

Input.propTypes = {
    label: PropTypes.string, 
    name: PropTypes.string, 
    isRequired: PropTypes.bool, 
    value: PropTypes.string.isRequired, 
    onInputChange: PropTypes.func.isRequired,
    showCharacterCount: PropTypes.bool,
    maxCharacterCount: PropTypes.number, 
    disabled: PropTypes.bool
};

Input.defaultProps = {
    isRequired: false, 
    label: '', 
    name: '',
    showCharacterCount: false, 
    maxCharacterCount: 500, 
    disabled: false
};