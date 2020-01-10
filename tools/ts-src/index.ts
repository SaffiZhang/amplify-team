import {Config} from './config';
import {FileCopyService} from './file-copy-service';
import {LogHelper} from './log-helper';


const cfg = new Config();
if (!cfg.init()) {
  process.exit(1);
}
LogHelper.appendInfo('Process start ... ' + (new Date()).toISOString());
try {
  FileCopyService.process(cfg.sourcePath, cfg.targetPath);
} catch (e) {
  LogHelper.appendError(`Error occurred while process folder: ${cfg.sourcePath}`);
}

LogHelper.appendInfo('Process finished. ' + (new Date()).toISOString());
LogHelper.appendInfo('------------------');
