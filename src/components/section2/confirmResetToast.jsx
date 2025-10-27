import { toast } from "react-hot-toast";

export const confirmResetToast = (onConfirm) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } bg-[#0d1117] border border-red-600 text-gray-300 font-mono p-4 rounded-lg shadow-lg w-[500px]`}
    >
      <div className="text-red-400 font-bold mb-2">
        ⚠ git reset --hard
      </div>
      <div className="text-m text-white mb-3">
        This will erase all progress. Proceed?
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
            toast.success("Reset complete — clean slate!", { icon: '🧹' });
          }}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm cursor-pointer"
        >
          Yes
        </button>

        <button
          onClick={() => {
            
            toast.error("Canceled reset! ",{icon:'🔄️'});
            toast.dismiss(t.id);
          }}
          className="flex-1 border border-gray-600 text-cyan-400 rounded px-3 py-1 text-sm hover:bg-slate-800 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  ));
};
