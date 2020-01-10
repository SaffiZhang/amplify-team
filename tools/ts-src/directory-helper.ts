
import * as fs from 'fs';

export class DirectoryHelper {
  public static ensureFolder(pth: string) {
    if (!fs.existsSync(pth)) {
      fs.mkdirSync(pth);
    }
  }

  public static ensureAllFolders(paths: string[]): boolean {

    if (paths) {
      try {
        paths.forEach(p => {
          DirectoryHelper.ensureFolder(p);
        });
      } catch (e) {
        return false;
      }
    }
    return true;
  }

  public static exists(pth: string): boolean {
    return fs.existsSync(pth);
  }
}
