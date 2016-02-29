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
                    React.createElement("a", {href: "#blog", className: "item blog", onClick: this.handleClickBlog}, React.createElement("span", null, "BLOG")), 
                    React.createElement("a", {href: "#exp", className: "item exp", onClick: this.handleClickExp}, React.createElement("span", null, "EXP")), 
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

    transformCreateTime: function(time,symbol){
        if(symbol){
            return time.split(".").join(symbol);
        }else{
            return time.split(".").join("");
        }

    },

    componentDidMount: function(){
        this.getPaperContent();

        $(window).on("mousedown",this.delayDetectSelectText);
        $(window).on("mouseup",this.detectSelectText);
    },

    componentDidUpdate: function(){
        this.getPaperContent();

        $(window).on("mousedown",this.delayDetectSelectText);
        $(window).on("mouseup",this.detectSelectText);
    },

    componentWillUnmount: function(){
        //解除绑定
        $(window).off("mousedown",this.delayDetectSelectText);
        $(window).off("mouseup",this.detectSelectText);
    },

    getPaperContent: function(){
        var createTime = this.transformCreateTime(this.props.readPaper.createTime);
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
        }else{
            ReactDOM.findDOMNode(this.refs.paperCon).classList.remove("selected");
        }
    },

    delayDetectSelectText: function(){
        var that = this;
        setTimeout(function(){
            var selectText = window.getSelection().toString();
            if(!selectText && ReactDOM.findDOMNode(that.refs.paperCon)){
                ReactDOM.findDOMNode(that.refs.paperCon).classList.remove("selected");
            }
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


ME.papers = [{
    title: "22岁前夕游学校",
    createTime: "2015.09.21",
    author: "Hugo Tam",
    type: "writing",
    summary: "他在酒店独自呆了一个下午，晚上还是决定去大学走一下，重回那所他呆过四年的大学，不是想怀念什么，而是酒店wifi信号实在不好，他看电视也看无聊，磨蹭了半个小时才走出的门。这次回来的理由跟上次一样，也是来补考大四下学期时电影编导理论这门课。这件事折磨了他好长时间，后悔自"
},{
    title: "无聊巴士上随想",
    createTime: "2015.10.11",
    author: "Hugo Tam",
    type: "writing",
    summary: "六点一刻，阿星发完给上级的邮件，便收拾东西去吃晚饭。一同去吃饭的同事李苟是阿星最看不惯的，走在路上还要拿着个kindle，且不说路上昏暗根本看不清，即使硬是要看他也绝不会看进多少，因为李苟是这群人中最爱扯淡的人，没走几步路就会向我们吹捧他热衷的魔鬼约会学。最气的是他的犹豫不决，李苟总在下了班才考虑收拾东西，而令他犹豫不决却是要带回家什么书。"
},{
    title: "假期后实习分享",
    createTime: "2015.10.25",
    author: "Hugo Tam",
    type: "experience",
    summary: "当我们开分享会的时候，分享的是什么？"
},{
    title: "与高中暗恋对象通电话后编",
    createTime: "2015.11.01",
    author: "Hugo Tam",
    type: "writing",
    summary: "“喂，你是谁啊？”电话那头传来了那熟悉又温柔的声音。阿星拿着大鹏的手机问道:“请问你是唐莹莹小姐吗，我是大鹏的朋友。”电话那头沉默了几秒，回答道“你们是在玩大冒险吗？”大鹏听到自己手机这么快就被接了，有些惊讶，大晚上的她居然会这么干爽的接了自己的电话。"
},{
    title: "孤独的创业者",
    createTime: "2015.12.14",
    author: "Hugo Tam",
    type: "experience",
    summary: "孤独的创业者，是我们公司搬到德思勤的孵化器后所看所想的第一感觉。也是实习的几个月以来，在初创公司的深深体会。孤独感一直伴随着我，在我工作的地方环绕，渗透在我的脑海当中。孵化器那里有不少创业者，或如三楼不少创业者一样，独身一人，对着屏幕，做着不知道尽头、不知道结果的事情，每逢去厕所经过走廊，只看到他们全神贯注的表情，"
},{
    title: "建站初衷",
    createTime: "2016.02.28",
    author: "Hugo Tam",
    type: "experience",
    summary: ""
}];


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

    componentDidMount: function(){
        this.setSummaryHeight();

        if(this.state.showSummary){
            ReactDOM.findDOMNode(this.refs.papersWrapper).classList.add("summary");
        }
    },

    handleReadPaper: function(paper,event){
        event.preventDefault();
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
        },400)

        //滑到顶部
        $("body").animate({
            scrollTop: 0
        },300);

    },

    handleReturnBlog: function(event){

        event.preventDefault();

        this.setState({
            readPaper: {},
            didReadPaper: false
        });
        var $papersWrapper = $(ReactDOM.findDOMNode(this.refs.papersWrapper));
        $papersWrapper.removeClass("read-paper will-read-paper");
        this.setSummaryHeight();

        //滑到刚打开文章的顶部
        $("body").animate({
            scrollTop: ($papersWrapper.find(".read-this").offset().top-100)
        },300);

        //去掉类
        $papersWrapper.find(".read-this").removeClass("read-this");

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
                       React.createElement("div", {className: "summary"}, paper.summary, React.createElement("a", {className: "read", onClick: that.handleReadPaper.bind(that,paper), href: "#"}, ".读"))
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
                React.createElement("div", {className: "simple-exp"}, 
                    React.createElement("p", null, React.createElement("span", {className: "exp-time"}, "2012.09 -- present."), "湖南工业大学 本科 数字媒体艺术"), 
                    React.createElement("p", null, React.createElement("span", {className: "exp-time"}, "2013.07 -- present."), "湖南工业大学 ", React.createElement("a", {href: "http:idhut.cn"}, "创新设计实验室")), 
                    React.createElement("p", null, React.createElement("span", {className: "exp-time"}, "2014.?? -- 2016.02"), React.createElement("a", {href: "http://quickwis.com/"}, "长沙快智OK记"), " 产品/设计/前端打杂")
                ), 
                /*标签*/
                React.createElement("div", {className: "tags"}, myTags), 
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
        var that = this;

        if(that.props.event == "HUT"){
            var $key = $(".event-HUT .key");

            $key.each(function(i){

                var $this = $(this);

                var delayTime = i+1;

                var delayUnit = 50;



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
        var that = this;
        var keys = ReactDOM.findDOMNode(this.refs.keys);

        this.setState({keyActive: key});
        $(keys).addClass("keyactive-"+key);

        switch(key){
            case "LOL":
                that.props.getMyTags("网瘾少年");
                break;
            case "universityStudent":
                that.props.getMyTags("一个大学生");
                break;
        }


    },


    render: function(){
        var that = this;

        switch(that.props.event){
            case "HUT":
                var con = React.createElement("div", {className: "key-wrapper"}, 
                    React.createElement("div", {ref: "keys", className: "keys", onMouseUp: that.handleCancelKeyActive, onMouseLeave: that.handleCancelKeyActive}, 
                        React.createElement("a", {href: "#", className: "key t1"}, "湖南工业大学"), 
                        React.createElement("a", {href: "#", className: "key t2 ", onMouseDown: that.handleKeyActive.bind(null,"packagingEngineering")}, "包装工程"), 
                        React.createElement("a", {href: "#", className: "key t3", onMouseDown: that.handleKeyActive.bind(null,"bestMajor")}, "皇牌专业"), 
                        React.createElement("a", {href: "#", className: "key t4"}, 
                            React.createElement("span", {className: "box1"}, "盒子"), 
                            React.createElement("span", {className: "box2"}, "盒子")
                        ), 
                        React.createElement("a", {href: "#", className: "key t5"}, "工厂"), 
                        React.createElement("a", {href: "#", className: "key t6"}, 
                            React.createElement("span", {className: "words"}, "流水线"), 
                            React.createElement("span", {className: "word w1"}, "流"), React.createElement("span", {className: "word w2"}, "水"), React.createElement("span", {className: "word w3"}, "线")
                        ), 
                        React.createElement("a", {href: "#", className: "key t7", onMouseDown: that.handleKeyActive.bind(null,"confuse")}, "迷茫"), 
                        React.createElement("a", {href: "#", className: "key t8", onMouseDown: that.handleKeyActive.bind(null,"lonely")}, "孤独"), 
                        React.createElement("a", {href: "#", className: "key t9"}, "WOW"), 
                        React.createElement("a", {href: "#", className: "key t10", onMouseDown: that.handleKeyActive.bind(null,"LOL")}, "LOL"), 
                        React.createElement("a", {href: "#", className: "key t11", onMouseDown: that.handleKeyActive.bind(null,"universityStudent")}, "大学生"), 
                        React.createElement("a", {href: "#", className: "key t12"}, "考研"), 
                        React.createElement("a", {href: "#", className: "key t13"}, "恐惧")
                    )
                )

                break;
            default :
                var con=React.createElement("div", null, 
                            React.createElement("p", null, "还在构思、实现，敬请期待。"), 
                            React.createElement("p", null, "联系欢迎添加微信，无聊也可以看看我的文章:)"), 
                            React.createElement("img", {src: "images/myQRcode.png", alt: "wechat-qr-code"})
                        )

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
                React.createElement("div", {className: "timeline-dot", key: i}, 
                    /*bind不懂，为什么顺序是这样的*/
                    React.createElement("a", {href: "#", className: "dot", onClick: that.handleShowCon.bind(that,item.itemName)}), 
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
            view: "exp",
            skillsTree: [],
            myTags: []
        }
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
            console.log(tag);
            console.log(myTags[i]);
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
                updateMyTags: this.state.myTags}
            )
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