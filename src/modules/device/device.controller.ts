import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/_core/controller.base';
import { ENDPOINT_PATH } from 'src/utils/constants/endpoint-path.constant';
import { DeviceService } from './device.service';

@ApiTags(ENDPOINT_PATH.DEVICE.BASE)
@Controller(`${ENDPOINT_PATH.DEVICE.BASE}`)
export class DeviceController extends BaseController {
    constructor(private readonly deviceService: DeviceService) {
        super();
    }

    @Post(ENDPOINT_PATH.DEVICE.SYNC_FROM_CLOUD)
    @HttpCode(HttpStatus.OK)
    async syncFromCloud(
    ) {
        const response = await this.deviceService.syncFromCloud();
        return this.successResponse(response);
    }
}
