import Component from '@ember/component';

export default Component.extend({
  classNames: ['task-view'],
  editing: false,

  newNote: {
    // new notes will be inserted here
  },

  actions: {
    save () {
      const newThang = this.get('newNote')
      newThang.task = this.get('task')
      console.log('inside task-viewer save, newThang is:', newThang);
      this.sendAction('saveNotes', newThang)
      this.toggleProperty('editing')
      newThang.notes = null
      newThang.req_tools = null
    },
    toggleEditing () {
      this.toggleProperty('editing')
    }
  }
});
