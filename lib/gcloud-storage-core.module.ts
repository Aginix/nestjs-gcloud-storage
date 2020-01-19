import { GCloudStorageOptions, GCloudStorageAsyncOptions } from './gcloud-storage.interface';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { GCLOUD_STORAGE_MODULE_OPTIONS } from './gcloud-storage.constant';
import { GCloudMulterStorageService } from './gcloud-multer.service';
import { GCloudStorageService } from './gcloud-storage.service';

const PROVIDERS = [GCloudMulterStorageService, GCloudStorageService];
const EXPORTS = [...PROVIDERS];

@Global()
@Module({
  providers: [...PROVIDERS],
  exports: [...PROVIDERS],
})
export class GCloudStorageCoreModule {
  static withConfig(options: GCloudStorageOptions): DynamicModule {
    const gcsModuleOptions = {
      provide: GCLOUD_STORAGE_MODULE_OPTIONS,
      useValue: options,
    };

    const gcsServiceProvider = {
      provide: GCloudStorageService,
      useFactory: (options: GCloudStorageOptions) => new GCloudStorageService(options),
      inject: [GCLOUD_STORAGE_MODULE_OPTIONS],
    };

    return {
      module: GCloudStorageCoreModule,
      providers: [gcsModuleOptions, GCloudMulterStorageService, gcsServiceProvider],
      exports: [...EXPORTS],
    };
  }

  static withConfigAsync(options: GCloudStorageAsyncOptions): DynamicModule {
    const gcsServiceProvider = {
      provide: GCloudStorageService,
      useFactory: (options: GCloudStorageOptions) => new GCloudStorageService(options),
      inject: [GCLOUD_STORAGE_MODULE_OPTIONS],
    };

    return {
      module: GCloudStorageCoreModule,
      imports: options.imports,
      providers: [
        {
          provide: GCLOUD_STORAGE_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        GCloudMulterStorageService,
        gcsServiceProvider,
      ],
      exports: [...EXPORTS],
    };
  }
}
