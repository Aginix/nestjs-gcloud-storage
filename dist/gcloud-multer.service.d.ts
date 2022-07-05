import { GCloudStorageService } from './gcloud-storage.service';
export declare class GCloudMulterStorageService {
  private readonly gcsStorage;
  constructor(gcsStorage: GCloudStorageService);
  _handleFile(_req: any, file: any, cb: Function): Promise<void>;
  _removeFile(_req: any, file: any, cb: Function): void;
}
