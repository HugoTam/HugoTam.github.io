/**
 * Created by hugotam on 16/2/20.
 */

//整个容器
var BlogWrapper = React.createClass({
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

        return <div>
            <Header handleView={this.setView}></Header>
            <Content view={this.state.view} />
        </div>
    },

    componentDidMount: function(){

    }
});

//内容容器
var Content = React.createClass({

    render: function(){
        var con;
        if(this.props.view == "me"){
            con = <MeContent />;
        }else if(this.props.view == "blog"){
            con = <BlogContent />;
        }else if(this.props.view == "exp"){
            con = <ExpContent />;
        }else if(this.props.view == "paper"){
            con = <PaperContent />;
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