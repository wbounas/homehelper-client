import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  notes: DS.attr('string'),
  size: DS.attr('number'),
  priority: DS.attr('number'),
  completed: DS.attr('boolean'),
  tasks: DS.hasMany('task')
});
