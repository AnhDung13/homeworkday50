import React from "react";
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen fixed bg-cyan-100 bg-opacity-30 inset-0 cursor-wait">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );
}
