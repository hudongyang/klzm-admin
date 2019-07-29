import { NextPage, NextPageContext } from "next";
import HeaderLine from "../../components/header";
import Head from "next/head";
import axios, { createAxios } from "../../libs/axios";
import Product from "../../models/product";
const style = require('./style.css')

interface Props {
    products: Array<Product>
}

const Page: NextPage<Props> = ({ products }) => {
    return (
        <div>
            <Head>
                <title>商品列表</title>
            </Head>

            <HeaderLine />

            <div style={{textAlign: 'center', marginTop: '1em'}}>
                <a href="/products/edit">添加</a>
            </div>

            <table className={style.table}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>名称</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.goods_brief}</td>
                                <td>
                                    <a href={'/products/edit?id=' + product.id} style={{display: 'block', padding: '.3em 1em', color: '#20A0FF'}}>编辑</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

Page.getInitialProps = async ({ req }) => {
    const resp = await createAxios(req).get('/admin/goods/')

    return {
        products: resp.data.data.data
    }
}

export default Page
