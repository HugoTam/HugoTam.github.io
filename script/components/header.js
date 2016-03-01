/**
 * Created by hugotam on 16/2/20.
 */
var Header = React.createClass({

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
            <div className="nav">
                <div className={"left-side "+this.props.activeView+"-active"}>
                    <a href="#blog" className="item blog" onClick={this.handleClickBlog}><span>BLOG</span></a>
                    <a href="#exp" className="item exp" onClick={this.handleClickExp}><span>EXP</span></a>
                    <a href="#me" className="item me" onClick={this.handleClickMe}><span>ME</span></a>
                </div>
                <div className="right-side">
                <span className="des">一个
                    <span className="new-text" ref="newText"></span>
                    <span className="old-text" ref="oldText"></span>的网站
                </span>
                </div>
            </div>
        )
    },

    componentDidMount: function(){
        this.autoChangeText();
    }

});