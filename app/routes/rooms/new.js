import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.get('store').createRecord('room', {});
  },
  actions: {
    save (newRoom) {
      // newRoom is passed in from save action in template
      const roomName = newRoom.get('name');
      console.log('roomName is:', roomName);
      return newRoom.save()
        .then(() => this.transitionTo('rooms'))
    },
    deleteRoom (newRoom) {
      const roomName = newRoom.get('name');
      return newRoom.destroyRecord('room', newRoom)
        .then(() => this.transitionTo('rooms'));
    }
  }
});
