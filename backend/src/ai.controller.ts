import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  async recommend(@Body() body: { profession: string; context?: any }) {
    return this.aiService.recommend(body.profession, body.context);
  }

  @Post('setup-plan')
  async setupPlan(@Body() body: { packageId: string; businessInfo?: any }) {
    return this.aiService.setupPlan(body.packageId, body.businessInfo);
  }
}
