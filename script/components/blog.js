/**
 * Created by hugotam on 16/2/20.
 */
var PaperContent = React.createClass({
    handleReturnBlog: function(event){
        this.props.handleReturn(event);
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
        //console.log("delayDetectSelectText "+selectText);
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
            <div className="paper">
                <div onMouseDown={this.delayDetectSelectText} onMouseUp={this.detectSelectText} className="paper-content" ref="paperCon"></div>
                <a className="bottom-return" href="#" onClick={this.handleReturnBlog}>到此为止了，回到开始的地方吧.</a>
            </div>
        )
    }
});