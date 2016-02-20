//nav左边的每个标签
var NavItem = React.createClass({displayName: "NavItem",
    handleClick: function(){
        this.props.con(this.props.children)
    },


    render: function(){
        return React.createElement("a", {href: "#", onClick: this.handleClick}, 
                React.createElement("span", {todo: this.props.children, className: this.props.children}, this.props.children)
        )
    }
});

//右边变动的东西
var NavDec = React.createClass({displayName: "NavDec",

    changeText: function(){
        var texts = ["心血来潮","随心所欲","没有设计","不管交互","开心就好"];
        var newCon = ReactDOM.findDOMNode(this.refs.newCon),
            oldCon = ReactDOM.findDOMNode(this.refs.oldCon);



        // 现在集合的队列
        var i = 0;
        var j = 0;
        var newText = "",
            oldText = "";
        var firstLoadText = true;
        var textTimer = setInterval(function(){
            if(i<texts.length && i!==0){
                if(j<texts[i].length || j<=texts[i-1].length){
                    oldText = texts[i-1].substring(j);
                    newText = texts[i].substring(0,j+1);

                    newCon.innerText = newText;
                    oldCon.innerText = oldText;

                    j++;
                }else{
                    i++;
                    j=0;
                }
            }else if(i===0 && firstLoadText){
                // 第一次
                if(j<texts[i].length){
                    oldText = "";
                    newText = texts[i].substring(0,j+1);

                    newCon.innerText = newText;
                    oldCon.innerText = oldText;

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
                if(j<texts[i].length || j<=texts[texts.length-1].length){
                    oldText = texts[texts.length-1].substring(j);
                    newText = texts[i].substring(0,j+1);

                    newCon.innerText = newText;
                    oldCon.innerText = oldText;

                    j++;
                }else{
                    i++;
                    j=0;
                }
            }

        },200);

    },

    render: function(){

        return React.createElement("div", null, 
                    "这是一个", React.createElement("span", {ref: "newCon"}), React.createElement("span", {ref: "oldCon"}), "的网站"
                )
    },

    componentDidMount: function(){
        this.changeText();




    }

});

//整个头部
var MyHeader = React.createClass({displayName: "MyHeader",

    render: function(){
        return React.createElement("div", {className: "nav"}, 
                React.createElement("div", {className: "left"}, 
                    React.createElement(NavItem, {con: this.props.setCon}, "Blog"), 
                    React.createElement(NavItem, {con: this.props.setCon}, "Exp"), 
                    React.createElement(NavItem, {con: this.props.setCon}, "Me")
                ), 
                React.createElement("div", {className: "right"}, 
                    React.createElement(NavDec, null)
                )
        )
    }
});

//下方内容区
var MyCon = React.createClass({displayName: "MyCon",

    render: function(){
        var content;
        if(this.props.con == "Blog"){
            content = React.createElement(BlogCon, null);
        }else{
            content = React.createElement(MeCon, null);
        }

        return React.createElement("div", null, content)
    }

});

//点击博客
var BlogCon = React.createClass({displayName: "BlogCon",
    render: function(){
        return React.createElement("div", null, "Blog")
    }
});

//点击我
var MeCon = React.createClass({displayName: "MeCon",
    render: function(){
        return React.createElement("div", null, "Me")
    }
});

//点击经历
var ExpCon = React.createClass({displayName: "ExpCon",
    render: function(){
        return React.createElement("div", null, "Exp")
    }
});

var SiteWrapper = React.createClass({displayName: "SiteWrapper",
    getInitialState: function() {
        return {
            con: ""
        };
    },

    handleCon: function(con){
        this.setState({
            con: con
        });
    },

    render: function(){
        return React.createElement("div", null, 
                React.createElement(MyHeader, {
                    setCon: this.handleCon}
                    ), 
                React.createElement(MyCon, {
                    con: this.state.con}
                    )
            )
    }
});

ReactDOM.render(
    React.createElement(SiteWrapper, null),
    document.getElementById('container')
);



