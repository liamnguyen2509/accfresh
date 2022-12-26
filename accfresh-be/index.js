const server = require('./server');

const port = process.env.PORT || 5000;

const startServer = () => {
    server.listen(443, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();