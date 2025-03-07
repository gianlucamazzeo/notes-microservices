import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Inserisci un indirizzo email valido' })
  @IsNotEmpty({ message: "L'email è obbligatoria" })
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsNotEmpty({ message: 'La password è obbligatoria' })
  @MinLength(6, { message: 'La password deve contenere almeno 6 caratteri' })
  password: string;
}
