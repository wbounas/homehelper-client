import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    const id = params.task_id
    return this.get('store').findRecord('room', id)
  },
  actions: {
    deleteRoom (room) {
      console.log('does deleteRoom work?');
      return room.destroyRecord()
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
