import React from "react";
import TASK_PRIORITIES from "../../constants/taskPriorities.js";

function PriorityDropdown({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border border-gray-400 rounded-lg px-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
            {TASK_PRIORITIES.map(priorityEntry => (
                <option value={priorityEntry.value}>{priorityEntry.label}</option>
            ))}
        </select>
    );
}

export default PriorityDropdown;
