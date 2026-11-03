import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated, type AuthenticatedRequest } from '../../common/auth.js';
import { diskStorage } from 'multer';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { AuthService } from './auth.service.js';
import { LoginDto, RefreshDto, RegisterDto, UpdatePreferencesDto, UpdateProfileDto, UpsertAddressDto } from './dto.js';

const avatarExtension: Record<string, string> = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register') @ApiCreatedResponse({ description: 'Cuenta y sesión creadas.' })
  register(@Body() body: RegisterDto): Promise<Record<string, unknown>> { return this.auth.register(body); }

  @Post('login') @HttpCode(HttpStatus.OK) @ApiOkResponse({ description: 'Sesión iniciada.' })
  login(@Body() body: LoginDto): Promise<Record<string, unknown>> { return this.auth.login(body); }

  @Post('refresh') @HttpCode(HttpStatus.OK)
  refresh(@Body() body: RefreshDto): Promise<Record<string, unknown>> { return this.auth.refresh(body.refreshToken); }

  @Post('logout') @HttpCode(HttpStatus.NO_CONTENT) @ApiBearerAuth() @Authenticated()
  async logout(@Req() request: AuthenticatedRequest): Promise<void> { await this.auth.logout(request.user.sub); }

  @Get('me') @ApiBearerAuth() @Authenticated()
  profile(@Req() request: AuthenticatedRequest): Promise<Record<string, unknown>> { return this.auth.profile(request.user.sub); }

  @Patch('me') @ApiBearerAuth() @Authenticated()
  updateProfile(@Req() request: AuthenticatedRequest, @Body() body: UpdateProfileDto): Promise<Record<string, unknown>> { return this.auth.updateProfile(request.user.sub, body); }

  @Get('me/address') @ApiBearerAuth() @Authenticated()
  address(@Req() request: AuthenticatedRequest): Promise<Record<string, unknown> | null> { return this.auth.address(request.user.sub); }
  @Patch('me/address') @ApiBearerAuth() @Authenticated()
  saveAddress(@Req() request: AuthenticatedRequest, @Body() body: UpsertAddressDto): Promise<Record<string, unknown>> { return this.auth.saveAddress(request.user.sub, body); }
  @Get('me/preferences') @ApiBearerAuth() @Authenticated()
  preferences(@Req() request: AuthenticatedRequest): Promise<Record<string, unknown>> { return this.auth.preferences(request.user.sub); }
  @Patch('me/preferences') @ApiBearerAuth() @Authenticated()
  savePreferences(@Req() request: AuthenticatedRequest, @Body() body: UpdatePreferencesDto): Promise<Record<string, unknown>> { return this.auth.savePreferences(request.user.sub, body); }

  @Post('me/avatar') @ApiBearerAuth() @Authenticated()
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: Number(process.env.UPLOAD_MAX_FILE_SIZE ?? 5_242_880) },
    fileFilter: (_request, file, callback) => callback(null, ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)),
    storage: diskStorage({ destination: (_request, _file, callback) => { const directory = join(process.cwd(), 'uploads', 'avatars'); mkdirSync(directory, { recursive: true }); callback(null, directory); }, filename: (_request, file, callback) => callback(null, `${randomUUID()}${avatarExtension[file.mimetype]}`) }),
  }))
  async avatar(@Req() request: AuthenticatedRequest, @UploadedFile() file?: Express.Multer.File): Promise<Record<string, unknown>> {
    if (!file) throw new BadRequestException('Debes adjuntar una imagen JPEG, PNG o WebP en el campo file.');
    return this.auth.updateAvatar(request.user.sub, `/uploads/avatars/${file.filename}`);
  }
}
