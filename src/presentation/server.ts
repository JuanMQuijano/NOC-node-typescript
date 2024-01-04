import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
  static start() {
    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        () => console.log("success 1"),
        (error) => console.log(error)
      ).execute("http://localhost:3000");
    });

    CronService.createJob("*/60 * * * * *", () => {
      new CheckService(
        () => console.log("success 2"),
        (error) => console.log(error)
      ).execute("https://google.com");
    });
  }
}
