import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.get('store').findAll('task')
  },
  actions: {
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
