// Todo
import pubsub from '../external-libs/pubsub';

const run = () => {
  setInterval(() => {
    console.log('Sent: ', new Date());
    pubsub.publish('NOTIFY_TIME_DATA', {
      data: {
        date: new Date(),
        service: 'notification'
      }
    });
  }, 5000);
};

run();
