const mongoose = require('mongoose');
const task = mongoose.model('task');

exports.list_all_tasks = (request, response) => {
    task.find({}, (error, tasks) => {
        if(error) response.send(error);
        response.json(tasks);
    });
};

exports.create_a_task = (request, response) => {
    const newTask = new task(request.body);
    newTask.save((error, task) => {
        if (error) response.send(error);
        response.json(task);
    });
};

exports.read_a_task = (request, response) => {
    task.findById(request.params.taskId, (error, task) => {
        if (error) response.send(error);
        response.json(task);
    });
};

exports.update_a_task = (request, response) => {
    task.findOneAndUpdate(
        { _id: require.params.taskId },
        request.body,
        { new: true },
        (error, task) => {
            if (error) response.send(error);
            response.json(task);
        }
    );
};

exports.delete_a_task = (require, response) => {
    task.deleteOne({ _id: require.params.taskId }, error => {
        if (error) response.send(error);
        response.json({
            message: 'task successfully deleted',
            _id: require.params.taskId
        });
    });
};
