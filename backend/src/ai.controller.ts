import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  async recommend(@Body() body: { profession: string }) {
    return this.aiService.getRecommendation(body.profession);
  }

  @Post('setup-plan')
  async setup(@Body() body: { packageId: string }) {
    return this.aiService.getSetupPlan(body.packageId);
  }
}
