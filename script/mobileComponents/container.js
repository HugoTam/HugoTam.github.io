/**
 * Created by hugotam on 16/3/29.
 */

var BlogWrapper = React.createClass({

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
        return <div className="wrapper">
            <Header
                view={this.state.view}
                setView={this.setView}
            />
            <Content
                view={this.state.view}
                setView={this.setView}
            />
        </div>;
    }
});

//内容容器
var Content = React.createClass({

    render: function(){
        var con;
        var that = this;

        switch(this.props.view){
            case "me":
                con = <MeContent />;
                break;
            case "blog":
                con = <BlogContent
                    setView={that.props.setView}
                    />;
                break;
            case "paper":
                con = <BlogContent
                    didReadPaper={true}
                    setView={that.props.setView}
                    />;
                break;
            default:
                con = <BlogContent />;
        }

        return <div className="content-wrapper">
            {con}
        </div>
    }

});



ReactDOM.render(
    <BlogWrapper />,
    document.getElementById('container')
);