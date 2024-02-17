import CursorSVG from '@/public/assets/CursorSVG';
import React from 'react';

type Props = {
  color: string;
  x: number;
  y: number;
  message: string;
};

function Cursor({ color, x, y, message }: Props) {
  return (
    <div
      className="pointers-events-none absolute top-0 left-0"
      style={{ transform: `translateX(${x}px) translateX(${y}px)` }}
    >
      <CursorSVG color={color} />
    </div>
  );
}

export default Cursor;