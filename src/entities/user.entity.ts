import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IsAlphanumeric, IsEmail, MinLength, IsDefined, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Role } from '@/entities/role.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class User {
  @ApiModelProperty()
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @IsDefined({ groups: [CREATE] })
  @Column()
  firstname: string;

  @ApiModelProperty()
  @IsDefined({ groups: [CREATE] })
  @Column()
  lastname: string;

  @ApiModelProperty()
  @IsDefined({ groups: [CREATE] })
  @Column('text', { unique: true })
  username: string;

  @ApiModelProperty()
  @IsDefined({ groups: [CREATE] })
  @IsEmail()
  @Column('text', { unique: true })
  email: string;

  @IsDefined({ groups: [CREATE] })
  @Column('text')
  @MinLength(8)
  @IsAlphanumeric()
  password: string;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
