import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/buttons/Button';

export default class FileAttacher extends React.Component {

    constructor(props) {
        super(props);
        this._renderAttachments = this._renderAttachments.bind(this);
        this._handleAddFile = this._handleAddFile.bind(this);
        this._handleRemoveFile = this._handleRemoveFile.bind(this);
    }

    _handleAddFile(files) {
        this.props.addFileFunc(files);
    }

    _handleRemoveFile(index) {
        this.props.removeFileFunc(index);
    }


    /**
     *  Sub-render method to build the list-elements to display the files 
     *  that have been selected. 
     */
    _renderAttachments() {
        let fileArray = this.props.fileArray;
        let self = this;

        return fileArray.map( (element, index) => {
            return (
                <li key={index} >
                    <i className="fa fa-times close-btn" onClick={() => {
                        self._handleRemoveFile(index);
                        }} style={{marginRight: "10px", color: "red"}} />{element.name}
                </li>
            );
        })

    }

    render() {
        let classNamesArray = this.props.classNames;
        let classNamesString = '';
        classNamesArray.map( (element) => {
            classNamesString+= ' ' + element;
        });
        let acceptedFileTypes = this.props.acceptedFileTypes;
        let fileArray = this.props.fileArray;
        let maxFileCount = this.props.maxFileCount;

        return (
            <div className={"dal-file-attacher" + classNamesString} >
                <label>{this.props.label}</label>{this.props.children}
                <input ref={input => this.inputElement = input} style={{display: "none"}} type="file" name={name} onChange={(event) => {
                        this._handleAddFile(event.target.files)
                    }} accept={acceptedFileTypes} />
                <SubhubButton onClickFunc={() => {
                        this.inputElement.click();
                    }} disabled={fileArray.length >= maxFileCount} >{this.props.buttonLabel}</SubhubButton>
                {
                    fileArray.length > 0 ?
                        <ul style={{listStyleType: "none"}} >
                            { this._renderAttachments() }
                        </ul>    
                    :
                        <div>No files attached.</div>
                }
                
            </div>
        );
    }

};

FileAttacher.propTypes = {
    addFileFunc: PropTypes.func.isRequired, 
    removeFileFunc: PropTypes.func.isRequired, 
    label: PropTypes.string, 
    maxFileCount: PropTypes.number
};

FileAttacher.defaultProps = {
    label: '',
    buttonLabel: 'Attach a File', 
    classNames: [], 
    acceptedFileTypes: '', 
    maxFileCount: 999
}