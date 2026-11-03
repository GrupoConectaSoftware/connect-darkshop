import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, Equals, IsBoolean, IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../../generated/prisma/client.js';

export class RegisterDto {
  @ApiProperty({ example: 'Camilo Pérez' })
  @IsString() @MinLength(2) @MaxLength(160)
  fullName!: string;

  @ApiProperty({ example: 'camilo@example.com' })
  @IsEmail() @MaxLength(191)
  email!: string;

  @ApiProperty({ minLength: 8, example: 'ClaveSegura123' })
  @IsString() @MinLength(8) @MaxLength(72)
  @Matches(/[A-Z]/, { message: 'password debe tener una mayúscula.' })
  @Matches(/[a-z]/, { message: 'password debe tener una minúscula.' })
  @Matches(/\d/, { message: 'password debe tener un número.' })
  password!: string;

  @ApiProperty({ example: true, description: 'Debe ser true para aceptar los términos.' })
  @IsBoolean() @Equals(true, { message: 'Debes aceptar los términos y condiciones.' })
  acceptedTerms!: boolean;

  @ApiPropertyOptional({ enum: [UserRole.BUYER, UserRole.SELLER] })
  @IsOptional() @IsEnum(UserRole)
  role?: UserRole;
}

export class LoginDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(1) password!: string;
}

export class RefreshDto {
  @IsString() @MinLength(20) refreshToken!: string;
}

export class UpdateProfileDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(160) fullName?: string;
  @IsOptional() @IsString() @MaxLength(32) phone?: string;
  @IsOptional() @IsString() @MaxLength(100) city?: string;
}

export class UpsertAddressDto {
  @IsString() @MinLength(5) @MaxLength(250) line1!: string;
  @IsOptional() @IsString() @MaxLength(100) city?: string;
}

export class UpdatePreferencesDto {
  @IsArray() @ArrayMaxSize(30) @IsString({ each: true }) @MaxLength(50, { each: true }) styles!: string[];
  @IsArray() @ArrayMaxSize(30) @IsString({ each: true }) @MaxLength(50, { each: true }) categories!: string[];
  @IsArray() @ArrayMaxSize(30) @IsString({ each: true }) @MaxLength(80, { each: true }) brands!: string[];
}
