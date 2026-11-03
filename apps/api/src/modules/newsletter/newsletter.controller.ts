import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';
import { NewsletterService } from './newsletter.service.js';
class SubscribeDto { @IsEmail() @MaxLength(191) email!: string; }
@ApiTags('Newsletter') @Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletter: NewsletterService) {}
  @Post('subscriptions') @HttpCode(HttpStatus.OK)
  subscribe(@Body() body: SubscribeDto): Promise<Record<string, boolean>> { return this.newsletter.subscribe(body.email); }
}
