/**
 * Created by hugotam on 16/2/20.
 */
var Header = React.createClass({displayName: "Header",

    autoChangeText: function(){
        var textArr = ["心血来潮","随心所欲","没有设计","不管交互","开心就好"];
        // 现在集合的队列
        var i = 0;
        var j = 0;
        var newText = "",
            oldText = "";

        var firstLoadText = true;

        //var $newText = $(".new");
        //var $oldText = $(".old");

        var new_text = ReactDOM.findDOMNode(this.refs.newText),
            old_text = ReactDOM.findDOMNode(this.refs.oldText);

        var autoChangeTextTimer = setInterval(function(){
            if(i<textArr.length && i!==0){
                if(j<textArr[i].length){
                    oldText = textArr[i-1].substring(j+1);
                    newText = textArr[i].substring(0,j+1);

                    new_text.innerText = newText;
                    old_text.innerText = oldText;

                    j++;
                }else{
                    i++;
                    j=0;
                }
            }else if(i===0 && firstLoadText){
                // 第一次
                if(j<textArr[i].length){
                    oldText = "";
                    newText = textArr[i].substring(0,j+1);

                    new_text.innerText = newText;
                    old_text.innerText = oldText;

                    j++;
                }else{
                    i++;
                    j=0;
                    firstLoadText = false;
                }
            }else{
                // 大于数组，重置，要与第一次区分
                if(j===0){
                    i=0;
                }
                if(j<textArr[i].length){
                    oldText = textArr[textArr.length-1].substring(j+1);
                    newText = textArr[i].substring(0,j+1);

                    new_text.innerText = newText;
                    old_text.innerText = oldText;

                    j++;
                }else{
                    i++;
                    j=0;
                }
            }

        },360);
    },

    handleClickBlog: function(){
        this.props.handleView("blog");
        console.log("blog");
    },

    handleClickExp: function(){
        this.props.handleView("exp");
        console.log("exp");

    },

    handleClickMe: function(){
        this.props.handleView("me");
        console.log("me")

    },

    render: function(){
        return(
            React.createElement("div", {className: "nav"}, 
                React.createElement("div", {className: "left-side "+this.props.activeView+"-active"}, 
                    React.createElement("a", {href: "#", className: "item blog", onClick: this.handleClickBlog}, React.createElement("span", null, "BLOG")), 
                    React.createElement("a", {href: "#", className: "item exp", onClick: this.handleClickExp}, React.createElement("span", null, "EXP")), 
                    React.createElement("a", {href: "#me", className: "item me", onClick: this.handleClickMe}, React.createElement("span", null, "ME"))
                ), 
                React.createElement("div", {className: "right-side"}, 
                React.createElement("span", {className: "des"}, "一个", 
                    React.createElement("span", {className: "new-text", ref: "newText"}), 
                    React.createElement("span", {className: "old-text", ref: "oldText"}), "的网站"
                )
                )
            )
        )
    },

    componentDidMount: function(){
        this.autoChangeText();
    }

});
/**
 * Created by hugotam on 16/2/20.
 */

/**
 * Created by hugotam on 16/2/20.
 */
//博客内容容器
var BlogContent = React.createClass({displayName: "BlogContent",

    render: function(){
        return React.createElement("div", null, 
            "BLOG"
        )
    }

});

/**
 * Created by hugotam on 16/2/20.
 */
//博客内容容器
var MeContent = React.createClass({displayName: "MeContent",

    render: function(){
        return React.createElement("div", {className: "me-wrapper"}, 
            React.createElement("div", {className: "intro-wrapper"}, 
                /*个人信息*/
                React.createElement("div", {className: "info"}, 
                    React.createElement("div", {className: "avatar"}), 
                    React.createElement("p", null, "Hugo Tam, 对此人收集的情报还十分有限。"), 
                    React.createElement("span", null, "(谭什么)")
                ), 
                /*经历*/
                React.createElement("div", {className: "simple-exp"}, 
                    React.createElement("p", null, React.createElement("span", {className: "exp-time"}, "2012.09 -- present."), "湖南工业大学 本科 数字媒体艺术"), 
                    React.createElement("p", null, React.createElement("span", {className: "exp-time"}, "2013.07 -- present."), "湖南工业大学 ", React.createElement("a", {href: "http:idhut.cn"}, "创新设计实验室")), 
                    React.createElement("p", null, React.createElement("span", {className: "exp-time"}, "2014.?? -- 2016.02"), React.createElement("a", {href: "http://quickwis.com/"}, "长沙快智OK记"), " 产品/设计/前端打杂")
                ), 
                /*标签*/
                React.createElement("div", {className: "tags"}, 
                    React.createElement("span", {className: "tag"}, "#交互设计师 ."), 
                    React.createElement("span", {className: "tag"}, "#产品助理 ."), 
                    React.createElement("span", {className: "tag"}, "#大四狗 ."), 
                    React.createElement("span", {className: "tag"}, "#伪前端 ."), 
                    React.createElement("span", {className: "tag"}, "#少说家 .")
                ), 
                /*分割线*/
                React.createElement("div", {className: "di-line"})
            ), 
            React.createElement("div", {className: "contact-wrapper"}, 
                React.createElement("h1", {className: "title"}, "联系"), 
                React.createElement("div", {className: "contact-list"}, 
                    React.createElement("div", {className: "email"}, "邮箱：", React.createElement("a", {href: "#"}, "hugotammmm@gmail.com")), 
                    React.createElement("div", {className: "weibo"}, "微博：", React.createElement("a", {href: "http://weibo.com/cupxxx"}, "谭什么鬼")), 
                    React.createElement("div", {className: "wechat"}, "微信：", 
                        React.createElement("div", {className: "wechat-info"}, 
                            React.createElement("img", {src: "images/myQRcode.png", alt: "QRCode"}), 
                            React.createElement("span", {className: "tips"}, "(加好友请注明来意)")
                        )
                    )
                )
            )
        )
    }

});
/**
 * Created by hugotam on 16/2/24.
 */

var ShowConArea = React.createClass({displayName: "ShowConArea",

    getInitialState: function() {
        return {
            active: false,
            keyActive: "",
        }

    },

    componentDidMount: function(){
        this.handleActiveEvent();
    },


    //接受到新的props或者setdate完成渲染DOM时...
    componentDidUpdate: function(){
        this.handleActiveEvent();
    },

    handleActiveEvent: function(){
        var _this = this;

        if(_this.props.event == "HUT"){
            var $key = $(".event-HUT .key");

            $key.each(function(i){

                var $this = $(this);

                var delayTime = i+1;

                var delayUnit = 1000;



                setTimeout(function(){
                    $this.addClass("show");
                },delayTime*delayUnit);

            });
        }
    },

    handleCancelKeyActive: function(){
        var keys = ReactDOM.findDOMNode(this.refs.keys);

        $(keys).removeClass("keyactive-"+this.state.keyActive);
        this.setState({keyActive: ""});
    },

    handleKeyActive: function(key){
        var _this = this;
        var keys = ReactDOM.findDOMNode(this.refs.keys);

        this.setState({keyActive: key});
        $(keys).addClass("keyactive-"+key);


    },


    render: function(){
        var _this = this;

        switch(_this.props.event){
            case "HUT":
                var con = React.createElement("div", {className: "key-wrapper"}, 
                    React.createElement("div", {ref: "keys", className: "keys", onMouseUp: _this.handleCancelKeyActive, onMouseLeave: _this.handleCancelKeyActive}, 
                        React.createElement("a", {href: "#", className: "key t1"}, "湖南工业大学"), 
                        React.createElement("a", {href: "#", className: "key t2"}, "包装工程"), 
                        React.createElement("a", {href: "#", className: "key t3", onMouseDown: _this.handleKeyActive.bind(null,"bestMajor")}, "皇牌专业"), 
                        React.createElement("a", {href: "#", className: "key t4"}, 
                            React.createElement("span", {className: "box1"}, "盒子"), 
                            React.createElement("span", {className: "box2"}, "盒子")
                        ), 
                        React.createElement("a", {href: "#", className: "key t5"}, "工厂"), 
                        React.createElement("a", {href: "#", className: "key t6"}, 
                            React.createElement("span", {className: "words"}, "流水线"), 
                            React.createElement("span", {className: "word w1"}, "流"), React.createElement("span", {className: "word w2"}, "水"), React.createElement("span", {className: "word w3"}, "线")
                        ), 
                        React.createElement("a", {href: "#", className: "key t7", onMouseDown: _this.handleKeyActive.bind(null,"confuse")}, "迷茫"), 
                        React.createElement("a", {href: "#", className: "key t8", onMouseDown: _this.handleKeyActive.bind(null,"lonely")}, "孤独"), 
                        React.createElement("a", {href: "#", className: "key t9"}, "WOW"), 
                        React.createElement("a", {href: "#", className: "key t10"}, "LOL"), 
                        React.createElement("a", {href: "#", className: "key t11", onMouseDown: _this.handleKeyActive.bind(null,"universityStudent")}, "大学生"), 
                        React.createElement("a", {href: "#", className: "key t12"}, "考研"), 
                        React.createElement("a", {href: "#", className: "key t13"}, "恐惧")
                    )
                )

                break;
            default :

                break;


        }

        return(
            React.createElement("div", {className: "show-con-wrapper event-"+_this.props.event}, con)

        )
    }

});
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
    time: "2013-06",
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
var ExpContent = React.createClass({displayName: "ExpContent",

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
        return React.createElement("div", {className: "exp-wrapper"}, 
            /*内容显示区域*/
            React.createElement("div", {className: "show-con-area"}, 
                React.createElement(ShowConArea, {
                    event: this.state.showConEvent, 
                    dotActive: this.handleActiveCon}
                ), 
                React.createElement("div", {className: "di-line"})
            ), 
            /*时间线*/
            React.createElement(TimeLineArea, {
                items: this.state.items, 
                dotClick: this.handleShowCon}
            )
        )
    }

});


var TimeLineArea = React.createClass({displayName: "TimeLineArea",


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
                React.createElement("div", {className: "timeline-dot", key: i}, 
                    /*bind不懂，为什么顺序是这样的*/
                    React.createElement("a", {href: "#", className: "dot", onClick: _this.handleShowCon.bind(_this,item.itemName)}), 
                    React.createElement("div", {className: "dot-intro"}, 
                        React.createElement("div", {className: "dot-time"}, item.time), 
                        React.createElement("div", {className: "dot-title"})
                    )

                )
            );
        });

        return (
            React.createElement("div", {className: "timeline-area"}, 
                React.createElement("div", {className: "timeline-wrapper"}, 
                    React.createElement("div", {className: "timeline-line"}), 
                    React.createElement("div", {className: "timeline-dots-wrapper"}, dots)
                )
            )

        )
    }
});



/**
 * Created by hugotam on 16/2/20.
 */

//整个容器
var BlogWrapper = React.createClass({displayName: "BlogWrapper",
    getInitialState: function(){
        return {
            view: "exp"
        }
    },

    setView: function(view){
        this.setState({
            view: view
        });
    },

    render: function(){

        return React.createElement("div", null, 
            React.createElement(Header, {activeView: this.state.view, handleView: this.setView}), 
            React.createElement(Content, {view: this.state.view})
        )
    },

    componentDidMount: function(){

    }
});

//内容容器
var Content = React.createClass({displayName: "Content",

    render: function(){
        var con;
        if(this.props.view == "me"){
            con = React.createElement(MeContent, null);
        }else if(this.props.view == "blog"){
            con = React.createElement(BlogContent, null);
        }else if(this.props.view == "exp"){
            con = React.createElement(ExpContent, null);
        }else if(this.props.view == "paper"){
            con = React.createElement(PaperContent, null);
        }

        return React.createElement("div", {className: "content-wrapper"}, 
                con
            )
    }

});

ReactDOM.render(
    React.createElement(BlogWrapper, null),
    document.getElementById('container')
);