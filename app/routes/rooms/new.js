import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  flashMessages: service(),

  model () {
    return this.get('store').createRecord('room', {});
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      let model = controller.get('model');
      if (model.get('isNew') && !model.get('isSaving')) {
        model.deleteRecord();
      }
    }
  },
  actions: {
    save (newRoom) {
      // newRoom is passed in from save action in template
      const roomName = newRoom.get('name');
      console.log('roomName is:', roomName);
      if (roomName === undefined) {
        this.get('flashMessages')
        .danger('You need to insert a room name.')
      } else {
        return newRoom.save()
          .then(() => {
            this.get('flashMessages')
            .success('Room Created')
          })
          .then(() => this.transitionTo('rooms'))
          .catch(() => {
            this.get('flashMessages')
            .danger('There was a problem. Please try again.')
          })
      }
    },
    deleteRoom (newRoom) {
      const roomName = newRoom.get('name');
      return newRoom.destroyRecord('room', newRoom)
        .then(() => this.transitionTo('rooms'));
    }
  }
});
