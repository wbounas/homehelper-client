import Component from '@ember/component';

export default Component.extend({
  classNames: ['room-view'],
  editing: false,

  upRoom: {
    // dummy: 'something now'
    // new notes will be inserted here
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
