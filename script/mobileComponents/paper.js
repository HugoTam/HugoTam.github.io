/**
 * Created by hugotam on 16/3/29.
 */
var PaperContent = React.createClass({
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
            <div className="paper">
                <div className="paper-content" ref="paperCon"></div>
                <a className="bottom-return" href="#" onClick={this.handleReturnBlog}>到此为止了，回到开始的地方吧.</a>
            </div>
        )
    }


});