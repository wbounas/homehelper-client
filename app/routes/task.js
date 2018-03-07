import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    const id = params.task_id
    return this.get('store').findRecord('task', id)
  },
  actions: {
    saveNotes (updatedTask) {
      const taskID = updatedTask.task.get('id')
      delete updatedTask.task
      const clone = Object.assign({}, updatedTask)
      this.get('store').findRecord('task', taskID).then((task) => {
        console.log('taskID is:', taskID);
        // this is still empty. WHY?
        console.log(`updatedTask is:`, updatedTask);
        console.log(`clone is:`, clone);
        task.setProperties(clone)
        task.save()
      })
    }
  }
});
