import express from 'express';
const requestLoggerMiddleware = function (req: express.Request, resp: express.Response, next: express.NextFunction) {
    const start = new Date().getTime();
    resp.on('finish', function () {
        const elapsed = new Date().getTime() - start;
        console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
    });
    next();
};

export { requestLoggerMiddleware };
