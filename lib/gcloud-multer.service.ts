import { Injectable } from '@nestjs/common';
import { GCloudStorageService } from './gcloud-storage.service';

/**
 * @todo This service is not working with the Multer API. Figure out why!
 */
@Injectable()
export class GCloudMulterStorageService {
  // protected azureStorage: AzureStorageService;

  constructor(
    // @Inject(AZURE_STORAGE_MODULE_OPTIONS)
    // private readonly options: AzureStorageOptions,
    private readonly gcsStorage: GCloudStorageService,
  ) {
    // Logger.log(this.azureStorage, 'AzureMulterStorageService');
    // this.azureStorage = new AzureStorageService(options);
  }

  // @implement multer.storage
  async _handleFile(_req: any, file: any, cb: Function) {
    const storageUrl = await this.gcsStorage.upload(file);
    file.storageUrl = storageUrl;

    cb(null, {
      file,
    });
  }

  // @implement multer.storage
  _removeFile(_req: any, file: any, cb: Function) {
    delete file.buffer;
    cb(null);
  }
}
