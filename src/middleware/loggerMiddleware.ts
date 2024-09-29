import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class loggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    console.log(`se recibio una peticion ${req.method} en la ruta ${req.url}`);
    next();
  }
}

// middleware Global

export function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  const ahora = new Date().toLocaleTimeString()
  console.log(`se recibio una peticion ${req.method} en la ruta ${req.url} a las ${ahora}`);
  next();
}
