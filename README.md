## Description

Google Cloud Storage Module for Nest.js Framework

## Installation

```bash
$ yarn add @aginix/gcloud-storage
```

## Examples

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