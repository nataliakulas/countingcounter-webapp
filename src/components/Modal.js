import React from "react";

export default class extends React.Component {

  render() {
    if (!this.props.show) {
      return null
    }

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <button onClick={this.props.close}>Close</button>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
};
