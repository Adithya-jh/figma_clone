import CursorSVG from '@/public/assets/CursorSVG';
import { CursorChatProps, CursorMode } from '@/types/type';
import React from 'react';

function CursorChat({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) {
  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {/* {cursorState.mode === CursorMode.Chat && ( )} */}
      <>
        <CursorSVG color="#000" />
        <div className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
          {cursorState.previousMessage && (
            <div className="text-xs text-gray-200">
              {cursorState.previousMessage}
            </div>
          )}
          {/* 
            <input
              type="text"
              placeholder="Type a message"
              className="bg-transparent w-full text-white placeholder-gray-200"
              value={cursorState.message}
              onChange={(e) => setCursorState({ ...cursorState, message: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  updateMyPresence({
                    cursor: cursor,
                    message: cursorState.message,
                  });
                  setCursorState({ ...cursorState, message: '' });
                }
              }}
            /> */}
        </div>
      </>
      {/* )} */}
    </div>
  );
}

export default CursorChat;
