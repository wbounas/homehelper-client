import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    // grab the `task ID` from URL
    const id = params.task_id
    // return the task in D-S that matches the ID from params
    return this.get('store').findRecord('task', id)
  },
  actions: {
    deleteTask (task) {
      // delete task from D-S and DB
      return task.destroyRecord()
        // transition to `tasks` route after successful destroy action
        .then(() => this.transitionTo('tasks'))
    },
    saveNotes (updatedTask) {
      // take in ID of task sent from `task-viewer` component
      const taskID = updatedTask.task.get('id')
      // delete `task` key from `updatedTask`
      delete updatedTask.task
      // create a clone object of `updatedTask` to satisfy Ember.JS
      // NOTE: there is a race condition here, currently the `clone-object` fix is working
      // NOTE: need to implement a better fix
      const clone = Object.assign({}, updatedTask)
      this.get('store').findRecord('task', taskID).then((task) => {
        task.setProperties(clone)
        task.save()
      })
    }
  }
});
