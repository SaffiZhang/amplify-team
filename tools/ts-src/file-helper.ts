import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {

  public static fileExists(fn: string) {
    return fs.existsSync(fn);
  }

  public static readContent(fn: string): string {
    return fs.readFileSync(fn).toString();
  }

  public static copy(source: string, target: string) {
    fs.copyFileSync(source, target);
  }

  public static delete(source: string) {
    fs.unlinkSync(source);
  }

  public static resolve(fn: string) {
    return path.resolve(fn);
  }

  public static getFilesAndFolders(pth: string): any {
    const dirs: string[] = [];
    const files: string[] = [];
    const items = fs.readdirSync(pth);
    console.log(items);
    items.forEach(x => {
      const y = path.resolve(pth, x);
      const state = fs.statSync(path.resolve(pth, x));
      if (state.isDirectory()) {
        dirs.push(x);
      } else if (state.isFile()) {
        files.push(x);
      }
    });
    return {
      dirs,
      files
    };
  }

  public static appendToFile(file: string, line: string) {
      fs.appendFileSync(file, line);
  }
}
