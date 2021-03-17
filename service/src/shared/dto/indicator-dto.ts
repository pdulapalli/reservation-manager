import { IsBoolean } from 'class-validator';

export class IndicatorDto {
  @IsBoolean()
  success: boolean;
}
