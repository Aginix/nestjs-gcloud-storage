import { CallHandler, ExecutionContext, Injectable, Logger, mixin, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Observable } from 'rxjs';

import { GCloudStoragePerRequestOptions } from './gcloud-storage.interface';
import { GCloudStorageService } from './gcloud-storage.service';
import { join } from 'path';

import * as moment from 'moment-timezone';

export function GCloudStorageFileInterceptor(
  fieldName: string,
  localOptions?: MulterOptions,
  gcloudStorageOptions?: Partial<GCloudStoragePerRequestOptions>,
  storagePath?: string,
): Type<NestInterceptor> {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    public interceptor: NestInterceptor;

    constructor(private readonly gcloudStorage: GCloudStorageService) {
      this.interceptor = new (FileInterceptor(fieldName, localOptions))();
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      (await this.interceptor.intercept(context, next)) as Observable<any>;

      const request = context.switchToHttp().getRequest();
      const file = request[fieldName];

      // customize gcloudStroageOptions.prefix to use request object
      const { bno } = request.decoded;
      const type = request.body?.type;
      // const partitioned: boolean = request.body?.partitioned;
      // path initialize
      let path = null;

      if (bno && type && storagePath) {
        // NOTE: 파일의 히스토리를 관리하기 위해 날짜가 들어가면 좋다.
        // if (partitioned) {
        moment.tz.setDefault('Asia/Seoul');
        const partition = moment().format('YYYYMMDD');
        path = join(storagePath, `${bno}/${type}/${partition}`);
        // } else {
        //   path = join(storagePath, `${bno}/${type}`);
        // }
      }

      if (!file) {
        Logger.error(
          'GCloudStorageFileInterceptor',
          `Can not intercept field "${fieldName}". Did you specify the correct field name in @GCloudStorageFileInterceptor('${fieldName}')?`,
        );
        return;
      }

      const storageUrl = await this.gcloudStorage.upload(file, gcloudStorageOptions, path);
      file.storageUrl = storageUrl;
      return next.handle();
    }
  }

  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
