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
var BlogContent = React.createClass({displayName: "BlogContent",
    getInitialState: function(){
        return{
            papers: ME.papers,
            isPaper: this.props.isPaper
        }
    },

    handleReadPaper: function(paper){
        console.log(paper);
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


        return React.createElement("div", null, papers
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
                view: this.state.view}
            )
        );
    }
});

//内容容器
var Content = React.createClass({displayName: "Content",

    render: function(){
        var con;

        switch(this.props.view){
            case "me":
                con = React.createElement(MeContent, null);
                break;
            case "blog":
                con = React.createElement(BlogContent, null);
                break;
            case "paper":
                con = React.createElement(BlogContent, {
                    isPaper: true}
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