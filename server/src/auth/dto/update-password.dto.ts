import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'New password must be at least 6 characters long',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Confirm password must be at least 6 characters long',
  })
  confirmPassword: string;
}
