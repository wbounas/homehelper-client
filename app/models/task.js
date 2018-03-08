import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  priority: DS.attr('number'),
  difficulty: DS.attr('string'),
  description: DS.attr('string'),
  est_time: DS.attr('number'),
  req_tools: DS.attr('string'),
  notes: DS.attr('string'),
  completed: DS.attr('boolean'),
  room: DS.belongsTo('room')
});
