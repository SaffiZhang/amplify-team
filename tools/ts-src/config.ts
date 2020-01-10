import {FileHelper} from './file-helper';
import {DirectoryHelper} from './directory-helper';
import {LogHelper} from './log-helper';

export class Config {

  private configFile = './config.json';
  private cfg: any;

  constructor() {
  }

  public init(): boolean {
    const configFile = FileHelper.resolve(this.configFile);

    if (!FileHelper.fileExists(configFile)) {
      LogHelper.appendError('config.json not found');
      return false;
    }

    try {
      const content = FileHelper.readContent(configFile);
      this.cfg = JSON.parse(content);
      console.log(this.cfg);
    } catch (e) {
      LogHelper.appendError('Error occurred while log config file');
      return false;
    }
    if (!this.cfg) {
      return false;
    }
    if (!this.cfg.hasOwnProperty('source')) {
      LogHelper.appendError('source folder not found in config.json');
      return false;
    }
    if (!this.cfg.hasOwnProperty('target')) {
      LogHelper.appendError('target folder not found in config.json');
      return false;
    }
    if (!this.cfg.hasOwnProperty('log')) {
      this.cfg.log = './log';
    }
    this.cfg.sourcePath = FileHelper.resolve(this.cfg.source);
    if (!DirectoryHelper.exists(this.cfg.sourcePath)) {
      LogHelper.appendError(`soruce folder: ${this.cfg.source} does not exists`);
      return false;
    }
    this.cfg.targetPath = FileHelper.resolve(this.cfg.target);
    this.cfg.logPath = FileHelper.resolve(this.cfg.log);

    if (!DirectoryHelper.ensureAllFolders(
      [FileHelper.resolve(this.cfg.targetPath),
        FileHelper.resolve(this.cfg.logPath)])) {
      LogHelper.appendError('Error on creating target/log folder');
    }

    LogHelper.setLogFolder(this.cfg.logPath);
    if (this.cfg.hasOwnProperty('logLevel')) {
      const level = parseInt(this.cfg.logLevel, 10);
      LogHelper.setLogLevel(level);
    } else {
      LogHelper.setLogLevel(2); // error only;
    }
    console.log(this.cfg);

    return true;
  }

  public get sourcePath() {
    return this.cfg.sourcePath;
  }

  public get targetPath() {
    return this.cfg.targetPath;
  }
}
