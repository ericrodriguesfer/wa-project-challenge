import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import IReponseDefaultRoute from '../contract/IResponseDefaultRoute';
import { AppService } from '../services/app.service';

@ApiTags('wellcome')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'this is default route api, destined the a message of wellcome',
  })
  @ApiOkResponse({
    description: 'This api is working normally, welcome and explore',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  getHello(): IReponseDefaultRoute {
    return this.appService.getHello();
  }
}
