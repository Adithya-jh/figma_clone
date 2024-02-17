import React, { useCallback } from 'react';
import LiveCursors from './cursor/LiveCursors';
import { useMyPresence, useOthers } from '@/liveblocks.config';

function Live() {
  const others = useOthers(); //useOthers -> lists all the other users in the room. also extracts data of the users
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  //   const handlePointerMove = useCallback((event: React.PointerEvent) => {
  //     event.preventDefault();

  //     const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
  //     const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

  //     updateMyPresence({ cursor: { x, y } });
  //   }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      const { x, y } = event.currentTarget.getBoundingClientRect();
      const cursorX = event.clientX - x;
      const cursorY = event.clientY - y;

      updateMyPresence({ cursor: { x: cursorX, y: cursorY } });
    },
    [updateMyPresence]
  );

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({
      cursor: null,
      message: null,
    });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    // event.preventDefault();

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({
      cursor: { x, y },
    });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100vh] w-full flex justify-center items-center text-center"
    >
      <h1 className="text-2xl text-white">Sickk</h1>;
      <LiveCursors others={others} />
    </div>
  );
}

export default Live;
