
interface Product {
    productName: string; // 产品名称
    svgName: string;     // SVG 名称
}

// 定义一个包含多个产品的数组类型
type ProductList = Product[];

// 示例数据
export const ProductsList: ProductList = [
    {
        productName: '粉剂',
        svgName: 'fj.svg'
    },
    {
        productName: '饵剂',
        svgName: 'ej'
    },
    {
        productName: '采集器',
        svgName: 'jcq'
    },
    {
        productName: '婚飞器',
        svgName: 'hfq'
    },
    {
        productName: '喷粉机',
        svgName: 'smq'
    },
    {
        productName: '撒播器',
        svgName: 'sbq'
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
  

