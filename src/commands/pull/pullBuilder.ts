import yargs from 'yargs';

export const pullBuilder = (yarg: yargs.Argv) => {
  yarg
    .option('path', {
      describe: 'path of the file you want to share',
      type: 'string',
      demandOption: true,
      normalize: true
    })
    .option('repoName', {
      describe: 'your github repository name ex. traveli-app',
      type: 'string',
      demandOption: true
    });
};
