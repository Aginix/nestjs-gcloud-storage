export enum ERROR_MESSAGE {
  NO_FILE_ERROR = '파일객체를 찾을 수 없습니다.\n업로드가 제대로 되었는지 확인해주세요.',
  FILE_TYPE_ERROR = '지원하는 타입이 아닙니다.\ncategory, item 혹은 review를 사용해주세요.',
  MIME_TYPE_ERROR = '지원하는 파일형식이 아닙니다.\nCSV 혹은 JSON 형식을 사용해주세요.',
  ENCODING_ERROR = '지원하는 인코딩형식이 아닙니다.\nUTF-8을 사용해주세요.',
  NOT_FOUND_REQUIRED_COL_ERROR = '반드시 필요한 칼럼이 빠져있습니다.\n필수입력으로 마킹된 칼럼의 데이터가 누락되지 않았는지 다시 확인해주세요.',
  IS_DELETED_FORMAT_ERROR = '삭제여부 칼럼은 반드시 Y 혹은 N으로 입력되어야 합니다.',
  FILTER_AND_SORT_FORMAT_ERROR = '커스텀필드는 반드시 JSON 형식으로 입력되어야 합니다.',
  DATE_FORMAT_ERROR = '날짜는 20221231235959과 같이 YYYYMMDDHHmmss 의 형식으로 제공되어야 합니다.',
  CATE_NAME_FORMAT_ERROR = '카테고리 이름은 반드시 > 구분자로 연결되어 있어야 합니다.',
  PARSING_ERROR = '파일을 정상적으로 해석할 수 없습니다.\n에러 내용을 확인해주세요.',
}

export enum FileType {
  CATEGORY = 'category',
  ITEM = 'item',
  REVIEW = 'review',
}
