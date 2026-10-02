const DeleteAlert = ({ content, onDelete, onCancel }) => (
  <div>
    <p className="text-sm text-slate-700">
      {content || "This can't be undone."}
    </p>
    <div className="flex flex-col-reverse sm:flex-row gap-2 mt-6">
      <button
        type="button"
        className="btn-ghost flex-1 justify-center"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        type="button"
        className="flex-1 inline-flex justify-center items-center gap-1.5 text-sm font-semibold text-white bg-rose-600 px-4 py-2 rounded-lg hover:bg-rose-700 transition cursor-pointer"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  </div>
);

export default DeleteAlert;
