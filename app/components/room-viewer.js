import Component from '@ember/component';

export default Component.extend({
  classNames: ['room-view'],
  editing: false,

  upRoom: {
    // dummy: 'something now'
    // new notes will be inserted here
  },

  newTask: {
    // new task name will be inserted here
  },

  actions: {
    toggleComplete (room) {
      this.sendAction('toggleComplete', room)
    },
    delete (room) {
      console.log('does delete work?');
      console.log('room is', room);
      this.sendAction('delete', room)
    },
    saveTask (newTask) {
      const taskName = newTask.get('name');
      const taskRoom = this.currentModel('room')
      newTask.room = taskRoom
      this.get('store').createRecord('task', {})
        .then(task => {
          task.setProperties(newTask)
          task.save()
          const ok = task
        })

      console.log('taskRoom is:', taskRoom);
      this.get('store').findRecord('room', taskRoom)
        .then((room) => {
          room.tasks.pushObject(newTask)
          return newTask.save()
        })
        .then(() => this.transitionTo('tasks'));
    },
    save () {
      let setAll = (obj, val) => { return Object.keys(obj).forEach(k => obj[k] = val);}
      let setNull = obj => setAll(obj, null);
      let delNull = obj => Object.keys(obj).forEach(k => {
        if (obj[k] === null) {
          delete obj[k]
        }
      })

      let updatedRoom = this.get('upRoom')
      updatedRoom.room = this.get('room')
      delNull(this.get('upRoom'))
      this.sendAction('saveNotes', updatedRoom)
      this.toggleProperty('editing')
      updatedRoom = {}
      setNull(this.get('upRoom'))
      delNull(this.get('upRoom'))
    },
    toggleEditing () {
      this.toggleProperty('editing')
    }
  }
});
