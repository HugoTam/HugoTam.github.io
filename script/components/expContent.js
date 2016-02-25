/**
 * Created by hugotam on 16/2/20.
 */

//DATE


ME.timeLineArea = [{
    itemName: "HUT",
    title: "湖南工业大学<br />包装工程 大一",
    time:   "2012-09",
    dec: ""
},{
    itemName: "blue apple",
    title: "加入<br />蓝苹果社团",
    time: "2012-10",
    dec: ""
},{
    itemName: "DMA",
    title: "变更专业<br />数字媒体艺术",
    time: "2013-06”",
    dec: ""
},{
    itemName: "IDL",
    title: "进入IDL<br />创新设计实验室",
    time: "2013-07",
    dec: ""
},{
    itemName: "join OKmemo",
    title: "参与IDL项目<br />OK记",
    time: "2013-12",
    dec: ""
},{
    itemName: "learn in OKmemo",
    title: "观察学习<br />OK记设计助理",
    time: "2014-02",
    dec: ""
},{
    itemName: "do simple job in OKmemo",
    title: "OK记移动端<br />输出设计规范稿",
    time: "2014-07",
    dec: ""
},{
    itemName: "learn HTML",
    title: "学习<br />前端入门知识",
    time: "2014-08",
    dec: ""
},{
    itemName: "OKmemo backstage management",
    title: "设计并前端实现<br />OK记后台管理",
    time: "2014-09",
    dec: ""
},{
    itemName: "OKmemo mobile front-end",
    title: "参与实现OK记移动端<br />部分前端工作",
    time: "2014-09",
    dec: ""
},{
    itemName: "OKmemo community front-end",
    title: "参与实现OK记<br />第一版社区的样式部分前端工作",
    time: "2014-09",
    dec: ""
},{
    itemName: "Pocket Travel",
    title: "进行模拟项目<br />“口袋旅游”",
    time: "2015-07",
    dec: ""
},{
    itemName: "join quickwis",
    title: "到长沙快智网络科技有限公司实习",
    time: "2015-09",
    dec: ""
},{
    itemName: "OKmemo UX",
    title: "OK记交互设计师",
    time: "2015-09",
    dec: ""
},{
    itemName: "OKmemo mobile2.0",
    title: "设计OK记移动端<br />新版风格交互",
    time: "2016-02",
    dec: ""
},{
    itemName: "study at home",
    title: "在家自学<br />待业/待毕业",
    time: "present",
    dec: ""
}];



//博客内容容器
var ExpContent = React.createClass({

    getInitialState: function(){
        return {
            items: ME.timeLineArea,
            showConEvent: "HUT"

        }


    },

    handleShowCon: function(itemName,event){
        event.preventDefault();
        this.setState({showConEvent: itemName});
    },

    handleActiveCon: function(){

    },

    render: function(){
        return <div className="exp-wrapper">
            {/*内容显示区域*/}
            <div className="show-con-area">
                <ShowConArea
                    event={this.state.showConEvent}
                    dotActive={this.handleActiveCon}
                />
                <div className="di-line"></div>
            </div>
            {/*时间线*/}
            <TimeLineArea
                items={this.state.items}
                dotClick={this.handleShowCon}
            />
        </div>
    }

});


var TimeLineArea = React.createClass({


    componentDidMount: function(){

        var _this = this;


        //给dot高度
        var $timelineDot = $(".timeline-dot");
        $timelineDot.each(function(i,item){
                var $this = $(this),
                    $dotIntro = $this.find(".dot-intro"),
                    $dotTitle = $dotIntro.find(".dot-title");

                var dotTitleCon = _this.props.items[i].title;
                $dotTitle.append(dotTitleCon);

                var dotConHeight = $dotIntro.height();
                $this.height(dotConHeight);

            }
        );



    },

    handleShowCon: function(itemName,event){
        event.preventDefault();
        this.props.dotClick(itemName,event);
    },



    render: function(){

        var _this = this;

        var dots = this.props.items.map(function(item,i){

            return(
                <div className="timeline-dot" key={i}>
                    {/*bind不懂，为什么顺序是这样的*/}
                    <a href="#" className="dot" onClick={_this.handleShowCon.bind(_this,item.itemName)}></a>
                    <div className="dot-intro">
                        <div className="dot-time">{item.time}</div>
                        <div className="dot-title"></div>
                    </div>

                </div>
            );
        });

        return (
            <div className="timeline-area">
                <div className="timeline-wrapper">
                    <div className="timeline-line"></div>
                    <div className="timeline-dots-wrapper">{dots}</div>
                </div>
            </div>

        )
    }
});


