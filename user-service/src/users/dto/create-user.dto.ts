import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'L email è obbligatoria' })
  name: string;

  @IsEmail({}, { message: 'Inserisci un indirizzo email valido' })
  @IsNotEmpty({ message: 'L email è obbligatoria' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
