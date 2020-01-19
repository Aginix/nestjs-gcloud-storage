import { GCloudStorageOptions, GCloudStorageAsyncOptions } from './gcloud-storage.interface';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { GCLOUD_STORAGE_MODULE_OPTIONS } from './gcloud-storage.constant';
import { GCloudMulterStorageService } from './gcloud-multer.service';
import { GCloudStorageService } from './gcloud-storage.service';

const PROVIDERS = [GCloudMulterStorageService, GCloudStorageService];
const EXPORTS = [...PROVIDERS];

@Global()
@Module({})
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
      providers: [gcsModuleOptions, gcsServiceProvider, GCloudMulterStorageService],
      exports: [...EXPORTS, gcsModuleOptions],
    };
  }

  static withConfigAsync(options: GCloudStorageAsyncOptions): DynamicModule {
    const gcsModuleOptions = {
      provide: GCLOUD_STORAGE_MODULE_OPTIONS,
      useValue: options,
    };

    const gcsServiceProvider = {
      provide: GCloudStorageService,
      useFactory: (options: GCloudStorageOptions) => {
        return new GCloudStorageService(options);
      },
      inject: [GCLOUD_STORAGE_MODULE_OPTIONS],
    };

    return {
      module: GCloudStorageCoreModule,
      imports: options.imports,
      providers: [
        gcsModuleOptions,
        // gcsServiceProvider,
        ...PROVIDERS,
      ],
      exports: [...EXPORTS, gcsModuleOptions],
    };
  }
}
