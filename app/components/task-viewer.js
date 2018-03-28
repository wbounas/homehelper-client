import Component from '@ember/component';

export default Component.extend({
  classNames: ['task-view'],
  editing: false,

  upTask: {
    // dummy: 'something now'
    // new notes will be inserted here
  },

  actions: {
    toggleComplete (task) {
      // toggle 'completed' property, and persist change to D-S and DB
      task.toggleProperty('completed')
      return task.save()
    },
    delete (task) {
      // sends `delete` action up to `task` route handler
      this.sendAction('delete', task)
    },
    save () {
      // functions to transform an object's keys
      let setAll = (obj, val) => { return Object.keys(obj).forEach(k => obj[k] = val);}
      let setNull = obj => setAll(obj, null);
      let delNull = obj => Object.keys(obj).forEach(k => {
        if (obj[k] === null) {
          delete obj[k]
        }
      })

      // grab modified keys inside of `upTask`
      let updatedTask = this.get('upTask')
      // assign the current task to `updatedTask`
      updatedTask.task = this.get('task')
      // assign the current room to `updatedTask`
      updatedTask.room = this.get('task.room')
      // delete any null keys inside of upTask
      delNull(this.get('upTask'))
      // send `updatedTask` up to route-handler
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
