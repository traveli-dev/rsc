import { pushBuilder } from '@/commands/push/pushBuilder';
import { pushHandler } from '@/commands/push/pushHandler';

export const push = {
  command: 'push',
  describe: '共有したいファイル',
  builder: pushBuilder,
  handler: pushHandler
};
