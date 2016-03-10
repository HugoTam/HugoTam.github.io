/**
 * Created by hugotam on 16/2/20.
 */
var Header = React.createClass({displayName: "Header",

    autoChangeText: function(){
        var textArr = ["心血来潮","随心所欲","没有设计","不管交互","特异独行","开心就好"];
        // 现在集合的队列
        var i = 0;
        var j = 0;
        var newText = "",
            oldText = "";

        var firstLoadText = true;


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

    handleClickBlog: function(event){
        this.props.handleView("blog");
        console.log("blog");
    },

    handleClickExp: function(event){
        this.props.handleView("exp");
        console.log("exp");

    },

    handleClickMe: function(event){
        this.props.handleView("me");
        console.log("me");

    },

    render: function(){
        return(
            React.createElement("div", {className: "nav"}, 
                React.createElement("div", {className: "left-side "+this.props.activeView+"-active"}, 
                    React.createElement("a", {href: "#blog", className: "item blog", onClick: this.handleClickBlog}, React.createElement("span", null, "BLOG")), 
                    /*<a href="#exp" className="item exp" onClick={this.handleClickExp}><span>EXP</span></a>*/
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
var PaperContent = React.createClass({displayName: "PaperContent",
    handleReturnBlog: function(event){
        this.props.handleReturn(event);
    },

    componentDidMount: function(){
        this.getPaperContent();

        $(window).on("mousedown",this.delayDetectSelectText);
        $(window).on("mouseup",this.detectSelectText);

        $(".nav a.item.blog").on("click",this.handleReturnBlog);
    },

    componentDidUpdate: function(){
        this.getPaperContent();

        $(".nav a.item.blog").on("click",this.handleReturnBlog);

        $(window).on("mousedown",this.delayDetectSelectText);
        $(window).on("mouseup",this.detectSelectText);
    },

    componentWillUnmount: function(){

        $(".nav a.item.blog").off("click",this.handleReturnBlog);

        //解除绑定
        $(window).off("mousedown",this.delayDetectSelectText);
        $(window).off("mouseup",this.detectSelectText);

    },

    getPaperContent: function(){
        var createTime = TamTool.transformCreateTime(this.props.readPaper.createTime);
        var con = $.ajax({url:"paper/paper" + createTime + ".md",async:false});
        var converter = new showdown.Converter();
        var mdHtml = converter.makeHtml(con.responseText);

        var $paperCon = $(ReactDOM.findDOMNode(this.refs.paperCon));

        $paperCon.html(mdHtml);

    },


    detectSelectText: function(){
        var selectText = window.getSelection().toString();
        if(selectText && ReactDOM.findDOMNode(this.refs.paperCon)){
            ReactDOM.findDOMNode(this.refs.paperCon).classList.add("selected");
            console.log("have text?");
        }else if(!selectText && ReactDOM.findDOMNode(this.refs.paperCon)){
            console.log("no text");
            ReactDOM.findDOMNode(this.refs.paperCon).classList.remove("selected");
        }else{
            console.log("other");
        }
    },

    delayDetectSelectText: function(){
        var that = this;
        setTimeout(function(){
            var selectText = window.getSelection().toString();
            if(!selectText && ReactDOM.findDOMNode(that.refs.paperCon)){
                ReactDOM.findDOMNode(that.refs.paperCon).classList.remove("selected");
            }
            console.log("detectSelectText "+selectText);
        },100);
    },

    render: function(){

        return(
            React.createElement("div", {className: "paper"}, 
                React.createElement("div", {onMouseDown: this.delayDetectSelectText, onMouseUp: this.detectSelectText, className: "paper-content", ref: "paperCon"}), 
                React.createElement("a", {className: "bottom-return", href: "#", onClick: this.handleReturnBlog}, "到此为止了，回到开始的地方吧.")
            )
        )
    }
});
/**
 * Created by hugotam on 16/2/20.
 */
//博客内容容器
var BlogContent = React.createClass({displayName: "BlogContent",

    getInitialState: function(){
        return{
            papers: ME.papers,
            showSummary: true,
            readPaper: {},
            didReadPaper: false
        }
    },

    //缩减summary字数，太懒
    limitSummaryLength: function(){
        for(i=0;i<ME.papers.length;i++){
            var summary = ME.papers[i].summary;
            var defaultSummary = "暂时还没想好......";
            if(summary.length>120){
                ME.papers[i].summary = summary.substr(0,120);
            }else if(summary == ""){
                ME.papers[i].summary = defaultSummary;
            }
        }
    },

    //为summary赋高度值或清零
    setSummaryHeight: function(clean){
        var $summaryH = $(".summary-h");

        if(!clean){
            $summaryH.each(function(){
                $(this).height($(this).height());
            });
        }else{
            $summaryH.each(function(){
                $(this).css("height","");
            });
        }

    },

    componentWillMount: function(){
        this.limitSummaryLength();

    },

    componentWillUpdate: function(){

    },

    componentDidMount: function(){
        this.setSummaryHeight();
        // 从连接打开paper
        if(this.props.paper){
            this.openPaper();
        }

        if(this.state.showSummary){
            ReactDOM.findDOMNode(this.refs.papersWrapper).classList.add("summary");
        }

    },

    openPaper: function(){
        var that = this;
        console.log(this.props.paper);
        //直接从连接中打开paper

        //获取paper对象
        var paper = "",
            index = "";
        $(ME.papers).each(function(i,item){
            if(TamTool.transformCreateTime(item.createTime) == that.props.paper){
                paper = item;
                index = i;
                return false;
            }
        });

        this.setState({
            readPaper: paper,
            didReadPaper: true
        });


        var $papersWrapper = $(".papers-wrapper");
        $papersWrapper.addClass("will-read-paper read-paper");

        var $paperItem = $($papersWrapper.find(".paper-item").get(index));
        $paperItem.addClass("read-this");

        this.setSummaryHeight(true);

        //setTimeout(function(){
        //    $papersWrapper.addClass("read-paper");
        //},400);

        //滑到顶部
        //$("body").animate({
        //    scrollTop: 0
        //},300);




    },

    //阅读blog
    handleReadPaper: function(paper,event){
        event.preventDefault();

        window.location.hash = "#paper" + TamTool.transformCreateTime(paper.createTime);

        this.setState({
            readPaper: paper,
            didReadPaper: true
        });

        var papersWrapper = ReactDOM.findDOMNode(this.refs.papersWrapper);
        papersWrapper.classList.add("will-read-paper");

        var $paperItem = $(event.target).parents(".paper-item");
        $paperItem.addClass("read-this");
        this.setSummaryHeight(true);

        setTimeout(function(){
            papersWrapper.classList.add("read-paper");
        },400);

        //滑到顶部
        $("body").animate({
            scrollTop: 0
        },300);

    },

    // blog返回
    handleReturnBlog: function(event){

        event.preventDefault();

        window.location.hash = "#blog";

        this.setState({
            readPaper: {},
            didReadPaper: false
        });
        var $papersWrapper = $(ReactDOM.findDOMNode(this.refs.papersWrapper));
        $papersWrapper.removeClass("read-paper will-read-paper");
        //增加临时类，添加动画
        $papersWrapper.addClass("will-return");
        this.setSummaryHeight();

        //滑到刚打开文章的顶部
        $("body").animate({
            scrollTop: ($papersWrapper.find(".read-this").offset().top-100)
        },300);



        //去掉类
        setTimeout(function(){
            $papersWrapper.removeClass("will-return");
            $papersWrapper.find(".read-this").removeClass("read-this");
        },300);

    },

    render: function(){
        var that = this;

        var papers = this.state.papers.map(function(paper,i){
           return(
               React.createElement("div", {key: i, className: "paper-item"}, 
                   React.createElement("div", {className: "title"}, React.createElement("a", {href: "#", onClick: that.handleReadPaper.bind(that,paper)}, paper.title)), 
                   React.createElement("div", {className: "info"}, 
                       React.createElement("span", {className: "create-time"}, paper.createTime)
                   ), 
                   React.createElement("div", {className: "summary-h"}, 
                       React.createElement("div", {className: "summary"}, paper.summary, React.createElement("a", {className: "read", onClick: that.handleReadPaper.bind(that,paper)}, ".读"))
                   )
               )
           );
        });

        var paper,
            otherWrapper;

        if(that.state.didReadPaper){
            paper = (React.createElement(PaperContent, {
                        readPaper: that.state.readPaper, 
                        handleReturn: that.handleReturnBlog}
                    ));
            otherWrapper = (React.createElement("div", {className: "other-wrapper read-paper"}, 
                                React.createElement("div", {className: "other-con"}, 
                                    React.createElement("p", null, "没有人评论"), React.createElement("span", null, "因为还没开放评论"), 
                                    React.createElement("div", {className: "qr-img"}, 
                                        React.createElement("img", {src: "images/myQRcode.png", alt: "wechat-qr-code"}), 
                                        React.createElement("span", {className: "qr-tips"}, "女生欢迎直接微信(逃")
                                    )
                                )
                            ));
        }else{
            otherWrapper = (React.createElement("div", {className: "other-wrapper"}, 
                                React.createElement("div", {className: "other-con"}, 
                                    React.createElement("p", null, "思考的宫殿")
                                )
                            ));
        }

        return React.createElement("div", {className: "blog-wrapper"}, 
            React.createElement("div", {ref: "papersWrapper", className: "papers-wrapper"}, 
                React.createElement("div", {className: "papers"}, papers), 
                paper, 
                React.createElement("div", {className: "di-line"})
            ), 
            React.createElement("div", {className: "other-wrapper"}, 
                otherWrapper
            )
        )
    }

});

/**
 * Created by hugotam on 16/2/20.
 */
//博客内容容器
var MeContent = React.createClass({displayName: "MeContent",

    render: function(){
        var myTags = this.props.updateMyTags.map(function(myTags,i){
            return(
                React.createElement("span", {key: i, className: "tag"}, "#"+myTags+" .")
            );
        });


        return React.createElement("div", {className: "me-wrapper"}, 
            React.createElement("div", {className: "intro-wrapper"}, 
                /*个人信息*/
                React.createElement("div", {className: "info"}, 
                    React.createElement("div", {className: "avatar"}), 
                    React.createElement("p", null, "Hugo Tam, 对此人收集的情报还十分有限。"), 
                    React.createElement("span", null, "(谭什么)")
                ), 
                /*经历*/
                /*<div className="simple-exp">
                    <p><span className="exp-time">2012.09 -- present.</span>湖南工业大学 本科 数字媒体艺术</p>
                    <p><span className="exp-time">2013.07 -- present.</span>湖南工业大学 <a href="http:idhut.cn">创新设计实验室</a></p>
                    <p><span className="exp-time">2014.?? -- 2016.02</span><a href="http://quickwis.com/">长沙快智OK记</a> 产品/设计/前端打杂</p>
                </div>*/
                /*标签*/
                React.createElement("div", {className: "tags"}, myTags), 
                /*分割线*/
                React.createElement("div", {className: "di-line"})
            )
            /*<div className="contact-wrapper">
                <h1 className="title">联系</h1>
                <div className="contact-list">
                    <div className="email">邮箱：<a href="#">hugotammmm@gmail.com</a></div>
                    <div className="weibo">微博：<a href="http://weibo.com/cupxxx">谭什么鬼</a></div>
                    <div className="wechat">微信：
                        <div className="wechat-info">
                            <img src="images/myQRcode.png" alt="QRCode"/>
                            <span className="tips">(加好友请注明来意)</span>
                        </div>
                    </div>
                </div>
            </div>*/
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
            keyActive: ""
        }

    },

    componentDidMount: function(){
        this.handleActiveEvent();
    },

    //接受到新的props或者setdate完成渲染DOM时...
    componentDidUpdate: function(){
        this.handleActiveEvent();
        window.location.hash = "exp-"+this.props.event;
    },

    handleActiveEvent: function(){
        var that = this;

        if(that.props.event == "HUT"){
            var $key = $(".event-HUT .key");

            $key.each(function(i){

                var $this = $(this);

                var delayTime = i+1;

                var delayUnit = 680;


                setTimeout(function(){
                    $this.addClass("show");
                },delayTime*delayUnit);

            });
        }

        //更新hash
        //window.location.hash = "exp-"+this.props.event;
    },

    handleCancelKeyActive: function(){
        var keys = ReactDOM.findDOMNode(this.refs.keys);

        $(keys).removeClass("keyactive-"+this.state.keyActive);
        this.setState({keyActive: ""});
    },

    handleKeyActive: function(key,event){
        event.preventDefault();
        var that = this;


        var keys = ReactDOM.findDOMNode(this.refs.keys);


        if(key){
            this.setState({keyActive: key});
            $(keys).addClass("keyactive-"+key);

            switch(key){
                case "LOL":
                    that.props.getMyTags("网瘾少年");
                    break;
                case "universityStudent":
                    that.props.getMyTags("一个大学生");
                    break;
                default :
                    break;
            }
        }

    },

    showImpact: function(){
        var wrapper = ReactDOM.findDOMNode(this.refs.idlVideoWrapper);

        $(wrapper).addClass("show-impact");

    },


    render: function(){
        var that = this;

        switch(that.props.event){
            case "HUT":
                var con = (React.createElement("div", {className: "key-wrapper"}, 
                    React.createElement("div", {ref: "keys", className: "keys", onMouseUp: that.handleCancelKeyActive, onMouseLeave: that.handleCancelKeyActive}, 
                        React.createElement("a", {className: "key t1"}, "湖南工业大学"), 
                        React.createElement("a", {className: "key t2", onMouseDown: that.handleKeyActive.bind(null,"packagingEngineering")}, "包装工程"), 
                        React.createElement("a", {className: "key t3", onMouseDown: that.handleKeyActive.bind(null,"bestMajor")}, "皇牌专业"), 
                        React.createElement("a", {className: "key t4"}, 
                            React.createElement("span", {className: "box1"}, "盒子"), 
                            React.createElement("span", {className: "box2"}, "盒子")
                        ), 
                        React.createElement("a", {className: "key t5"}, "工厂"), 
                        React.createElement("a", {className: "key t6"}, 
                            React.createElement("span", {className: "words"}, "流水线"), 
                            React.createElement("span", {className: "word w1"}, "流"), React.createElement("span", {className: "word w2"}, "水"), React.createElement("span", {className: "word w3"}, "线")
                        ), 
                        React.createElement("a", {className: "key t7", onMouseDown: that.handleKeyActive.bind(null,"confuse")}, "迷茫"), 
                        React.createElement("a", {className: "key t8", onMouseDown: that.handleKeyActive.bind(null,"lonely")}, "孤独"), 
                        React.createElement("a", {className: "key t9"}, "WOW"), 
                        React.createElement("a", {className: "key t10", onMouseDown: that.handleKeyActive.bind(null,"LOL")}, "LOL"), 
                        React.createElement("a", {className: "key t11", onMouseDown: that.handleKeyActive.bind(null,"universityStudent")}, "大学生"), 
                        React.createElement("a", {className: "key t12"}, "考研"), 
                        React.createElement("a", {className: "key t13", onMouseDown: that.handleKeyActive.bind(null,"fear")}, "恐惧")
                    )
                ));

                break;
            case "IDL":
                var con = (React.createElement("div", {ref: "idlVideoWrapper", className: "idl-video-wrapper"}, 
                            React.createElement("a", {className: "dian b idl-link", target: "_blank", href: "http://idhut.cn"}), 
                            React.createElement("a", {className: "dian r impact-link", href: "#", onClick: that.showImpact}), 
                            React.createElement("div", {ref: "idlVideo", className: "idl-video"}, 
                                    React.createElement("div", {className: "loading-wrapper"}, 
                                        React.createElement("div", {className: "ani-1"}), 
                                        React.createElement("div", {className: "ani-2"}), 
                                        React.createElement("div", {className: "ani-3"}), 
                                        React.createElement("div", {className: "ani-4"}), 
                                        React.createElement("div", {className: "ani-5"})
                                    ), 
                                    React.createElement("iframe", {height: "520", width: "720", src: "http://player.youku.com/embed/XNjUwNTA1NTg4", frameBorder: "0", allowFullScreen: true})
                            ), 
                            React.createElement("div", {className: "impact"}, 
                                React.createElement("div", {className: "select-wrapper"}, 
                                    React.createElement("div", {className: "member"}, 
                                        React.createElement("div", {className: "avatar"}), 
                                        React.createElement("div", {className: "name"}, "张浪浪")
                                    )
                                ), 
                                React.createElement("div", {className: "impact-con"})
                            )
                        ));
                break;
            default :
                var con= (React.createElement("div", null, 
                            React.createElement("p", null, "还在构思、实现，敬请期待。"), 
                            React.createElement("p", null, "联系欢迎添加微信，无聊也可以看看我的文章:)"), 
                            React.createElement("img", {src: "images/myQRcode.png", alt: "wechat-qr-code"})
                        ));

                break;


        }

        return(
            React.createElement("div", {className: "show-con-wrapper event-"+that.props.event}, con)

        )
    }

});
/**
 * Created by hugotam on 16/2/20.
 */

//DATE
ME.timeLineArea = [{
    itemName: "study at home",
    title: "在家自学<br />待业/待毕业",
    time: "present",
    dec: "frozen"
},{
    itemName: "OKmemo mobile2.0",
    title: "设计OK记移动端<br />新版风格交互",
    time: "2016-02",
    dec: "frozen"
},{
    itemName: "OKmemo UX",
    title: "OK记交互设计师",
    time: "2015-09",
    dec: "frozen"
},{
    itemName: "join quickwis",
    title: "到长沙快智网络科技有限公司实习",
    time: "2015-09",
    dec: "frozen"
},{
    itemName: "Pocket Travel",
    title: "进行模拟项目<br />“口袋旅游”",
    time: "2015-07",
    dec: "frozen"
},{
    itemName: "OKmemo community front-end",
    title: "参与实现OK记<br />第一版社区的样式部分前端工作",
    time: "2014-09",
    dec: "frozen"
},{
    itemName: "OKmemo mobile front-end",
    title: "参与实现OK记移动端<br />部分前端工作",
    time: "2014-09",
    dec: "frozen"
},{
    itemName: "OKmemo backstage management",
    title: "设计并前端实现<br />OK记后台管理",
    time: "2014-09",
    dec: "frozen"
},{
    itemName: "learn HTML",
    title: "学习<br />前端入门知识",
    time: "2014-08",
    dec: "frozen"
},{
    itemName: "do simple job in OKmemo",
    title: "OK记移动端<br />输出设计规范稿",
    time: "2014-07",
    dec: "frozen"
},{
    itemName: "learn in OKmemo",
    title: "观察学习<br />OK记设计助理",
    time: "2014-02",
    dec: "frozen"
},{
    itemName: "join OKmemo",
    title: "参与IDL项目<br />OK记",
    time: "2013-12",
    dec: "frozen"
},{
    itemName: "IDL",
    title: "进入IDL<br />创新设计实验室",
    time: "2013-07",
    dec: ""
},{
    itemName: "DMA",
    title: "变更专业<br />数字媒体艺术",
    time: "2013-06",
    dec: "frozen"
},{
    itemName: "blue apple",
    title: "加入<br />蓝苹果社团",
    time: "2012-10",
    dec: "frozen"
},{
    itemName: "HUT",
    title: "湖南工业大学<br />包装工程 大一",
    time:   "2012-09",
    dec: ""
}];



//博客内容容器
var ExpContent = React.createClass({displayName: "ExpContent",

    getInitialState: function(){
        return {
            items: ME.timeLineArea,
            showConEvent: "IDL"

        }

    },

    handleShowCon: function(itemName,event){
        event.preventDefault();
        this.setState({showConEvent: itemName});
    },

    render: function(){
        return React.createElement("div", {className: "exp-wrapper"}, 
            /*内容显示区域*/
            React.createElement("div", {className: "show-con-area"}, 
                React.createElement(ShowConArea, {
                    event: this.state.showConEvent, 
                    getSkillsTree: this.props.getSkillsTree, 
                    getMyTags: this.props.getMyTags}
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

        var that = this;


        //给dot高度
        var $timelineDot = $(".timeline-dot");
        $timelineDot.each(function(i,item){
                var $this = $(this),
                    $dotIntro = $this.find(".dot-intro"),
                    $dotTitle = $dotIntro.find(".dot-title");

                var dotTitleCon = that.props.items[i].title;
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

        var that = this;

        var dots = this.props.items.map(function(item,i){

            return(
                React.createElement("div", {className: "timeline-dot "+(item.dec), key: i}, 
                    /*bind不懂，为什么顺序是这样的*/
                    React.createElement("a", {href: "#", className: "dian dot", onClick: that.handleShowCon.bind(that,item.itemName)}), 
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
        if(window.location.hash.substr(1,5) == "paper"){
            var view = "paper",
                paper = window.location.hash.substr(6,10);
        }else{
            var view = window.location.hash.split("#")[1],
                paper = "";
        }


        return {
            view: view,
            paper: paper,
            skillsTree: [],
            myTags: []
        }
    },

    componentWillMount: function(){
        console.log(this.state.view);
    },

    setView: function(view){
        this.setState({
            view: view
        });
    },

    //设置技能树- -
    setSkillsTree: function(skill){
        var skillsTree = this.state.skillsTree;
        var repeatSkill = false;
        //查下重
        for(i=0;i<skillsTree.length;i++){
            if(skill == skillsTree[i]){
                //重复
                repeatSkill = true;
                break;
            }
        }
        if(!repeatSkill){
            skillsTree.push(skill);
        }
        this.setState({skillsTree: skillsTree});
    },

    //设置TAG，与上同
    setMyTags: function(tag){
        var myTags = this.state.myTags;
        var repeatTags = false;
        //查下重
        for(i=0;i<myTags.length;i++){
            if(tag == myTags[i]){
                //重复
                repeatTags = true;
                break;
            }
        }
        if(!repeatTags){
            myTags.push(tag);
        }
        this.setState({myTags: myTags});
    },

    render: function(){



        return React.createElement("div", null, 
                    React.createElement(Header, {
                        activeView: this.state.view, 
                        handleView: this.setView
                        }), 
                    React.createElement(Content, {
                        view: this.state.view, 
                        getSkillsTree: this.setSkillsTree, 
                        getMyTags: this.setMyTags, 
                        updateMyTags: this.state.myTags, 
                        paper: this.state.paper}
                        )
                );
    }


});

//内容容器
var Content = React.createClass({displayName: "Content",


    render: function(){
        var con;
        if(this.props.view == "me"){
            con = React.createElement(MeContent, {
                updateMyTags: this.props.updateMyTags}
                );
        }else if(this.props.view == "blog"){
            con = React.createElement(BlogContent, null);
        }else if(this.props.view == "exp"){
            con = React.createElement(ExpContent, {
                getSkillsTree: this.props.getSkillsTree, 
                getMyTags: this.props.getMyTags}
                );
        }else if(this.props.view == "paper"){
            con = React.createElement(BlogContent, {
                paper: this.props.paper}
                );
        }else{
            //con = <ExpContent
            //    getSkillsTree={this.props.getSkillsTree}
            //    getMyTags={this.props.getMyTags}
            //    />;
            con = React.createElement(BlogContent, null);
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