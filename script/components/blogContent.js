/**
 * Created by hugotam on 16/2/20.
 */
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
               <div key={i} className="paper-item">
                   <div className="title"><a href="#" onClick={that.handleReadPaper.bind(that,paper)}>{paper.title}</a></div>
                   <div className="info">
                       <span className="create-time">{paper.createTime}</span>
                   </div>
                   <div className="summary-h">
                       <div className="summary">{paper.summary}<a className="read" onClick={that.handleReadPaper.bind(that,paper)}>.读</a></div>
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
