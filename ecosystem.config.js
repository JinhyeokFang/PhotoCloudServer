module.exports = {
    apps: [{
        name: 'photocloud',
        script: './dist/server.js',
        instances: 0,
        wait_ready: true,
        listen_timeout: 50000,
        kill_timeout: 5000,
        exec_mode: "cluster"
    }]
};