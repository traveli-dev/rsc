import { Arguments } from 'yargs';

export type YargsArgs = {
  path: `${string}/${string}`;
  repoName: string;
} & Arguments;
