import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    const id = params.task_id
    return this.get('store').findRecord('task', id)
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      let model = controller.get('model');
      if (model.get('isNew') && !model.get('isSaving')) {
        model.deleteRecord();
      }
    }
  },
  actions: {
    deleteTask (task) {
      console.log('does deleteTask work?');
      return task.destroyRecord()
        .then(() => this.transitionTo('tasks'))
    },
    saveNotes (updatedTask) {
      const taskID = updatedTask.task.get('id')
      delete updatedTask.task
      const clone = Object.assign({}, updatedTask)
      this.get('store').findRecord('task', taskID).then((task) => {
        console.log('taskID is:', taskID);
        console.log('inside taskview task is:', task);
        console.log(`updatedTask is:`, updatedTask);
        console.log(`clone is:`, clone);
        task.setProperties(clone)
        task.save()
      })
    }
  }
});
