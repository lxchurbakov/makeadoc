const API_HOST = 'http://localhost:3000';

const submit = (url: string, body) => fetch(`${API_HOST}${url}`, { method: 'POST', body });
const post = (url: string, body) => fetch(`${API_HOST}${url}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
const get = (url: string) => fetch(`${API_HOST}${url}`);
const remove = (url: string) => fetch(`${API_HOST}${url}`, { method: 'DELETE' });

export const api = {
    templates: {
        upload: (file: File) => {
            const formData = new FormData();

            formData.append('file', file);

            return submit('/templates', formData).then((r) => r.json());
        },
        all: () => {
            return get('/templates').then((r) => r.json());
        },
        remove: (id: string) => {
            return remove(`/templates/${id}`).then((r) => r.json());
        },
    },
    documents: {
        create: (templateId, meta) => post('/documents', { templateId, meta }).then((r) => r.json()),
        all: () => get('/documents').then((r) => r.json()),
        pdf: (id: string) => get(`/documents/${id}/pdf`).then((r) => r.blob()).then((data) => {
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(data);
            a.download = `document-${id}`;
            a.click();
        }),
        remove: (id: string) => {
            return remove(`/documents/${id}`).then((r) => r.json());
        },
    },
};
