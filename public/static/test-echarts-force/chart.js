/**  Echarts-Force
    力导向布局图树状结构实现节点可折叠效果
    作者：Reese
    日期：2015-09-09
    版本：V0.1
    功能：点击一次节点，展开一级子节点；再次点击节点，折叠所有子孙节点；
          弹出最终子节点的标签
    备注：在使用该方法的时候，在nodes的属性里要自定义flag属性，并设置ignore
*/
var ecConfig = require('echarts/config');

function openOrFold(param) {
  var linksNodes = []; //中间变量
  var data = param.data; //表示当前选择的某一节点

  var option = myChart.getOption(); //获取已生成图形的Option
  var nodesOption = option.series[0].nodes; //获得所有节点的数组
  var linksOption = option.series[0].links; //获得所有连接的数组
  var categoryLength = option.series[0].categories.length; //获得类别数组的大小

  /**
  该段代码判断当前节点的category是否为最终子节点，
  如果是，则弹出该节点的label
  */
  if (data.category == (categoryLength - 1)) {
    alert(data.label);
  }

  /**判断是否选择到了连接线上*/
  if (data != null && data != undefined) {
    /**
    判断所选节点的flag
    如果为真，则表示要展开数据,
    如果为假，则表示要折叠数据
    */
    if (data.flag) {
      /**
      遍历连接关系数组
      最终获得所选择节点的一层子节点
      */
      for (var m in linksOption) {
        //引用的连接关系的目标，既父节点是当前节点
        if (linksOption[m].target == data.id) {
          linksNodes.push(linksOption[m].source); //获得子节点数组
        }
      } //for(var m in linksOption){...}
      /**
      遍历子节点数组
      设置对应的option属性
      */
      if (linksNodes != null && linksNodes != undefined) {
        for (var p in linksNodes) {
          nodesOption[linksNodes[p]].ignore = false; //设置展示该节点
          nodesOption[linksNodes[p]].flag = true;
        }
      }
      //设置该节点的flag为false，下次点击折叠子孙节点
      nodesOption[data.id].flag = false;
      //重绘
      myChart.setOption(option);
    } else {
      /**
      遍历连接关系数组
      最终获得所选择节点的所有子孙子节点
      */
      for (var m in linksOption) {
        //引用的连接关系的目标，既父节点是当前节点
        if (linksOption[m].target == data.id) {
          linksNodes.push(linksOption[m].source); //找到当前节点的第一层子节点
        }
        if (linksNodes != null && linksNodes != undefined) {
          for (var n in linksNodes) {
            //第一层子节点作为父节点，找到所有子孙节点
            if (linksOption[m].target == linksNodes[n]) {
              linksNodes.push(linksOption[m].source);
            }
          }
        }
      } //for(var m in linksOption){...}
      /**
      遍历最终生成的连接关系数组
      */
      if (linksNodes != null && linksNodes != undefined) {
        for (var p in linksNodes) {
          nodesOption[linksNodes[p]].ignore = true; //设置折叠该节点
          nodesOption[linksNodes[p]].flag = true;
        }
      }
      //设置该节点的flag为true，下次点击展开子节点
      nodesOption[data.id].flag = true;
      //重绘
      myChart.setOption(option);
    } //if (data.flag) {...}
  } //if(data != null && data != undefined){...}
} //function openOrFold(param){...}
myChart.on(ecConfig.EVENT.CLICK, openOrFold);