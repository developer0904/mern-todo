import React, { useState, useEffect } from 'react';

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

// --- Task Modal (for both Add and Edit) ---
const TaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
        } else {
            setTitle('');
            setDescription('');
            setPriority('Low');
        }
    }, [task, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ ...task, title, description, priority });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{task ? 'Edit Task' : 'Add a New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="e.g., Finish project report"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Add more details about the task..."
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="High">High</option>
                            <option value="Med">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Task Card Component ---
const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
    const priorityStyles = {
        High: 'bg-red-100 border-l-4 border-red-500',
        Med: 'bg-yellow-100 border-l-4 border-yellow-500',
        Low: 'bg-green-100 border-l-4 border-green-500',
    };

    return (
        <div className={`rounded-lg p-4 shadow-md mb-4 ${priorityStyles[task.priority]} ${task.status ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500">{new Date(task.createdAt).toLocaleString()}</p>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-blue-600 transition">
                        <EditIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="text-gray-500 hover:text-red-600 transition">
                        <DeleteIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                 <input 
                    type="checkbox" 
                    checked={task.status}
                    onChange={() => onToggleStatus(task._id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                />
                <div className="flex-1">
                    <p className={`font-semibold text-gray-800 ${task.status ? 'line-through' : ''}`}>{task.title}</p>
                    <p className={`text-sm text-gray-600 ${task.status ? 'line-through' : ''}`}>{task.description}</p>
                </div>
            </div>
        </div>
    );
};


// --- Main Home Component ---
function Home() {
    const [tasks, setTasks] = useState([
        // Mock data that matches the new schema
        { _id: '1', title: 'Design new landing page', description: 'Create mockups in Figma', status: false, priority: 'High', createdAt: '2025-07-23T10:00:00Z' },
        { _id: '2', title: 'Develop auth flow', description: 'Implement JWT for login and register', status: false, priority: 'High', createdAt: '2025-07-22T15:30:00Z' },
        { _id: '3', title: 'Review team PRs', description: 'Check the latest pull requests on GitHub', status: true, priority: 'Med', createdAt: '2025-07-23T09:00:00Z' },
        { _id: '4', title: 'Update documentation', description: 'Add new API endpoints to the docs', status: false, priority: 'Low', createdAt: '2025-07-21T11:00:00Z' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // In a real app, you would fetch tasks from your API here
    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         const response = await fetch('/api/tasks');
    //         const data = await response.json();
    //         setTasks(data);
    //     };
    //     fetchTasks();
    // }, []);

    const handleSaveTask = (taskToSave) => {
        if (taskToSave._id) { // Editing an existing task
            setTasks(tasks.map(t => t._id === taskToSave._id ? { ...t, ...taskToSave } : t));
        } else { // Adding a new task
            const newTask = {
                _id: (tasks.length + 1).toString(), // temporary ID
                ...taskToSave,
                status: false,
                createdAt: new Date().toISOString()
            };
            setTasks([...tasks, newTask]);
        }
        setEditingTask(null);
        setIsModalOpen(false);
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task._id !== id));
    };

    const handleToggleStatus = (id) => {
        setTasks(tasks.map(task => 
            task._id === id ? { ...task, status: !task.status } : task
        ));
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };
    
    const openAddModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const filterTasksByPriority = (priority) => {
        return tasks.filter(task => task.priority === priority);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <TaskModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveTask}
                task={editingTask} 
            />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center space-x-2 bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-300"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['High', 'Med', 'Low'].map(priority => (
                    <div key={priority} className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className={`font-bold text-lg mb-4 ${
                            priority === 'High' ? 'text-red-600' : 
                            priority === 'Med' ? 'text-yellow-600' : 'text-green-600'
                        }`}>{priority === 'Med' ? 'Medium' : priority} Priority</h2>
                        {filterTasksByPriority(priority).map(task => (
                            <TaskCard 
                                key={task._id} 
                                task={task} 
                                onEdit={openEditModal} 
                                onDelete={handleDeleteTask}
                                onToggleStatus={handleToggleStatus}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
