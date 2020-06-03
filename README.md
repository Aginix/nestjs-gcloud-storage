<a href="https://www.npmjs.com/@aginix/nestjs-gcloud-storage"><img src="https://img.shields.io/npm/v/@aginix/nestjs-gcloud-storage.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/@aginix/nestjs-gcloud-storage"><img src="https://img.shields.io/npm/l/@aginix/nestjs-gcloud-storage.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/@aginix/nestjs-gcloud-storage"><img src="https://img.shields.io/npm/dm/@aginix/nestjs-gcloud-storage.svg" alt="NPM Downloads" /></a>

## Description

Google Cloud Storage Module for Nest.js Framework

## Installation

```bash
$ yarn add @aginix/nestjs-gcloud-storage
```

## Examples

### Default import

If you have bucket domain name you can config `storageBaseUri`.

```typescript
import { Module } from '@nestjs/common';
import { GCloudStorageModule } from '@aginix/nestjs-gcloud-storage';

@Module({
  imports: [
    GCloudStorageModule.withConfig({
      defaultBucketname: 'bucket.aginix.tech',
      storageBaseUri: 'bucket.aginix.tech',
      predefinedAcl: 'private' // Default is publicRead
    })
  ],
})
export class AppModule {}
```

### Default import with asynchonous

```typescript
import { Module } from '@nestjs/common';
import { GCloudStorageModule } from '@aginix/nestjs-gcloud-storage';
import { ConfigService } from './config.service';
import { ConfigModule } from './config.module';

@Module({
  imports: [
    GCloudStorageModule.withConfigAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        defaultBucketname: config.get('GCS_BUCKET_NAME'),
        storageBaseUri: config.get('GCS_DOMAIN_NAME'),
      }),
      imports: [ConfigModule],
    })
  ],
})
export class AppModule {}
```

### Using uniform bucket-level access

Set `predefinedAcl` to `null`

```typescript
@Module({
  imports: [
    GCloudStorageModule.withConfig({
      predefinedAcl: null
    })
  ],
})
export class AppModule {}
```


### Store a file using the default config

```typescript
import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  GCloudStorageFileInterceptor,
  UploadedFileMetadata,
} from '@aginix/nestjs-gcloud-storage';

@Controller()
export class AppController {
  
  @Post('gcs/upload')
  @UseInterceptors(
    GCloudStorageFileInterceptor('file'),
  )
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
  }
}
```

### Store a file using a specific folder/prefix name

```typescript
import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  GCloudStorageFileInterceptor,
  UploadedFileMetadata,
} from '@aginix/nestjs-gcloud-storage';

@Controller()
export class AppController {
  
  @Post('gcs/upload')
  @UseInterceptors(
    GCloudStorageFileInterceptor('file', undefined, { prefix: 'prefix/test' })
  )
  UploadedFilesUsingInterceptor(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
  }
}
```

### Store a file using a specific predefined ACL

```typescript
@Controller()
export class AppController {
  
  @Post('gcs/secret-file')
  @UseInterceptors(
    GCloudStorageFileInterceptor('secret-file', undefined, { predefinedAcl: 'private' })
  )
  UploadedSecretFile(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
  }
}
```

## License

MIT © [Aginix Technologies Co., Ltd.](https://github.com/Aginix/nestjs-gcloud-storage)
