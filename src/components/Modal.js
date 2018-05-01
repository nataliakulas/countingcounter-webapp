import React from "react";

export default class extends React.Component {

  render() {
    if (!this.props.show) {
      return null
    }

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-close" onClick={this.props.close}/>
          {this.props.children}
        </div>
      </div>
    )
  }
};
