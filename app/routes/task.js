import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    const id = params.task_id
    return this.get('store').findRecord('task', id)
  },
  actions: {
    saveNotes (newThang) {
      // console.log('inside task route handler saveNotes, newThang is:', newThang);
      // console.log('newThang.task.id is:', newThang.task.id);
      const taskID = newThang.task.id
      const newThangNotes = newThang.notes
      // console.log('currentTask is:', currentTask);
      this.get('store').findRecord('task', taskID).then((task) => {
        task.set('notes', newThangNotes)
        task.save()
      })

      // NOTE: this doesn't work. why???
      // NOTE: currentTask was originally defined on line 15
      // NOTE: error says `cannot delegate set`
      // const currentTask = this.get('store').findRecord('task', taskID)
      // currentTask.set('notes', newThangNotes)
      // currentTask.save()
      // console.log('newer Task is:', currentTask);
    }
  }
});
