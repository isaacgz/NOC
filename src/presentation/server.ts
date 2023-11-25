import { CheckService } from "../domain/use-cases/checks/check-service";
import { SenEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemRepository  = new LogRepositoryImpl(
    new FileSystemDataSource()
)

const emailService = new EmailService();


export class Server {

    public static start(){

        console.log('Server started...');
        
        //mandar email
        // new SenEmailLogs(
        //     emailService,
        //     fileSystemRepository
        // ).execute(
        //     ['joelgarcia405@gmail.com','joelisaac_99@hotmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs(
        //     ['joelgarcia405@gmail.com','joelisaac_99@hotmail.com']
        // )


        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             fileSystemRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url);
        //     }
        // );
    }

}


