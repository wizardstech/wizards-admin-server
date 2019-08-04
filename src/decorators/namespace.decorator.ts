import { SetMetadata } from '@nestjs/common';

export enum NamespaceList {
  IAM = 'iam',
  INVENTORY = 'inventory',
  RECRUITMENT = 'recruitement'
}

export const Namespace = (name: NamespaceList) => SetMetadata('namespace', name);
