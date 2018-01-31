import React from 'react';

export default class SubhubLoader extends React.Component {

    render() {
        if(this.props.isLoading) {
            return (
                <div className="loader-overlay" >
                    <div className="loader" />
                </div>
            );    
        } else {
            return null;
        }
        
    }
}