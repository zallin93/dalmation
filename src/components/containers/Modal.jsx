import React from 'react';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this._getClassNames = this._getClassNames.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._closeModal = this._closeModal.bind(this);

        let isOpen = props.isOpen;
        let classNamesArray = props.classNames;
        let classNamesString = '';
        classNamesArray.map( (element) => {
            classNamesString+= ' ' + element;
        });
        
        this.state = {
            classNamesString: classNamesString
        };
    }


    _getClassNames() {
        
    }

    _closeModal() {
        this.props.closeModalFunc();
    }

    _renderHeader() {
        return (
            <div style={{display: "flex", justifyContent: "flex-end"}} >
                <i className="fa fa-times close-x" aria-hidden="true" onClick={this._closeModal} />
            </div>
        );
    }

    render() {
        let classNamesString = this.state.classNamesString;

        if( this.props.isOpen === true ) {
            return (
                <div className="dal-modal" >
                    <div className={"content" + classNamesString} >
                        { this._renderHeader() }
                        {this.props.children}
                    </div>
                </div>
            );    
        } else {
            return null;
        }
        
    }

};

Modal.defaultProps = {
    classNames: [], 
    left: '', 
    top: ''
};