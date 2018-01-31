import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {

    constructor(props) {
        super(props);
        this.showOptions = this.showOptions.bind(this);
        this.closeOptions = this.closeOptions.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this._renderOptionsList = this._renderOptionsList.bind(this);
        this._renderIfRequired = this._renderIfRequired.bind(this);

        this.state = {
            showOptions: false, 
            isDisabled: false
        };
    }


    /**
     *  if there's only one option, set it by default
     */
    componentWillMount() {
        let options = this.props.options;
        if( options.length === 1 ) {
            this.props.onInputChange( this.props.name, options[0].value );
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    /**
     *  if there's only one option, set it by default
     */
    componentWillReceiveProps(newProps) {
        let options = newProps.options;
        if( options.length === 1 && this.state.isDisabled === false ) { // initial with 1
            this.props.onInputChange( this.props.name, options[0].value );
            this.setState({
                isDisabled: true
            });
        } else if( this.props.options.length !== options.length ) { // new options recieved
            this.props.onInputChange( this.props.name, '' );
            this.setState({
                isDisabled: false
            });
        } else if( options.length === 1 && newProps.value === '' ) { // new sr, but didn't nav off
            this.props.onInputChange( this.props.name, options[0].value );
        }
    }


    showOptions(e) {
        e.preventDefault();
        if( !this.state.isDisabled ) {
            this.setState({
                showOptions: true
            });    
        }
    }


    closeOptions(e) {
        e.preventDefault();
        let dataValue = e.target.attributes['data-value']['value'];
        this.props.onInputChange(this.props.name, dataValue);

        this.setState({
            showOptions: false
        });
    }

    handleClickOutside(event) {
        if (this.clickWrapper && !this.clickWrapper.contains(event.target)) {
            this.setState({
                showOptions: false
            });
        }
    }


    _renderOptionsList() {
        if( this.state.showOptions ) {
            let self = this;
            let options = this.props.options;
            let optionsList = options.map( (element, index) => {
                return (
                    <div key={index} data-value={element.value} onClick={self.closeOptions}>{element.name}</div>
                );
            })
            return (
                <div className="dal-select-content" ref={el => this.clickWrapper = el} >
                    { optionsList }
                </div>
            );
        } else {
            return null;
        }
    }

    _renderIfRequired() {
        if( this.props.isRequired ) {
            return (
                <span style={{color: "red"}} >&nbsp;*</span>
            );
        } else {
            return null;    
        }
    }

    render() {
        let label = this.props.label;
        let value = this.props.value;
        let name = this.props.name;
        let classNamesArray = this.props.classNames;
        let classNamesString = '';
        if(this.state.isDisabled) {
            classNamesString += ' disabled';
        }
        classNamesArray.map( (element) => {
            classNamesString+= ' ' + element;
        });

        return (
            <div className={"dal-select" + classNamesString} >
                <label >{label}{this._renderIfRequired()}</label>
                <input type="text" name={name} aria-hidden={true} tabIndex={"-1"} style={{display: "block",position: "absolute", zIndex: "-1"}} value={value} required={this.props.isRequired} />
                <div className="input-div" name={name} onClick={this.showOptions} >
                    {value}
                    <span className="down-arrow"/>
                </div>
                {this._renderOptionsList()}
            </div>
        );
    }
};

Select.propTypes = {
    label: PropTypes.string, 
    name: PropTypes.string.isRequired, 
    options: PropTypes.array.isRequired, 
    value: PropTypes.string.isRequired, 
    onInputChange: PropTypes.func.isRequired, 
    isRequired: PropTypes.bool
};

Select.defaultProps = {
    options: [], 
    isRequired: false, 
    classnames: []
};