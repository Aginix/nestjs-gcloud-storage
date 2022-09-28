import { ERROR_MESSAGE } from '../common/enums';
import { InvalidFileFormatException, NoFileException } from '../exceptions/file.exception';
import { isJsonContentType } from '../common/utils';
import * as encDetector from 'detect-character-encoding';
import { validateJsonFileBuffer } from './json.validator';
import { validateCsvFileBuffer } from './csv.validator';

export const validate = async (file: any, type: string): Promise<any> => {
  if (file) {
    const { buffer, mimetype } = file;
    validateFileEncoding(buffer);
    validateContentType(mimetype);
    if (isJsonContentType(mimetype)) {
      return await validateJsonFileBuffer(buffer, type);
    } else {
      return await validateCsvFileBuffer(buffer, type);
    }
  } else {
    throw new NoFileException(ERROR_MESSAGE.NO_FILE_ERROR);
  }
};

const validateFileEncoding = (buffer: any) => {
  const { encoding } = encDetector(buffer);
  if (encoding && encoding == 'UTF-8') {
    return null;
  } else {
    throw new InvalidFileFormatException(ERROR_MESSAGE.ENCODING_ERROR);
  }
};

const validateContentType = (mimetype: string) => {
  if (mimetype?.match(/text\/csv/) || mimetype?.match(/application\/json/)) {
    return null;
  } else {
    throw new InvalidFileFormatException(ERROR_MESSAGE.MIME_TYPE_ERROR);
  }
};
