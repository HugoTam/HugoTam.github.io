/**
 * Created by hugotam on 16/2/24.
 */

var ShowConArea = React.createClass({

    getInitialState: function() {
        return {
            active: false,
            keyActive: "",
        }

    },

    componentDidMount: function(){
        this.handleActiveEvent();
    },


    //接受到新的props或者setdate完成渲染DOM时...
    componentDidUpdate: function(){
        this.handleActiveEvent();
    },

    handleActiveEvent: function(){
        var that = this;

        if(that.props.event == "HUT"){
            var $key = $(".event-HUT .key");

            $key.each(function(i){

                var $this = $(this);

                var delayTime = i+1;

                var delayUnit = 50;



                setTimeout(function(){
                    $this.addClass("show");
                },delayTime*delayUnit);

            });
        }
    },

    handleCancelKeyActive: function(){
        var keys = ReactDOM.findDOMNode(this.refs.keys);

        $(keys).removeClass("keyactive-"+this.state.keyActive);
        this.setState({keyActive: ""});
    },

    handleKeyActive: function(key){
        var that = this;
        var keys = ReactDOM.findDOMNode(this.refs.keys);

        this.setState({keyActive: key});
        $(keys).addClass("keyactive-"+key);

        switch(key){
            case "LOL":
                that.props.getMyTags("网瘾少年");
                break;
            case "universityStudent":
                that.props.getMyTags("一个大学生");
                break;
        }


    },


    render: function(){
        var that = this;

        switch(that.props.event){
            case "HUT":
                var con = <div className="key-wrapper">
                    <div ref="keys" className="keys" onMouseUp={that.handleCancelKeyActive} onMouseLeave={that.handleCancelKeyActive}>
                        <a href="#" className="key t1">湖南工业大学</a>
                        <a href="#" className="key t2 " onMouseDown={that.handleKeyActive.bind(null,"packagingEngineering")}>包装工程</a>
                        <a href="#" className="key t3" onMouseDown={that.handleKeyActive.bind(null,"bestMajor")}>皇牌专业</a>
                        <a href="#" className="key t4">
                            <span className="box1">盒子</span>
                            <span className="box2">盒子</span>
                        </a>
                        <a href="#" className="key t5">工厂</a>
                        <a href="#" className="key t6">
                            <span className="words">流水线</span>
                            <span className="word w1">流</span><span className="word w2">水</span><span className="word w3">线</span>
                        </a>
                        <a href="#" className="key t7" onMouseDown={that.handleKeyActive.bind(null,"confuse")}>迷茫</a>
                        <a href="#" className="key t8" onMouseDown={that.handleKeyActive.bind(null,"lonely")}>孤独</a>
                        <a href="#" className="key t9">WOW</a>
                        <a href="#" className="key t10" onMouseDown={that.handleKeyActive.bind(null,"LOL")}>LOL</a>
                        <a href="#" className="key t11" onMouseDown={that.handleKeyActive.bind(null,"universityStudent")}>大学生</a>
                        <a href="#" className="key t12">考研</a>
                        <a href="#" className="key t13">恐惧</a>
                    </div>
                </div>

                break;
            default :
                var con=<div>
                            <p>还在构思、实现，敬请期待。</p>
                            <p>联系欢迎添加微信，无聊也可以看看我的文章:)</p>
                            <img src="images/myQRcode.png" alt="wechat-qr-code"/>
                        </div>

                break;


        }

        return(
            <div className={"show-con-wrapper event-"+that.props.event}>{con}</div>

        )
    }

});