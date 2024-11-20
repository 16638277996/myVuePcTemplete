
interface Product {
    productName: string;// 产品名称
    svgName: string;// SVG 名称
    bgColor:string //背景色
}

// 定义一个包含多个产品的数组类型
type ProductList = Product[];

// 示例数据
export const ProductsList: ProductList = [
    {
        productName: '粉剂',
        svgName: 'login_fj',
        bgColor:'#F2AB62'
    },
    {
        productName: '饵剂',
        svgName: 'login_ej',
        bgColor:'#147AFF'
    },
    {
        productName: '采集器',
        svgName: 'login_jcq',
        bgColor:'#FB6669'
    },
    {
        productName: '婚飞器',
        svgName: 'login_hfq',
        bgColor:'#FF9000'
    },
    {
        productName: '喷粉机',
        svgName: 'login_smq',
        bgColor:'#6F48FC'
    },
    {
        productName: '撒播器',
        svgName: 'login_sbq',
        bgColor:'#22DE5D'
    }
];

type FooterDetails = {
    recordNumber: string;
    link: string;
};

export const footerDetails: FooterDetails = {
    recordNumber: '粤ICP备 2020080755号-1',
    link: 'https://beian.miit.gov.cn'
};
  

