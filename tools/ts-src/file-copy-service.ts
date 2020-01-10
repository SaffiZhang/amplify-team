import {FileHelper} from './file-helper';
import * as path from 'path';
import {DirectoryHelper} from './directory-helper';
import {LogHelper} from './log-helper';

export class FileCopyService {

  public static process(source: string, target: string) {
    try {
      const item = FileHelper.getFilesAndFolders(source);
      if (item.files && item.files.length > 0) {
        LogHelper.appendInfo(`Processing files under folder: ${source}`);
        item.files.forEach((x: string) => {
          const sr = path.resolve(source, x);
          const tr = path.resolve(target, x);
          try {
            FileHelper.copy(sr, tr);
            LogHelper.appendInfo(`File copied :${x}`);
            try {
              FileHelper.delete(sr);
              LogHelper.appendInfo(`File delete in source folder:${x}`);
            } catch (e0) {
              console.log(e0);
              LogHelper.appendError(`Error occurred while delete : ${x}`);
            }
          } catch (e) {
            console.log(e);
            LogHelper.appendError(`Error occurred while copy file: ${x}`);
          }
        });
      }
      if (item.dirs && item.dirs.length > 0) {
        item.dirs.forEach((x: string) => {
          LogHelper.appendInfo(`Processing sub folder "${x}" under "${source}"`);
          const sr = path.resolve(source, x);
          const tg = path.resolve(target, x);
          try {
            DirectoryHelper.ensureFolder(tg);
            FileCopyService.process(sr, tg);
          } catch (e) {
            console.log(e);
            LogHelper.appendError(`Error occurred while processing sub folder :${x}`);
          }
        });
      }
    } catch (e) {
      LogHelper.appendError(`Error occurred while reading files and folders in :${source}`);
    }
  }
}
