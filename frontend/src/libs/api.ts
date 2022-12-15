const API_HOST = 'http://localhost:3000';

// , headers: { 'Content-Type': 'application/json' }

const post = (url: string, body) => fetch(`${API_HOST}${url}`, { method: 'POST', body }).then((r) => r.json());
const get = (url: string) => fetch(`${API_HOST}${url}`).then((r) => r.json());
const remove = (url: string) => fetch(`${API_HOST}${url}`, { method: 'DELETE' }).then((r) => r.json());

export const api = {
    templates: {
        upload: (file: File) => {
            const formData = new FormData();

            formData.append('file', file);

            return post('/templates', formData);
        },
        all: () => {
            return get('/templates');
        },
        remove: (id: string) => {
            return remove(`/templates/${id}`);
        },
    },
};
