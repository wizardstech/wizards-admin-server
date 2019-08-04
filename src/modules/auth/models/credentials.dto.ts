
import { ApiModelProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly password: string;
}
