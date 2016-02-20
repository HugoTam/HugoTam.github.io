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
        this.setState({activeItem: "blog"});
        console.log("blog");
    },

    handleClickExp: function(){
        this.props.handleView("exp");
        this.setState({activeItem: "exp"});
        console.log("exp");

    },

    handleClickMe: function(){
        this.props.handleView("me");
        this.setState({activeItem: "me"});
        console.log("me")

    },

    getInitialState: function(){
        return{
            activeItem: "me"
        };
    },

    render: function(){
        return(
            React.createElement("div", {className: "nav"}, 
                React.createElement("div", {className: "left-side "+this.state.activeItem+"-active"}, 
                    React.createElement("a", {href: "#", className: "item blog", onClick: this.handleClickBlog}, React.createElement("span", null, "BLOG")), 
                    React.createElement("a", {href: "#", className: "item exp", onClick: this.handleClickExp}, React.createElement("span", null, "EXP")), 
                    React.createElement("a", {href: "#", className: "item me", onClick: this.handleClickMe}, React.createElement("span", null, "ME"))
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
                    React.createElement("p", null, "Hugo Tam,对此人收集的情报还十分有限。"), 
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
 * Created by hugotam on 16/2/20.
 */
//博客内容容器
var ExpContent = React.createClass({displayName: "ExpContent",

    render: function(){
        return React.createElement("div", null, 
            "EXP"
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
            view: "me"
        }
    },

    setView: function(view){
        this.setState({
            view: view
        });
    },

    render: function(){

        return React.createElement("div", null, 
            React.createElement(Header, {handleView: this.setView}), 
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