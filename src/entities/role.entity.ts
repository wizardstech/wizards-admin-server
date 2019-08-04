import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IsDefined, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';

import { User } from './user.entity';
import { Permission } from './permission.entity';

const { CREATE } = CrudValidationGroups;

@Entity()
export class Role {
  @ApiModelProperty()
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @IsDefined({ groups: [CREATE] })
  @Column('text', { unique: true })
  name: string;

  @ApiModelProperty()
  @ManyToMany(type => Permission, permission => permission.roles)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
