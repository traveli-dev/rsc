import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const help = `
HELP
	helpだよ
`;

export const cli = (argv: string[], commands: any): void => {
  yargs(hideBin(argv)).scriptName('rsc').usage(help).command(commands).help()
    .argv;
};
