import fs, { writeFileSync } from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




export class FileSystemDataSource implements LogDatasource {
    
    private readonly logPäth = 'logs/';
    private readonly allLogsPäth = 'logs/logs-all.log';
    private readonly mediumLogsPäth = 'logs/logs-medium.log';
    private readonly highLogsPäth = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if( !fs.existsSync(this.logPäth)){
            fs.mkdirSync(this.logPäth);
        }

        [
            this.allLogsPäth,
            this.mediumLogsPäth,
            this.highLogsPäth
        ].forEach( path => {
            if ( fs.existsSync( path )) return;

            fs.writeFileSync(path,'');
        })
    }


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog)}\n`;

        fs.appendFileSync( this.allLogsPäth, logAsJson);

        if ( newLog.level === LogSeverityLevel.low) return;

        if ( newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync( this.mediumLogsPäth, logAsJson);
        }else{
            fs.appendFileSync( this.highLogsPäth, logAsJson);
        }
    }



    private getLogsFromFile = ( path:string ): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(LogEntity.fromJson);
        // const logs = content.split('\n').map(
        //     log => LogEntity.fromJson(log)
        // );

        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPäth);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPäth);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPäth);
            
            default:
                throw new Error(`${ severityLevel } not implemented`);
        }
    }

}
