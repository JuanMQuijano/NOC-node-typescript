import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const URL = "https://www.google.com.co";

export class ServerApp {
  static start() {
    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log("success 1"),
        (error) => console.log(error)
      ).execute(URL);
    });

    CronService.createJob("*/60 * * * * *", () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log("success 2"),
        (error) => console.log(error)
      ).execute(URL);
    });
  }
}
