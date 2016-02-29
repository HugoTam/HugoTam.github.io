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
    title: "孤独的创业者(坑)",
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
var BlogContent = React.createClass({

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
               <div key={i} className="paper-item">
                   <div className="title"><a href="#" onClick={that.handleReadPaper.bind(that,paper)}>{paper.title}</a></div>
                   <div className="info">
                       <span className="create-time">{paper.createTime}</span>
                   </div>
                   <div className="summary-h">
                       <div className="summary">{paper.summary}<a className="read" onClick={that.handleReadPaper.bind(that,paper)} href="#">.读</a></div>
                   </div>
               </div>
           );
        });

        var paper,
            otherWrapper;

        if(that.state.didReadPaper){
            paper = (<PaperContent
                        readPaper={that.state.readPaper}
                        handleReturn={that.handleReturnBlog}
                    />);
            otherWrapper = (<div className="other-wrapper read-paper">
                                <div className="other-con">
                                    <p>没有人评论</p><span>因为还没开放评论</span>
                                    <div className="qr-img">
                                        <img src="images/myQRcode.png" alt="wechat-qr-code"/>
                                        <span className="qr-tips">女生欢迎直接微信(逃</span>
                                    </div>
                                </div>
                            </div>);
        }else{
            otherWrapper = (<div className="other-wrapper">
                                <div className="other-con">
                                    <p>思考的宫殿</p>
                                </div>
                            </div>);
        }

        return <div className="blog-wrapper">
            <div ref="papersWrapper" className="papers-wrapper">
                <div className="papers">{papers}</div>
                {paper}
                <div className="di-line"></div>
            </div>
            <div className="other-wrapper">
                {otherWrapper}
            </div>
        </div>
    }

});
