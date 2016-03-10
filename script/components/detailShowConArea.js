/**
 * Created by hugotam on 16/2/24.
 */

var ShowConArea = React.createClass({

    getInitialState: function() {
        return {
            active: false,
            keyActive: ""
        }

    },

    componentDidMount: function(){
        this.handleActiveEvent();
    },

    //接受到新的props或者setdate完成渲染DOM时...
    componentDidUpdate: function(){
        this.handleActiveEvent();
        window.location.hash = "exp-"+this.props.event;
    },

    handleActiveEvent: function(){
        var that = this;

        if(that.props.event == "HUT"){
            var $key = $(".event-HUT .key");

            $key.each(function(i){

                var $this = $(this);

                var delayTime = i+1;

                var delayUnit = 680;


                setTimeout(function(){
                    $this.addClass("show");
                },delayTime*delayUnit);

            });
        }

        //更新hash
        //window.location.hash = "exp-"+this.props.event;
    },

    handleCancelKeyActive: function(){
        var keys = ReactDOM.findDOMNode(this.refs.keys);

        $(keys).removeClass("keyactive-"+this.state.keyActive);
        this.setState({keyActive: ""});
    },

    handleKeyActive: function(key,event){
        event.preventDefault();
        var that = this;


        var keys = ReactDOM.findDOMNode(this.refs.keys);


        if(key){
            this.setState({keyActive: key});
            $(keys).addClass("keyactive-"+key);

            switch(key){
                case "LOL":
                    that.props.getMyTags("网瘾少年");
                    break;
                case "universityStudent":
                    that.props.getMyTags("一个大学生");
                    break;
                default :
                    break;
            }
        }

    },

    showImpact: function(){
        var wrapper = ReactDOM.findDOMNode(this.refs.idlVideoWrapper);

        $(wrapper).addClass("show-impact");

    },


    render: function(){
        var that = this;

        switch(that.props.event){
            case "HUT":
                var con = (<div className="key-wrapper">
                    <div ref="keys" className="keys" onMouseUp={that.handleCancelKeyActive} onMouseLeave={that.handleCancelKeyActive}>
                        <a className="key t1">湖南工业大学</a>
                        <a className="key t2" onMouseDown={that.handleKeyActive.bind(null,"packagingEngineering")}>包装工程</a>
                        <a className="key t3" onMouseDown={that.handleKeyActive.bind(null,"bestMajor")}>皇牌专业</a>
                        <a className="key t4">
                            <span className="box1">盒子</span>
                            <span className="box2">盒子</span>
                        </a>
                        <a className="key t5">工厂</a>
                        <a className="key t6">
                            <span className="words">流水线</span>
                            <span className="word w1">流</span><span className="word w2">水</span><span className="word w3">线</span>
                        </a>
                        <a className="key t7" onMouseDown={that.handleKeyActive.bind(null,"confuse")}>迷茫</a>
                        <a className="key t8" onMouseDown={that.handleKeyActive.bind(null,"lonely")}>孤独</a>
                        <a className="key t9">WOW</a>
                        <a className="key t10" onMouseDown={that.handleKeyActive.bind(null,"LOL")}>LOL</a>
                        <a className="key t11" onMouseDown={that.handleKeyActive.bind(null,"universityStudent")}>大学生</a>
                        <a className="key t12">考研</a>
                        <a className="key t13" onMouseDown={that.handleKeyActive.bind(null,"fear")}>恐惧</a>
                    </div>
                </div>);

                break;
            case "IDL":
                var con = (<div ref="idlVideoWrapper" className="idl-video-wrapper">
                            <a className="dian b idl-link" target="_blank" href="http://idhut.cn"></a>
                            <a className="dian r impact-link" href="#" onClick={that.showImpact}></a>
                            <div ref="idlVideo" className="idl-video">
                                    <div className="loading-wrapper">
                                        <div className="ani-1"></div>
                                        <div className="ani-2"></div>
                                        <div className="ani-3"></div>
                                        <div className="ani-4"></div>
                                        <div className="ani-5"></div>
                                    </div>
                                    <iframe height="520" width="720" src="http://player.youku.com/embed/XNjUwNTA1NTg4" frameBorder="0" allowFullScreen></iframe>
                            </div>
                            <div className="impact">
                                <div className="select-wrapper">
                                    <div className="member">
                                        <div className="avatar"></div>
                                        <div className="name">张浪浪</div>
                                    </div>
                                </div>
                                <div className="impact-con"></div>
                            </div>
                        </div>);
                break;
            default :
                var con= (<div>
                            <p>还在构思、实现，敬请期待。</p>
                            <p>联系欢迎添加微信，无聊也可以看看我的文章:)</p>
                            <img src="images/myQRcode.png" alt="wechat-qr-code"/>
                        </div>);

                break;


        }

        return(
            <div className={"show-con-wrapper event-"+that.props.event}>{con}</div>

        )
    }

});