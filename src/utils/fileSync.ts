import fs from 'fs';
import node_path from 'path';

type OptionsType = {
  newline?: boolean;
};

export const safeAppendFileSync = (
  path: string,
  data: string,
  options: OptionsType
) => {
  const dir = node_path.dirname(path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.appendFileSync(path, options.newline ? `${data}\n` : data);
};

export const safeWriteFileSync = (path: string, data: string) => {
  const dir = node_path.dirname(path);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(path, data);
};

export const readJson = <T>(path: string): T => {
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
};
