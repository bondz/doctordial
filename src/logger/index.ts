import bunyan from 'bunyan';

const name = `Doctordial - ${process.env.NODE_ENV}`;

export default bunyan.createLogger({
  name,
  streams: [
    {
      stream: process.stdout,
      level: 'debug',
    },
  ],
  serializers: bunyan.stdSerializers,
});
