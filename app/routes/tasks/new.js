import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.get('store').createRecord('task', {});
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
    save (newTask) {
      console.log('please run save');
      console.log('newTask is:', newTask);
      const hooray = this.get('currentModel')
      console.log('hooray is:', hooray);
      const taskName = newTask.get('name');
      const taskRoom = newTask.get('room_id')
      this.get('store').findRecord('room', taskRoom)
        .then((room) => {
          newTask.set('room', room)
          return newTask.save()
        })
        .then(() => this.transitionTo('tasks'));
      console.log('taskName is:', taskName);
      console.log('taskRoom is:', taskRoom);
    },
    deleteTask (newTask) {
      console.log('please run deleteTask');
      console.log('newTask is:', newTask);
      const taskName = newTask.get('name');
      console.log('taskName is:', taskName);
      return newTask.destroyRecord('task', newTask)
        .then(() => this.transitionTo('tasks'));
    }
  }
});
