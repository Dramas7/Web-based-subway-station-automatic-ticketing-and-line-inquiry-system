import $ from 'jquery'
$(function() {
    /**
*
*
弗洛伊德算法
*
*/

//创建图
class Graph {
    vertexs;//存放顶点
    dis;//存放从各个顶点出发到各个顶点的距离，最后的结果，也是保留在该数组
    pre;//保存到达目标顶点的前驱顶点

    // /**
    //  * 
    //  * @param {大小} length 
    //  * @param {邻接矩阵} martix 
    //  * @param {顶点数组} vertexs 
    //  */
    constructor(length, martrix, vertexs) {
        this.vertexs = vertexs;
        this.dis = new Array(length);
        for (let i = 0; i < length; i++) {
            this.dis[i] = new Array(length);
        }
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                this.dis[i][j] = martrix[i][j];
            }
        }
        this.pre = new Array(length);
        //对pre数组初始化，注意存放的是前驱节点的下标
        for (let i = 0; i < length; i++) {
            this.pre[i] = new Array(length).fill(i);
        }
    }

    //弗洛伊德算法
    floyd() {
        //保存距离变量
        let len = 0;
        let length = this.vertexs.length;
        //对中间顶点遍历，K就是中间顶点的下标
        for (let k = 0; k < length; k++) {
            //从i顶点出发[A,B,C,D,E,F,G]
            for (let i = 0; i < length; i++) {
                //j是到达j顶点[A,B,C,D,E,F,G]
                for (let j = 0; j < length; j++) {
                    //从i顶点出发，到达j顶点的距离
                    len = this.dis[i][k] + this.dis[k][j];
                    if (len < this.dis[i][j]) {
                        //如果len小于dis[i][j]
                        this.dis[i][j] = len;
                        //前驱节点
                        this.pre[i][j] = this.pre[k][j];
                    }
                }
            }
        }
    }

}

let vertexs = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let indexObj = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6 };
//边
let edges = ['A_B_5', 'A_C_7', 'A_G_2', 'B_D_9', 'B_G_3',
    'C_E_8', 'D_F_4', 'E_F_5', 'E_G_4', 'F_G_6'];
//邻接矩阵
let vlen = vertexs.length;
let martrix = new Array(vlen);
for (let i = 0; i < vlen; i++) {
    martrix[i] = new Array(vlen).fill(10000);
    martrix[i][i] = 0;
}
//插入边
for (let edge of edges) {
    let edgeArr = edge.split('_');
    martrix[indexObj[edgeArr[0]]][indexObj[edgeArr[1]]]
        = martrix[indexObj[edgeArr[1]]][indexObj[edgeArr[0]]]
        = parseInt(edgeArr[2])
}

let graph = new Graph(vlen, martrix, vertexs);
console.log('邻接矩阵：', martrix)
graph.floyd();
console.log('算法对象：', graph);
})