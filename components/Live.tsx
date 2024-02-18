import React, { useCallback, useState } from 'react';
import LiveCursors from './cursor/LiveCursors';
import { useMyPresence, useOthers } from '@/liveblocks.config';
import { CursorMode, CursorState } from '@/types/type';

function Live() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  // {cursorState.mode === CursorMode.ReactionSelector && (
  //   <ReactionSelector
  //     setReaction={(reaction) => {
  //       setReaction(reaction);
  //     }}
  //   />
  // )}

  // const handlePointerMove = useCallback(
  //   (event: React.PointerEvent) => {
  //     event.preventDefault();

  //     const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
  //     const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

  //     // broadcast the cursor position to other users
  //     updateMyPresence({
  //       cursor: {
  //         x,
  //         y,
  //       },
  //     });
  //   },
  //   [updateMyPresence]
  // );

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    // if cursor is not in reaction selector mode, update the cursor position
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      // broadcast the cursor position to other users
      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });
    }
  }, []);

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      updateMyPresence({
        cursor: null,
        message: null,
      });
    },
    [updateMyPresence]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({
        cursor: { x, y },
      });
    },
    [updateMyPresence]
  );

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
