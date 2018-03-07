import Component from '@ember/component';

export default Component.extend({
  classNames: ['task-view'],
  editing: false,

  upTask: {
    // dummy: 'something now'
    // new notes will be inserted here
  },

  actions: {
    delete (task) {
      console.log('does delete work?');
      console.log('task is', task);
      this.sendAction('delete', task)
    },
    save () {
      let setAll = (obj, val) => { return Object.keys(obj).forEach(k => obj[k] = val);}
      let setNull = obj => setAll(obj, null);
      let delNull = obj => Object.keys(obj).forEach(k => {
        if (obj[k] === null) {
          delete obj[k]
        }
      })

      let updatedTask = this.get('upTask')
      updatedTask.task = this.get('task')
      console.log('updatedTask.task is:', updatedTask.task);
      console.log('inside task-viewer save, updatedTask is:', updatedTask);
      console.log('upTask is:', this.get('upTask'));
      delNull(this.get('upTask'))
      this.sendAction('saveNotes', updatedTask)
      this.toggleProperty('editing')
      updatedTask = {}
      setNull(this.get('upTask'))
      delNull(this.get('upTask'))
    },
    toggleEditing () {
      this.toggleProperty('editing')
    }
  }
});
