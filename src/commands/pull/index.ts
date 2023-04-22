import { pullBuilder } from '@/commands/pull/pullBuilder';
import { pullHandler } from '@/commands/pull/pullHandler';

export const pull = {
  command: 'pull',
  describe: '共有したいファイル',
  builder: pullBuilder,
  handler: pullHandler
};
