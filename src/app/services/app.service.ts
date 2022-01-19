import { Injectable } from '@nestjs/common';
import IReponseDefaultRoute from '../contract/IResponseDefaultRoute';

@Injectable()
export class AppService {
  getHello(): IReponseDefaultRoute {
    return {
      message:
        'This api is a proposed solution to the backend challenge at Wa Project',
    };
  }
}
