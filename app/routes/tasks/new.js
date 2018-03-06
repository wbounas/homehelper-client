import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.get('store').createRecord('task', {})
  },
  actions: {
    save (newTask) {
      console.log('please run save');
      console.log('newTask is:', newTask);
      const taskName = newTask.get('name')
      console.log('taskName is:', taskName);
      return newTask.save()
        .then(() => this.transitionTo('tasks'))
    }
  }
});
