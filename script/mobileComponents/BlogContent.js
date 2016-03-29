/**
 * Created by hugotam on 16/3/29.
 */
var BlogContent = React.createClass({
    getInitialState: function(){
        return{
            papers: ME.papers,
            readPaper: {},
            didReadPaper: this.props.didReadPaper
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

    //阅读blog
    handleReadPaper: function(paper,event){
        event.preventDefault();

        window.location.hash = "#paper" + TamTool.transformCreateTime(paper.createTime);

        this.setState({
            readPaper: paper,
            didReadPaper: true
        });

        //this.props.setView("paper");

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


    render: function() {
        var that = this;

        var papers = this.state.papers.map(function(paper,i){
            return(
                <div key={i} className="paper-item">
                    <div className="title"><a href="#" onClick={that.handleReadPaper.bind(that,paper)}>{paper.title}</a></div>
                    <div className="info">
                        <span className="create-time">{paper.createTime}</span>
                    </div>
                    <div className="summary-h">
                        <div className="summary">{paper.summary}</div>
                    </div>
                </div>
            );
        });

        var paper;

        if(that.state.didReadPaper){
            paper = (<PaperContent
                readPaper={that.state.readPaper}
                didReadPaper={that.state.didReadPaper}
                handleReturn={that.handleReturnBlog}
                />);
        }


        return <div className="blog-wrapper">
                <div ref="papersWrapper" className="papers-wrapper">
                        <div className="papers">{papers}</div>
                        {paper}
                </div>
        </div>
    }

});