import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>
    );
  }
}
