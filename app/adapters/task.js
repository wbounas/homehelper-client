import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  createRecord(store, type, record) {
    const api = this.get('host')
    console.log('inside apater, record is:', record)
    const serialized = this.serialize(record, { includeId: true })
    const roomId = serialized.room_id
    const url = `${api}/tasks`
    const data = { task: serialized }
    console.log('roomId is:', roomId)
    return this.ajax(url, 'POST', { data })
  }
});
