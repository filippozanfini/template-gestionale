module.exports = {
    apps : [
        {
            name: "energie-be",
            script: "./node_modules/.bin/next",
            args: "start",
            exec_mode: "cluster",
            watch: false,
            interpreter: "/usr/bin/yarn",
            interpreter_args: "",
            cwd: "/home/altrama/deploy/backend/",
            env: {
                "PORT": 8000,
                "NODE_ENV": "production",
            }
        }
    ]
}
