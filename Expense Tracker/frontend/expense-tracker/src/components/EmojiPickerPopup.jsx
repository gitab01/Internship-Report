import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <p className="text-[13px] font-medium text-slate-700">Icon</p>

      <div className="mt-1.5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-xl hover:border-slate-300 cursor-pointer"
          aria-label={icon ? "Change icon" : "Pick icon"}
        >
          {icon ? <span aria-hidden="true">{icon}</span> : <LuImage className="text-slate-400" size={18} />}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          {icon ? "Change icon" : "Pick an icon"}
        </button>
        {icon && (
          <button
            type="button"
            onClick={() => onSelect("")}
            className="ml-auto p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label="Clear icon"
          >
            <LuX size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-3 max-h-80 w-full overflow-auto rounded-xl border border-line bg-white p-1">
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              onSelect(emojiObject.emoji);
              setIsOpen(false);
            }}
            previewConfig={{ showPreview: false }}
            searchDisabled
            skinTonesDisabled
            emojiSize={20}
            emojiStyle="native"
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
