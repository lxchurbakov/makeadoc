export const route = (f) => (req, res, next) => {
    try {
        Promise.resolve(f(req, res)).then((d) => res.json(d)).catch((err) => next(err));
    } catch (e) {
        next(e);
    }
};

export class HttpError extends Error {
    constructor(public statusCode: number, public body: string, ...args: any[]) {
        super(...args);
    }
};
