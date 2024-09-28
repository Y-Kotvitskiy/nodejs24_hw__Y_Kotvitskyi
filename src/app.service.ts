import { Injectable, Request } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(body: any): string {
    return body?.message || `Cannot detect IP`;
  }
}
