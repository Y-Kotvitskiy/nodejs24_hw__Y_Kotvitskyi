import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { appendFile } from 'fs';
import { dirname } from 'path';

@Injectable()
export class IpLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const mainDir = dirname(require.main.filename);
    const logFile = 'access-ip.log';
    const logFullPath = `${mainDir}/../${logFile}`;
    const message =
      new Date().toISOString() + `: ${ip} ${method} ${originalUrl}`;
    request.body.message = message;
    appendFile(logFullPath, message + '\n', () => {});
    next();
  }
}

// import { NestMiddleware } from '@nestjs/common';

// export class IpLoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: (error?: Error | any) => void) {
//     const { ip:string } = req;

//     res.on("finish", () => {
//         const msg = `${ip} `;
//         this.logger.log(msg);
//     });    //throw new Error(`Method not implemented. ${JSON.stringify(req)}`);
//     next();
//   }
// }
