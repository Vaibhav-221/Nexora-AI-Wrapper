export default function Sidebar({ models, selectedModel, onSelectModel, onNewChat, isOpen, onClose }) {
     return (
       <aside className={`fixed inset-y-[73px] left-0 z-40 flex w-72 max-w-[82vw] flex-col border-r border-[#2a2b2a] bg-[#0f0f10] p-4 text-zinc-100 transition-transform duration-200 md:static md:inset-auto md:z-auto md:h-full md:w-64 md:max-w-none md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <button
           onClick={() => {
             onNewChat();
             onClose?.();
           }}
           className="mb-4 w-full rounded-md border border-emerald-400/40 bg-emerald-500 p-2.5 text-sm font-semibold text-[#070707] shadow-[0_8px_24px_rgba(16,185,129,0.16)] transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
         >
           + New Chat
         </button>

         <div className="mb-4">
           <label className="mb-2 block text-sm font-medium text-zinc-300">Model</label>
           <select
             value={selectedModel}
             onChange={(e) => onSelectModel(e.target.value)}
             className="w-full rounded-md border border-[#2a2b2a] bg-[#070707] p-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-orange-400"
           >
             {models.map((model) => (
               <option key={model.name} value={model.name}>
                 {model.name}
               </option>
             ))}
           </select>
         </div>

         <div className="min-h-0 flex-1 overflow-y-auto">
           <h3 className="mb-2 text-sm font-medium text-zinc-300">Chat History</h3>
           {/* Add chat history here later */}
         </div>
       </aside>
     );
   }
