import { IsNumberString, IsString, Length } from 'class-validator';

export class CreateSuggestionDto {
  @IsString()
  @Length(6, 6)
  @Length(6, 6, {message: 'errorCode deve conter 6 caracteres'})
  @IsNumberString({}, { message: 'errorCode deve conter apenas números' })
  errorCode: string;

  @IsString()
  text: string;
}
