import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.get('store').findAll('task')
  },
  actions: {
    toggleComplete (task) {
      console.log('task is:', task);
      task.toggleProperty('completed')
      return task.save()
    },
    move (task) {
      return this.transitionTo('task', task)
    },
    deleteTask (task) {
      console.log('does deleteTask work?');
      return task.destroyRecord()
        .then(() => this.transitionTo('tasks'))
    }
  }
});
