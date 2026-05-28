export default function Sidebar({ models, selectedModel, onSelectModel, onNewChat }) {
     return (
       <div className="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
         <button
           onClick={onNewChat}
           className="mb-4 w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg"
         >
           + New Chat
         </button>

         <div className="mb-4">
           <label className="block text-sm font-semibold mb-2">Model</label>
           <select
             value={selectedModel}
             onChange={(e) => onSelectModel(e.target.value)}
             className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
           >
             {models.map((model) => (
               <option key={model.name} value={model.name}>
                 {model.name}
               </option>
             ))}
           </select>
         </div>

         <div className="flex-1 overflow-y-auto">
           <h3 className="font-semibold mb-2">Chat History</h3>
           {/* Add chat history here later */}
         </div>
       </div>
     );
   }