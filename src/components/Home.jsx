import React, { useState } from 'react';

// --- SVG Icons ---
const PlusIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
);

const EditIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const DeleteIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- Add Task Modal Component ---
const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('medium');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;
        onAddTask({ name: taskName, priority });
        setTaskName('');
        setPriority('medium');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="taskName" className="block text-gray-700 text-sm font-bold mb-2">Task Name</label>
                        <input
                            type="text"
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="e.g., Finish project report"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Task Card Component ---
const TaskCard = ({ task, onEdit, onDelete }) => {
    const priorityStyles = {
        high: 'bg-red-100 border-l-4 border-red-500',
        medium: 'bg-yellow-100 border-l-4 border-yellow-500',
        low: 'bg-green-100 border-l-4 border-green-500',
    };

    return (
        <div className={`rounded-lg p-4 shadow-md mb-4 ${priorityStyles[task.priority]}`}>
            <div className="flex justify-between items-start">
                <p className="text-xs text-gray-500">{task.createdAt}</p>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(task.id)} className="text-gray-500 hover:text-blue-600 transition">
                        <EditIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDelete(task.id)} className="text-gray-500 hover:text-red-600 transition">
                        <DeleteIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="font-semibold text-gray-800 mt-2">{task.name}</p>
        </div>
    );
};


// --- Main Home Component ---
function Home() {
    const [tasks, setTasks] = useState([
        // Mock data to start with
        { id: 1, name: 'Design the new landing page', priority: 'high', createdAt: 'July 19, 10:00 AM' },
        { id: 2, name: 'Develop the authentication flow', priority: 'high', createdAt: 'July 18, 3:30 PM' },
        { id: 3, name: 'Review team pull requests', priority: 'medium', createdAt: 'July 19, 9:00 AM' },
        { id: 4, name: 'Update the documentation', priority: 'low', createdAt: 'July 17, 11:00 AM' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addTask = (task) => {
        const newTask = {
            id: tasks.length + 1,
            ...task,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    
    const editTask = (id) => {
        // In a real app, this would likely open a modal with the task details to edit
        alert(`Editing task with ID: ${id}. (Functionality not fully implemented)`);
    };

    const filterTasksByPriority = (priority) => {
        return tasks.filter(task => task.priority === priority);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={addTask} />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-300"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* High Priority Column */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="font-bold text-lg mb-4 text-red-600">High Priority</h2>
                    {filterTasksByPriority('high').map(task => (
                        <TaskCard key={task.id} task={task} onEdit={editTask} onDelete={deleteTask} />
                    ))}
                </div>

                {/* Medium Priority Column */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="font-bold text-lg mb-4 text-yellow-600">Medium Priority</h2>
                    {filterTasksByPriority('medium').map(task => (
                        <TaskCard key={task.id} task={task} onEdit={editTask} onDelete={deleteTask} />
                    ))}
                </div>

                {/* Low Priority Column */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="font-bold text-lg mb-4 text-green-600">Low Priority</h2>
                    {filterTasksByPriority('low').map(task => (
                        <TaskCard key={task.id} task={task} onEdit={editTask} onDelete={deleteTask} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
