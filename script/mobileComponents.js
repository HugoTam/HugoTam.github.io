/**
 * Created by hugotam on 16/3/29.
 */
var Header = React.createClass({displayName: "Header",
    //传递点击的值
    handleSetView: function(view){
        this.props.setView(view);
    },

    render: function(){
        return React.createElement("div", {className: "header-wrapper"}, 
            React.createElement("div", {className: "items-wrapper"}, 
                React.createElement("a", {href: "#", className: "item", onClick: this.handleSetView.bind(null,"blog")}, "BLOG"), 
                React.createElement("a", {href: "#", className: "item", onClick: this.handleSetView.bind(null,"me")}, "ME")
            )
        );
    }
});
/**
 * Created by hugotam on 16/3/29.
 */
var PaperContent = React.createClass({displayName: "PaperContent",
    getPaperContent: function(){
        var createTime = TamTool.transformCreateTime(this.props.readPaper.createTime);
        var con = $.ajax({url:"../paper/paper" + createTime + ".md",async:false});
        var converter = new showdown.Converter();
        var mdHtml = converter.makeHtml(con.responseText);

        var $paperCon = $(ReactDOM.findDOMNode(this.refs.paperCon));

        $paperCon.html(mdHtml);

    },

    componentDidMount: function(){
        this.getPaperContent();

    },

    componentDidUpdate: function(){
        this.getPaperContent();

    },

    handleReturnBlog: function(event){
        this.props.handleReturn(event);
    },

    render: function(){

        return(
            React.createElement("div", {className: "paper"}, 
                React.createElement("div", {className: "paper-content", ref: "paperCon"}), 
                React.createElement("a", {className: "bottom-return", href: "#", onClick: this.handleReturnBlog}, "到此为止了，回到开始的地方吧.")
            )
        )
    }


});
/**
 * Created by hugotam on 16/3/29.
 */
var BlogContent = React.createClass({displayName: "BlogContent",
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
                React.createElement("div", {key: i, className: "paper-item"}, 
                    React.createElement("div", {className: "title"}, React.createElement("a", {href: "#", onClick: that.handleReadPaper.bind(that,paper)}, paper.title)), 
                    React.createElement("div", {className: "info"}, 
                        React.createElement("span", {className: "create-time"}, paper.createTime)
                    ), 
                    React.createElement("div", {className: "summary-h"}, 
                        React.createElement("div", {className: "summary"}, paper.summary)
                    )
                )
            );
        });

        var paper;

        if(that.state.didReadPaper){
            paper = (React.createElement(PaperContent, {
                readPaper: that.state.readPaper, 
                didReadPaper: that.state.didReadPaper, 
                handleReturn: that.handleReturnBlog}
                ));
        }


        return React.createElement("div", {className: "blog-wrapper"}, 
                React.createElement("div", {ref: "papersWrapper", className: "papers-wrapper"}, 
                        React.createElement("div", {className: "papers"}, papers), 
                        paper
                )
        )
    }

});
/**
 * Created by hugotam on 16/3/29.
 */
var MeContent = React.createClass({displayName: "MeContent",
    render: function() {
        return React.createElement("div", null, "this is ME.")
    }

});
/**
 * Created by hugotam on 16/3/29.
 */

var BlogWrapper = React.createClass({displayName: "BlogWrapper",

    getInitialState: function(){

        return {
            view: "",
            paper: ""
        }
    },

    setView: function(view){
        this.setState({
            view: view
        });
    },

    render: function(){
        return React.createElement("div", {className: "wrapper"}, 
            React.createElement(Header, {
                view: this.state.view, 
                setView: this.setView}
            ), 
            React.createElement(Content, {
                view: this.state.view, 
                setView: this.setView}
            )
        );
    }
});

//内容容器
var Content = React.createClass({displayName: "Content",

    render: function(){
        var con;
        var that = this;

        switch(this.props.view){
            case "me":
                con = React.createElement(MeContent, null);
                break;
            case "blog":
                con = React.createElement(BlogContent, {
                    setView: that.props.setView}
                    );
                break;
            case "paper":
                con = React.createElement(BlogContent, {
                    didReadPaper: true, 
                    setView: that.props.setView}
                    );
                break;
            default:
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