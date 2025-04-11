// src/components/StopwordEditor.jsx
import React, { useState } from "react";

const StopwordEditor = ({ word, onUpdate, onRemove }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(word);

  const handleUpdate = () => {
    if (value.trim()) {
      onUpdate(value.trim());
      setEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center py-1">
      {editing ? (
        <input
          className="border rounded px-2 py-1 w-full mr-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUpdate();
          }}
        />
      ) : (
        <span
          className="cursor-pointer w-full"
          onClick={() => setEditing(true)}
          title="Click to edit"
        >
          {word}
        </span>
      )}
      <button
        className="ml-2 text-sm text-red-600 hover:underline"
        onClick={() => onRemove()}
        title="Remove"
      >
        Remove
      </button>
    </div>
  );
};

export default StopwordEditor;
