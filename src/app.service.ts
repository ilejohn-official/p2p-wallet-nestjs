import { Injectable } from '@nestjs/common';
import envVariables from "./config";

@Injectable()
export class AppService {
  getHello(): string {
    return `${envVariables.appName} is Online!`;
  }
}
