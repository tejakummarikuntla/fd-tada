exports = {

  events: [
    { event: 'onTicketCreate', callback: 'onTicketCreateHandler' },
    { event: 'onTicketUpdate', callback: 'onTicketUpdateHanler'}
  ],

  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onTicketCreateHandler: function(args) {
    console.log('Hello ' + args['data']['requester']['name']);
  },

  onTicketUpdateHanler: function(args) {
    console.log("Ticket Updated!!")
  }
  
};
/**
 * UI -> Button
 * Usecase - clicked -> smi -(invoke a function in server.js) -> randomecode -(renderData();)-> UI -> button -(client.interface.something) -> editor
 */