import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    const id = params.room_id
    return this.get('store').findRecord('room', id, {reload: true})
  },
  actions: {
    error(error, transition) {
      if (error.status === '403') {
        this.replaceWith('sign-in');
      } else {
        // Let the route above this handle the error.
        return true;
      }
    },
    toggleComplete (room) {
      room.toggleProperty('completed')
      return room.save()
    },
    deleteRoom (room) {
      // console.log('does deleteRoom work?');
      let tasks = room.hasMany('tasks').value().toArray();
      return room.destroyRecord()
        .then(() => {
          tasks.forEach((task) => {
            // console.log('task is:', task);
            task.unloadRecord()
          })
        })
        .then(() => this.transitionTo('rooms'))
    },
    saveNotesRoom (updatedRoom) {
      const roomID = updatedRoom.room.get('id')
      delete updatedRoom.room
      const clone = Object.assign({}, updatedRoom)
      this.get('store').findRecord('room', roomID).then((room) => {
        room.setProperties(clone)
        room.save()
      })
    }
  }
});
