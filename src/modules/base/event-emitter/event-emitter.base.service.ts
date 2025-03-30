import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Request } from 'express';
import { Repository } from 'src/repositories/repository';
import {
  COUNT_MAX_LISTENERS,
} from 'src/utils/constants/event-emitter.constant';

@Injectable()
export class EventEmitterService {
  private static eventEmitter: EventEmitter2;
  constructor(
    private model: Repository,
    @Inject(REQUEST) public readonly req: Request,
    eventEmitter: EventEmitter2,
  ) {
    if (!EventEmitterService.eventEmitter) {
      EventEmitterService.eventEmitter = eventEmitter;
    }
    EventEmitterService.eventEmitter.setMaxListeners(COUNT_MAX_LISTENERS);
  }

  static getIns() {
    return EventEmitterService.eventEmitter;
  }



}
