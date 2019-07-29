export default class Product {
    id: number
    goods_sn: string
    goods_number: number
    goods_brief: string
    name: string
    goods_desc: Array<string> = []
    goods_unit = '件'
    is_delete = 0
    retail_price: number
}