import { CallHandler, ExecutionContext, Injectable, Logger, mixin, NestInterceptor, Type } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Observable } from 'rxjs';

import { GCloudStoragePerRequestOptions } from './gcloud-storage.interface';
import { GCloudStorageService } from './gcloud-storage.service';

export function GCloudStorageFilesInterceptor(
  fieldName: string,
  localOptions?: MulterOptions,
  gcloudStorageOptions?: Partial<GCloudStoragePerRequestOptions>,
): Type<NestInterceptor> {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    public interceptor: NestInterceptor;

    constructor(private readonly gcloudStorage: GCloudStorageService) {
      this.interceptor = new (FilesInterceptor(fieldName, 20, localOptions))();
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      (await this.interceptor.intercept(context, next)) as Observable<any>;

      const request = context.switchToHttp().getRequest();

      const files = request[fieldName];

      if (!files.length) {
        Logger.error(
          'GCloudStorageFilesInterceptor',
          `Can not intercept field "${fieldName}". Did you specify the correct field name in @GCloudStorageFilesInterceptor('${fieldName}')?`,
        );
        return;
      }

      for (const file of files) file.storageUrl = await this.gcloudStorage.upload(file, gcloudStorageOptions);

      return next.handle();
    }
  }

  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
