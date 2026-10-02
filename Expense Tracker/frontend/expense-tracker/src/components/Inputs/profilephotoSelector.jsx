import { useRef, useState } from "react";
import { LuUser, LuCamera, LuTrash2 } from "react-icons/lu";

const ProfilePhotoSelector = ({ setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mb-5 flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative h-16 w-16 shrink-0">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile preview"
            className="h-16 w-16 rounded-full object-cover border border-line"
          />
        ) : (
          <div className="grid h-16 w-16 place-items-center rounded-full border border-line bg-slate-50 text-slate-400">
            <LuUser size={22} />
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Choose profile photo"
          className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
        >
          {previewUrl ? <LuTrash2 size={13} /> : <LuCamera size={13} />}
        </button>
      </div>

      <div>
        <p className="text-[13px] font-medium text-slate-700">Profile photo</p>
        <p className="text-xs text-slate-500">Optional. PNG or JPG.</p>
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="mt-1 text-xs font-medium text-slate-600 underline underline-offset-2 cursor-pointer"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
