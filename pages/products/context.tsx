import React, { ProviderProps, useState } from "react";
import * as _ from "lodash";
import Product from "../../models/product";
import axios from "../../libs/axios";
import Gallery from "../../models/gallery";

export const ProductContext = React.createContext<ContextProps>(null)

const { Provider } = ProductContext

type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

interface ProductProps {
    product: Product,
    galleries: Array<Gallery>
}

interface ContextProps extends ProductProps {
    actions: {
        onNameChange: ChangeHandler,
        onDescChange: ChangeHandler,
        onNumChange: ChangeHandler,
        onPriceChange: ChangeHandler,
        onSubmit: React.FormEventHandler,
        onUploadCallback: Function,
        updateGallery: Function,
        removeGallery: Function,
        addDescImg: Function,
        delDescImg: Function,
        onIsDeleteChange: ChangeHandler
    }
}

export const ProductProvider: React.FunctionComponent<ProductProps> = (props) => {
    const [product, setProduct] = useState(props.product)
    const [galleries, setGalleries] = useState(props.galleries)
console.log(product);

    return (
        <Provider value={{
            product, galleries,
            actions: {
                onNameChange: e => {
                    setProduct({
                        ...product,
                        name: e.target.value
                    })
                },
                onDescChange: e => {
                    setProduct({
                        ...product,
                        goods_brief: e.target.value
                    })
                },
                onNumChange: e => {
                    setProduct({
                        ...product,
                        goods_number: parseInt(e.target.value)
                    })
                },
                onPriceChange: e => {
                    setProduct({
                        ...product,
                        retail_price: parseFloat(e.target.value)
                    })
                },
                onSubmit: e => {
                    e.preventDefault()

                    axios.post('/admin/goods/store', product)
                        .then(resp => {
                            if (resp.data.errno == 0) {
                                location.href = '/products'
                            }
                        })
                },
                onUploadCallback: url => {
                    axios.post('/admin/goods/saveGallery', {
                        goods_id: product.id,
                        img_url: url
                    })
                    .then(resp => setGalleries([...galleries, resp.data.data]))
                },
                updateGallery: (gallery: Gallery, url: string) => {
                    gallery.img_url = url

                    axios.post('/admin/goods/saveGallery', gallery)

                    const index = galleries.findIndex(g => g.id == gallery.id)
                    galleries.splice(index, 1, gallery)

                    setGalleries([...galleries])
                },
                removeGallery: (gallery: Gallery) => {
                    const index = galleries.findIndex(g => g.id == gallery.id)
                    galleries.splice(index, 1)
                    setGalleries([...galleries])

                    axios.get(`/admin/goods/deleteGallery?id=${gallery.id}`)
                },

                addDescImg: (url: string) => {
                    product.goods_desc.push(url)
                    setProduct({...product})
                },

                delDescImg: (index: number) => {
                    product.goods_desc.splice(index, 1)
                    setProduct({...product})   
                },
                onIsDeleteChange: e => {
                    setProduct({
                        ...product,
                        is_delete: e.target.checked ? 1 : 0
                    })
                    
                }
            }
        }}>{props.children}</Provider>
    )
}