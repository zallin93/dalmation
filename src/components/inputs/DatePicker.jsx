import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';


/**
 *
 */
export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._renderInput = this._renderInput.bind(this);
    }

    _handleChange(newTime) {
        let name = this.props.name;
        this.props.onInputChange(this.props.name, newTime);
    }

    _renderInput(props, openCalendar) {
        let label = this.props.label;
        let name = this.props.name;
        
        let classNamesArray = this.props.classNames;
        let classNamesString = '';
        classNamesArray.map( (element) => {
            classNamesString+= ' ' + element;
        });

        return (
            <div className={"dal-input-date " + classNamesArray} >
                <label>{label}</label>{this.props.children}
                <input {...props} data-lpignore={true} />
            </div>
        );
    }

    render() {
        let value = this.props.value;
        return (
            <Datetime renderInput={this._renderInput} isValidDate={this.props.isValidDate} 
                onChange={this._handleChange} value={value} />
        );
    }
};


DatePicker.propTypes = {

};

DatePicker.defaultProps = {
    label: '', 
    name: '', 
    classNames: []
};