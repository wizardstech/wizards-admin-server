import { ApiModelProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiModelProperty()
  token: string;

  @ApiModelProperty()
  expiresIn: number;
}
