import Component from '@ember/component';

export default Component.extend({
  classNames: ['task-view'],
  editing: false,
  actions: {
    toggleEditing () {
      this.toggleProperty('editing')
    }
  }
});
