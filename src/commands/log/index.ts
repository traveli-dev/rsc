import yargs from 'yargs';

export const log: yargs.CommandModule = {
  command: 'log',
  describe: 'あいうえお',
  builder: {
    title: {
      describe: 'ags',
      type: 'string'
    }
  },
  handler: () => {
    console.log('logです');
  }
};
