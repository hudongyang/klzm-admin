import { NextPage } from "next";
import Head from "next/head";
import { createAxios } from "../../libs/axios";
import Product from "../../models/product";
import Gallery from "../../models/gallery";
import { ProductContext, ProductProvider } from "./context";
import { Uploader } from "../../components/uploader";
import { useContext } from "react";
const style = require('./style.css')

type Props = {
    product: Product
    galleries: Array<Gallery>
}

const Page: NextPage<Props> = ({ product, galleries }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Head>
                <title>编辑商品</title>
            </Head>

            <div style={{ color: '#1F2D3D' }}>
                <h1 style={{ textAlign: 'center' }}>编辑商品</h1>
                <ProductProvider product={product} galleries={galleries}>
                    <ProductForm></ProductForm>
                </ProductProvider>
            </div>
        </div>
    )
}

const ProductForm = () => {

    return (
        <ProductContext.Consumer>
            {({ product, actions }) => {
                return (
                    <div>
                        <style jsx>{`
                            .input {
                                width: 20vw; 
                                height: 1.8em;
                                font-size: 14px;
                                text-indent: .5em;
                            }

                            .input:focus {
                                outline: 1px solid rgba(19, 206, 102, .3);
                            }

                            .input:invalid {
                                border: 2px dashed #FF4949;
                            }
                        `}</style>
                        <form onSubmit={actions.onSubmit}>
                            <div className={style["form-item"]}>
                                <span className={style["prop-name"]}>商品名称: </span>
                                <input onChange={actions.onNameChange} required className="input" type="text" value={product.name} />
                            </div>
                            <div className={style["form-item"]}>
                                <span className={style["prop-name"]}>商品描述: </span>
                                <input onChange={actions.onDescChange} required className="input" type="text" value={product.goods_brief} />
                            </div>
                            <div className={style["form-item"]}>
                                <span className={style["prop-name"]}>商品数量: </span>
                                <input onChange={actions.onNumChange} required className="input" type="number" value={product.goods_number} />
                            </div>
                            <div className={style["form-item"]}>
                                <span className={style["prop-name"]}>商品价格: </span>
                                <input onChange={actions.onPriceChange} required className="input" type="number" value={product.retail_price} />
                            </div>
                            { product.id && <ProductGallery /> }
                            

                            <ProductDescImgs />

                            <div className={style["form-item"]}>
                                <span className={style["prop-name"]}>下架: </span>
                                <input type="checkbox" checked={product.is_delete ? true : false} value={product.is_delete} onChange={actions.onIsDeleteChange} />
                            </div>

                            <button style={{ background: '#20A0FF', color: '#F9FAFC', fontSize: '16px', margin: '0 auto', display: 'block' }}>提交</button>
                        </form>
                    </div>
                )
            }}
        </ProductContext.Consumer>
    )
}

const ProductGallery = () => {
    const { galleries, actions } = useContext(ProductContext)

    return (
        <div className={style["form-item"]}>
            <span className={style["prop-name"]}>滚动图</span>
            <ul>
                {galleries.map(gallery => {
                    return (
                        <li key={gallery.id}>
                            <img style={{ height: '100px', display: 'block', marginBottom: '.5em' }} src={gallery.img_url} />
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                                <Uploader onUploadCallback={url => actions.updateGallery(gallery, url)} value="更改"></Uploader>
                                <span onClick={e => actions.removeGallery(gallery)} style={{ fontSize: 12, marginLeft: 10, color: '#8492A6', cursor: 'pointer' }}>删除</span>
                            </div>
                        </li>
                    )
                })}

                <li>
                    <Uploader onUploadCallback={actions.onUploadCallback} value="添加图片"></Uploader>
                </li>
            </ul>
        </div>
    )
}

const ProductDescImgs = () => {
    const ctx = useContext(ProductContext)

    return (
        <div className={style["form-item"]}>
            <span className={style["prop-name"]}>描述图</span>
            <ul style={{ listStyle: 'none', margin: 0 }}>
                {ctx.product.goods_desc.map((img, index) => {
                    return (
                        <li key={index}>
                            <img style={{ width: 100, display: 'block', marginBottom: '.5em' }} src={img} />
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                                <Uploader onUploadCallback={e => { }} value="更改"></Uploader>
                                <span onClick={e => { ctx.actions.delDescImg(index) }} style={{ fontSize: 12, marginLeft: 10, color: '#8492A6', cursor: 'pointer' }}>删除</span>
                            </div>
                        </li>
                    )
                })}

                <li>
                    <Uploader onUploadCallback={url => { ctx.actions.addDescImg(url) }} value="添加图片"></Uploader>
                </li>
            </ul>
        </div>
    )
}

Page.getInitialProps = async (ctx) => {
    let props: Props = {
        galleries: [],
        product: new Product()
    }

    if (ctx.query.id) {
        const resp = await createAxios(ctx.req).get(`/admin/goods/detail?id=${ctx.query.id}`)
        props = resp.data.data as Props   
    }
    
    return props
}

export default Page