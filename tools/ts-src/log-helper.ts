import {FileHelper} from './file-helper';
import * as path from 'path';

export class LogHelper {

  private static logLevel = 2;
  private static fileName: string = (new Date()).toISOString().split('T')[0] + '.log';
  private static folder: string = path.resolve('./log');

  public static appendLog(level: number, message: string) {
    console.log(message);
    if (level >= LogHelper.logLevel) {
      try {
        FileHelper.appendToFile(path.resolve(LogHelper.folder, LogHelper.fileName), message + '\n');
      } catch (e) {
        console.error('Error occurred while writting log entry.');
      }
    }
  }

  public static appendInfo(message: string) {
    LogHelper.appendLog(1, message);
  }

  public static appendError(message: string) {
    LogHelper.appendLog(2, message);
  }

  public static setLogFolder(pth: string) {
    LogHelper.folder = pth;
  }

  public static setLogLevel(level: number) {
    LogHelper.logLevel = level;
  }
}
