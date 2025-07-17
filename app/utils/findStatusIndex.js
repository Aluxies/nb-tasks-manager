import TASK_STATUSES from "../constants/taskStatuses.js";

export function findStatusIndex(status) {
    return TASK_STATUSES.map(x=> x.value).indexOf(status);
}