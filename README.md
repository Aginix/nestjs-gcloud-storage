## Description

Google Cloud Storage Module for Nest.js Framework

## Installation

```bash
$ yarn add @aginix/gcloud-storage
```

## Examples

### Default import

If you have bucket domain name you can config `storageBaseUri`.

```typescript
import { Module } from '@nestjs/common';
import { GCloudStorageModule } from '@aginix/gcloud-storage';

@Module({
  imports: [
    GCloudStorageModule.withConfig({
      defaultBucketname: 'bucket.aginix.tech',
      storageBaseUri: 'bucket.aginix.tech',
    })
  ],
})
export class AppModule {}
```

### Default import with asynchonous

```typescript
import { Module } from '@nestjs/common';
import { GCloudStorageModule } from '@aginix/gcloud-storage';
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
} from '@aginix/gcloud-storage';

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

### Store a file using a specifig folder/prefix name

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
} from '@aginix/gcloud-storage';

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

