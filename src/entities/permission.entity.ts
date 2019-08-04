import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IsDefined, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';

import { Role } from '@/entities/role.entity';

const { CREATE } = CrudValidationGroups;

@Entity()
export class Permission {
  @ApiModelProperty()
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @IsDefined({ groups: [CREATE] })
  @Column('text', { unique: true })
  name: string;

  @ApiModelProperty()
  @ManyToMany(type => Role, role => role.permissions)
  roles: Role[];
}
