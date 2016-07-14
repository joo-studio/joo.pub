var config = {};
config.companyInfo = {
    bj: {
        company: '北京微网通联股份有限公司',
        address: '地址：北京市海淀区上地信息产业基地信息路7号数字传媒大厦2号楼8层—9层',
        phone: '电话：010-62668888',
        fax: '传真：010-62668866',
        code: '邮编：100085'
    },
    sd: {
        company: '山东百分通联信息技术有限公司',
        address: '地址：山东省日照市高新六路高新区创业中心1号研发楼9层',
        phone: '电话：0633-2216231',
        fax: '传真：0633-3935621',
        code: '邮编：276800'
    },
    sh: {
        company: '北京微网通联信息技术有限公司上海分公司',
        address: '地址：上海市闵行区程家桥路168弄39号大树下新媒体创意产业园6楼616室',
        phone: '电话：021-51860200',
        fax: '传真：021-62257300',
        code: '邮编：201103'
    },
    gz: {
        company: '北京微网通联信息技术有限公司广州分公司',
        address: '地址：广州市天河区体育西路103号维多利广场A塔2805室',
        phone: '电话：020-38011317',
        fax: '传真：020-38011060',
        code: '邮编：510610'
    },
    hegs: {
        company: '霍尔果斯微网通联信息技术有限公司',
        address: '地址：新疆伊犁州霍尔果斯口岸卡拉苏河欧陆经典小区8幢8231室',
        phone: '电话：010-62668888',
        fax: '传真：010-62668866',
        code: '邮编：450000'
    }
};

var common = {
    getInfo: function (city) {
        var html = '';
        for (var n in config.companyInfo[city]) {
            html += config.companyInfo[city][n] + '<br>';
        }
        return html.replace(/<br>$/, '');
    },
    getMapInfo: function (city) {
        var temp = '',
            flag = { 'bj' : '大厦', 'sh' : '新媒体', 'hegs': '小区' };
        for (var i = 0; i < 12; i++) {
            temp += '&nbsp;';
        }
        var item = config.companyInfo[city];
        var html = item.address + '<br>' + item.phone + '<br>' + item.fax + '<br>' + item.code;
        return html.replace(flag[city], flag[city] + '<br>' + temp);
    }
}