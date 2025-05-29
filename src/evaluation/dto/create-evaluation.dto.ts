import { Transform } from 'class-transformer';
import { IsString, IsBoolean, Length, IsInt, IsNumberString } from 'class-validator';

export class CreateEvaluationDto {
  @IsString()
  @Length(6, 6, {message: 'O código de erro deve conter 6 dígitos'})
  @IsNumberString({}, { message: 'errorCode deve conter apenas números' })
  errorCode: string;
  
  @IsString()
  @Length(6, 6)
  @Length(6, 6, {message: 'clientCode deve conter 6 caracteres'})
  @IsNumberString({}, { message: 'clientCode deve conter apenas números' })
  clientCode: string;

  @IsBoolean()
  rating: boolean; 

  @IsString()
  comment?: string;

  @IsInt()
  suggestionId: number;
}
