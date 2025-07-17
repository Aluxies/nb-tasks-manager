import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseUrl = "http://localhost:3001";

export const useTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetch(`${baseUrl}/api/tasks`).then(res => res.json())
    });
}

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskData) =>
            fetch(`${baseUrl}/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData)
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks']});
        },
    });
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskData) =>
            fetch(`${baseUrl}/api/tasks/${taskData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData)
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks']});
        },
    });
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete');

            queryClient.invalidateQueries({ queryKey: ['tasks']});
            // No data is sent back by the API
            return true;
        }
    });
}