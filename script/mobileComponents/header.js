/**
 * Created by hugotam on 16/3/29.
 */
var Header = React.createClass({
    //传递点击的值
    handleSetView: function(view){
        this.props.setView(view);
    },

    render: function(){
        return <div className="header-wrapper">
            <div className="items-wrapper">
                <a href="#" className="item" onClick={this.handleSetView.bind(null,"blog")}>BLOG</a>
                <a href="#" className="item" onClick={this.handleSetView.bind(null,"me")}>ME</a>
            </div>
        </div>;
    }
});