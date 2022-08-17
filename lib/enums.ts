export enum ERROR_MESSAGE {
  FILE_TYPE_ERR = '지원하는 타입이 아닙니다. category, item 혹은 review를 사용해주세요.',
  NOT_FOUND_REQUIRED_COL = '반드시 필요한 칼럼이 빠져있습니다. 필수입력으로 마킹된 칼럼의 데이터가 누락되지 않았는지 다시 확인해주세요.',
  CATE_NAME_FORMAT_ERROR = '카테고리 이름은 반드시 > 구분자로 연결되어 있어야 합니다.',
}

export enum FileType {
  CATEGORY = 'category',
  ITEM = 'item',
  REVIEW = 'review',
}
