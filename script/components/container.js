/**
 * Created by hugotam on 16/2/20.
 */

//整个容器
var BlogWrapper = React.createClass({
    getInitialState: function(){
        if(window.location.hash.substr(1,5) == "paper"){
            var view = "paper",
                paper = window.location.hash.substr(6,10);
        }else{
            var view = window.location.hash.split("#")[1],
                paper = "";
        }


        return {
            view: view,
            paper: paper,
            skillsTree: [],
            myTags: []
        }
    },

    componentWillMount: function(){
        console.log(this.state.view);
    },

    setView: function(view){
        this.setState({
            view: view
        });
    },

    //设置技能树- -
    setSkillsTree: function(skill){
        var skillsTree = this.state.skillsTree;
        var repeatSkill = false;
        //查下重
        for(i=0;i<skillsTree.length;i++){
            if(skill == skillsTree[i]){
                //重复
                repeatSkill = true;
                break;
            }
        }
        if(!repeatSkill){
            skillsTree.push(skill);
        }
        this.setState({skillsTree: skillsTree});
    },

    //设置TAG，与上同
    setMyTags: function(tag){
        var myTags = this.state.myTags;
        var repeatTags = false;
        //查下重
        for(i=0;i<myTags.length;i++){
            if(tag == myTags[i]){
                //重复
                repeatTags = true;
                break;
            }
        }
        if(!repeatTags){
            myTags.push(tag);
        }
        this.setState({myTags: myTags});
    },

    render: function(){



        return <div>
                    <Header
                        activeView={this.state.view}
                        handleView={this.setView}
                        ></Header>
                    <Content
                        view={this.state.view}
                        getSkillsTree={this.setSkillsTree}
                        getMyTags={this.setMyTags}
                        updateMyTags={this.state.myTags}
                        paper={this.state.paper}
                        />
                </div>;
    }


});

//内容容器
var Content = React.createClass({


    render: function(){
        var con;
        if(this.props.view == "me"){
            con = <MeContent
                updateMyTags={this.props.updateMyTags}
                />;
        }else if(this.props.view == "blog"){
            con = <BlogContent />;
        }else if(this.props.view == "exp"){
            con = <ExpContent
                getSkillsTree={this.props.getSkillsTree}
                getMyTags={this.props.getMyTags}
                />;
        }else if(this.props.view == "paper"){
            con = <BlogContent
                paper={this.props.paper}
                />;
        }else{
            //con = <ExpContent
            //    getSkillsTree={this.props.getSkillsTree}
            //    getMyTags={this.props.getMyTags}
            //    />;
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