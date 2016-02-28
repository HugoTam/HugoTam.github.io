/**
 * Created by hugotam on 16/2/20.
 */
var PaperContent = React.createClass({
    handleReturnBlog: function(){
        this.props.handleReturn();
    },

    render: function(){
        var that = this;
        console.log(this.props.readPaper);
        return(
            <div className="paper">
                <p>先随便放点内容充充字数先随便放点内容充充字数先随便放点内容充充字数先随便放点内容充充字数先随便放点内容充充字数先随便放点内容充充字数先随便放点内容充充字数先随便放点内容充充字数</p>
                <a href="#" onClick={that.handleReturnBlog}>返回</a>
            </div>
        )
    }
});