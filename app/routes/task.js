import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    const id = params.task_id
    return this.get('store').findRecord('task', id)
  }
});
