import path from 'node:path';
import fs from 'node:fs';

export function getDataDir(): string {
  if (process.env.DATA_DIR) {
    return path.resolve(process.env.DATA_DIR);
  }

  // Walk up from current dir until we find 'data' directory or reach root
  let currentDir = process.cwd();
  for (let i = 0; i < 5; i++) {
    const candidatePath = path.join(currentDir, 'data');
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }

  // Fallback to relative to process cwd
  return path.resolve(process.cwd(), 'data');
}
