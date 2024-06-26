type CommonValues = {
  name: string,
  code: string,
  global_name: string,
}

export type ApiFilterRange = {
  type: 'range',
  min: number,
  max: number,
} & CommonValues;

export type ApiFilterMultiselect = {
  type: 'multiselect',
  display_mode: string,
  position: string,
  options: {
    name: string,
    slug: string,
    value: string,
    count: number
  }[]
} & CommonValues;

export type ApiFilterCheckbox = {
  type: 'checkbox',
  position: string,
  options: {
    name: string,
    slug: string,
    value: string,
    count: number
  }[]
} & CommonValues;

// I skipped some values, that Im not gonna use
export type ApiCategoryResponse = {
  items: {
    id: number,
    sku: string,
    name: string,
    price: number,
    formatted_price: string,
    product_url: string,
    thumbnail: string,
    reviews_count: number,
    rating_summary: number,
  }[],
  filters: [ApiFilterMultiselect, ApiFilterCheckbox, ApiFilterRange]
}