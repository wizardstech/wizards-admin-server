import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { Config } from './config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

const dbParams: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Config.POSTGRES_PORT,
  username: Config.POSTGRES_USER,
  password: Config.POSTGRES_PASSWORD,
  database: Config.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

console.log('dbParams', dbParams)

@Module({
  imports: [
    TypeOrmModule.forRoot(dbParams),
    UserModule,
    AuthModule
  ]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
