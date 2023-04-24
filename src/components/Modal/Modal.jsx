import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export default function Modal({ largeimage, onClick, tags }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return window.removeEventListener('keydown', handleKeyDown);
  }, [onClick]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <Overlay className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={largeimage} alt={tags} />
      </div>
    </Overlay>
  );
}
