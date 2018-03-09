import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  flashMessages: service(),

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
      // console.log('please run save');
      // console.log('newTask is:', newTask);
      // const hooray = this.get('currentModel')
      // console.log('hooray is:', hooray);
      const taskName = newTask.get('name');
      const taskRoom = newTask.get('room_id')
      if (taskRoom === undefined) {
        this.get('flashMessages')
        .danger('You need to insert a room id.')
      }
      this.get('store').findRecord('room', taskRoom)
        .then((room) => {
          newTask.set('room', room)
          return newTask.save()
        })
        .then(() => {
          this.get('flashMessages')
          .success('Task Created')
        })
        .then(() => this.transitionTo('tasks'))
        .catch(() => {
          this.get('flashMessages')
          .danger('There was a problem. Please try again.')
        })
      // console.log('taskName is:', taskName);
      // console.log('taskRoom is:', taskRoom);
    },
    deleteTask (newTask) {
      // console.log('please run deleteTask');
      // console.log('newTask is:', newTask);
      const taskName = newTask.get('name');
      // console.log('taskName is:', taskName);
      return newTask.destroyRecord('task', newTask)
        .then(() => {
          this.get('flashMessages')
          .success('Task Deleted')
        })
        .then(() => this.transitionTo('tasks'))
        .catch(() => {
          this.get('flashMessages')
          .danger('There was a problem. Please try again.')
        });
    }
  }
});
