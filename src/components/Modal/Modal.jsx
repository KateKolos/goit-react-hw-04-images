import { Component } from 'react';
import { Overlay } from './Modal.styled';

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
      <Overlay className="Overlay" onClick={this.props.handleClick}>
        <div className="Modal">
          <img src={this.props.largeimage} alt={this.props.tags} />
        </div>
      </Overlay>
    );
  }
}
